import React from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Users,
  GraduationCap,
  Calendar,
  MapPin,
  Sparkles,
} from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';

const stats = [
  { value: '2021', label: 'Tahun Didirikan' },
  { value: '25+', label: 'Santri Aktif' },
  { value: '7+', label: 'Pengajar' },
  { value: '2', label: 'Program Unggulan' },
];	

const programs = [
  {
    icon: BookOpen,
    title: 'Tahfidz Al-Qur’an',
    desc: 'Program menghafal Al-Qur’an dengan metode terstruktur, tajwid yang benar, dan bimbingan intensif.',
  },
  {
    icon: GraduationCap,
    title: 'Pendidikan Formal',
    desc: 'Kurikulum MTs terpadu yang menyeimbangkan ilmu agama dan pengetahuan umum sesuai standar nasional.',
  },
  {
    icon: Users,
    title: 'Pembentukan Karakter',
    desc: 'Adab, akhlak, dan kepemimpinan santri dibina melalui keseharian yang berlandaskan Sunnah.',
  },
];

const events = [
  {
    date: '15 Juni 2026',
    title: 'Open House & Tur Pesantren',
    location: 'Kampus Utama Manado',
    desc: 'Kunjungi kampus, temui pengasuh, dan pelajari kurikulum kami secara langsung.',
  },
  {
    date: '10 Juli 2026',
    title: 'Musabaqah Hifzhil Qur’an',
    location: 'Aula Utama',
    desc: 'Lomba tahunan yang menampilkan hafalan terbaik para santri di berbagai jenjang.',
  },
  {
    date: '5 Agustus 2026',
    title: 'Orientasi Santri Baru',
    location: 'Halaman Pesantren',
    desc: 'Penyambutan santri baru tahun ajaran 2026/2027 sekaligus pengenalan lingkungan.',
  },
];

