import React, { useState } from 'react';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from '@/hooks/use-toast';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { FormProvider, useFormContext } from '@/contexts/FormContext';
import { Form } from "@/components/ui/form";
import { formSchema, FormValues } from '@/schemas/registrationSchema';
import { submitToGoogleSheet } from '@/utils/googleSheetService';

// Import components
import RegistrationHeader from '@/components/registration/RegistrationHeader';
import StepsIndicator from '@/components/registration/StepsIndicator';
import PersonalInfoStep from '@/components/registration/PersonalInfoStep';
import EducationStep from '@/components/registration/EducationStep';
import ProgramStep from '@/components/registration/ProgramStep';
import FamilyInfoStep from '@/components/registration/FamilyInfoStep';
import ReviewStep from '@/components/registration/ReviewStep';
import SuccessStep from '@/components/registration/SuccessStep';

const RegistrationForm: React.FC = () => {
  const { form, step, setForm, setIsSubmitting, setStep } = useFormContext();
  
  const onSubmit = async (data: FormValues) => {
    if (!data.agreeTerms) {
      toast({
        title: "Persetujuan Diperlukan",
        description: "Mohon setujui syarat dan ketentuan.",
        variant: "destructive",
      });
      return;
    }
    
    try {
      setIsSubmitting(true);
      await submitToGoogleSheet(data);
      
      toast({
        title: "Pendaftaran Terkirim!",
        description: "Terima kasih atas pendaftaran Anda. Kami akan menghubungi Anda segera.",
      });
      
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
  
  return (
    <div className="max-w-3xl mx-auto">
      {step === 6 ? (
        <SuccessStep />
      ) : (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="glass-card p-8 rounded-lg">
            {step === 1 && <PersonalInfoStep />}
            {step === 2 && <EducationStep />}
            {step === 3 && <ProgramStep />}
            {step === 4 && <FamilyInfoStep />}
            {step === 5 && <ReviewStep />}
          </form>
        </Form>
      )}
    </div>
  );
};

const Registration: React.FC = () => {
  const [initialStep] = useState(1);
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      gender: undefined,
      dateOfBirth: undefined,
      placeOfBirth: "",
      email: "",
      phone: "",
      nisn: "",
      nik: "",
      address: "",
      district: "",
      city: "",
      province: "",
      postalCode: "",
      previousSchool: "",
      schoolAddress: "",
      schoolDistrict: "",
      schoolCity: "",
      schoolProvince: "",
      graduationYear: "",
      program: undefined,
      familyCardNumber: "",
      fatherName: "",
      fatherStatus: undefined,
      fatherNik: "",
      fatherOccupation: "",
      motherName: "",
      motherStatus: undefined,
      motherNik: "",
      motherEducation: "",
      parentsIncome: undefined,
      healthConditions: "",
      allergies: "",
      medications: "",
      howDidYouHear: "",
      additionalNotes: "",
      agreeTerms: false,
    },
  });
  
  return (
    <>
      <Header />
      <main className="pt-28 pb-20">
        <RegistrationHeader />
        
        <section className="py-12">
          <div className="container mx-auto px-4 md:px-6">
            <FormProvider initialStep={initialStep}>
              <StepsIndicator />
              <RegistrationForm />
            </FormProvider>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Registration;
