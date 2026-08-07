import React from 'react';
import Header from '@/components/layout/Header';
import Seo from '@/components/seo/Seo';

const AlQuranMurotal: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Seo
        title="Al-Quran Murotal Online | Ponpes Irsyadulhaq Manado"
        description="Dengarkan murotal Al-Quran online dari berbagai qari langsung di situs Pondok Pesantren Irsyadulhaq Manado. Gratis dan mudah diakses kapan saja."
        path="/al-quran-murotal"
      />
      <Header />
      <div className="flex-1 pt-20">
        <iframe
          src="https://murotal-quran.vercel.app/"
          className="w-full h-[calc(100vh-5rem)] border-0"
          title="Al-Quran Murotal"
          allow="fullscreen"
        />
      </div>
    </div>
  );
};

export default AlQuranMurotal;
