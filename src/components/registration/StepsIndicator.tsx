
import React from 'react';
import { CheckCircle2 } from 'lucide-react';
import { useFormContext } from '@/contexts/FormContext';

interface StepType {
  number: number;
  title: string;
}

const StepsIndicator: React.FC = () => {
  const { step } = useFormContext();
  
  const steps: StepType[] = [
    { number: 1, title: 'Informasi Pribadi' },
    { number: 2, title: 'Latar Belakang Pendidikan' },
    { number: 3, title: 'Pilihan Program' },
    { number: 4, title: 'Informasi Keluarga' },
    { number: 5, title: 'Tinjauan & Kirim' },
  ];
  
  return (
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
  );
};

export default StepsIndicator;
