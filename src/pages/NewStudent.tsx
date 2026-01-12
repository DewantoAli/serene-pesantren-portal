
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
      <div className="w-full h-[calc(100vh-80px)] mt-20">
        <iframe
          src="https://santri-form-hub.vercel.app/"
          className="w-full h-full border-0"
          title="Formulir Pendaftaran Santri Baru"
          loading="lazy"
        >
          Memuat formulir pendaftaran...
        </iframe>
      </div>
    </>
  );
};

export default NewStudent;
