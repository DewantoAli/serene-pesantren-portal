import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

const StatusPembayaranKelas7: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 pt-20">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-2xl font-bold text-islamic-navy mb-4">Status Pembayaran SPP - Kelas VII</h1>
        </div>
        <iframe
          src="https://santri-form-hub.vercel.app"
          className="w-full flex-1 border-0"
          style={{ height: 'calc(100vh - 200px)' }}
          title="Status Pembayaran SPP Kelas VII"
        />
      </main>
      <Footer />
    </div>
  );
};

export default StatusPembayaranKelas7;
