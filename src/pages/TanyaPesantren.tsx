import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Seo from '@/components/seo/Seo';
import PesantrenChat from '@/components/chat/PesantrenChat';

const TanyaPesantren: React.FC = () => (
  <>
    <Seo
      title="Tanya Pesantren | Pondok Pesantren Irsyadulhaq Manado"
      description="Tanyakan informasi pendaftaran, program, dan kegiatan santri Pondok Pesantren Irsyadul Haq Manado."
      path="/tanya-pesantren"
    />
    <Header />
    <main className="min-h-screen bg-background pb-16 pt-28 text-foreground">
      <section className="container mx-auto max-w-5xl px-4 md:px-6">
        <div className="mb-6 max-w-2xl">
          <p className="mb-2 text-xs uppercase text-primary">Layanan Informasi</p>
          <h1 className="font-serif text-3xl text-foreground sm:text-4xl">Tanya Pesantren</h1>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
            Dapatkan jawaban seputar pendaftaran, program belajar, dan kegiatan santri berdasarkan informasi portal.
          </p>
        </div>
        <PesantrenChat />
      </section>
    </main>
    <Footer />
  </>
);

export default TanyaPesantren;