import React, { useState } from 'react';
import { CheckCircle2, ChevronRight, Info } from 'lucide-react';
import AnimatedSectionWrapper from '@/components/ui/AnimatedSectionWrapper';
import PatternBackground from '@/components/ui/PatternBackground';
import { toast } from '@/hooks/use-toast';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import GoogleScriptSetupGuide from '@/components/GoogleScriptSetupGuide';

const Registration: React.FC = () => {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [googleScriptUrl, setGoogleScriptUrl] = useState('');
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
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.agreeTerms) {
      toast({
        title: "Persetujuan Diperlukan",
        description: "Mohon setujui syarat dan ketentuan.",
        variant: "destructive",
      });
      return;
    }

    if (!googleScriptUrl) {
      toast({
        title: "URL Google Script Diperlukan",
        description: "Silakan masukkan URL Google Script untuk menyimpan data.",
        variant: "destructive",
      });
      return;
    }
    
    try {
      setIsSubmitting(true);
      
      // Transform formData into a format suitable for Google Sheets
      const spreadsheetData = {
        timestamp: new Date().toISOString(),
        fullName: `${formData.firstName} ${formData.lastName}`,
        gender: formData.gender,
        dateOfBirth: formData.dateOfBirth,
        placeOfBirth: formData.placeOfBirth || "N/A",
        nationalId: formData.nationalId || "N/A",
        email: formData.email,
        phone: formData.phone,
        address: `${formData.address}, ${formData.city}, ${formData.province}, ${formData.postalCode}`,
        previousSchool: formData.previousSchool,
        graduationYear: formData.graduationYear,
        previousGrade: formData.previousGrade || "N/A",
        program: formData.program === 'islamic-studies' ? 'Program Studi Islam' :
                 formData.program === 'tahfidz' ? 'Program Tahfidz Quran' :
                 formData.program === 'academic-islamic' ? 'Program Terpadu Akademik-Islam' :
                 formData.program === 'leadership' ? 'Program Kepemimpinan Islam' : '',
        parentName: formData.parentName,
        parentRelation: formData.parentRelation,
        parentPhone: formData.parentPhone,
        parentEmail: formData.parentEmail || "N/A",
        parentOccupation: formData.parentOccupation || "N/A",
        healthConditions: formData.healthConditions || "Tidak Ada",
        allergies: formData.allergies || "Tidak Ada",
        medications: formData.medications || "Tidak Ada",
        howDidYouHear: formData.howDidYouHear || "N/A",
        additionalNotes: formData.additionalNotes || "N/A",
      };
      
      // Send data to Google Sheets via Apps Script
      const response = await fetch(googleScriptUrl, {
        method: 'POST',
        mode: 'no-cors', // Important for CORS issues
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(spreadsheetData),
      });
      
      console.log('Form submitted to Google Sheets');
      
      // Show success toast
      toast({
        title: "Pendaftaran Terkirim!",
        description: "Terima kasih atas pendaftaran Anda. Kami akan menghubungi Anda segera.",
      });
      
      // Move to success step
      setStep(6);
      window.scrollTo(0, 0);
    } catch (error) {
      console.error('Error submitting form:', error);
      toast({
        title: "Terjadi Kesalahan",
        description: "Gagal mengirim formulir. Silakan coba lagi nanti.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // Stepper configuration
  const steps = [
    { number: 1, title: 'Informasi Pribadi' },
    { number: 2, title: 'Latar Belakang Pendidikan' },
    { number: 3, title: 'Pilihan Program' },
    { number: 4, title: 'Informasi Wali' },
    { number: 5, title: 'Tinjauan & Kirim' },
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
                Bergabung dengan Komunitas Kami
              </span>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-white mb-4">
                Pendaftaran Santri
              </h1>
              <p className="text-islamic-cream/90 max-w-2xl mx-auto">
                Lengkapi formulir di bawah ini untuk mendaftar di Pondok Pesantren Islam Irsyadulhaq.
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
                    Pendaftaran Berhasil Dikirim!
                  </h2>
                  <p className="text-islamic-slate mb-8">
                    Terima kasih telah mendaftar di Pondok Pesantren Islam Irsyadulhaq. Pendaftaran Anda telah diterima dan akan segera kami tinjau. Anda akan menerima email konfirmasi dengan petunjuk lebih lanjut.
                  </p>
                  <div className="p-4 rounded-lg bg-islamic-teal/10 flex items-start mb-8">
                    <Info size={20} className="text-islamic-teal mt-0.5 mr-3 flex-shrink-0" />
                    <p className="text-sm text-islamic-slate">
                      ID pendaftaran Anda adalah <span className="font-medium">IH-{Math.floor(Math.random() * 900000) + 100000}</span>. Harap simpan nomor ini untuk referensi di masa mendatang. Jika Anda memiliki pertanyaan, silakan hubungi kantor penerimaan kami.
                    </p>
                  </div>
                  <a href="/" className="btn-primary inline-flex items-center space-x-2">
                    <span>Kembali ke Beranda</span>
                    <ChevronRight size={18} />
                  </a>
                </AnimatedSectionWrapper>
              ) : (
                <form onSubmit={handleSubmit} className="glass-card p-8 rounded-lg">
                  {/* Step 1: Personal Information */}
                  {step === 1 && (
                    <AnimatedSectionWrapper animation="fade-in">
                      <h2 className="text-2xl font-display font-bold text-islamic-navy mb-6">
                        Informasi Pribadi
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
                        Latar Belakang Pendidikan
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
                        Pilihan Program
                      </h2>
                      
                      <div className="mb-8">
                        <p className="text-islamic-slate mb-6">
                          Please select the program you wish to apply for. Each program has different requirements and curriculum focus.
                        </p>
                        
                        <div className="space-y-4">
                          {[
                            {
                              value: 'islamic-studies',
                              title: 'Program Studi Islam',
                              description: 'Focus on Islamic knowledge, Quran, Hadith, and Fiqh.',
                            },
                            {
                              value: 'tahfidz',
                              title: 'Program Tahfidz Quran',
                              description: 'Intensive Quran memorization program with supporting Islamic studies.',
                            },
                            {
                              value: 'academic-islamic',
                              title: 'Program Terpadu Akademik-Islam',
                              description: 'Balanced curriculum of academic subjects and Islamic studies.',
                            },
                            {
                              value: 'leadership',
                              title: 'Program Kepemimpinan Islam',
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
                        Informasi Wali
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
                        Informasi Kesehatan
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
                        Tinjauan & Kirim
                      </h2>
                      
                      <div className="mb-8">
                        <p className="text-islamic-slate mb-6">
                          Silakan tinjau informasi Anda sebelum mengirimkan pendaftaran. Anda dapat kembali ke langkah sebelumnya untuk melakukan perubahan jika diperlukan.
                        </p>
                        
                        <div className="space-y-6">
                          {/* Personal Information Review */}
                          <div className="p-4 rounded-lg border border-gray-200">
                            <h3 className="font-medium text-islamic-navy mb-3">Informasi Pribadi</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2 text-sm">
                              <div>
                                <span className="text-islamic-slate">Nama Lengkap:</span>
                                <span className="ml-2 text-islamic-navy">{formData.firstName} {formData.lastName}</span>
                              </div>
                              <div>
                                <span className="text-islamic-slate">Jenis Kelamin:</span>
                                <span className="ml-2 text-islamic-navy">
                                  {formData.gender === 'male' ? 'Laki-laki' : formData.gender === 'female' ? 'Perempuan' : ''}
                                </span>
                              </div>
                              <div>
                                <span className="text-islamic-slate">Tanggal Lahir:</span>
                                <span className="ml-2 text-islamic-navy">{formData.dateOfBirth}</span>
                              </div>
                              <div>
                                <span className="text-islamic-slate">Tempat Lahir:</span>
                                <span className="ml-2 text-islamic-navy">{formData.placeOfBirth || 'N/A'}</span>
                              </div>
                              <div>
                                <span className="text-islamic-slate">Email:</span>
                                <span className="ml-2 text-islamic-navy">{formData.email}</span>
                              </div>
                              <div>
                                <span className="text-islamic-slate">Telepon:</span>
                                <span className="ml-2 text-islamic-navy">{formData.phone}</span>
                              </div>
                              <div className="md:col-span-2">
                                <span className="text-islamic-slate">Alamat:</span>
                                <span className="ml-2 text-islamic-navy">
                                  {formData.address}, {formData.city}, {formData.province}, {formData.postalCode}
                                </span>
                              </div>
                            </div>
                          </div>
                          
                          {/* Educational Background Review */}
                          <div className="p-4 rounded-lg border border-gray-200">
                            <h3 className="font-medium text-islamic-navy mb-3">Latar Belakang Pendidikan</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2 text-sm">
                              <div>
                                <span className="text-islamic-slate">Sekolah Sebelumnya:</span>
                                <span className="ml-2 text-islamic-navy">{formData.previousSchool}</span>
                              </div>
                              <div>
                                <span className="text-islamic-slate">Tahun Kelulusan:</span>
                                <span className="ml-2 text-islamic-navy">{formData.graduationYear}</span>
                              </div>
                              <div>
                                <span className="text-islamic-slate">Nilai/IPK Sebelumnya:</span>
                                <span className="ml-2 text-islamic-navy">{formData.previousGrade || 'N/A'}</span>
                              </div>
                            </div>
                          </div>
                          
                          {/* Program Selection Review */}
                          <div className="p-4 rounded-lg border border-gray-200">
                            <h3 className="font-medium text-islamic-navy mb-3">Pilihan Program</h3>
                            <div className="text-sm">
                              <span className="text-islamic-slate">Program Terpilih:</span>
                              <span className="ml-2 text-islamic-navy">
                                {formData.program === 'islamic-studies' && 'Program Studi Islam'}
                                {formData.program === 'tahfidz' && 'Program Tahfidz Quran'}
                                {formData.program === 'academic-islamic' && 'Program Terpadu Akademik-Islam'}
                                {formData.program === 'leadership' && 'Program Kepemimpinan Islam'}
                              </span>
                            </div>
                          </div>
                          
                          {/* Parent/Guardian Information Review */}
                          <div className="p-4 rounded-lg border border-gray-200">
                            <h3 className="font-medium text-islamic-navy mb-3">Informasi Wali</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2 text-sm">
                              <div>
                                <span className="text-islamic-slate">Nama:</span>
                                <span className="ml-2 text-islamic-navy">{formData.parentName}</span>
                              </div>
                              <div>
                                <span className="text-islamic-slate">Hubungan:</span>
                                <span className="ml-2 text-islamic-navy">
                                  {formData.parentRelation === 'father' ? 'Ayah' : 
                                   formData.parentRelation === 'mother' ? 'Ibu' : 
                                   formData.parentRelation === 'guardian' ? 'Wali' : 
                                   formData.parentRelation === 'other' ? 'Lainnya' : ''}
                                </span>
                              </div>
                              <div>
                                <span className="text-islamic-slate">Telepon:</span>
                                <span className="ml-2 text-islamic-navy">{formData.parentPhone}</span>
                              </div>
                              <div>
                                <span className="text-islamic-slate">Email:</span>
                                <span className="ml-2 text-islamic-navy">{formData.parentEmail || 'N/A'}</span>
                              </div>
                              <div>
                                <span className="text-islamic-slate">Pekerjaan:</span>
                                <span className="ml-2 text-islamic-navy">{formData.parentOccupation || 'N/A'}</span>
                              </div>
                            </div>
                          </div>
                          
                          {/* Health Information Review */}
                          <div className="p-4 rounded-lg border border-gray-200">
                            <h3 className="font-medium text-islamic-navy mb-3">Informasi Kesehatan</h3>
                            <div className="grid grid-cols-1 gap-y-2 text-sm">
                              <div>
                                <span className="text-islamic-slate">Kondisi Kesehatan:</span>
                                <span className="ml-2 text-islamic-navy">{formData.healthConditions || 'Tidak Ada'}</span>
                              </div>
                              <div>
                                <span className="text-islamic-slate">Alergi:</span>
                                <span className="ml-2 text-islamic-navy">{formData.allergies || 'Tidak Ada'}</span>
                              </div>
                              <div>
                                <span className="text-islamic-slate">Obat-obatan:</span>
                                <span className="ml-2 text-islamic-navy">{formData.medications || 'Tidak Ada'}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Google Script URL Input */}
                      <div className="mb-6">
                        <div className="form-input-wrapper">
                          <label htmlFor="googleScriptUrl" className="form-label">URL Google Script *</label>
                          <input
                            type="text"
                            id="googleScriptUrl"
                            value={googleScriptUrl}
                            onChange={(e) => setGoogleScriptUrl(e.target.value)}
                            className="form-input"
                            placeholder="Masukkan URL Google Script untuk menyimpan data"
                            required
                          />
                          <p className="text-xs text-islamic-slate mt-1">
                            Masukkan URL Google Script yang telah Anda buat untuk menerima data pendaftaran.
                          </p>
                        </div>
                        
                        {/* Add Google Script Setup Guide */}
                        <GoogleScriptSetupGuide />
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
                            Saya menyatakan bahwa semua informasi yang diberikan adalah akurat dan lengkap. Saya menyetujui <a href="#" className="text-islamic-teal hover:underline">syarat dan ketentuan</a> serta <a href="#" className="text-islamic-teal hover:underline">kebijakan privasi</a> Pondok Pesantren Islam Irsyadulhaq.
                          </label>
                        </div>
                      </div>
                      
                      <div className="flex justify-between">
                        <button
                          type="button"
                          onClick={prevStep}
                          className="btn-outline"
                        >
                          Langkah Sebelumnya
                        </button>
                        <button
                          type="submit"
                          className="btn-primary flex items-center space-x-2"
                          disabled={isSubmitting}
                        >
                          {isSubmitting ? (
                            <>
                              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                              <span>Mengirim...</span>
                            </>
                          ) : (
                            <span>Kirim Pendaftaran</span>
                          )}
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
