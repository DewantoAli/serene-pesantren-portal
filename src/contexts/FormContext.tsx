
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { z } from 'zod';
import { formSchema } from '@/schemas/registrationSchema';

type FormValues = z.infer<typeof formSchema>;

interface FormContextType {
  form: UseFormReturn<FormValues>;
  setForm: (form: UseFormReturn<FormValues>) => void;
  step: number;
  setStep: (step: number) => void;
  isSubmitting: boolean;
  setIsSubmitting: (isSubmitting: boolean) => void;
  nextStep: () => void;
  prevStep: () => void;
  fieldsByStep: {
    [key: number]: (keyof FormValues)[];
  };
}

// Create a context with a default value that matches our interface structure
const FormContext = createContext<FormContextType | null>(null);

export const FormProvider: React.FC<{
  children: ReactNode;
  initialStep?: number;
  form: UseFormReturn<FormValues>;
}> = ({ children, initialStep = 1, form }) => {
  const [formState, setFormState] = useState<UseFormReturn<FormValues>>(form);
  const [step, setStep] = useState(initialStep);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Update internal form state if the provided form changes
  useEffect(() => {
    setFormState(form);
  }, [form]);

  const fieldsByStep: {[key: number]: (keyof FormValues)[]} = {
    1: ['fullName', 'gender', 'dateOfBirth', 'placeOfBirth', 'email', 'phone', 'nisn', 'nik', 'address', 'district', 'city', 'province', 'postalCode'],
    2: ['previousSchool', 'schoolAddress', 'schoolDistrict', 'schoolCity', 'schoolProvince', 'graduationYear'],
    3: ['program'],
    4: ['familyCardNumber', 'fatherName', 'fatherStatus', 'fatherNik', 'fatherOccupation', 'motherName', 'motherStatus', 'motherNik', 'motherEducation', 'parentsIncome'],
  };

  const nextStep = () => {
    formState.trigger(fieldsByStep[step as keyof typeof fieldsByStep]).then((valid) => {
      if (valid) {
        setStep(step + 1);
        window.scrollTo(0, 0);
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
        form: formState,
        setForm: setFormState,
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
  if (context === null) {
    throw new Error('useFormContext must be used within a FormProvider');
  }
  return context;
};
