import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Shield, 
  Upload, 
  FileText, 
  Building, 
  Mail, 
  Phone, 
  Globe, 
  MapPin, 
  Calendar, 
  DollarSign, 
  Clock, 
  AlertCircle, 
  CheckCircle,
  ArrowRight,
  ArrowLeft
} from 'lucide-react';

const SubmissionForm = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [submissionType, setSubmissionType] = useState('');
  const [formData, setFormData] = useState({
    // Company Information
    companyName: '',
    companyWebsite: '',
    companyEmail: '',
    companyPhone: '',
    companyAddress: '',
    
    // Internship Details
    positionTitle: '',
    department: '',
    duration: '',
    startDate: '',
    endDate: '',
    stipend: '',
    workMode: '',
    
    // Certificate Details
    certificateName: '',
    issuingOrganization: '',
    certificateId: '',
    issueDate: '',
    expiryDate: '',
    
    // Contact Person
    contactName: '',
    contactEmail: '',
    contactPhone: '',
    
    // Additional Info
    jobDescription: '',
    requirements: '',
    benefits: '',
    applicationLink: '',
    
    // Files
    offerLetter: null,
    certificateFile: null,
    additionalDocs: []
  });
  
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value, type, files } = e.target;
    
    if (type === 'file') {
      if (name === 'additionalDocs') {
        setFormData(prev => ({
          ...prev,
          [name]: Array.from(files)
        }));
      } else {
        setFormData(prev => ({
          ...prev,
          [name]: files[0]
        }));
      }
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

  const validateStep = (currentStep) => {
    const newErrors = {};
    
    if (currentStep === 1) {
      if (!submissionType) {
        newErrors.submissionType = 'Please select a submission type';
      }
    }
    
    if (currentStep === 2) {
      if (!formData.companyName) newErrors.companyName = 'Company name is required';
      if (!formData.companyWebsite) newErrors.companyWebsite = 'Company website is required';
      if (!formData.companyEmail) {
        newErrors.companyEmail = 'Company email is required';
      } else if (!/\S+@\S+\.\S+/.test(formData.companyEmail)) {
        newErrors.companyEmail = 'Email is invalid';
      }
    }
    
    if (currentStep === 3) {
      if (submissionType === 'internship') {
        if (!formData.positionTitle) newErrors.positionTitle = 'Position title is required';
        if (!formData.duration) newErrors.duration = 'Duration is required';
        if (!formData.startDate) newErrors.startDate = 'Start date is required';
        if (!formData.workMode) newErrors.workMode = 'Work mode is required';
      } else {
        if (!formData.certificateName) newErrors.certificateName = 'Certificate name is required';
        if (!formData.issuingOrganization) newErrors.issuingOrganization = 'Issuing organization is required';
        if (!formData.certificateId) newErrors.certificateId = 'Certificate ID is required';
        if (!formData.issueDate) newErrors.issueDate = 'Issue date is required';
      }
    }
    
    if (currentStep === 4) {
      if (!formData.contactName) newErrors.contactName = 'Contact name is required';
      if (!formData.contactEmail) {
        newErrors.contactEmail = 'Contact email is required';
      } else if (!/\S+@\S+\.\S+/.test(formData.contactEmail)) {
        newErrors.contactEmail = 'Email is invalid';
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(step)) {
      setStep(step + 1);
    }
  };

  const handlePrevious = () => {
    setStep(step - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateStep(step)) {
      setIsSubmitting(true);
      // Simulate API call
      setTimeout(() => {
        setIsSubmitting(false);
        // Navigate to results page with form data
        navigate('/results', { 
          state: { 
            submittedData: formData,
            submissionType: submissionType
          } 
        });
      }, 2000);
    }
  };

  const renderStepContent = () => {
    switch(step) {
      case 1:
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">What would you like to scan?</h2>
              <p className="text-gray-600 mb-6">Select the type of document you want to verify</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <button
                onClick={() => setSubmissionType('internship')}
                className={`p-6 rounded-xl border-2 transition-all duration-200 ${
                  submissionType === 'internship' 
                    ? 'border-primary-500 bg-primary-50' 
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <Building className="h-12 w-12 text-primary-600 mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Internship Offer</h3>
                <p className="text-gray-600 text-sm">Verify the authenticity of an internship opportunity</p>
              </button>
              
              <button
                onClick={() => setSubmissionType('certificate')}
                className={`p-6 rounded-xl border-2 transition-all duration-200 ${
                  submissionType === 'certificate' 
                    ? 'border-primary-500 bg-primary-50' 
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <FileText className="h-12 w-12 text-primary-600 mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Certificate</h3>
                <p className="text-gray-600 text-sm">Check if a certificate is legitimate and recognized</p>
              </button>
            </div>
            
            {errors.submissionType && (
              <p className="text-sm text-danger-600 flex items-center">
                <AlertCircle className="h-4 w-4 mr-1" />
                {errors.submissionType}
              </p>
            )}
          </div>
        );
        
      case 2:
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Company Information</h2>
              <p className="text-gray-600">Provide details about the company or organization</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Company Name *
                </label>
                <div className="relative">
                  <Building className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleInputChange}
                    className={`input-field pl-10 ${errors.companyName ? 'border-danger-500' : ''}`}
                    placeholder="Enter company name"
                  />
                </div>
                {errors.companyName && (
                  <p className="mt-1 text-sm text-danger-600 flex items-center">
                    <AlertCircle className="h-4 w-4 mr-1" />
                    {errors.companyName}
                  </p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Company Website *
                </label>
                <div className="relative">
                  <Globe className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <input
                    type="url"
                    name="companyWebsite"
                    value={formData.companyWebsite}
                    onChange={handleInputChange}
                    className={`input-field pl-10 ${errors.companyWebsite ? 'border-danger-500' : ''}`}
                    placeholder="https://example.com"
                  />
                </div>
                {errors.companyWebsite && (
                  <p className="mt-1 text-sm text-danger-600 flex items-center">
                    <AlertCircle className="h-4 w-4 mr-1" />
                    {errors.companyWebsite}
                  </p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Company Email *
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <input
                    type="email"
                    name="companyEmail"
                    value={formData.companyEmail}
                    onChange={handleInputChange}
                    className={`input-field pl-10 ${errors.companyEmail ? 'border-danger-500' : ''}`}
                    placeholder="company@example.com"
                  />
                </div>
                {errors.companyEmail && (
                  <p className="mt-1 text-sm text-danger-600 flex items-center">
                    <AlertCircle className="h-4 w-4 mr-1" />
                    {errors.companyEmail}
                  </p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Company Phone
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <input
                    type="tel"
                    name="companyPhone"
                    value={formData.companyPhone}
                    onChange={handleInputChange}
                    className="input-field pl-10"
                    placeholder="+1 (555) 123-4567"
                  />
                </div>
              </div>
              
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Company Address
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    name="companyAddress"
                    value={formData.companyAddress}
                    onChange={handleInputChange}
                    className="input-field pl-10"
                    placeholder="123 Business St, City, State 12345"
                  />
                </div>
              </div>
            </div>
          </div>
        );
        
      case 3:
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                {submissionType === 'internship' ? 'Internship Details' : 'Certificate Details'}
              </h2>
              <p className="text-gray-600">
                {submissionType === 'internship' 
                  ? 'Provide information about the internship position'
                  : 'Provide information about the certificate'
                }
              </p>
            </div>
            
            {submissionType === 'internship' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Position Title *
                  </label>
                  <input
                    type="text"
                    name="positionTitle"
                    value={formData.positionTitle}
                    onChange={handleInputChange}
                    className={`input-field ${errors.positionTitle ? 'border-danger-500' : ''}`}
                    placeholder="e.g., Frontend Developer Intern"
                  />
                  {errors.positionTitle && (
                    <p className="mt-1 text-sm text-danger-600 flex items-center">
                      <AlertCircle className="h-4 w-4 mr-1" />
                      {errors.positionTitle}
                    </p>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Department
                  </label>
                  <input
                    type="text"
                    name="department"
                    value={formData.department}
                    onChange={handleInputChange}
                    className="input-field"
                    placeholder="e.g., Engineering, Marketing"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Duration *
                  </label>
                  <select
                    name="duration"
                    value={formData.duration}
                    onChange={handleInputChange}
                    className={`input-field ${errors.duration ? 'border-danger-500' : ''}`}
                  >
                    <option value="">Select duration</option>
                    <option value="1-3 months">1-3 months</option>
                    <option value="3-6 months">3-6 months</option>
                    <option value="6-12 months">6-12 months</option>
                    <option value="12+ months">12+ months</option>
                  </select>
                  {errors.duration && (
                    <p className="mt-1 text-sm text-danger-600 flex items-center">
                      <AlertCircle className="h-4 w-4 mr-1" />
                      {errors.duration}
                    </p>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Work Mode *
                  </label>
                  <select
                    name="workMode"
                    value={formData.workMode}
                    onChange={handleInputChange}
                    className={`input-field ${errors.workMode ? 'border-danger-500' : ''}`}
                  >
                    <option value="">Select work mode</option>
                    <option value="onsite">On-site</option>
                    <option value="remote">Remote</option>
                    <option value="hybrid">Hybrid</option>
                  </select>
                  {errors.workMode && (
                    <p className="mt-1 text-sm text-danger-600 flex items-center">
                      <AlertCircle className="h-4 w-4 mr-1" />
                      {errors.workMode}
                    </p>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Start Date *
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <input
                      type="date"
                      name="startDate"
                      value={formData.startDate}
                      onChange={handleInputChange}
                      className={`input-field pl-10 ${errors.startDate ? 'border-danger-500' : ''}`}
                    />
                  </div>
                  {errors.startDate && (
                    <p className="mt-1 text-sm text-danger-600 flex items-center">
                      <AlertCircle className="h-4 w-4 mr-1" />
                      {errors.startDate}
                    </p>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    End Date
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <input
                      type="date"
                      name="endDate"
                      value={formData.endDate}
                      onChange={handleInputChange}
                      className="input-field pl-10"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Stipend/Salary
                  </label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <input
                      type="text"
                      name="stipend"
                      value={formData.stipend}
                      onChange={handleInputChange}
                      className="input-field pl-10"
                      placeholder="e.g., $1000/month, Unpaid"
                    />
                  </div>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Certificate Name *
                  </label>
                  <input
                    type="text"
                    name="certificateName"
                    value={formData.certificateName}
                    onChange={handleInputChange}
                    className={`input-field ${errors.certificateName ? 'border-danger-500' : ''}`}
                    placeholder="e.g., Web Development Certificate"
                  />
                  {errors.certificateName && (
                    <p className="mt-1 text-sm text-danger-600 flex items-center">
                      <AlertCircle className="h-4 w-4 mr-1" />
                      {errors.certificateName}
                    </p>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Issuing Organization *
                  </label>
                  <input
                    type="text"
                    name="issuingOrganization"
                    value={formData.issuingOrganization}
                    onChange={handleInputChange}
                    className={`input-field ${errors.issuingOrganization ? 'border-danger-500' : ''}`}
                    placeholder="e.g., Digital Academy"
                  />
                  {errors.issuingOrganization && (
                    <p className="mt-1 text-sm text-danger-600 flex items-center">
                      <AlertCircle className="h-4 w-4 mr-1" />
                      {errors.issuingOrganization}
                    </p>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Certificate ID *
                  </label>
                  <input
                    type="text"
                    name="certificateId"
                    value={formData.certificateId}
                    onChange={handleInputChange}
                    className={`input-field ${errors.certificateId ? 'border-danger-500' : ''}`}
                    placeholder="e.g., CERT-2024-12345"
                  />
                  {errors.certificateId && (
                    <p className="mt-1 text-sm text-danger-600 flex items-center">
                      <AlertCircle className="h-4 w-4 mr-1" />
                      {errors.certificateId}
                    </p>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Issue Date *
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <input
                      type="date"
                      name="issueDate"
                      value={formData.issueDate}
                      onChange={handleInputChange}
                      className={`input-field pl-10 ${errors.issueDate ? 'border-danger-500' : ''}`}
                    />
                  </div>
                  {errors.issueDate && (
                    <p className="mt-1 text-sm text-danger-600 flex items-center">
                      <AlertCircle className="h-4 w-4 mr-1" />
                      {errors.issueDate}
                    </p>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Expiry Date
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <input
                      type="date"
                      name="expiryDate"
                      value={formData.expiryDate}
                      onChange={handleInputChange}
                      className="input-field pl-10"
                    />
                  </div>
                </div>
              </div>
            )}
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {submissionType === 'internship' ? 'Job Description' : 'Certificate Description'}
              </label>
              <textarea
                name={submissionType === 'internship' ? 'jobDescription' : 'requirements'}
                value={submissionType === 'internship' ? formData.jobDescription : formData.requirements}
                onChange={handleInputChange}
                rows={4}
                className="input-field"
                placeholder={
                  submissionType === 'internship'
                    ? 'Describe the role, responsibilities, and requirements...'
                    : 'Describe what the certificate covers and the skills learned...'
                }
              />
            </div>
          </div>
        );
        
      case 4:
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Contact Person</h2>
              <p className="text-gray-600">Information about the person who contacted you</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Contact Name *
                </label>
                <input
                  type="text"
                  name="contactName"
                  value={formData.contactName}
                  onChange={handleInputChange}
                  className={`input-field ${errors.contactName ? 'border-danger-500' : ''}`}
                  placeholder="John Doe"
                />
                {errors.contactName && (
                  <p className="mt-1 text-sm text-danger-600 flex items-center">
                    <AlertCircle className="h-4 w-4 mr-1" />
                    {errors.contactName}
                  </p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Contact Email *
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <input
                    type="email"
                    name="contactEmail"
                    value={formData.contactEmail}
                    onChange={handleInputChange}
                    className={`input-field pl-10 ${errors.contactEmail ? 'border-danger-500' : ''}`}
                    placeholder="john@example.com"
                  />
                </div>
                {errors.contactEmail && (
                  <p className="mt-1 text-sm text-danger-600 flex items-center">
                    <AlertCircle className="h-4 w-4 mr-1" />
                    {errors.contactEmail}
                  </p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Contact Phone
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <input
                    type="tel"
                    name="contactPhone"
                    value={formData.contactPhone}
                    onChange={handleInputChange}
                    className="input-field pl-10"
                    placeholder="+1 (555) 123-4567"
                  />
                </div>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Application Link (if applicable)
              </label>
              <input
                type="url"
                name="applicationLink"
                value={formData.applicationLink}
                onChange={handleInputChange}
                className="input-field"
                placeholder="https://example.com/apply"
              />
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {submissionType === 'internship' ? 'Offer Letter' : 'Certificate File'}
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors duration-200">
                  <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 mb-2">
                    {submissionType === 'internship' 
                      ? 'Upload the offer letter (PDF, DOC, DOCX)'
                      : 'Upload the certificate file (PDF, JPG, PNG)'
                    }
                  </p>
                  <input
                    type="file"
                    name={submissionType === 'internship' ? 'offerLetter' : 'certificateFile'}
                    onChange={handleInputChange}
                    accept={submissionType === 'internship' ? '.pdf,.doc,.docx' : '.pdf,.jpg,.jpeg,.png'}
                    className="hidden"
                    id="file-upload"
                  />
                  <label
                    htmlFor="file-upload"
                    className="cursor-pointer text-primary-600 hover:text-primary-700 font-medium"
                  >
                    Choose File
                  </label>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Additional Documents (Optional)
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors duration-200">
                  <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 mb-2">Upload any additional documents</p>
                  <input
                    type="file"
                    name="additionalDocs"
                    onChange={handleInputChange}
                    multiple
                    accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                    className="hidden"
                    id="additional-docs"
                  />
                  <label
                    htmlFor="additional-docs"
                    className="cursor-pointer text-primary-600 hover:text-primary-700 font-medium"
                  >
                    Choose Files
                  </label>
                </div>
              </div>
            </div>
            
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-start">
                <Shield className="h-5 w-5 text-blue-600 mt-0.5 mr-3 flex-shrink-0" />
                <div>
                  <h4 className="text-sm font-semibold text-blue-900 mb-1">Privacy Notice</h4>
                  <p className="text-sm text-blue-700">
                    Your information will be used solely for scam detection purposes. 
                    We do not share your data with third parties without your consent.
                  </p>
                </div>
              </div>
            </div>
          </div>
        );
        
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Shield className="h-8 w-8 text-primary-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">ScamGuard</span>
            </div>
            <button className="text-gray-600 hover:text-gray-900">
              Cancel
            </button>
          </div>
        </div>
      </nav>

      {/* Progress Bar */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            {[1, 2, 3, 4].map((stepNum) => (
              <div key={stepNum} className="flex items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    step >= stepNum
                      ? 'bg-primary-600 text-white'
                      : 'bg-gray-200 text-gray-600'
                  }`}
                >
                  {stepNum}
                </div>
                {stepNum < 4 && (
                  <div
                    className={`w-full h-1 mx-2 ${
                      step > stepNum ? 'bg-primary-600' : 'bg-gray-200'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-2">
            <span className="text-xs text-gray-600">Type</span>
            <span className="text-xs text-gray-600">Company</span>
            <span className="text-xs text-gray-600">Details</span>
            <span className="text-xs text-gray-600">Contact</span>
          </div>
        </div>
      </div>

      {/* Form Content */}
      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="card">
          {renderStepContent()}
          
          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
            <button
              onClick={handlePrevious}
              disabled={step === 1}
              className={`flex items-center px-6 py-2 rounded-lg font-medium transition-colors duration-200 ${
                step === 1
                  ? 'text-gray-400 cursor-not-allowed'
                  : 'text-gray-700 hover:text-gray-900'
              }`}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Previous
            </button>
            
            {step < 4 ? (
              <button
                onClick={handleNext}
                className="btn-primary flex items-center"
              >
                Next
                <ArrowRight className="h-4 w-4 ml-2" />
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="btn-primary flex items-center"
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin h-4 w-4 mr-2" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Shield className="h-4 w-4 mr-2" />
                    Analyze for Scams
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default SubmissionForm;
