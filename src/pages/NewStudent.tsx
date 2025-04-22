
import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import AnimatedSectionWrapper from '@/components/ui/AnimatedSectionWrapper';
import PatternBackground from '@/components/ui/PatternBackground';


const NewStudent = () => {
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