const Index: React.FC = () => {
  return (
    <>
      <Header />
      <main className="bg-background text-foreground">
        {/* ============== HERO ============== */}
        <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-background">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
              {/* Copy */}
              <div className="lg:col-span-7 space-y-8">
                <div className="inline-flex items-center gap-2 rounded-full border border-islamic-gold/30 bg-islamic-gold/10 px-4 py-2 badge-shimmer animate-fade-in">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-islamic-gold opacity-60" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-islamic-gold dot-pulse" />
                  </span>
                  <span className="text-xs font-semibold tracking-wider text-islamic-gold/80 uppercase">
                    Penerimaan Santri Baru 2026/2027 dibuka
                  </span>
                </div>

                <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl leading-[1.05] tracking-tight text-foreground text-balance">
                  Menempa generasi
                  <br />
                  <em className="italic text-islamic-gold">Rabbani</em> yang
                  <br />
                  berpijak pada Sunnah.
                </h1>

                <p className="max-w-xl text-base md:text-lg text-muted-foreground leading-relaxed">
                  Pondok Pesantren Irsyadul Haq Manado mendidik santri dengan
                  Al-Qur’an, As-Sunnah, dan pemahaman Salafush Shalih — dipadu
                  akademik modern dan pembinaan karakter yang utuh.
                </p>

                <div className="flex flex-col sm:flex-row gap-3">
                  <Button
                    asChild
                    size="lg"
                    className="rounded-full px-7 bg-primary hover:bg-primary/90 hover:shadow-lg hover:-translate-y-0.5 transition-all"
                  >
                    <Link to="/new-student">
                      Daftar Santri Baru
                      <ArrowRight size={18} className="ml-1" />
                    </Link>
                  </Button>
                  <Button
                    asChild
                    size="lg"
                    variant="outline"
                    className="rounded-full px-7 border-foreground/10 text-foreground hover:bg-foreground/5"
                  >
                    <Link to="/about">Kenali Pesantren</Link>
                  </Button>
                </div>

                {/* Stat strip */}
                <div className="pt-8 flex flex-wrap items-center gap-8 md:gap-12 border-t border-border">
                  {stats.map((s) => (
                    <div key={s.label}>
                      <p className="font-serif text-2xl md:text-3xl text-foreground">
                        {s.value}
                      </p>
                      <p className="text-sm text-muted-foreground mt-1">{s.label}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Visual */}
              <div className="lg:col-span-5">
                <div className="relative">
                  <div className="absolute -inset-4 border border-islamic-gold/20 rounded-[2rem] transform translate-x-4 translate-y-4" />
                  <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[2rem] shadow-elegant ring-1 ring-border/60">
                    <img
                      src="https://ik.imagekit.io/uzuuvayyu/building_LixplpNC1?updatedAt=1742674414873"
                      alt="Pondok Pesantren Irsyadul Haq Manado"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-foreground/40 to-transparent" />
                  </div>

                  {/* Ornament decor */}
                  <div className="absolute -bottom-6 -left-6 w-28 h-28 md:w-32 md:h-32 bg-islamic-gold flex items-center justify-center rounded-2xl shadow-xl border-4 border-background">
                    <Sparkles className="w-12 h-12 md:w-16 md:h-16 text-background opacity-90" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ============== PPDB FEATURED ============== */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center bg-muted/60 rounded-3xl p-6 md:p-12 border border-border">
              <div className="lg:col-span-5 order-2 lg:order-1">
                <p className="text-xs uppercase tracking-[0.2em] text-primary mb-4">
                  Pengumuman
                </p>
                <h2 className="font-serif text-4xl md:text-5xl leading-tight text-foreground">
                  Penerimaan Murid Baru{' '}
                  <em className="italic text-primary">2026/2027</em>
                </h2>
                <p className="mt-5 text-muted-foreground leading-relaxed">
                  Sistem Penerimaan Murid Baru (SPMB) Pondok Pesantren Irsyadul
                  Haq telah dibuka. Bergabung dan mulai perjalanan menuntut ilmu
                  bersama kami.
                </p>
                <div className="mt-7 flex flex-col sm:flex-row gap-3">
                  <Button asChild className="rounded-full px-6">
                    <Link to="/new-student">Daftar Sekarang</Link>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    className="rounded-full px-6 border-foreground/20"
                  >
                    <a
                      href="https://ik.imagekit.io/uzuuvayyu/brosur%20pesantren%20PPDB%2026%20-%2027.png"
                      target="_blank"
                      rel="noreferrer"
                    >
                      Unduh Brosur
                      <ArrowUpRight size={16} className="ml-1" />
                    </a>
                  </Button>
                </div>
              </div>
              <div className="lg:col-span-7 order-1 lg:order-2">
                <div className="rounded-2xl overflow-hidden shadow-elegant ring-1 ring-border">
                  <img
                    src="https://ik.imagekit.io/uzuuvayyu/brosur%20pesantren%20PPDB%2026%20-%2027.png?updatedAt=1762378813879"
                    alt="Brosur Penerimaan Murid Baru 2026/2027"
                    className="w-full h-auto"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ============== PROGRAMS ============== */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
              <div className="max-w-2xl">
                <p className="text-xs uppercase tracking-[0.2em] text-primary mb-4">
                  Program Kami
                </p>
                <h2 className="font-serif text-4xl md:text-5xl leading-tight text-foreground">
                  Pendidikan Islam yang{' '}
                  <em className="italic">komprehensif</em>.
                </h2>
              </div>
              <p className="text-muted-foreground max-w-md">
                Membina santri secara intelektual, spiritual, dan sosial dalam
                satu ekosistem pendidikan yang utuh.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {programs.map((p) => {
                const Icon = p.icon;
                return (
                  <article
                    key={p.title}
                    className="group relative bg-card border border-border rounded-2xl p-8 hover:shadow-elegant hover:-translate-y-1 transition-all duration-300"
                  >
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                      <Icon size={22} className="text-primary group-hover:text-primary-foreground" />
                    </div>
                    <h3 className="font-serif text-2xl text-foreground mb-3">
                      {p.title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {p.desc}
                    </p>
                    <div className="mt-6 inline-flex items-center gap-1 text-sm text-primary">
                      <span>Selengkapnya</span>
                      <ArrowRight
                        size={14}
                        className="transition-transform group-hover:translate-x-1"
                      />
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        {/* ============== ABOUT SPLIT ============== */}
        <section className="py-16 md:py-24 bg-muted/40">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="aspect-[3/4] rounded-2xl overflow-hidden ring-1 ring-border">
                    <img
                      src="https://ik.imagekit.io/uzuuvayyu/1709315665488.jpg?updatedAt=1742526194093"
                      alt="Kegiatan santri"
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  <div className="aspect-[3/4] rounded-2xl overflow-hidden ring-1 ring-border mt-10">
                    <img
                      src="https://ik.imagekit.io/uzuuvayyu/building_LixplpNC1?updatedAt=1742674414873"
                      alt="Gedung pesantren"
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                </div>
              </div>

              <div className="lg:col-span-6">
                <p className="text-xs uppercase tracking-[0.2em] text-primary mb-4">
                  Tentang Kami
                </p>
                <h2 className="font-serif text-4xl md:text-5xl leading-tight text-foreground">
                  Warisan ilmu, dijaga dengan{' '}
                  <em className="italic">ketulusan</em>.
                </h2>
                <p className="mt-5 text-muted-foreground leading-relaxed">
                  Sejak 2021, Pondok Pesantren Irsyadul Haq Manado berdedikasi
                  membentuk santri berilmu, beramal, dan berdakwah dengan cara
                  yang benar sesuai pemahaman Salafush Shalih.
                </p>
                <ul className="mt-8 space-y-3">
                  {[
                    'Pengajar berpengalaman & bersanad',
                    'Fasilitas modern dengan nilai tradisional',
                    'Kurikulum seimbang: syar’i & umum',
                    'Lingkungan aman, terarah, dan menumbuhkan',
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <span className="mt-2 w-1.5 h-1.5 rounded-full bg-primary" />
                      <span className="text-foreground/90">{item}</span>
                    </li>
                  ))}
                </ul>
                <Button asChild className="mt-8 rounded-full px-6">
                  <Link to="/about">Jelajahi Kisah Kami</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* ============== EVENTS ============== */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-primary mb-4">
                  Agenda
                </p>
                <h2 className="font-serif text-4xl md:text-5xl leading-tight text-foreground">
                  Acara <em className="italic">mendatang</em>.
                </h2>
              </div>
              <Link
                to="/kegiatan-santri"
                className="inline-flex items-center gap-2 text-sm text-primary hover:underline"
              >
                Lihat semua kegiatan <ArrowRight size={14} />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {events.map((e) => (
                <article
                  key={e.title}
                  className="group border border-border rounded-2xl p-7 bg-card hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-primary">
                    <Calendar size={14} />
                    <span>{e.date}</span>
                  </div>
                  <h3 className="font-serif text-2xl mt-4 text-foreground">
                    {e.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mt-3 leading-relaxed">
                    {e.desc}
                  </p>
                  <div className="mt-5 flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin size={14} />
                    <span>{e.location}</span>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ============== CTA ============== */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4 md:px-6">
            <div className="relative overflow-hidden rounded-[3rem] bg-foreground text-background p-10 md:p-16 lg:p-20 shadow-2xl">
              {/* Gold wave pattern */}
              <div className="absolute top-0 right-0 w-1/2 h-full opacity-10 pointer-events-none text-islamic-gold">
                <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                  <path d="M0,50 Q25,0 50,50 T100,50 T150,50" fill="none" stroke="currentColor" strokeWidth="0.5" />
                  <path d="M0,60 Q25,10 50,60 T100,60 T150,60" fill="none" stroke="currentColor" strokeWidth="0.5" />
                </svg>
              </div>

              <div className="relative z-10 flex flex-col items-center text-center gap-8">
                <div className="max-w-3xl">
                  <p className="text-xs uppercase tracking-[0.2em] text-islamic-gold mb-4">
                    Pendaftaran Dibuka
                  </p>
                  <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl leading-tight text-balance">
                    Mulai perjalanan santri anda
                    <br />
                    bersama <em className="italic text-islamic-gold">Irsyadul Haq</em>.
                  </h2>
                  <p className="mt-5 text-background/70 max-w-xl mx-auto">
                    Bergabunglah dengan komunitas pendidikan yang mendidik hati,
                    akal, dan akhlak di atas bimbingan Al-Qur’an dan As-Sunnah.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                  <Button
                    asChild
                    size="lg"
                    className="rounded-full px-7 bg-islamic-gold text-foreground hover:bg-islamic-gold/90 hover:-translate-y-0.5 transition-all cta-gold-glow"
                  >
                    <Link to="/new-student">
                      Daftar Sekarang <ArrowRight size={18} className="ml-1" />
                    </Link>
                  </Button>
                  <Button
                    asChild
                    size="lg"
                    variant="outline"
                    className="rounded-full px-7 border-background/30 text-background hover:bg-background/10"
                  >
                    <Link to="/about">Pelajari Lebih Lanjut</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Index;
