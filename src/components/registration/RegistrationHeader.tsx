
import React from 'react';
import AnimatedSectionWrapper from '@/components/ui/AnimatedSectionWrapper';
import PatternBackground from '@/components/ui/PatternBackground';
import { ChevronRight, Users, BookOpen, Calendar, MapPin } from 'lucide-react';

const RegistrationHeader: React.FC = () => {
  return (
    <section className="relative py-16 overflow-hidden">
      <div className="absolute inset-0 hero-gradient -z-10 opacity-90"></div>
      <PatternBackground className="absolute inset-0 -z-10 opacity-30" patternType="dots" patternColor="#ffffff" patternOpacity={0.1} />
      
      <div className="container mx-auto px-4 md:px-6 relative z-10 flex justify-center">
        <AnimatedSectionWrapper className="text-center max-w-3xl mb-8">
          <span className="inline-block px-4 py-1 mb-4 rounded-full bg-islamic-gold/20 text-islamic-cream text-sm font-medium">
            Bergabung dengan Komunitas Kami
          </span>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-white mb-4">
            SPMB Online Ponpes Irsyadul Haq
          </h1>
          <p className="text-islamic-cream/90 max-w-2xl mx-auto mb-6">
            Formulir Pendaftaran Online pondok Pesantren Irsyadul Haq T.A 2025 - 2026
          </p>
           
          <div className="grid grid-cols-1 gap-8">
            <div className="mx-auto">
              <div className="flex items-start justify-center mb-2">
                <MapPin className="text-islamic-gold mr-2" />
                <h3 className="font-medium text-islamic-cream">Persyaratan Pendaftaran :</h3>
              </div>
              <ul className="list-disc pl-6 text-islamic-cream/90 text-left mx-auto max-w-lg">
                <li>Membayar Biaya Pendaftaran</li>
                <li>Mengisi Formulir Pendaftaran</li>
                <li>Foto Copy Kartu Keluarga (KK) satu Lembar</li>
                <li>Foto Copy Kartu Tanda Penduduk (KTP) Ayah dan Ibu @ satu lembar</li>
                <li>Foto Copy Akte Kelahiran satu lembar</li>
                <li>Foto Copy Ijazah Terakhir/SKL yang dilegalisir (3 lembar)</li>
                <li>Pas Foto Berwarna 2x3 (3 lembar) dan 3x4 (3 lembar)</li>
              </ul>
            </div>
            
            <div className="text-islamic-cream/90 text-center">
              <h3 className="font-medium text-islamic-cream mb-2">Kontak Informasi :</h3>
              <p>0822-9006-6969 (Rosihan Anwar, S.Pd.)</p>
              <p>0812-4427-1126 (Hadi Supriyanto, SE)</p>
            </div>
          </div>
        </AnimatedSectionWrapper>
      </div>
    </section>
  );
};

export default RegistrationHeader;
