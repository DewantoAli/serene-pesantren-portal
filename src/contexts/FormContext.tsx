
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { z } from 'zod';
import { formSchema } from '@/schemas/registrationSchema';

type FormValues = z.infer<typeof formSchema>;

interface FormContextType {
  form: UseFormReturn<FormValues> | null;
  setForm: (form: UseFormReturn<FormValues>) => void;
  step: number;
  setStep: (step: number) => void;
  isSubmitting: boolean;
  setIsSubmitting: (isSubmitting: boolean) => void;
  nextStep: () => void;
  prevStep: () => void;
  fieldsByStep: {
    [key: number]: readonly string[];
  };
}

const FormContext = createContext<FormContextType | undefined>(undefined);

export const FormProvider: React.FC<{
  children: ReactNode;
  initialStep?: number;
}> = ({ children, initialStep = 1 }) => {
  const [form, setForm] = useState<UseFormReturn<FormValues> | null>(null);
  const [step, setStep] = useState(initialStep);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fieldsByStep = {
    1: ['fullName', 'gender', 'dateOfBirth', 'placeOfBirth', 'email', 'phone', 'nisn', 'nik', 'address', 'district', 'city', 'province', 'postalCode'] as const,
    2: ['previousSchool', 'schoolAddress', 'schoolDistrict', 'schoolCity', 'schoolProvince', 'graduationYear'] as const,
    3: ['program'] as const,
    4: ['familyCardNumber', 'fatherName', 'fatherStatus', 'fatherNik', 'fatherOccupation', 'motherName', 'motherStatus', 'motherNik', 'motherEducation', 'parentsIncome'] as const,
  };

  const nextStep = () => {
    if (!form) return;
    
    form.trigger(fieldsByStep[step as keyof typeof fieldsByStep]).then((valid) => {
      if (valid) {
        setStep(step + 1);
        window.scrollTo(0, 0);
      } else {
        // This will be handled in the Registration component
      }
    });
  };

  const prevStep = () => {
    setStep(step - 1);
    window.scrollTo(0, 0);
  };

  return (
    <FormContext.Provider
      value={{
        form,
        setForm,
        step,
        setStep,
        isSubmitting,
        setIsSubmitting,
        nextStep,
        prevStep,
        fieldsByStep,
      }}
    >
      {children}
    </FormContext.Provider>
  );
};

export const useFormContext = () => {
  const context = useContext(FormContext);
  if (context === undefined) {
    throw new Error('useFormContext must be used within a FormProvider');
  }
  return context;
};
