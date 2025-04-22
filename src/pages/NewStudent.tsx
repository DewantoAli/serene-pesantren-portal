
import React from 'react';
import { Link } from 'react-router-dom';
import AnimatedSectionWrapper from '@/components/ui/AnimatedSectionWrapper';
import { ChevronRight, BookOpen, Users, GraduationCap, Clock, ArrowRight, Award, Target, MapPin } from 'lucide-react';
import PatternBackground from '@/components/ui/PatternBackground';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

const NewStudent = () => {
  return (
    <>
      
          
          <div className="aspect-[4/3] w-full max-w-5xl mx-auto">
            <iframe
              src="https://docs.google.com/forms/d/e/1FAIpQLSelmRTNIZqwlb11qtdTNh1GZzYTdVCd6uNqqEmOXQchK0EV_A/viewform"
              className="w-full h-full"
              frameBorder="0"
              marginHeight={0}
              marginWidth={0}
            >
              Loading…
            </iframe>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default NewStudent;
