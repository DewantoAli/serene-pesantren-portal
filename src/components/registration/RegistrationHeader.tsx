
import React from 'react';
import AnimatedSectionWrapper from '@/components/ui/AnimatedSectionWrapper';
import PatternBackground from '@/components/ui/PatternBackground';

const RegistrationHeader: React.FC = () => {
  return (
    <section className="relative py-16 overflow-hidden">
      <div className="absolute inset-0 hero-gradient -z-10 opacity-90"></div>
      <PatternBackground className="absolute inset-0 -z-10 opacity-30" patternType="dots" patternColor="#ffffff" patternOpacity={0.1} />
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <AnimatedSectionWrapper className="text-center mb-8">
          <span className="inline-block px-4 py-1 mb-4 rounded-full bg-islamic-gold/20 text-islamic-cream text-sm font-medium">
            Bergabung dengan Komunitas Kami
          </span>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-white mb-4">
            SPMB Online Ponpes Irsyadul Haq
          </h1>
          <p className="text-islamic-cream/90 max-w-2xl mx-auto mb-6">
            Formulir Pendaftaran Online pondok Pesantren Irsyadul Haq T.A 2025 - 2026
           </p>
               SYARAT PENDAFTARAN :
      <h4>
                    "Membayar Biaya Pendaftaran",
                    "Mengisi Formulir Pendaftaran",
                    "Foto Copy Kartu Keluarga (KK) satu Lembar",
                    "Foto Copy Kartu Tanda Penduduk (KTP) Ayah dan Ibu @ satu lembar"
                    "Foto Copy Akte Kelahiran satu lembar"
                    "Foto Copy Ijazah Terakhir/SKL yang dilegalisir (3 lembar)"
                    "Pas Foto Berwarna 2x3 (3 lembar) dan 3x4 (3 lembar)"
       </h4> 
               <div>           
                   
              Kontak Informasi :
                 </div>
          <div>
              0822-9006-6969 (Rosihan Anwar, S.Pd.)
            </div>
          <div>
          0812-4427-1126 (Hadi Supriyanto, SE)
          </div>
        </AnimatedSectionWrapper>
      </div>
    </section>
  );
};

export default RegistrationHeader;
