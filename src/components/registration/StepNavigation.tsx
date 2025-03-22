
import React from 'react';
import { ChevronRight } from 'lucide-react';
import { useFormContext } from '@/contexts/FormContext';

interface StepNavigationProps {
  showPrev?: boolean;
  showNext?: boolean;
  submitButton?: boolean;
}

const StepNavigation: React.FC<StepNavigationProps> = ({ 
  showPrev = true, 
  showNext = true,
  submitButton = false
}) => {
  const { prevStep, nextStep, isSubmitting } = useFormContext();
  
  return (
    <div className="flex justify-between">
      {showPrev ? (
        <button
          type="button"
          onClick={prevStep}
          className="btn-outline"
        >
          Langkah Sebelumnya
        </button>
      ) : <div></div>}
      
      {showNext && (
        <button
          type="button"
          onClick={nextStep}
          className="btn-primary inline-flex items-center space-x-2"
        >
          <span>Langkah Selanjutnya</span>
          <ChevronRight size={18} />
        </button>
      )}
      
      {submitButton && (
        <button
          type="submit"
          disabled={isSubmitting}
          className="btn-primary inline-flex items-center space-x-2"
        >
          {isSubmitting ? (
            <span>Mengirim...</span>
          ) : (
            <>
              <span>Kirim Pendaftaran</span>
              <ChevronRight size={18} />
            </>
          )}
        </button>
      )}
    </div>
  );
};

export default StepNavigation;
