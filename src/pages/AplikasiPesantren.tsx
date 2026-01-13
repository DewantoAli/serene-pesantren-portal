import React from 'react';
import Header from '@/components/layout/Header';

const AplikasiPesantren: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-1 pt-20">
        <iframe
          src="https://irsyadulhaq-administrasi.lovable.app/"
          className="w-full h-[calc(100vh-5rem)] border-0"
          title="Aplikasi Pesantren"
          allow="fullscreen"
        />
      </div>
    </div>
  );
};

export default AplikasiPesantren;
