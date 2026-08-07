
import React, { useState } from 'react';
import Header from '@/components/layout/Header';
import Seo from '@/components/seo/Seo';
import { Skeleton } from '@/components/ui/skeleton';
import { Loader2 } from 'lucide-react';

const NewStudent: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      <Seo
        title="Pendaftaran Santri Baru 2026 | Ponpes Irsyadulhaq Manado"
        description="Formulir pendaftaran santri baru Pondok Pesantren Irsyadulhaq Manado. Isi data secara online, cepat dan mudah, untuk program MTs dan tahfidz Al-Quran."
        path="/new-student"
      />
      <Header />
      <h1 className="sr-only">Pendaftaran Santri Baru Pondok Pesantren Irsyadulhaq Manado</h1>
      <div className="w-full h-[calc(100vh-80px)] mt-20 relative">
        {isLoading && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-background z-10">
            <Loader2 className="h-10 w-10 animate-spin text-primary mb-4" />
            <p className="text-muted-foreground">Memuat formulir pendaftaran...</p>
            <div className="w-full max-w-2xl px-4 mt-8 space-y-4">
              <Skeleton className="h-12 w-full" />
              <Skeleton className="h-10 w-3/4" />
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-2/3" />
            </div>
          </div>
        )}
        <iframe
          src="https://santri-form-hub.lovable.app/"
          className="w-full h-full border-0"
          title="Formulir Pendaftaran Santri Baru"
          onLoad={() => setIsLoading(false)}
        />
      </div>
    </>
  );
};

export default NewStudent;
