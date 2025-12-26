import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, Upload, Building, Globe, FileText, AlertCircle, CheckCircle } from 'lucide-react';

const SimpleSubmissionForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    companyName: '',
    websiteUrl: '',
    description: '',
    certificateFile: null
  });
  
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value, type, files } = e.target;
    
    if (type === 'file') {
      setFormData(prev => ({
        ...prev,
        [name]: files[0]
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.companyName.trim()) {
      newErrors.companyName = 'Company name is required';
    }
    
    if (!formData.websiteUrl.trim()) {
      newErrors.websiteUrl = 'Website URL is required';
    } else if (!/^https?:\/\/.+\..+/.test(formData.websiteUrl)) {
      newErrors.websiteUrl = 'Please enter a valid URL (e.g., https://example.com)';
    }
    
    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    } else if (formData.description.length < 20) {
      newErrors.description = 'Please provide at least 20 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      setIsSubmitting(true);
      
      // Simulate API call
      setTimeout(() => {
        setIsSubmitting(false);
        // Navigate to results page with form data
        navigate('/results', { 
          state: { 
            submittedData: formData,
            submissionType: 'simple'
          } 
        });
      }, 2000);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center">
            <Shield className="h-8 w-8 text-blue-600 mr-3" />
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Scam Detection Form</h1>
              <p className="text-gray-600">Submit internship or certificate details for verification</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Form */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="card">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Company/Institute Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                     Company / Institute Name <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Building className={`absolute left-3 top-3 h-5 w-5 transition-colors duration-200 ${formData.companyName ? 'text-blue-500' : 'text-gray-400'}`} />
                <input
                  type="text"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleInputChange}
                  className={`input-field pl-10 ${errors.companyName ? 'border-red-500 focus:border-red-500' : ''}`}
                  placeholder="Enter company or institute name"
                />
              </div>
              {errors.companyName && (
                <p className="mt-1 text-sm text-red-600 flex items-center">
                  <AlertCircle className="h-4 w-4 mr-1" />
                  {errors.companyName}
                </p>
              )}
              <p className="mt-1 text-xs text-gray-500">
                The official name of the company or educational institution
              </p>
            </div>

            {/* Website URL */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Website URL <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Globe className={`absolute left-3 top-3 h-5 w-5 transition-colors duration-200 ${formData.websiteUrl ? 'text-blue-500' : 'text-gray-400'}`} />
                <input
                  type="url"
                  name="websiteUrl"
                  value={formData.websiteUrl}
                  onChange={handleInputChange}
                  className={`input-field pl-10 ${errors.websiteUrl ? 'border-red-500 focus:border-red-500' : ''}`}
                  placeholder="https://example.com"
                />
              </div>
              {errors.websiteUrl && (
                <p className="mt-1 text-sm text-red-600 flex items-center">
                  <AlertCircle className="h-4 w-4 mr-1" />
                  {errors.websiteUrl}
                </p>
              )}
              <p className="mt-1 text-xs text-gray-500">
                Official website of the company or institute
              </p>
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Internship / Certificate Description <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <FileText className={`absolute left-3 top-3 h-5 w-5 transition-colors duration-200 ${formData.description ? 'text-blue-500' : 'text-gray-400'}`} />
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={4}
                  className={`input-field pl-10 resize-none ${errors.description ? 'border-red-500 focus:border-red-500' : ''}`}
                  placeholder="Describe the internship position or certificate details..."
                />
              </div>
              {errors.description && (
                <p className="mt-1 text-sm text-red-600 flex items-center">
                  <AlertCircle className="h-4 w-4 mr-1" />
                  {errors.description}
                </p>
              )}
              <p className="mt-1 text-xs text-gray-500">
                Include details like position title, duration, requirements, or certificate content
              </p>
            </div>

            {/* File Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Upload Certificate (Optional)
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors duration-200">
                <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 mb-2">
                  Upload certificate, offer letter, or related documents
                </p>
                <p className="text-xs text-gray-500 mb-4">
                  Supported formats: PDF, JPG, PNG (Max 10MB)
                </p>
                <input
                  type="file"
                  name="certificateFile"
                  onChange={handleInputChange}
                  accept=".pdf,.jpg,.jpeg,.png"
                  className="hidden"
                  id="file-upload"
                />
                <label
                  htmlFor="file-upload"
                  className="cursor-pointer inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Choose File
                </label>
                {formData.certificateFile && (
                  <div className="mt-4">
                    <p className="text-sm text-green-600 font-medium">
                      Selected: {formData.certificateFile.name}
                    </p>
                  </div>
                )}
              </div>
              <p className="mt-1 text-xs text-gray-500">
                Providing documents helps us perform more accurate analysis
              </p>
            </div>

            {/* Privacy Notice */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-start">
                <Shield className="h-5 w-5 text-blue-600 mt-0.5 mr-3 flex-shrink-0" />
                <div>
                  <h4 className="text-sm font-semibold text-blue-900 mb-1">Privacy & Security</h4>
                  <p className="text-sm text-blue-700">
                    Your information is used solely for scam detection purposes. 
                    We do not share your data with third parties without your consent.
                  </p>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-3 px-4 rounded-lg font-medium text-white transition-colors duration-200 ${
                  isSubmitting
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-blue-600 hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
                }`}
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Analyzing...
                  </div>
                ) : (
                  'Submit for Scam Detection'
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Help Section */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="card text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Shield className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">AI Analysis</h3>
            <p className="text-sm text-gray-600">
              Advanced algorithms analyze company legitimacy and document authenticity
            </p>
          </div>
          
          <div className="card text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <CheckCircle className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Quick Results</h3>
            <p className="text-sm text-gray-600">
              Get detailed scam probability assessment within 24 hours
            </p>
          </div>
          
          <div className="card text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <FileText className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Detailed Report</h3>
            <p className="text-sm text-gray-600">
              Comprehensive analysis with risk factors and recommendations
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SimpleSubmissionForm;
