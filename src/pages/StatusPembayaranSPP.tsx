import React from 'react';
import Header from '@/components/layout/Header';

const StatusPembayaranSPP: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-1 pt-20">
        <iframe
          src="https://irsyadulhaq-administrasi.lovable.app/rekap-spp-publik"
          className="w-full h-[calc(100vh-5rem)] border-0"
          title="Status Pembayaran SPP"
          allow="fullscreen"
        />
      </div>
    </div>
  );
};

export default StatusPembayaranSPP;
