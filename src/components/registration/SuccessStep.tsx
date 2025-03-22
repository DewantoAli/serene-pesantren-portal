
import React from 'react';
import { CheckCircle2, ChevronRight, Info } from 'lucide-react';
import AnimatedSectionWrapper from '@/components/ui/AnimatedSectionWrapper';

const SuccessStep: React.FC = () => {
  return (
    <AnimatedSectionWrapper animation="scale-in" className="glass-card p-8 rounded-lg text-center">
      <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-islamic-teal/20 flex items-center justify-center">
        <CheckCircle2 size={40} className="text-islamic-teal" />
      </div>
      <h2 className="text-2xl font-display font-bold text-islamic-navy mb-4">
        Pendaftaran Berhasil Dikirim!
      </h2>
      <p className="text-islamic-slate mb-8">
        Terima kasih telah mendaftar di Pondok Pesantren Islam Irsyadulhaq. Pendaftaran Anda telah diterima dan akan segera kami tinjau. Anda akan menerima email konfirmasi dengan petunjuk lebih lanjut.
      </p>
      <div className="p-4 rounded-lg bg-islamic-teal/10 flex items-start mb-8">
        <Info size={20} className="text-islamic-teal mt-0.5 mr-3 flex-shrink-0" />
        <p className="text-sm text-islamic-slate">
          ID pendaftaran Anda adalah <span className="font-medium">IH-{Math.floor(Math.random() * 900000) + 100000}</span>. Harap simpan nomor ini untuk referensi di masa mendatang. Jika Anda memiliki pertanyaan, silakan hubungi kantor penerimaan kami.
        </p>
      </div>
      <a href="/" className="btn-primary inline-flex items-center space-x-2">
        <span>Kembali ke Beranda</span>
        <ChevronRight size={18} />
      </a>
    </AnimatedSectionWrapper>
  );
};

export default SuccessStep;
