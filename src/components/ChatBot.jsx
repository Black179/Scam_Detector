import React, { useState, useRef, useEffect } from 'react';
import { 
  MessageCircle, 
  Send, 
  X, 
  Minimize2, 
  Maximize2, 
  Bot, 
  User,
  Shield,
  AlertTriangle,
  Loader2
} from 'lucide-react';
import aiService from '../services/aiService';

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      text: "Hello! I'm your dedicated ScamGuard AI Assistant. I'm here to provide you with precise, sincere guidance on scam detection and online safety. How can I help you stay safe today?",
      timestamp: new Date(),
      confidence: 1.0
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async () => {
    if (!inputMessage.trim() || isTyping) return;

    const userMsg = {
      id: Date.now(),
      type: 'user',
      text: inputMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInputMessage('');
    setIsTyping(true);

    try {
      // Get conversation history for context
      const conversationHistory = messages
        .filter(msg => msg.type === 'user' || msg.type === 'bot')
        .slice(-5)
        .map(msg => ({
          role: msg.type === 'user' ? 'user' : 'assistant',
          content: msg.text
        }));

      // Call the AI service
      const response = await aiService.sendMessage(inputMessage, conversationHistory);
      
      const botMsg = {
        id: Date.now() + 1,
        type: 'bot',
        text: response.response || "I'm sorry, I couldn't process your request. Please try again.",
        timestamp: new Date(),
        confidence: response.confidence || 0.8
      };
      
      setMessages(prev => [...prev, botMsg]);
    } catch (error) {
      console.error('Chat error:', error);
      const errorMsg = {
        id: Date.now() + 1,
        type: 'bot',
        text: error.message || "I apologize, but I'm having trouble connecting right now. Please try again in a moment.",
        timestamp: new Date(),
        confidence: 0.5,
        isError: true
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  if (!isOpen) {
    return (
      <div className="fixed bottom-4 right-4 z-50">
        <button
          onClick={() => setIsOpen(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white rounded-full p-3 shadow-lg transition-all duration-200 transform hover:scale-105 flex items-center justify-center"
          aria-label="Open chat"
        >
          <MessageCircle size={24} />
        </button>
      </div>
    );
  }

  if (isMinimized) {
    return (
      <div className="fixed bottom-4 right-4 z-50 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden w-80">
        <div className="flex items-center justify-between bg-blue-600 text-white p-3">
          <div className="flex items-center space-x-2">
            <Shield size={18} />
            <span className="font-medium">ScamGuard AI</span>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => setIsMinimized(false)}
              className="text-white hover:bg-blue-700 p-1 rounded"
              aria-label="Maximize chat"
            >
              <Maximize2 size={16} />
            </button>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white hover:bg-blue-700 p-1 rounded"
              aria-label="Close chat"
            >
              <X size={16} />
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden w-80 h-[500px] flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between bg-blue-600 text-white p-3">
        <div className="flex items-center space-x-2">
          <Shield size={18} />
          <span className="font-medium">ScamGuard AI Assistant</span>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => setIsMinimized(true)}
            className="text-white hover:bg-blue-700 p-1 rounded"
            aria-label="Minimize chat"
          >
            <Minimize2 size={16} />
          </button>
          <button
            onClick={() => setIsOpen(false)}
            className="text-white hover:bg-blue-700 p-1 rounded"
            aria-label="Close chat"
          >
            <X size={16} />
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] rounded-lg p-3 ${
                message.type === 'user'
                  ? 'bg-blue-100 dark:bg-blue-900 text-blue-900 dark:text-blue-100'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100'
              }`}
            >
              <div className="flex items-center space-x-2 mb-1">
                {message.type === 'user' ? (
                  <User size={16} className="text-blue-600 dark:text-blue-300" />
                ) : (
                  <Bot size={16} className="text-green-600 dark:text-green-300" />
                )}
                <span className="text-xs font-medium opacity-70">
                  {message.type === 'user' ? 'You' : 'ScamGuard AI'}
                </span>
              </div>
              <p className="whitespace-pre-wrap">{message.text}</p>
              {message.confidence && message.confidence < 0.7 && (
                <div className="mt-1 flex items-center text-xs text-amber-600 dark:text-amber-400">
                  <AlertTriangle size={12} className="mr-1" />
                  <span>Confidence: {Math.round(message.confidence * 100)}%</span>
                </div>
              )}
              <div className="text-right mt-1">
                <span className="text-xs opacity-50">
                  {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex items-center space-x-2 p-2">
            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="border-t border-gray-200 dark:border-gray-700 p-3 bg-gray-50 dark:bg-gray-800">
        <div className="flex items-end space-x-2">
          <div className="flex-1 relative">
            <textarea
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message..."
              className="w-full border border-gray-300 dark:border-gray-600 rounded-lg p-2 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white resize-none"
              rows="1"
              disabled={isTyping}
            />
          </div>
          <button
            onClick={sendMessage}
            disabled={!inputMessage.trim() || isTyping}
            className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg p-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            aria-label="Send message"
          >
            {isTyping ? (
              <Loader2 size={20} className="animate-spin" />
            ) : (
              <Send size={20} />
            )}
          </button>
        </div>
        <div className="mt-2 text-xs text-gray-500 dark:text-gray-400 text-center">
          ScamGuard AI is here to help you stay safe online
        </div>
      </div>
    </div>
  );
};

export default ChatBot;