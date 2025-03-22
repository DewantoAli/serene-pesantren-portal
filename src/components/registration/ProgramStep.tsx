
import React from 'react';
import AnimatedSectionWrapper from '@/components/ui/AnimatedSectionWrapper';
import { Label } from "@/components/ui/label";

import {
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

import { useFormContext } from '@/contexts/FormContext';
import StepNavigation from './StepNavigation';

const ProgramStep: React.FC = () => {
  const { form } = useFormContext();
  if (!form) return null;
  
  return (
    <AnimatedSectionWrapper animation="fade-in">
      <h2 className="text-2xl font-display font-bold text-islamic-navy mb-6">
        Pilihan Program
      </h2>
      
      <div className="mb-8">
        <p className="text-islamic-slate mb-6">
          Silakan pilih program yang ingin Anda ikuti. Setiap program memiliki kurikulum dan fokus yang berbeda.
        </p>
        
        <FormField
          control={form.control}
          name="program"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="space-y-4"
                >
                  {[
                    {
                      value: 'islamic-studies',
                      title: 'Program Studi Islam',
                      description: 'Fokus pada ilmu keislaman, Al-Quran, Hadits, dan Fiqih.',
                    },
                    {
                      value: 'tahfidz',
                      title: 'Program Tahfidz Quran',
                      description: 'Program intensif menghafal Al-Quran dengan pendampingan studi Islam pendukung.',
                    },
                    {
                      value: 'academic-islamic',
                      title: 'Program Terpadu Akademik-Islam',
                      description: 'Kurikulum seimbang antara mata pelajaran akademik dan studi Islam.',
                    },
                    {
                      value: 'leadership',
                      title: 'Program Kepemimpinan Islam',
                      description: 'Fokus pada pengembangan keterampilan kepemimpinan Islami bersama studi reguler.',
                    },
                  ].map((programOption) => (
                    <div 
                      key={programOption.value}
                      className={`p-4 border rounded-lg transition-all duration-300 ${
                        field.value === programOption.value 
                          ? 'border-islamic-teal bg-islamic-teal/5' 
                          : 'border-gray-200 hover:border-islamic-teal/50'
                      }`}
                    >
                      <div className="flex items-start">
                        <RadioGroupItem value={programOption.value} id={programOption.value} className="mt-1 mr-3" />
                        <div>
                          <Label htmlFor={programOption.value} className="font-medium text-islamic-navy">
                            {programOption.title}
                          </Label>
                          <p className="text-sm text-islamic-slate mt-1">
                            {programOption.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      
      <StepNavigation />
    </AnimatedSectionWrapper>
  );
};

export default ProgramStep;
