import React from 'react';
import Header from '@/components/layout/Header';
import Seo from '@/components/seo/Seo';

const AplikasiPesantren: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Seo
        title="Aplikasi Administrasi & Keuangan Pesantren Irsyadulhaq"
        description="Akses aplikasi administrasi dan keuangan Pondok Pesantren Irsyadulhaq Manado untuk pengelolaan data santri, pembayaran, dan laporan secara online."
        path="/aplikasi-pesantren"
      />
      <Header />
      <div className="flex-1 pt-20">
        <h1 className="container mx-auto px-4 md:px-6 py-4 font-display text-2xl text-islamic-navy">
          Aplikasi Administrasi &amp; Keuangan Pesantren
        </h1>
        <iframe
          src="https://irsyadulhaq-administrasi.lovable.app/"
          className="w-full h-[calc(100vh-9rem)] border-0"
          title="Aplikasi Pesantren"
          allow="fullscreen"
        />
      </div>
    </div>
  );
};

export default AplikasiPesantren;
