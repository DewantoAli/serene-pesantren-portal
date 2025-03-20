
import React, { useState } from 'react';
import { CheckCircle2, ChevronRight, Info } from 'lucide-react';
import AnimatedSectionWrapper from '@/components/ui/AnimatedSectionWrapper';
import PatternBackground from '@/components/ui/PatternBackground';
import { toast } from '@/hooks/use-toast';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

const Registration: React.FC = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    // Personal Information
    firstName: '',
    lastName: '',
    gender: '',
    dateOfBirth: '',
    placeOfBirth: '',
    nationalId: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    province: '',
    postalCode: '',
    
    // Educational Background
    previousSchool: '',
    graduationYear: '',
    previousGrade: '',
    
    // Program Selection
    program: '',
    
    // Parent/Guardian Information
    parentName: '',
    parentRelation: '',
    parentPhone: '',
    parentEmail: '',
    parentOccupation: '',
    
    // Health Information
    healthConditions: '',
    allergies: '',
    medications: '',
    
    // Additional Information
    howDidYouHear: '',
    additionalNotes: '',
    
    // Agreement
    agreeTerms: false,
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    });
  };
  
  const nextStep = () => {
    if (validateCurrentStep()) {
      setStep(step + 1);
      window.scrollTo(0, 0);
    }
  };
  
  const prevStep = () => {
    setStep(step - 1);
    window.scrollTo(0, 0);
  };
  
  const validateCurrentStep = () => {
    switch (step) {
      case 1: // Personal Information
        if (!formData.firstName || !formData.lastName || !formData.dateOfBirth || !formData.email || !formData.phone) {
          toast({
            title: "Missing Information",
            description: "Please fill in all required fields.",
            variant: "destructive",
          });
          return false;
        }
        break;
      case 2: // Educational Background
        if (!formData.previousSchool || !formData.graduationYear) {
          toast({
            title: "Missing Information",
            description: "Please fill in all required fields.",
            variant: "destructive",
          });
          return false;
        }
        break;
      case 3: // Program Selection
        if (!formData.program) {
          toast({
            title: "Missing Information",
            description: "Please select a program.",
            variant: "destructive",
          });
          return false;
        }
        break;
      case 4: // Parent/Guardian Information
        if (!formData.parentName || !formData.parentPhone) {
          toast({
            title: "Missing Information",
            description: "Please fill in all required fields.",
            variant: "destructive",
          });
          return false;
        }
        break;
    }
    return true;
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.agreeTerms) {
      toast({
        title: "Agreement Required",
        description: "Please agree to the terms and conditions.",
        variant: "destructive",
      });
      return;
    }
    
    // In a real application, you would submit the form data to a server here
    console.log('Form submitted:', formData);
    
    // Show success toast
    toast({
      title: "Application Submitted!",
      description: "Thank you for your application. We'll contact you soon.",
    });
    
    // Move to success step
    setStep(6);
    window.scrollTo(0, 0);
  };
  
  // Stepper configuration
  const steps = [
    { number: 1, title: 'Personal Information' },
    { number: 2, title: 'Educational Background' },
    { number: 3, title: 'Program Selection' },
    { number: 4, title: 'Parent Information' },
    { number: 5, title: 'Review & Submit' },
  ];
  
  return (
    <>
      <Header />
      <main className="pt-28 pb-20">
        {/* Hero Section */}
        <section className="relative py-16 overflow-hidden">
          <div className="absolute inset-0 hero-gradient -z-10 opacity-90"></div>
          <PatternBackground className="absolute inset-0 -z-10 opacity-30" patternType="dots" patternColor="#ffffff" patternOpacity={0.1} />
          
          <div className="container mx-auto px-4 md:px-6 relative z-10">
            <AnimatedSectionWrapper className="text-center mb-8">
              <span className="inline-block px-4 py-1 mb-4 rounded-full bg-islamic-gold/20 text-islamic-cream text-sm font-medium">
                Join Our Community
              </span>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-white mb-4">
                Student Registration
              </h1>
              <p className="text-islamic-cream/90 max-w-2xl mx-auto">
                Complete the form below to apply for admission to Irsyadulhaq Islamic Boarding School.
              </p>
            </AnimatedSectionWrapper>
          </div>
        </section>
        
        {/* Registration Form */}
        <section className="py-12">
          <div className="container mx-auto px-4 md:px-6">
            {/* Stepper */}
            <div className="mb-12">
              <div className="hidden md:flex justify-between items-center max-w-3xl mx-auto mb-8">
                {steps.map((s) => (
                  <div key={s.number} className="flex flex-col items-center">
                    <div 
                      className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                        step === s.number ? 'bg-islamic-teal text-white' : step > s.number ? 'bg-islamic-teal/20 text-islamic-teal' : 'bg-gray-200 text-gray-400'
                      }`}
                    >
                      {step > s.number ? <CheckCircle2 size={20} /> : s.number}
                    </div>
                    <span 
                      className={`mt-2 text-sm ${
                        step === s.number ? 'text-islamic-teal font-medium' : step > s.number ? 'text-islamic-teal' : 'text-gray-400'
                      }`}
                    >
                      {s.title}
                    </span>
                  </div>
                ))}
              </div>
              
              <div className="md:hidden flex items-center justify-center mb-6">
                <div 
                  className="w-12 h-12 rounded-full flex items-center justify-center bg-islamic-teal text-white"
                >
                  {step}
                </div>
                <span className="ml-3 text-lg font-medium text-islamic-teal">
                  {steps.find(s => s.number === step)?.title}
                </span>
              </div>
              
              <div className="w-full bg-gray-200 h-2 rounded-full max-w-3xl mx-auto">
                <div 
                  className="bg-islamic-teal h-2 rounded-full transition-all duration-500"
                  style={{ width: `${(step / steps.length) * 100}%` }}
                ></div>
              </div>
            </div>
            
            {/* Form Container */}
            <div className="max-w-3xl mx-auto">
              {step === 6 ? (
                <AnimatedSectionWrapper animation="scale-in" className="glass-card p-8 rounded-lg text-center">
                  <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-islamic-teal/20 flex items-center justify-center">
                    <CheckCircle2 size={40} className="text-islamic-teal" />
                  </div>
                  <h2 className="text-2xl font-display font-bold text-islamic-navy mb-4">
                    Application Submitted Successfully!
                  </h2>
                  <p className="text-islamic-slate mb-8">
                    Thank you for applying to Irsyadulhaq Islamic Boarding School. Your application has been received, and we will review it shortly. You will receive a confirmation email with further instructions.
                  </p>
                  <div className="p-4 rounded-lg bg-islamic-teal/10 flex items-start mb-8">
                    <Info size={20} className="text-islamic-teal mt-0.5 mr-3 flex-shrink-0" />
                    <p className="text-sm text-islamic-slate">
                      Your application ID is <span className="font-medium">IH-{Math.floor(Math.random() * 900000) + 100000}</span>. Please save this number for future reference. If you have any questions, please contact our admissions office.
                    </p>
                  </div>
                  <a href="/" className="btn-primary inline-flex items-center space-x-2">
                    <span>Return to Homepage</span>
                    <ChevronRight size={18} />
                  </a>
                </AnimatedSectionWrapper>
              ) : (
                <form onSubmit={handleSubmit} className="glass-card p-8 rounded-lg">
                  {/* Step 1: Personal Information */}
                  {step === 1 && (
                    <AnimatedSectionWrapper animation="fade-in">
                      <h2 className="text-2xl font-display font-bold text-islamic-navy mb-6">
                        Personal Information
                      </h2>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                        <div className="form-input-wrapper">
                          <label htmlFor="firstName" className="form-label">First Name *</label>
                          <input
                            type="text"
                            id="firstName"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                            className="form-input"
                            placeholder="Enter your first name"
                            required
                          />
                        </div>
                        
                        <div className="form-input-wrapper">
                          <label htmlFor="lastName" className="form-label">Last Name *</label>
                          <input
                            type="text"
                            id="lastName"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                            className="form-input"
                            placeholder="Enter your last name"
                            required
                          />
                        </div>
                        
                        <div className="form-input-wrapper">
                          <label htmlFor="gender" className="form-label">Gender *</label>
                          <select
                            id="gender"
                            name="gender"
                            value={formData.gender}
                            onChange={handleChange}
                            className="form-input"
                            required
                          >
                            <option value="">Select gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                          </select>
                        </div>
                        
                        <div className="form-input-wrapper">
                          <label htmlFor="dateOfBirth" className="form-label">Date of Birth *</label>
                          <input
                            type="date"
                            id="dateOfBirth"
                            name="dateOfBirth"
                            value={formData.dateOfBirth}
                            onChange={handleChange}
                            className="form-input"
                            required
                          />
                        </div>
                        
                        <div className="form-input-wrapper">
                          <label htmlFor="placeOfBirth" className="form-label">Place of Birth</label>
                          <input
                            type="text"
                            id="placeOfBirth"
                            name="placeOfBirth"
                            value={formData.placeOfBirth}
                            onChange={handleChange}
                            className="form-input"
                            placeholder="Enter your place of birth"
                          />
                        </div>
                        
                        <div className="form-input-wrapper">
                          <label htmlFor="nationalId" className="form-label">National ID</label>
                          <input
                            type="text"
                            id="nationalId"
                            name="nationalId"
                            value={formData.nationalId}
                            onChange={handleChange}
                            className="form-input"
                            placeholder="Enter your national ID"
                          />
                        </div>
                        
                        <div className="form-input-wrapper">
                          <label htmlFor="email" className="form-label">Email Address *</label>
                          <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="form-input"
                            placeholder="Enter your email address"
                            required
                          />
                        </div>
                        
                        <div className="form-input-wrapper">
                          <label htmlFor="phone" className="form-label">Phone Number *</label>
                          <input
                            type="tel"
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            className="form-input"
                            placeholder="Enter your phone number"
                            required
                          />
                        </div>
                      </div>
                      
                      <h3 className="text-lg font-display font-semibold text-islamic-navy mb-4">
                        Address Information
                      </h3>
                      
                      <div className="grid grid-cols-1 gap-6 mb-8">
                        <div className="form-input-wrapper">
                          <label htmlFor="address" className="form-label">Street Address *</label>
                          <input
                            type="text"
                            id="address"
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            className="form-input"
                            placeholder="Enter your street address"
                            required
                          />
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="form-input-wrapper">
                            <label htmlFor="city" className="form-label">City *</label>
                            <input
                              type="text"
                              id="city"
                              name="city"
                              value={formData.city}
                              onChange={handleChange}
                              className="form-input"
                              placeholder="Enter your city"
                              required
                            />
                          </div>
                          
                          <div className="form-input-wrapper">
                            <label htmlFor="province" className="form-label">Province/State *</label>
                            <input
                              type="text"
                              id="province"
                              name="province"
                              value={formData.province}
                              onChange={handleChange}
                              className="form-input"
                              placeholder="Enter your province/state"
                              required
                            />
                          </div>
                          
                          <div className="form-input-wrapper">
                            <label htmlFor="postalCode" className="form-label">Postal Code *</label>
                            <input
                              type="text"
                              id="postalCode"
                              name="postalCode"
                              value={formData.postalCode}
                              onChange={handleChange}
                              className="form-input"
                              placeholder="Enter your postal code"
                              required
                            />
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex justify-end">
                        <button
                          type="button"
                          onClick={nextStep}
                          className="btn-primary inline-flex items-center space-x-2"
                        >
                          <span>Next Step</span>
                          <ChevronRight size={18} />
                        </button>
                      </div>
                    </AnimatedSectionWrapper>
                  )}
                  
                  {/* Step 2: Educational Background */}
                  {step === 2 && (
                    <AnimatedSectionWrapper animation="fade-in">
                      <h2 className="text-2xl font-display font-bold text-islamic-navy mb-6">
                        Educational Background
                      </h2>
                      
                      <div className="grid grid-cols-1 gap-6 mb-8">
                        <div className="form-input-wrapper">
                          <label htmlFor="previousSchool" className="form-label">Previous School *</label>
                          <input
                            type="text"
                            id="previousSchool"
                            name="previousSchool"
                            value={formData.previousSchool}
                            onChange={handleChange}
                            className="form-input"
                            placeholder="Enter your previous school name"
                            required
                          />
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="form-input-wrapper">
                            <label htmlFor="graduationYear" className="form-label">Graduation Year *</label>
                            <input
                              type="text"
                              id="graduationYear"
                              name="graduationYear"
                              value={formData.graduationYear}
                              onChange={handleChange}
                              className="form-input"
                              placeholder="Enter your graduation year"
                              required
                            />
                          </div>
                          
                          <div className="form-input-wrapper">
                            <label htmlFor="previousGrade" className="form-label">Previous Grade/GPA</label>
                            <input
                              type="text"
                              id="previousGrade"
                              name="previousGrade"
                              value={formData.previousGrade}
                              onChange={handleChange}
                              className="form-input"
                              placeholder="Enter your previous grade or GPA"
                            />
                          </div>
                        </div>
                        
                        <div className="p-4 rounded-lg bg-islamic-teal/10 flex items-start">
                          <Info size={20} className="text-islamic-teal mt-0.5 mr-3 flex-shrink-0" />
                          <p className="text-sm text-islamic-slate">
                            Please be prepared to provide academic transcripts and certificates from your previous school when requested during the admission process.
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex justify-between">
                        <button
                          type="button"
                          onClick={prevStep}
                          className="btn-outline"
                        >
                          Previous Step
                        </button>
                        <button
                          type="button"
                          onClick={nextStep}
                          className="btn-primary inline-flex items-center space-x-2"
                        >
                          <span>Next Step</span>
                          <ChevronRight size={18} />
                        </button>
                      </div>
                    </AnimatedSectionWrapper>
                  )}
                  
                  {/* Step 3: Program Selection */}
                  {step === 3 && (
                    <AnimatedSectionWrapper animation="fade-in">
                      <h2 className="text-2xl font-display font-bold text-islamic-navy mb-6">
                        Program Selection
                      </h2>
                      
                      <div className="mb-8">
                        <p className="text-islamic-slate mb-6">
                          Please select the program you wish to apply for. Each program has different requirements and curriculum focus.
                        </p>
                        
                        <div className="space-y-4">
                          {[
                            {
                              value: 'islamic-studies',
                              title: 'Islamic Studies Program',
                              description: 'Focus on Islamic knowledge, Quran, Hadith, and Fiqh.',
                            },
                            {
                              value: 'tahfidz',
                              title: 'Tahfidz Quran Program',
                              description: 'Intensive Quran memorization program with supporting Islamic studies.',
                            },
                            {
                              value: 'academic-islamic',
                              title: 'Academic-Islamic Integrated Program',
                              description: 'Balanced curriculum of academic subjects and Islamic studies.',
                            },
                            {
                              value: 'leadership',
                              title: 'Islamic Leadership Program',
                              description: 'Focus on developing Islamic leadership skills alongside regular studies.',
                            },
                          ].map((programOption) => (
                            <div 
                              key={programOption.value}
                              className={`p-4 border rounded-lg cursor-pointer transition-all duration-300 ${
                                formData.program === programOption.value 
                                  ? 'border-islamic-teal bg-islamic-teal/5' 
                                  : 'border-gray-200 hover:border-islamic-teal/50'
                              }`}
                              onClick={() => setFormData({ ...formData, program: programOption.value })}
                            >
                              <div className="flex items-start">
                                <div 
                                  className={`w-5 h-5 rounded-full border flex-shrink-0 mt-0.5 mr-3 flex items-center justify-center ${
                                    formData.program === programOption.value 
                                      ? 'border-islamic-teal' 
                                      : 'border-gray-300'
                                  }`}
                                >
                                  {formData.program === programOption.value && (
                                    <div className="w-3 h-3 rounded-full bg-islamic-teal"></div>
                                  )}
                                </div>
                                <div>
                                  <h3 className="font-medium text-islamic-navy">
                                    {programOption.title}
                                  </h3>
                                  <p className="text-sm text-islamic-slate mt-1">
                                    {programOption.description}
                                  </p>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div className="flex justify-between">
                        <button
                          type="button"
                          onClick={prevStep}
                          className="btn-outline"
                        >
                          Previous Step
                        </button>
                        <button
                          type="button"
                          onClick={nextStep}
                          className="btn-primary inline-flex items-center space-x-2"
                        >
                          <span>Next Step</span>
                          <ChevronRight size={18} />
                        </button>
                      </div>
                    </AnimatedSectionWrapper>
                  )}
                  
                  {/* Step 4: Parent/Guardian Information */}
                  {step === 4 && (
                    <AnimatedSectionWrapper animation="fade-in">
                      <h2 className="text-2xl font-display font-bold text-islamic-navy mb-6">
                        Parent/Guardian Information
                      </h2>
                      
                      <div className="grid grid-cols-1 gap-6 mb-8">
                        <div className="form-input-wrapper">
                          <label htmlFor="parentName" className="form-label">Parent/Guardian Name *</label>
                          <input
                            type="text"
                            id="parentName"
                            name="parentName"
                            value={formData.parentName}
                            onChange={handleChange}
                            className="form-input"
                            placeholder="Enter parent/guardian full name"
                            required
                          />
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="form-input-wrapper">
                            <label htmlFor="parentRelation" className="form-label">Relationship to Student *</label>
                            <select
                              id="parentRelation"
                              name="parentRelation"
                              value={formData.parentRelation}
                              onChange={handleChange}
                              className="form-input"
                              required
                            >
                              <option value="">Select relationship</option>
                              <option value="father">Father</option>
                              <option value="mother">Mother</option>
                              <option value="guardian">Legal Guardian</option>
                              <option value="other">Other</option>
                            </select>
                          </div>
                          
                          <div className="form-input-wrapper">
                            <label htmlFor="parentPhone" className="form-label">Phone Number *</label>
                            <input
                              type="tel"
                              id="parentPhone"
                              name="parentPhone"
                              value={formData.parentPhone}
                              onChange={handleChange}
                              className="form-input"
                              placeholder="Enter parent/guardian phone number"
                              required
                            />
                          </div>
                          
                          <div className="form-input-wrapper">
                            <label htmlFor="parentEmail" className="form-label">Email Address</label>
                            <input
                              type="email"
                              id="parentEmail"
                              name="parentEmail"
                              value={formData.parentEmail}
                              onChange={handleChange}
                              className="form-input"
                              placeholder="Enter parent/guardian email address"
                            />
                          </div>
                          
                          <div className="form-input-wrapper">
                            <label htmlFor="parentOccupation" className="form-label">Occupation</label>
                            <input
                              type="text"
                              id="parentOccupation"
                              name="parentOccupation"
                              value={formData.parentOccupation}
                              onChange={handleChange}
                              className="form-input"
                              placeholder="Enter parent/guardian occupation"
                            />
                          </div>
                        </div>
                      </div>
                      
                      <h3 className="text-lg font-display font-semibold text-islamic-navy mb-4">
                        Health Information
                      </h3>
                      
                      <div className="grid grid-cols-1 gap-6 mb-8">
                        <div className="form-input-wrapper">
                          <label htmlFor="healthConditions" className="form-label">Health Conditions</label>
                          <textarea
                            id="healthConditions"
                            name="healthConditions"
                            value={formData.healthConditions}
                            onChange={handleChange}
                            className="form-input"
                            placeholder="List any health conditions we should be aware of"
                            rows={3}
                          ></textarea>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="form-input-wrapper">
                            <label htmlFor="allergies" className="form-label">Allergies</label>
                            <input
                              type="text"
                              id="allergies"
                              name="allergies"
                              value={formData.allergies}
                              onChange={handleChange}
                              className="form-input"
                              placeholder="List any allergies"
                            />
                          </div>
                          
                          <div className="form-input-wrapper">
                            <label htmlFor="medications" className="form-label">Current Medications</label>
                            <input
                              type="text"
                              id="medications"
                              name="medications"
                              value={formData.medications}
                              onChange={handleChange}
                              className="form-input"
                              placeholder="List any medications you are taking"
                            />
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex justify-between">
                        <button
                          type="button"
                          onClick={prevStep}
                          className="btn-outline"
                        >
                          Previous Step
                        </button>
                        <button
                          type="button"
                          onClick={nextStep}
                          className="btn-primary inline-flex items-center space-x-2"
                        >
                          <span>Next Step</span>
                          <ChevronRight size={18} />
                        </button>
                      </div>
                    </AnimatedSectionWrapper>
                  )}
                  
                  {/* Step 5: Review & Submit */}
                  {step === 5 && (
                    <AnimatedSectionWrapper animation="fade-in">
                      <h2 className="text-2xl font-display font-bold text-islamic-navy mb-6">
                        Review & Submit
                      </h2>
                      
                      <div className="mb-8">
                        <p className="text-islamic-slate mb-6">
                          Please review your information before submitting your application. You can go back to previous steps to make changes if needed.
                        </p>
                        
                        <div className="space-y-6">
                          {/* Personal Information Review */}
                          <div className="p-4 rounded-lg border border-gray-200">
                            <h3 className="font-medium text-islamic-navy mb-3">Personal Information</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2 text-sm">
                              <div>
                                <span className="text-islamic-slate">Full Name:</span>
                                <span className="ml-2 text-islamic-navy">{formData.firstName} {formData.lastName}</span>
                              </div>
                              <div>
                                <span className="text-islamic-slate">Gender:</span>
                                <span className="ml-2 text-islamic-navy">{formData.gender}</span>
                              </div>
                              <div>
                                <span className="text-islamic-slate">Date of Birth:</span>
                                <span className="ml-2 text-islamic-navy">{formData.dateOfBirth}</span>
                              </div>
                              <div>
                                <span className="text-islamic-slate">Place of Birth:</span>
                                <span className="ml-2 text-islamic-navy">{formData.placeOfBirth || 'N/A'}</span>
                              </div>
                              <div>
                                <span className="text-islamic-slate">Email:</span>
                                <span className="ml-2 text-islamic-navy">{formData.email}</span>
                              </div>
                              <div>
                                <span className="text-islamic-slate">Phone:</span>
                                <span className="ml-2 text-islamic-navy">{formData.phone}</span>
                              </div>
                              <div className="md:col-span-2">
                                <span className="text-islamic-slate">Address:</span>
                                <span className="ml-2 text-islamic-navy">
                                  {formData.address}, {formData.city}, {formData.province}, {formData.postalCode}
                                </span>
                              </div>
                            </div>
                          </div>
                          
                          {/* Educational Background Review */}
                          <div className="p-4 rounded-lg border border-gray-200">
                            <h3 className="font-medium text-islamic-navy mb-3">Educational Background</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2 text-sm">
                              <div>
                                <span className="text-islamic-slate">Previous School:</span>
                                <span className="ml-2 text-islamic-navy">{formData.previousSchool}</span>
                              </div>
                              <div>
                                <span className="text-islamic-slate">Graduation Year:</span>
                                <span className="ml-2 text-islamic-navy">{formData.graduationYear}</span>
                              </div>
                              <div>
                                <span className="text-islamic-slate">Previous Grade/GPA:</span>
                                <span className="ml-2 text-islamic-navy">{formData.previousGrade || 'N/A'}</span>
                              </div>
                            </div>
                          </div>
                          
                          {/* Program Selection Review */}
                          <div className="p-4 rounded-lg border border-gray-200">
                            <h3 className="font-medium text-islamic-navy mb-3">Program Selection</h3>
                            <div className="text-sm">
                              <span className="text-islamic-slate">Selected Program:</span>
                              <span className="ml-2 text-islamic-navy">
                                {formData.program === 'islamic-studies' && 'Islamic Studies Program'}
                                {formData.program === 'tahfidz' && 'Tahfidz Quran Program'}
                                {formData.program === 'academic-islamic' && 'Academic-Islamic Integrated Program'}
                                {formData.program === 'leadership' && 'Islamic Leadership Program'}
                              </span>
                            </div>
                          </div>
                          
                          {/* Parent/Guardian Information Review */}
                          <div className="p-4 rounded-lg border border-gray-200">
                            <h3 className="font-medium text-islamic-navy mb-3">Parent/Guardian Information</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2 text-sm">
                              <div>
                                <span className="text-islamic-slate">Name:</span>
                                <span className="ml-2 text-islamic-navy">{formData.parentName}</span>
                              </div>
                              <div>
                                <span className="text-islamic-slate">Relationship:</span>
                                <span className="ml-2 text-islamic-navy">{formData.parentRelation}</span>
                              </div>
                              <div>
                                <span className="text-islamic-slate">Phone:</span>
                                <span className="ml-2 text-islamic-navy">{formData.parentPhone}</span>
                              </div>
                              <div>
                                <span className="text-islamic-slate">Email:</span>
                                <span className="ml-2 text-islamic-navy">{formData.parentEmail || 'N/A'}</span>
                              </div>
                              <div>
                                <span className="text-islamic-slate">Occupation:</span>
                                <span className="ml-2 text-islamic-navy">{formData.parentOccupation || 'N/A'}</span>
                              </div>
                            </div>
                          </div>
                          
                          {/* Health Information Review */}
                          <div className="p-4 rounded-lg border border-gray-200">
                            <h3 className="font-medium text-islamic-navy mb-3">Health Information</h3>
                            <div className="grid grid-cols-1 gap-y-2 text-sm">
                              <div>
                                <span className="text-islamic-slate">Health Conditions:</span>
                                <span className="ml-2 text-islamic-navy">{formData.healthConditions || 'None'}</span>
                              </div>
                              <div>
                                <span className="text-islamic-slate">Allergies:</span>
                                <span className="ml-2 text-islamic-navy">{formData.allergies || 'None'}</span>
                              </div>
                              <div>
                                <span className="text-islamic-slate">Medications:</span>
                                <span className="ml-2 text-islamic-navy">{formData.medications || 'None'}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Agreement */}
                      <div className="mb-8">
                        <div className="flex items-start space-x-3 mb-4">
                          <div className="flex h-6 items-center">
                            <input
                              id="agreeTerms"
                              name="agreeTerms"
                              type="checkbox"
                              checked={formData.agreeTerms}
                              onChange={(e) => setFormData({ ...formData, agreeTerms: e.target.checked })}
                              className="h-4 w-4 rounded border-gray-300 text-islamic-teal focus:ring-islamic-teal/30"
                            />
                          </div>
                          <label htmlFor="agreeTerms" className="text-sm text-islamic-slate">
                            I confirm that all the information provided is accurate and complete. I agree to the <a href="#" className="text-islamic-teal hover:underline">terms and conditions</a> and <a href="#" className="text-islamic-teal hover:underline">privacy policy</a> of Irsyadulhaq Islamic Boarding School.
                          </label>
                        </div>
                      </div>
                      
                      <div className="flex justify-between">
                        <button
                          type="button"
                          onClick={prevStep}
                          className="btn-outline"
                        >
                          Previous Step
                        </button>
                        <button
                          type="submit"
                          className="btn-primary"
                        >
                          Submit Application
                        </button>
                      </div>
                    </AnimatedSectionWrapper>
                  )}
                </form>
              )}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Registration;
