import { GoogleGenerativeAI } from '@google/generative-ai';

class AIService {
  constructor() {
    this.apiKey = import.meta.env.VITE_AI_API_KEY;
    this.fallbackMode = false;
    
    // Initialize the Gemini AI client
    if (this.apiKey) {
      try {
        this.genAI = new GoogleGenerativeAI(this.apiKey);
        // Use gemini-2.5-pro as default (latest and most capable model)
        // Can be configured via env variable if needed
        this.modelName = import.meta.env.VITE_GEMINI_MODEL || 'gemini-2.5-pro';
        this.model = this.genAI.getGenerativeModel({ model: this.modelName });
      } catch (error) {
        console.error('Failed to initialize Gemini AI:', error);
        this.fallbackMode = true;
      }
    } else {
      console.warn('VITE_AI_API_KEY is not set. AI service will use fallback mode.');
      this.fallbackMode = true;
    }
  }

  async sendMessage(message, conversationHistory = []) {
    // If no API key or initialization failed, use fallback
    if (this.fallbackMode || !this.model) {
      return {
        success: false,
        error: 'AI service not configured',
        fallback: this.getFallbackResponse(message)
      };
    }

    try {
      // Build conversation history for Gemini
      // Gemini requires the first message to always be from the user
      // Filter out any assistant messages that come before the first user message
      let validHistory = [];
      let foundFirstUser = false;

      for (const msg of conversationHistory) {
        const role = msg.role === 'assistant' ? 'model' : 'user';
        
        // If we haven't found the first user message yet
        if (!foundFirstUser) {
          if (role === 'user') {
            foundFirstUser = true;
            validHistory.push({
              role: 'user',
              parts: [{ text: msg.content }]
            });
          }
          // Skip assistant messages before the first user message
        } else {
          // After finding the first user message, include all messages
          validHistory.push({
            role: role,
            parts: [{ text: msg.content }]
          });
        }
      }

      // Start a chat session with history (only if we have valid history)
      let chat;
      if (validHistory.length > 0) {
        chat = this.model.startChat({
          history: validHistory,
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 2048,
            topP: 0.8,
            topK: 40,
          },
        });
      } else {
        // No valid history, start a fresh chat
        chat = this.model.startChat({
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 2048,
            topP: 0.8,
            topK: 40,
          },
        });
      }

      // Send the message
      const result = await chat.sendMessage(message);
      const response = await result.response;
      const text = response.text();

      if (!text) {
        throw new Error('Empty response from AI service');
      }

      return {
        success: true,
        response: text,
        confidence: 0.9,
        sources: []
      };
    } catch (error) {
      console.error('AI Service Error:', error);
      
      // Handle specific Gemini API errors
      let errorMessage = error.message;
      if (error.message?.includes('API_KEY')) {
        errorMessage = 'Invalid API key. Please check your VITE_AI_API_KEY environment variable.';
      } else if (error.message?.includes('QUOTA')) {
        errorMessage = 'API quota exceeded. Please try again later.';
      } else if (error.message?.includes('SAFETY')) {
        errorMessage = 'Content was blocked by safety filters. Please rephrase your message.';
      } else if (error.message?.includes('First content should be with role')) {
        errorMessage = 'Invalid conversation history format. Starting fresh conversation.';
        // Retry without history as fallback
        try {
          const chat = this.model.startChat({
            generationConfig: {
              temperature: 0.7,
              maxOutputTokens: 2048,
              topP: 0.8,
              topK: 40,
            },
          });
          const result = await chat.sendMessage(message);
          const response = await result.response;
          const text = response.text();
          return {
            success: true,
            response: text,
            confidence: 0.9,
            sources: []
          };
        } catch (retryError) {
          console.error('Retry failed:', retryError);
        }
      }

      return {
        success: false,
        error: errorMessage,
        fallback: this.getFallbackResponse(message)
      };
    }
  }

  /**
   * Analyze scam-related content with a specialized prompt
   * @param {Object} submissionData - Data about the submission (company, website, description, etc.)
   * @returns {Promise<Object>} Analysis result with risk assessment
   */
  async analyzeScamSubmission(submissionData) {
    if (this.fallbackMode || !this.model) {
      return {
        success: false,
        error: 'AI service not configured',
        fallback: this.getFallbackResponse('analysis request')
      };
    }

    try {
      const prompt = `You are an expert scam detection AI assistant. Analyze the following internship/certificate opportunity and provide a detailed risk assessment.

Company/Organization: ${submissionData.companyName || 'Not provided'}
Website: ${submissionData.websiteUrl || 'Not provided'}
Description: ${submissionData.description || 'Not provided'}
${submissionData.positionTitle ? `Position: ${submissionData.positionTitle}` : ''}
${submissionData.contactEmail ? `Contact: ${submissionData.contactEmail}` : ''}

Please provide a JSON response with the following structure:
{
  "overallRisk": <number 0-100>,
  "riskLevel": "<low|medium|high>",
  "confidence": <number 0-100>,
  "riskFactors": [
    {
      "category": "<category name>",
      "score": <number 0-100>,
      "issues": ["<issue 1>", "<issue 2>"],
      "positive": ["<positive indicator 1>"]
    }
  ],
  "recommendations": [
    {
      "type": "<warning|critical>",
      "title": "<title>",
      "description": "<description>",
      "actions": ["<action 1>", "<action 2>"]
    }
  ],
  "summary": "<brief summary>"
}

Focus on:
1. Company legitimacy verification
2. Website authenticity
3. Contact information credibility
4. Offer details suspicious patterns
5. Common scam indicators

Be thorough and provide actionable insights.`;

      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();

      // Try to parse JSON from the response
      try {
        // Extract JSON from markdown code blocks if present
        const jsonMatch = text.match(/```json\s*([\s\S]*?)\s*```/) || text.match(/```\s*([\s\S]*?)\s*```/);
        const jsonText = jsonMatch ? jsonMatch[1] : text;
        const analysis = JSON.parse(jsonText.trim());
        
        return {
          success: true,
          analysis: analysis,
          rawResponse: text
        };
      } catch (parseError) {
        // If JSON parsing fails, return the raw text
        console.warn('Failed to parse JSON response, returning raw text:', parseError);
        return {
          success: true,
          analysis: {
            overallRisk: 50,
            riskLevel: 'medium',
            confidence: 70,
            summary: text
          },
          rawResponse: text
        };
      }
    } catch (error) {
      console.error('Scam Analysis Error:', error);
      return {
        success: false,
        error: error.message,
        fallback: null
      };
    }
  }

  getFallbackResponse(message) {
    // Your fallback responses here
    return "I'm having trouble connecting to the AI service. Please check your API key configuration and try again later.";
  }
}

export default new AIService();