import React from 'react';
import Header from '@/components/layout/Header';
import Seo from '@/components/seo/Seo';

const StatusPembayaranSPP: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Seo
        title="Status Pembayaran SPP Santri | Irsyadulhaq Manado"
        description="Cek status pembayaran SPP santri Pondok Pesantren Irsyadulhaq Manado secara online. Rekap pembayaran publik yang transparan dan diperbarui berkala."
        path="/status-pembayaran-spp"
      />
      <Header />
      <div className="flex-1 pt-20">
        <h1 className="container mx-auto px-4 md:px-6 py-4 font-display text-2xl text-islamic-navy">
          Status Pembayaran SPP Santri
        </h1>
        <iframe
          src="https://irsyadulhaq-administrasi.lovable.app/rekap-spp-publik"
          className="w-full h-[calc(100vh-9rem)] border-0"
          title="Status Pembayaran SPP"
          allow="fullscreen"
        />
      </div>
    </div>
  );
};

export default StatusPembayaranSPP;
