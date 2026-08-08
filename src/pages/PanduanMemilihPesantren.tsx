import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Seo from '@/components/seo/Seo';
import { ArrowRight, BookOpen, Building2, HeartHandshake, Users, Wallet, ShieldCheck } from 'lucide-react';

const kriteria = [
  {
    icon: BookOpen,
    title: 'Kurikulum: keseimbangan ilmu agama dan umum',
    body: 'Pastikan pesantren memadukan pelajaran diniyah (Al-Quran, hadits, aqidah, bahasa Arab) dengan kurikulum formal seperti MTs/MA yang diakui Kemenag. Tanyakan jadwal harian santri: berapa jam untuk tahfidz, berapa jam untuk pelajaran umum.',
  },
  {
    icon: ShieldCheck,
    title: 'Manhaj dan lingkungan spiritual',
    body: 'Kenali dasar pengajaran pesantren dan latar belakang para pengajarnya. Lingkungan ibadah yang tertib, pembiasaan shalat berjamaah, dan adab keseharian lebih menentukan karakter anak dibanding fasilitas fisik.',
  },
  {
    icon: Building2,
    title: 'Fasilitas dan standar asrama',
    body: 'Periksa langsung kondisi asrama, kamar mandi, dapur, dan ruang belajar. Perhatikan kebersihan, ventilasi, kepadatan kamar, ketersediaan air bersih, serta layanan kesehatan bila santri sakit.',
  },
  {
    icon: Users,
    title: 'Rasio pengasuh dan pola pembinaan',
    body: 'Tanyakan berapa jumlah musyrif/pengasuh dibanding santri, bagaimana penanganan santri baru yang homesick, dan bagaimana pesantren menangani konflik atau perundungan antar santri.',
  },
  {
    icon: Wallet,
    title: 'Biaya dan transparansi keuangan',
    body: 'Minta rincian biaya masuk, SPP bulanan, serta biaya tambahan (seragam, kitab, kegiatan). Pesantren yang sehat biasanya terbuka soal rekap pembayaran dan penggunaan dana.',
  },
  {
    icon: HeartHandshake,
    title: 'Komunikasi dengan orang tua',
    body: 'Cek aturan kunjungan, jadwal perizinan pulang, serta saluran komunikasi resmi antara wali santri dan pesantren. Laporan perkembangan hafalan dan nilai secara berkala adalah nilai tambah.',
  },
];

const langkah = [
  'Susun daftar 3–5 pesantren yang sesuai lokasi, jenjang, dan program yang diinginkan.',
  'Kunjungi langsung pesantren tersebut, bila memungkinkan pada hari aktif belajar.',
  'Ajak anak berdiskusi — kesiapan mental santri sangat menentukan keberhasilannya.',
  'Tanyakan alumni atau wali santri yang sedang mondok tentang pengalaman nyata mereka.',
  'Bandingkan rincian biaya dan program, lalu tentukan pilihan sebelum kuota penerimaan ditutup.',
];

const PanduanMemilihPesantren: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Seo
        title="Panduan Memilih Pondok Pesantren yang Tepat untuk Anak"
        description="Panduan praktis memilih pondok pesantren untuk anak: kriteria kurikulum, manhaj, fasilitas asrama, rasio pengasuh, biaya, dan langkah survei sebelum mendaftar."
        path="/panduan-memilih-pesantren"
        ogType="article"
      />
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Article',
            headline: 'Panduan Memilih Pondok Pesantren yang Tepat',
            description:
              'Kriteria dan langkah praktis bagi orang tua dalam memilih pondok pesantren untuk anak.',
            author: {
              '@type': 'Organization',
              name: 'Pondok Pesantren Irsyadulhaq Manado',
            },
            publisher: {
              '@type': 'Organization',
              name: 'Pondok Pesantren Irsyadulhaq Manado',
            },
            mainEntityOfPage: 'https://www.irsyadulhaq.or.id/panduan-memilih-pesantren',
          })}
        </script>
      </Helmet>

      <Header />

      <main className="flex-1 pt-28 pb-20">
        <article className="container mx-auto px-4 md:px-6 max-w-3xl">
          <p className="text-sm font-medium text-islamic-teal mb-3">Panduan Orang Tua</p>
          <h1 className="font-display text-3xl md:text-4xl text-islamic-navy leading-tight mb-4">
            Panduan Memilih Pondok Pesantren yang Tepat
          </h1>
          <p className="text-islamic-slate text-lg leading-relaxed mb-10">
            Memilih pondok pesantren bukan sekadar mencari sekolah berasrama. Anak akan tinggal,
            belajar, dan membentuk kebiasaan di sana selama bertahun-tahun. Panduan ini merangkum
            kriteria penting yang perlu Anda periksa sebelum menentukan pilihan.
          </p>

          <h2 className="font-display text-2xl text-islamic-navy mb-6">
            Enam kriteria utama yang perlu diperiksa
          </h2>
          <div className="space-y-6 mb-12">
            {kriteria.map((k) => (
              <section key={k.title} className="rounded-xl border border-border p-5 bg-card">
                <div className="flex items-start gap-4">
                  <span className="shrink-0 rounded-lg bg-islamic-teal/10 p-2.5">
                    <k.icon className="h-5 w-5 text-islamic-teal" />
                  </span>
                  <div>
                    <h3 className="font-medium text-islamic-navy mb-1.5">{k.title}</h3>
                    <p className="text-islamic-slate leading-relaxed">{k.body}</p>
                  </div>
                </div>
              </section>
            ))}
          </div>

          <h2 className="font-display text-2xl text-islamic-navy mb-4">
            Langkah praktis sebelum mendaftar
          </h2>
          <ol className="list-decimal pl-5 space-y-3 text-islamic-slate mb-12">
            {langkah.map((l) => (
              <li key={l} className="leading-relaxed">{l}</li>
            ))}
          </ol>

          <h2 className="font-display text-2xl text-islamic-navy mb-4">
            Bagaimana dengan Pondok Pesantren Irsyadulhaq Manado?
          </h2>
          <p className="text-islamic-slate leading-relaxed mb-4">
            Irsyadulhaq Manado memadukan program tahfidz Al-Quran dengan pendidikan formal
            Madrasah Tsanawiyah, pembinaan adab harian, serta rekap pembayaran SPP yang dapat
            diakses wali santri secara online. Anda dapat menelusuri kegiatan santri dan struktur
            pengurus kami untuk menilai sendiri kesesuaiannya dengan kriteria di atas.
          </p>
          <div className="flex flex-wrap gap-3 mt-8">
            <Link to="/about" className="btn-primary inline-flex items-center gap-2">
              Tentang Pesantren <ArrowRight size={16} />
            </Link>
            <Link
              to="/kegiatan-santri"
              className="inline-flex items-center gap-2 rounded-md border border-border px-5 py-2 text-islamic-navy hover:text-islamic-teal transition-colors"
            >
              Lihat Kegiatan Santri
            </Link>
            <Link
              to="/new-student"
              className="inline-flex items-center gap-2 rounded-md border border-border px-5 py-2 text-islamic-navy hover:text-islamic-teal transition-colors"
            >
              Pendaftaran Santri Baru
            </Link>
          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
};

export default PanduanMemilihPesantren;
