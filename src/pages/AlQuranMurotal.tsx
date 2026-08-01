import React from 'react';
import Header from '@/components/layout/Header';

const AlQuranMurotal: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
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
