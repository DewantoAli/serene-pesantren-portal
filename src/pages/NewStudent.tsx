
import React from 'react';
import { Link } from 'react-router-dom';
import AnimatedSectionWrapper from '@/components/ui/AnimatedSectionWrapper';
import { ChevronRight, BookOpen, Users, GraduationCap, Clock, ArrowRight, Award, Target, MapPin } from 'lucide-react';
import PatternBackground from '@/components/ui/PatternBackground';
import Header from '@/components/layout/Header';


const NewStudent: React.FC = () => {
  return (
    <>
      <Header />
      <main className="pt-28 pb-20">
        <div className="container mx-auto px-4 md:px-6">
          <AnimatedSectionWrapper className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-islamic-navy mb-4">
              Pendaftaran Santri Baru
            </h1>
            <p className="text-islamic-slate max-w-2xl mx-auto mb-8">
              Silakan isi formulir pendaftaran di bawah ini untuk mendaftar sebagai santri baru.
            </p>
          </AnimatedSectionWrapper>
          
          <div className="w-full h-[calc(100vh-200px)] min-h-[800px]">
            <iframe
              src="https://santri-form-hub.vercel.app/"
              className="w-full h-full border-0"
              frameBorder="0"
              marginHeight={0}
              marginWidth={0}
              allowFullScreen
            >
              Loading…
            </iframe>
          </div>
        </div>
      </main>
    </>
  );
};

export default NewStudent;
