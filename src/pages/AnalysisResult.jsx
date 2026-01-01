import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import jsPDF from 'jspdf';
import { 
  Shield, 
  AlertTriangle, 
  CheckCircle, 
  Info, 
  Download, 
  Share2, 
  Clock, 
  Building, 
  FileText, 
  Mail, 
  Phone, 
  Globe, 
  MapPin,
  DollarSign,
  TrendingUp,
  TrendingDown,
  Minus,
  ChevronDown,
  ChevronUp,
  Star,
  Users,
  Award,
  ExternalLink,
  ArrowRight
} from 'lucide-react';

const AnalysisResult = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [expandedSection, setExpandedSection] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  
  // Get submitted data from navigation state
  const submittedData = location.state?.submittedData || {};
  const submissionType = location.state?.submissionType || 'internship';
  
  // Generate analysis data based on submitted information
  const generateAnalysisData = (data, type) => {
    // Base analysis with some randomization for demo purposes
    const baseRisk = Math.floor(Math.random() * 30) + 40; // 40-70 base risk
    const overallRisk = Math.round(baseRisk + (data.companyName ? Math.random() * 20 : 10));
    
    return {
      overallRisk: overallRisk,
      riskLevel: overallRisk > 60 ? 'high' : overallRisk > 40 ? 'medium' : 'low',
      confidence: 92,
      analysisTime: '2.3 seconds',
      submissionType: type,
      submittedInfo: {
        company: data.companyName || data.companyName || 'Unknown Company',
        website: data.websiteUrl || data.companyWebsite || 'Not provided',
        description: data.description || data.jobDescription || 'Not provided',
        position: data.positionTitle || 'Not specified',
        contact: data.contactEmail || 'Not provided'
      },
      
      // Risk factors
      riskFactors: [
        {
          category: 'Company Verification',
          score: data.companyName ? 35 : 65,
          icon: Building,
          issues: data.companyName ? [
            'Company website appears to be recently registered',
            'Limited business registration information found'
          ] : [
            'No company name provided for verification',
            'Cannot verify business legitimacy'
          ],
          positive: data.companyName ? [
            'Company name provided for verification'
          ] : []
        },
        {
          category: 'Contact Information',
          score: data.contactEmail ? 45 : 75,
          icon: Mail,
          issues: data.contactEmail ? [
            'Email domain does not match known company domains',
            'No verified business contact information'
          ] : [
            'No contact information provided',
            'Cannot establish communication channel verification'
          ],
          positive: data.contactEmail ? [
            'Contact email provided'
          ] : []
        },
        {
          category: 'Offer Details',
          score: type === 'certificate' ? 55 : 70,
          icon: FileText,
          issues: type === 'certificate' ? [
            'Certificate issuing organization needs verification',
            'No external validation found for certificate program'
          ] : [
            'Vague job description and requirements',
            'Unusual compensation structure'
          ],
          positive: type === 'certificate' ? [
            'Certificate details provided'
          ] : [
            'Position title specified',
            'Duration information provided'
          ]
        },
        {
          category: 'Online Presence',
          score: data.websiteUrl || data.companyWebsite ? 50 : 80,
          icon: Globe,
          issues: data.websiteUrl || data.companyWebsite ? [
            'Limited professional social media presence',
            'Few employee reviews available'
          ] : [
            'No website or online presence found',
            'Cannot verify digital footprint'
          ],
          positive: data.websiteUrl || data.companyWebsite ? [
            'Website URL provided'
          ] : []
        }
      ],
      
      // Recommendations based on risk level
      recommendations: [
        {
          type: overallRisk > 60 ? 'critical' : 'warning',
          title: overallRisk > 60 ? 'Exercise Extreme Caution' : 'Proceed with Verification',
          description: overallRisk > 60 
            ? 'This opportunity shows multiple red flags indicating a high probability of being a scam.'
            : 'This opportunity has some concerning elements that require verification.',
          actions: overallRisk > 60 ? [
            'Do not provide any personal information',
            'Do not pay any fees or deposits',
            'Report this offer to your university career services',
            'Block and report the contact person'
          ] : [
            'Verify the company through official channels',
            'Request a video call with HR representative',
            'Check with your university career services',
            'Look for reviews from current/former employees'
          ]
        }
      ],
      
      // Similar legitimate opportunities
      legitimateAlternatives: [
        {
          company: 'TechCorp Solutions',
          position: type === 'certificate' ? 'Web Development Certificate' : 'Frontend Developer Intern',
          location: 'San Francisco, CA',
          duration: '3-6 months',
          stipend: '$2000/month',
          verified: true
        },
        {
          company: 'Digital Innovations',
          position: type === 'certificate' ? 'UI/UX Design Certificate' : 'Web Development Intern',
          location: 'Remote',
          duration: '6 months',
          stipend: '$1500/month',
          verified: true
        }
      ]
    };
  };
  
  const analysisData = generateAnalysisData(submittedData, submissionType);

  const getRiskColor = (score) => {
    if (score >= 70) return 'text-danger-600 bg-danger-100';
    if (score >= 40) return 'text-yellow-600 bg-yellow-100';
    return 'text-success-600 bg-success-100';
  };

  const getRiskIcon = (score) => {
    if (score >= 70) return <TrendingUp className="h-5 w-5 text-danger-600" />;
    if (score >= 40) return <Minus className="h-5 w-5 text-yellow-600" />;
    return <TrendingDown className="h-5 w-5 text-success-600" />;
  };

  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const margin = 20;
    let yPosition = 20;

    // Helper function to add colored header
    const addColoredHeader = (text, color) => {
      doc.setTextColor(...color);
      doc.setFontSize(18);
      doc.setFont('helvetica', 'bold');
      doc.text(text, margin, yPosition);
      yPosition += 12;
      doc.setTextColor(0, 0, 0);
    };

    // Helper function to add section divider
    const addSectionDivider = () => {
      doc.setDrawColor(200, 200, 200);
      doc.setLineWidth(0.5);
      doc.line(margin, yPosition, pageWidth - margin, yPosition);
      yPosition += 10;
    };

    // Helper function to add risk indicator with visual
    const addRiskIndicator = (score, label) => {
      const riskColor = score >= 70 ? [255, 0, 0] : 
                       score >= 40 ? [255, 165, 0] : [0, 128, 0];
      const riskLabel = score >= 70 ? 'HIGH' : 
                       score >= 40 ? 'MEDIUM' : 'LOW';
      
      // Draw colored box
      doc.setFillColor(...riskColor);
      doc.rect(margin, yPosition, 60, 25, 'F');
      
      // Add text
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(14);
      doc.setFont('helvetica', 'bold');
      doc.text(riskLabel, margin + 30, yPosition + 8);
      
      // Add score
      doc.setTextColor(0, 0, 0);
      doc.setFontSize(12);
      doc.text(`${score}%`, margin + 65, yPosition + 8);
      
      yPosition += 35;
    };

    // Helper function to add visual chart bars
    const addChartBar = (label, score, maxWidth = 100) => {
      const barColor = score >= 70 ? [255, 0, 0] : 
                       score >= 40 ? [255, 165, 0] : [0, 128, 0];
      
      doc.setTextColor(0, 0, 0);
      doc.setFontSize(11);
      doc.text(label, margin, yPosition);
      yPosition += 8;
      
      // Draw background bar
      doc.setDrawColor(230, 230, 230);
      doc.rect(margin, yPosition, maxWidth, 8);
      
      // Draw colored progress bar
      doc.setFillColor(...barColor);
      doc.rect(margin, yPosition, (maxWidth * score) / 100, 8);
      
      yPosition += 15;
    };

    // Header with gradient effect
    doc.setFillColor(59, 130, 246);
    doc.rect(0, 0, pageWidth, 40, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(24);
    doc.setFont('helvetica', 'bold');
    doc.text('SCAMGUARD ANALYSIS REPORT', margin, yPosition + 15);
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text(`Generated on: ${new Date().toLocaleDateString()} at ${new Date().toLocaleTimeString()}`, margin, yPosition + 25);
    yPosition += 50;

    // Executive Summary with visual elements
    addColoredHeader('EXECUTIVE SUMMARY', [59, 130, 246]);
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text(`Overall Risk Assessment: ${analysisData.riskLevel.toUpperCase()}`, margin, yPosition);
    yPosition += 10;
    
    // Visual Risk Score Display
    addRiskIndicator(analysisData.overallRisk, 'RISK SCORE');
    
    doc.text(`Analysis Confidence: ${analysisData.confidence}%`, margin, yPosition);
    doc.text(`Analysis Duration: ${analysisData.analysisTime}`, margin, yPosition + 8);
    yPosition += 20;

    addSectionDivider();

    // Analyzed Information with icons
    addColoredHeader('ANALYZED INFORMATION', [79, 70, 229]);
    yPosition += 5;
    
    const infoItems = [
      [`Company: ${analysisData.submittedInfo.company}`],
      [`Website: ${analysisData.submittedInfo.website}`],
      [`Type: ${analysisData.submissionType.toUpperCase()}`]
    ];
    
    if (analysisData.submissionType === 'internship') {
      infoItems.splice(2, 0, `Position: ${analysisData.submittedInfo.position}`);
    }
    
    infoItems.forEach(item => {
      doc.setFontSize(11);
      doc.text(`• ${item}`, margin + 5, yPosition);
      yPosition += 8;
    });
    
    doc.text(`Description: ${analysisData.submittedInfo.description}`, margin + 5, yPosition);
    yPosition += 15;

    addSectionDivider();

    // Risk Factors with Visual Charts
    addColoredHeader('RISK FACTORS BREAKDOWN', [239, 68, 68]);
    yPosition += 5;
    
    analysisData.riskFactors.forEach((factor, index) => {
      doc.setFontSize(12);
      doc.setFont('helvetica', 'bold');
      doc.text(`${index + 1}. ${factor.category}`, margin, yPosition);
      yPosition += 10;
      
      // Visual risk bar
      addChartBar(factor.category, factor.score);
      
      // Issues and positives
      if (factor.issues.length > 0) {
        doc.setTextColor(220, 38, 38);
        doc.setFontSize(10);
        doc.text(`Issues: ${factor.issues.join(', ')}`, margin + 5, yPosition);
        yPosition += 8;
      }
      
      if (factor.positive.length > 0) {
        doc.setTextColor(34, 197, 94);
        doc.text(`Positives: ${factor.positive.join(', ')}`, margin + 5, yPosition);
        yPosition += 8;
      }
      
      doc.setTextColor(0, 0, 0);
      yPosition += 10;
    });

    addSectionDivider();

    // Recommendations with visual emphasis
    addColoredHeader('RECOMMENDATIONS', [251, 191, 36]);
    yPosition += 5;
    
    analysisData.recommendations.forEach((rec, index) => {
      const recColor = rec.type === 'critical' ? [220, 38, 38] : [245, 158, 11];
      
      // Recommendation header with color
      doc.setFillColor(...recColor);
      doc.rect(margin, yPosition, pageWidth - 2 * margin, 8, 'F');
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(12);
      doc.setFont('helvetica', 'bold');
      doc.text(`${index + 1}. ${rec.title.toUpperCase()}`, margin + 5, yPosition + 6);
      yPosition += 15;
      
      // Description
      doc.setTextColor(0, 0, 0);
      doc.setFontSize(11);
      doc.setFont('helvetica', 'normal');
      const descLines = doc.splitTextToSize(rec.description, pageWidth - 2 * margin - 10);
      descLines.forEach(line => {
        doc.text(line, margin + 10, yPosition);
        yPosition += 6;
      });
      
      yPosition += 8;
      
      // Action items
      doc.setFont('helvetica', 'bold');
      doc.text('Recommended Actions:', margin, yPosition);
      yPosition += 8;
      
      rec.actions.forEach((action, idx) => {
        doc.setFont('helvetica', 'normal');
        doc.text(`   ${idx + 1}) ${action}`, margin + 10, yPosition);
        yPosition += 6;
      });
      
      yPosition += 10;
    });

    addSectionDivider();

    // Visual Summary Chart
    addColoredHeader('VISUAL SUMMARY', [147, 51, 234]);
    yPosition += 5;
    
    // Create simple bar chart
    const chartStartX = margin + 20;
    const chartStartY = yPosition;
    const chartWidth = pageWidth - 2 * margin - 40;
    const chartHeight = 60;
    
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text('Risk Factor Comparison:', margin, yPosition);
    yPosition += 15;
    
    // Draw chart bars
    const barWidth = chartWidth / analysisData.riskFactors.length;
    analysisData.riskFactors.forEach((factor, index) => {
      const barColor = factor.score >= 70 ? [255, 0, 0] : 
                       factor.score >= 40 ? [255, 165, 0] : [0, 128, 0];
      const barX = chartStartX + (index * barWidth);
      
      // Draw bar
      doc.setFillColor(...barColor);
      doc.rect(barX, chartStartY, barWidth - 10, (chartHeight * factor.score) / 100, 'F');
      
      // Draw percentage on top
      doc.setTextColor(0, 0, 0);
      doc.setFontSize(8);
      doc.text(`${factor.score}%`, barX + (barWidth / 2) - 10, chartStartY - 5);
      
      // Draw label
      doc.setFontSize(7);
      doc.text(factor.category.substring(0, 8), barX + 2, chartStartY + chartHeight + 5);
    });
    
    yPosition += chartHeight + 20;

    // Footer with visual elements
    addSectionDivider();
    doc.setFillColor(240, 240, 240);
    doc.rect(0, doc.internal.pageSize.getHeight() - 30, pageWidth, 30, 'F');
    
    doc.setTextColor(100, 100, 100);
    doc.setFontSize(10);
    doc.setFont('helvetica', 'italic');
    doc.text('This is a confidential report generated by ScamGuard AI-Powered Scam Detection', margin, doc.internal.pageSize.getHeight() - 20);
    doc.text(`For support: support@scamguard.com | Report ID: SG-${Date.now()}`, margin, doc.internal.pageSize.getHeight() - 10);

    // Save PDF with enhanced filename
    doc.save(`ScamGuard-Enhanced-Report-${new Date().toISOString().split('T')[0]}-${Date.now()}.pdf`);
  };

  const shareResults = async () => {
    const shareData = {
      title: `ScamGuard Analysis - ${analysisData.submittedInfo.company}`,
      text: `I analyzed ${analysisData.submittedInfo.company} using ScamGuard and found a ${analysisData.riskLevel} risk level (${analysisData.overallRisk}% risk score). 

${analysisData.riskLevel === 'high' ? '⚠️ HIGH RISK: This appears to be a scam opportunity.' : 
  analysisData.riskLevel === 'medium' ? '⚡ MEDIUM RISK: This requires further verification.' : 
  '✅ LOW RISK: This appears to be legitimate.'}

Company: ${analysisData.submittedInfo.company}
Website: ${analysisData.submittedInfo.website}
${analysisData.submissionType === 'internship' ? `Position: ${analysisData.submittedInfo.position}` : `Type: ${analysisData.submissionType}`}

Analysis completed with ${analysisData.confidence}% confidence in ${analysisData.analysisTime}.

Stay safe with ScamGuard - AI-powered scam detection!`,
      url: window.location.href
    };

    try {
      if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
        await navigator.share(shareData);
      } else {
        // Fallback: Copy to clipboard
        await navigator.clipboard.writeText(`${shareData.title}\n\n${shareData.text}\n\n${shareData.url}`);
        alert('Analysis results copied to clipboard! You can now share them manually.');
      }
    } catch (error) {
      if (error.name !== 'AbortError') {
        console.error('Error sharing:', error);
        alert('Unable to share results. Please try again or copy the results manually.');
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div 
              className="flex items-center cursor-pointer hover:opacity-80 transition-opacity"
              onClick={() => navigate('/')}
            >
              <Shield className="h-8 w-8 text-blue-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">ScamGuard</span>
            </div>
            <div className="hidden sm:flex space-x-4">
              <button 
                onClick={generatePDF}
                className="btn-secondary text-sm"
              >
                <Download className="h-4 w-4 mr-2" />
                Download Report
              </button>
              <button 
                onClick={shareResults}
                className="btn-primary text-sm"
              >
                <Share2 className="h-4 w-4 mr-2" />
                Share Results
              </button>
            </div>
            {/* Mobile menu button */}
            <div className="sm:hidden">
              <button 
                onClick={() => setShowMobileMenu(!showMobileMenu)}
                className="text-gray-600 hover:text-gray-900 p-2"
              >
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
          {/* Mobile menu dropdown */}
          {showMobileMenu && (
            <div className="sm:hidden py-2 border-t border-gray-200">
              <div className="flex flex-col space-y-2 pt-2">
                <button 
                  onClick={generatePDF}
                  className="btn-secondary text-sm w-full justify-center"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Download Report
                </button>
                <button 
                  onClick={shareResults}
                  className="btn-primary text-sm w-full justify-center"
                >
                  <Share2 className="h-4 w-4 mr-2" />
                  Share Results
                </button>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Submitted Information */}
        <div className="card mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Analyzed Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-1">Company/Organization</h3>
              <p className="text-gray-900">{analysisData.submittedInfo.company}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-1">Website</h3>
              <p className="text-gray-900 break-all">{analysisData.submittedInfo.website}</p>
            </div>
            {analysisData.submissionType === 'internship' && (
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-1">Position</h3>
                <p className="text-gray-900">{analysisData.submittedInfo.position}</p>
              </div>
            )}
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-1">Contact</h3>
              <p className="text-gray-900">{analysisData.submittedInfo.contact}</p>
            </div>
            <div className="md:col-span-2">
              <h3 className="text-sm font-medium text-gray-500 mb-1">Description</h3>
              <p className="text-gray-900">{analysisData.submittedInfo.description}</p>
            </div>
          </div>
        </div>

        {/* Result Header */}
        <div className="text-center mb-8 px-2">
          <div className={`inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-full mb-4 ${
            analysisData.riskLevel === 'high' ? 'bg-danger-100' : 
            analysisData.riskLevel === 'medium' ? 'bg-yellow-100' : 'bg-success-100'
          }`}>
            {analysisData.riskLevel === 'high' ? (
              <AlertTriangle className="h-8 w-8 sm:h-10 sm:w-10 text-danger-600" />
            ) : analysisData.riskLevel === 'medium' ? (
              <Info className="h-8 w-8 sm:h-10 sm:w-10 text-yellow-600" />
            ) : (
              <CheckCircle className="h-8 w-8 sm:h-10 sm:w-10 text-success-600" />
            )}
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
            {analysisData.riskLevel === 'high' ? 'High Risk Detected' :
             analysisData.riskLevel === 'medium' ? 'Medium Risk Detected' : 'Low Risk Detected'}
          </h1>
          <p className="text-base sm:text-lg text-gray-600 mb-4 px-4">
            {analysisData.riskLevel === 'high' ? 'Our analysis indicates this is likely a scam opportunity' :
             analysisData.riskLevel === 'medium' ? 'Our analysis shows some concerning elements that require verification' : 
             'Our analysis suggests this appears to be a legitimate opportunity'}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-6 text-sm text-gray-500">
            <div className="flex items-center">
              <Clock className="h-4 w-4 mr-1" />
              Analysis completed in {analysisData.analysisTime}
            </div>
            <div className="flex items-center">
              <Shield className="h-4 w-4 mr-1" />
              {analysisData.confidence}% confidence
            </div>
          </div>
        </div>

        {/* Risk Score Visualization */}
        <div className="card mb-8">
          <div className="text-center mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Overall Risk Assessment</h2>
            <div className="relative inline-block">
              <div className="w-48 h-48 sm:w-56 sm:h-56 mx-auto relative">
                {/* Animated Background Circle */}
                <div className={`absolute inset-0 rounded-full animate-pulse opacity-20 ${
                  analysisData.riskLevel === 'high' ? 'bg-red-500' : 
                  analysisData.riskLevel === 'medium' ? 'bg-yellow-500' : 'bg-green-500'
                }`} />
                
                {/* Main Circular Progress */}
                <svg className="w-full h-full transform -rotate-90 relative z-10">
                  <circle
                    cx="50%"
                    cy="50%"
                    r="45%"
                    stroke="#e5e7eb"
                    strokeWidth="16"
                    fill="none"
                  />
                  <circle
                    cx="50%"
                    cy="50%"
                    r="45%"
                    stroke={analysisData.riskLevel === 'high' ? '#ef4444' : 
                           analysisData.riskLevel === 'medium' ? '#f59e0b' : '#10b981'}
                    strokeWidth="16"
                    fill="none"
                    strokeDasharray={`${2 * Math.PI * 45}`}
                    strokeDashoffset={`${2 * Math.PI * 45 * (1 - analysisData.overallRisk / 100)}`}
                    className="transition-all duration-1500 ease-out"
                    strokeLinecap="round"
                  />
                </svg>
                
                {/* Center Content */}
                <div className="absolute inset-0 flex flex-col items-center justify-center z-20">
                  <div className={`text-4xl sm:text-5xl font-bold mb-2 ${
                    analysisData.riskLevel === 'high' ? 'text-red-600' : 
                    analysisData.riskLevel === 'medium' ? 'text-yellow-600' : 'text-green-600'
                  }`}>
                    {analysisData.overallRisk}%
                  </div>
                  <div className="text-xs sm:text-sm text-gray-600 uppercase tracking-wide">Risk Score</div>
                  <div className={`mt-2 px-2 sm:px-3 py-1 rounded-full text-xs font-semibold ${
                    analysisData.riskLevel === 'high' ? 'bg-red-100 text-red-800' : 
                    analysisData.riskLevel === 'medium' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'
                  }`}>
                    {analysisData.riskLevel.toUpperCase()} RISK
                  </div>
                </div>
                
                {/* Animated Ring */}
                <div className={`absolute inset-0 border-4 rounded-full animate-ping ${
                  analysisData.riskLevel === 'high' ? 'border-red-200' : 
                  analysisData.riskLevel === 'medium' ? 'border-yellow-200' : 'border-green-200'
                }`} />
              </div>
            </div>
            
            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
              <div className="text-center p-3 sm:p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-center mb-2">
                  <Shield className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600 mr-2" />
                  <span className="text-xs sm:text-sm font-medium text-gray-600">Confidence</span>
                </div>
                <div className="text-xl sm:text-2xl font-bold text-gray-900">{analysisData.confidence}%</div>
              </div>
              <div className="text-center p-3 sm:p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-center mb-2">
                  <Clock className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600 mr-2" />
                  <span className="text-xs sm:text-sm font-medium text-gray-600">Analysis Time</span>
                </div>
                <div className="text-xl sm:text-2xl font-bold text-gray-900">{analysisData.analysisTime}</div>
              </div>
              <div className="text-center p-3 sm:p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-center mb-2">
                  <FileText className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600 mr-2" />
                  <span className="text-xs sm:text-sm font-medium text-gray-600">Type</span>
                </div>
                <div className="text-xl sm:text-2xl font-bold text-gray-900 capitalize">{analysisData.submissionType}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Risk Factors Breakdown */}
        <div className="card mb-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 space-y-2 sm:space-y-0">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-900">Risk Factors Analysis</h2>
            <button
              onClick={() => setShowDetails(!showDetails)}
              className="text-primary-600 hover:text-primary-700 text-xs sm:text-sm font-medium transition-colors duration-200 hover:scale-105 transform"
            >
              {showDetails ? 'Hide Details' : 'Show Details'}
            </button>
          </div>
          
          <div className="space-y-3 sm:space-y-4">
            {analysisData.riskFactors.map((factor, index) => {
              const Icon = factor.icon;
              const isExpanded = expandedSection === index;
              
              return (
                <div 
                  key={index} 
                  className="border border-gray-200 rounded-xl overflow-hidden transition-all duration-300 hover:shadow-lg hover:scale-[1.02] transform"
                >
                  <button
                    onClick={() => toggleSection(index)}
                    className="w-full px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between hover:bg-gray-50 transition-colors duration-200"
                  >
                    <div className="flex items-center space-x-3 sm:space-x-4">
                      <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center transition-all duration-300 flex-shrink-0 ${
                        factor.score >= 70 ? 'bg-red-100' : 
                        factor.score >= 40 ? 'bg-yellow-100' : 'bg-green-100'
                      }`}>
                        <Icon className={`h-5 w-5 sm:h-6 sm:w-6 transition-colors duration-300 ${
                          factor.score >= 70 ? 'text-red-600' : 
                          factor.score >= 40 ? 'text-yellow-600' : 'text-green-600'
                        }`} />
                      </div>
                      <div className="text-left flex-1 min-w-0">
                        <h3 className="font-semibold text-gray-900 text-sm sm:text-lg truncate">{factor.category}</h3>
                        <p className="text-xs sm:text-sm text-gray-500">Risk Assessment</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 sm:space-x-3">
                      <div className="text-right">
                        <div className={`text-lg sm:text-2xl font-bold transition-colors duration-300 ${
                          factor.score >= 70 ? 'text-red-600' : 
                          factor.score >= 40 ? 'text-yellow-600' : 'text-green-600'
                        }`}>
                          {factor.score}%
                        </div>
                        <div className="text-xs text-gray-500 uppercase tracking-wide">
                          {factor.score >= 70 ? 'High Risk' : 
                           factor.score >= 40 ? 'Medium Risk' : 'Low Risk'}
                        </div>
                      </div>
                      <div className={`transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}>
                        <ChevronDown className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
                      </div>
                    </div>
                  </button>
                  
                  {/* Enhanced Progress Bar */}
                  <div className="px-4 sm:px-6 pb-2 sm:pb-3">
                    <div className="relative w-full bg-gray-200 rounded-full h-2 sm:h-3 overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-700 ease-out relative overflow-hidden ${
                          factor.score >= 70 ? 'bg-gradient-to-r from-red-500 to-red-600' : 
                          factor.score >= 40 ? 'bg-gradient-to-r from-yellow-500 to-yellow-600' : 'bg-gradient-to-r from-green-500 to-green-600'
                        }`}
                        style={{ width: `${factor.score}%` }}
                      >
                        <div className="absolute inset-0 bg-white opacity-20 animate-pulse" />
                      </div>
                    </div>
                  </div>
                  
                  {/* Enhanced Detailed Issues */}
                  {isExpanded && showDetails && (
                    <div className="px-4 sm:px-6 pb-4 sm:pb-6 bg-gray-50 border-t border-gray-100">
                      <div className="mt-3 sm:mt-4 space-y-3 sm:space-y-4">
                        {factor.issues.length > 0 && (
                          <div className="bg-white rounded-lg p-3 sm:p-4 border border-red-100">
                            <h4 className="text-xs sm:text-sm font-semibold text-red-700 mb-2 sm:mb-3 flex items-center">
                              <AlertTriangle className="h-3 w-3 sm:h-4 sm:w-4 mr-2" />
                              Issues Found ({factor.issues.length})
                            </h4>
                            <ul className="space-y-1 sm:space-y-2">
                              {factor.issues.map((issue, idx) => (
                                <li key={idx} className="flex items-start text-xs sm:text-sm text-gray-700 hover:text-red-600 transition-colors duration-200">
                                  <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-red-500 rounded-full mt-1 sm:mt-1.5 mr-2 sm:mr-3 flex-shrink-0 animate-pulse" />
                                  <span className="leading-relaxed">{issue}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                        
                        {factor.positive.length > 0 && (
                          <div className="bg-white rounded-lg p-3 sm:p-4 border border-green-100">
                            <h4 className="text-xs sm:text-sm font-semibold text-green-700 mb-2 sm:mb-3 flex items-center">
                              <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4 mr-2" />
                              Positive Indicators ({factor.positive.length})
                            </h4>
                            <ul className="space-y-1 sm:space-y-2">
                              {factor.positive.map((positive, idx) => (
                                <li key={idx} className="flex items-start text-xs sm:text-sm text-gray-700 hover:text-green-600 transition-colors duration-200">
                                  <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-green-500 rounded-full mt-1 sm:mt-1.5 mr-2 sm:mr-3 flex-shrink-0" />
                                  <span className="leading-relaxed">{positive}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Recommendations */}
        <div className="space-y-4 sm:space-y-6 mb-8">
          {analysisData.recommendations.map((rec, index) => (
            <div 
              key={index} 
              className={`card border-l-4 overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-[1.02] transform ${
                rec.type === 'critical' ? 'border-l-red-500' : 'border-l-yellow-500'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-start">
                <div className={`w-12 h-12 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl flex items-center justify-center mb-4 sm:mb-0 sm:mr-6 transition-all duration-300 ${
                  rec.type === 'critical' ? 'bg-red-100 animate-pulse' : 'bg-yellow-100'
                }`}>
                  {rec.type === 'critical' ? (
                    <AlertTriangle className="h-6 w-6 sm:h-8 sm:w-8 text-red-600" />
                  ) : (
                    <Info className="h-6 w-6 sm:h-8 sm:w-8 text-yellow-600" />
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex flex-col sm:flex-row sm:items-center mb-3 space-y-2 sm:space-y-0">
                    <h3 className="text-lg sm:text-xl font-bold text-gray-900 sm:mr-3">{rec.title}</h3>
                    <div className={`px-2 sm:px-3 py-1 rounded-full text-xs font-semibold animate-bounce inline-block ${
                      rec.type === 'critical' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {rec.type.toUpperCase()}
                    </div>
                  </div>
                  <p className="text-gray-700 mb-4 text-sm sm:text-lg leading-relaxed">{rec.description}</p>
                  
                  <div className="bg-gray-50 rounded-xl p-3 sm:p-4 border border-gray-100">
                    <h4 className="font-semibold text-gray-900 mb-2 sm:mb-3 flex items-center text-sm sm:text-base">
                      <div className="w-4 h-4 sm:w-6 sm:h-6 bg-blue-100 rounded-full flex items-center justify-center mr-2">
                        <div className="w-2 h-2 sm:w-3 sm:h-3 bg-blue-600 rounded-full" />
                      </div>
                      Recommended Actions
                    </h4>
                    <ul className="space-y-2 sm:space-y-3">
                      {rec.actions.map((action, idx) => (
                        <li 
                          key={idx} 
                          className="flex items-start text-gray-700 hover:text-blue-600 transition-colors duration-200 p-2 rounded-lg hover:bg-blue-50 text-xs sm:text-sm"
                        >
                          <div className="relative mr-2 sm:mr-3 mt-0.5 sm:mt-1">
                            <div className="w-4 h-4 sm:w-5 sm:h-5 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                              <span className="text-white text-xs font-bold">{idx + 1}</span>
                            </div>
                          </div>
                          <span className="leading-relaxed">{action}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Legitimate Alternatives */}
        <div className="card mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Verified Internship Opportunities</h2>
          <p className="text-gray-600 mb-6">
            Here are some legitimate internship opportunities similar to what you were looking for:
          </p>
          
          <div className="space-y-4">
            {analysisData.legitimateAlternatives.map((alt, index) => (
              <div 
                key={index} 
                className="border border-gray-200 rounded-xl p-6 hover:border-blue-300 hover:shadow-lg transition-all duration-300 hover:scale-[1.01] transform bg-gradient-to-r from-white to-blue-50"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center mb-3">
                      <h3 className="font-bold text-gray-900 text-lg mr-3">{alt.company}</h3>
                      <div className="flex items-center space-x-2">
                        <div className="flex items-center px-3 py-1 bg-green-100 rounded-full">
                          <CheckCircle className="h-4 w-4 text-green-600 mr-1" />
                          <span className="text-xs font-semibold text-green-800">Verified</span>
                        </div>
                        <div className="px-2 py-1 bg-blue-100 rounded-full animate-pulse">
                          <span className="text-xs font-semibold text-blue-800">Featured</span>
                        </div>
                      </div>
                    </div>
                    <p className="text-gray-900 font-medium text-lg mb-3">{alt.position}</p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                        <MapPin className="h-4 w-4 text-gray-600 mr-2" />
                        <span className="text-sm text-gray-700">{alt.location}</span>
                      </div>
                      <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                        <Clock className="h-4 w-4 text-gray-600 mr-2" />
                        <span className="text-sm text-gray-700">{alt.duration}</span>
                      </div>
                      <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                        <DollarSign className="h-4 w-4 text-gray-600 mr-2" />
                        <span className="text-sm text-gray-700 font-semibold">{alt.stipend}</span>
                      </div>
                    </div>
                  </div>
                  <button className="ml-4 group">
                    <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:bg-blue-700 group-hover:scale-110">
                      <ExternalLink className="h-6 w-6 text-white" />
                    </div>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
          <button 
            onClick={() => navigate('/submit')}
            className="btn-primary flex-1 text-sm sm:text-base py-3 sm:py-4"
          >
            <Shield className="h-4 w-4 mr-2" />
            Scan Another Opportunity
          </button>
          <button 
            onClick={generatePDF}
            className="btn-secondary flex-1 text-sm sm:text-base py-3 sm:py-4"
          >
            <Download className="h-4 w-4 mr-2" />
            Download Full Report
          </button>
        </div>

        {/* Help Section */}
        <div className="mt-6 sm:mt-8 text-center px-4">
          <p className="text-gray-600 mb-3 sm:mb-4 text-sm sm:text-base">
            Need help understanding these results?
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center space-y-2 sm:space-y-0 sm:space-x-4">
            <button className="text-primary-600 hover:text-primary-700 font-medium text-sm sm:text-base py-2 px-4 rounded-lg hover:bg-blue-50 transition-colors">
              Contact Support
            </button>
            <button className="text-primary-600 hover:text-primary-700 font-medium text-sm sm:text-base py-2 px-4 rounded-lg hover:bg-blue-50 transition-colors">
              View FAQ
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AnalysisResult;
