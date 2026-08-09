
import React from 'react';
import AnimatedSectionWrapper from '@/components/ui/AnimatedSectionWrapper';
import PatternBackground from '@/components/ui/PatternBackground';
import Header from '@/components/layout/Header';
import Seo from '@/components/seo/Seo';
import Footer from '@/components/layout/Footer';
import { ChevronRight, Users, BookOpen, Calendar, MapPin } from 'lucide-react';
import { PageContentProvider, usePageContent } from '@/hooks/usePageContent';

const OrganizationInner: React.FC = () => {
  const { t } = usePageContent();
  // Organization Structure Data
  const defaultPhoto = 'https://ik.imagekit.io/uzuuvayyu/250x250%20px.jpg?updatedAt=1742526171703';
  const leadershipTeam = [1, 2, 3, 4, 5, 6].map((n) => {
    const d = [
      { name: 'Andi Frans Maramis (Abu Surya)', position: 'Ketua Yayasan', education: 'Al-Azhar University', experience: 'Ketua Yayasan Manarul Ilmi' },
      { name: 'Ustadz Sofyan Chalid bin Idham Ruray, Lc Hafizhahullah', position: 'Pembina Pondok', education: 'Alumni LIPIA Universitas Muhammad bin Su’ud Al-Islamiyah Arab Saudi', experience: 'Pembina Pondok Pesantren' },
      { name: 'Ustadz Sofyan Ahmad Madiu, Hafizhahullah', position: 'Pembina Pondok', education: 'Alumni Universitas Islamabad Pakistan', experience: 'Pembina Pondok Pesantren' },
      { name: 'Ustadz Rosihan Anwar, SP.d', position: 'Mudir Pondok', education: 'Sarjana Pendidikan Institut Agama Islam', experience: 'Mudir Pesantren' },
      { name: 'Hadi Supriyanto, SE', position: 'Kepala Madrasah', education: 'Sarjana Ekonomi Universitas Samratulangi', experience: 'Kepala Madrasah Pesantren' },
      { name: "Ustadz Abu Sa'id Hafizhahullah", position: 'Pengasuh Santri', education: 'Alumni Pondok Pesantren', experience: 'Pengasuh Santri Pensatren' },
    ][n - 1];
    return {
      name: t(`leader${n}_name`, d.name),
      position: t(`leader${n}_position`, d.position),
      photo: t(`leader${n}_photo`, defaultPhoto),
      education: t(`leader${n}_education`, d.education),
      experience: t(`leader${n}_experience`, d.experience),
      bio: '',
    };
  });
  
  const departments = [
    {
      name: "Departemen Studi Islam",
      head: "Ustadz Ibrahim Malik",
      description: "Fokus pada studi Al-Quran, Hadits, Fiqih, dan sejarah Islam.",
      programs: ["Tahfidz Al-Quran", "Studi Hadits", "Fiqih Islam", "Sejarah Islam"]
    },
    {
      name: "Departemen Akademik",
      head: "Ustadz",
      description: "Mencakup mata pelajaran umum sesuai kurikulum nasional.",
      programs: ["Matematika", "Ilmu Pengetahuan Alam", "Bahasa", "Ilmu Pengetahuan Sosial", "Seni"]
    },
    {
      name: "Departemen Pembinaan Karakter",
      head: "Ustadz",
      description: "Fokus pada pembentukan akhlak dan keterampilan kepemimpinan santri.",
      programs: ["Adab dan Akhlak Islami", "Pelatihan Kepemimpinan", "Pengabdian Masyarakat", "Pengembangan Diri"]
    },
    {
      name: "Departemen Ekstrakurikuler",
      head: "Ustadz",
      description: "Menyelenggarakan kegiatan olahraga, seni, dan ekstrakurikuler lainnya.",
      programs: ["Kegiatan Olahraga", "Seni dan Keterampilan", "Klub Debat", "Kompetisi Sains"]
    }
  ];
  
  const administrationTeam = [
    {
      name: "Administrasi & Keuangan",
      head: "Dewanto Ali",
      positions: ["Manajer Keuangan", "Staf Administrasi", "Staf Kepegawaian", "Tim Akuntansi"]
    },
    {
      name: "Sarana & Pemeliharaan",
      head: "Andi Frans Maramis",
      positions: ["Penanggung Jawab Pemeliharaan", "Tim Keamanan", "Petugas Kebersihan", "Petugas Taman"]
    },
    {
      name: "Layanan Santri",
      head: "Ustadz Abu Sa'id",
      positions: ["Layanan Kesehatan", "Layanan Dapur", "Pengasuh Asrama", "Koordinator Transportasi"]
    },
    {
      name: "Hubungan Masyarakat",
      head: "Ustadz Rasihan",
      positions: ["Koordinator Wali Santri", "Hubungan Alumni", "Penyelenggara Acara", "Tim Media"]
    }
  ];

  return (
    <>
      <Seo title="Struktur Organisasi | Ponpes Irsyadulhaq Manado" description="Kenali struktur organisasi dan jajaran pengurus Pondok Pesantren Irsyadulhaq Manado, mulai dari yayasan, pembina, mudir, hingga kepala madrasah." path="/organization" />
      <Header />
      <main className="pt-28 pb-20">
        {/* Hero Section */}
        <section className="relative py-16 overflow-hidden">
          <div className="absolute inset-0 hero-gradient -z-10 opacity-90"></div>
          <PatternBackground className="absolute inset-0 -z-10 opacity-30" patternType="dots" patternColor="#ffffff" patternOpacity={0.1} />
          
          <div className="container mx-auto px-4 md:px-6 relative z-10">
            <AnimatedSectionWrapper className="text-center mb-8">
              <span className="inline-block px-4 py-1 mb-4 rounded-full bg-islamic-gold/20 text-islamic-cream text-sm font-medium">
                {t('hero_badge', 'Organisasi Kami')}
              </span>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-white mb-4">
                {t('hero_title', 'Struktur Organisasi')}
              </h1>
              <p className="text-islamic-cream/90 max-w-2xl mx-auto">
                {t('hero_desc', 'Kenali jajaran pengurus yang berdedikasi memimpin Pondok Pesantren Irsyadulhaq.')}
              </p>
            </AnimatedSectionWrapper>
          </div>
        </section>
        
        {/* Organizational Chart */}
        <section className="py-16">
          <div className="container mx-auto px-4 md:px-6">
            <AnimatedSectionWrapper className="text-center mb-16">
              <h2 className="text-3xl font-serif font-bold text-islamic-navy mb-4">
                {t('leadership_title', 'Pengasuh Pondok Pesanten Irsyadul Haq')}
              </h2>
              <div className="geometric-divider mx-auto"></div>
              <p className="text-islamic-slate max-w-2xl mx-auto">
                {t('leadership_desc', 'Pesantren kami dibimbing oleh para pengasuh berpengalaman yang berkomitmen pada keunggulan pendidikan Islam.')}
              </p>
            </AnimatedSectionWrapper>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
              {leadershipTeam.map((leader, index) => (
                <AnimatedSectionWrapper 
                  key={index} 
                  animation="scale-in" 
                  delay={index * 100}
                  className="glass-card p-6 rounded-lg hover:shadow-elegant transition-all duration-300"
                >
                  <div className="relative mb-6">
                    <div className="aspect-square rounded-full overflow-hidden border-4 border-white shadow-md mx-auto w-40">
                      <img 
                        src={leader.photo} 
                        alt={leader.name} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="absolute bottom-0 right-0 left-0 mx-auto w-fit px-4 py-1 bg-islamic-navy text-white text-sm font-medium rounded-full">
                      {leader.position}
                    </div>
                  </div>
                  <div className="text-center">
                    <h3 className="text-xl font-display font-semibold text-islamic-navy mb-2">
                      {leader.name}
                    </h3>
                    <p className="text-sm text-islamic-slate mb-3">
                      {leader.education}
                    </p>
                    <p className="text-sm text-islamic-teal font-medium mb-4">
                      {leader.experience}
                    </p>
                    <p className="text-sm text-islamic-slate mb-4">
                      {leader.bio}
                    </p>
                  </div>
                </AnimatedSectionWrapper>
              ))}
            </div>
            
            <AnimatedSectionWrapper className="text-center mb-16">
              <h2 className="text-3xl font-serif font-bold text-islamic-navy mb-4">
                Departemen Akademik
              </h2>
              <div className="geometric-divider mx-auto"></div>
              <p className="text-islamic-slate max-w-2xl mx-auto">
                Pesantren kami terbagi dalam beberapa departemen khusus yang masing-masing menangani aspek berbeda dari pendidikan santri.
              </p>
            </AnimatedSectionWrapper>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
              {departments.map((dept, index) => (
                <AnimatedSectionWrapper 
                  key={index} 
                  animation="fade-in" 
                  delay={index * 100}
                  className="glass-card p-6 rounded-lg hover:shadow-elegant transition-all duration-300"
                >
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 rounded-full bg-islamic-teal/20 flex items-center justify-center flex-shrink-0">
                      <BookOpen size={24} className="text-islamic-teal" />
                    </div>
                    <div>
                      <h3 className="text-xl font-display font-semibold text-islamic-navy mb-2">
                        {dept.name}
                      </h3>
                      <p className="text-sm text-islamic-teal font-medium mb-3">
                        Penanggung Jawab: {dept.head}
                      </p>
                      <p className="text-sm text-islamic-slate mb-4">
                        {dept.description}
                      </p>
                      <div className="p-4 bg-islamic-navy/5 rounded-lg">
                        <h4 className="text-sm font-medium text-islamic-navy mb-2">
                          Program & Mata Pelajaran:
                        </h4>
                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-1">
                          {dept.programs.map((program, idx) => (
                            <li key={idx} className="text-sm text-islamic-slate flex items-center">
                              <div className="w-1.5 h-1.5 rounded-full bg-islamic-teal mr-2"></div>
                              {program}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </AnimatedSectionWrapper>
              ))}
            </div>
            
            <AnimatedSectionWrapper className="text-center mb-16">
              <h2 className="text-3xl font-serif font-bold text-islamic-navy mb-4">
                Administrasi & Pendukung
              </h2>
              <div className="geometric-divider mx-auto"></div>
              <p className="text-islamic-slate max-w-2xl mx-auto">
                Tim administrasi dan pendukung memastikan seluruh kegiatan pesantren berjalan lancar.
              </p>
            </AnimatedSectionWrapper>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {administrationTeam.map((team, index) => (
                <AnimatedSectionWrapper 
                  key={index} 
                  animation="fade-in" 
                  delay={index * 100}
                  className="glass-card p-6 rounded-lg hover:shadow-elegant transition-all duration-300"
                >
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 rounded-full bg-islamic-gold/20 flex items-center justify-center flex-shrink-0">
                      <Users size={24} className="text-islamic-gold" />
                    </div>
                    <div>
                      <h3 className="text-xl font-display font-semibold text-islamic-navy mb-2">
                        {team.name}
                      </h3>
                      <p className="text-sm text-islamic-gold font-medium mb-3">
                        Penanggung Jawab: {team.head}
                      </p>
                      <div className="p-4 bg-islamic-navy/5 rounded-lg">
                        <h4 className="text-sm font-medium text-islamic-navy mb-2">
                          Posisi Utama:
                        </h4>
                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-1">
                          {team.positions.map((position, idx) => (
                            <li key={idx} className="text-sm text-islamic-slate flex items-center">
                              <div className="w-1.5 h-1.5 rounded-full bg-islamic-gold mr-2"></div>
                              {position}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </AnimatedSectionWrapper>
              ))}
            </div>
          </div>
        </section>
        
        {/* School Information */}
        <PatternBackground className="py-16" patternType="geometric">
          <div className="container mx-auto px-4 md:px-6">
            <AnimatedSectionWrapper className="text-center mb-16">
              <h2 className="text-3xl font-serif font-bold text-islamic-navy mb-4">
                Informasi Pesantren
              </h2>
              <div className="geometric-divider mx-auto"></div>
              <p className="text-islamic-slate max-w-2xl mx-auto">
                Data dan informasi penting tentang Pondok Pesantren Irsyadulhaq.
              </p>
            </AnimatedSectionWrapper>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <AnimatedSectionWrapper 
                animation="scale-in" 
                delay={0}
                className="glass-card p-6 rounded-lg hover:shadow-elegant transition-all duration-300"
              >
                <div className="flex items-center justify-center mb-6">
                  <div className="w-20 h-20 rounded-full bg-islamic-navy/10 flex items-center justify-center">
                    <Users size={36} className="text-islamic-navy" />
                  </div>
                </div>
                <div className="text-center">
                  <h3 className="text-3xl font-serif font-bold text-islamic-navy mb-2">
                    16+
                  </h3>
                  <p className="text-islamic-slate font-medium">
                    Santri Terdaftar
                  </p>
                  <div className="w-16 h-1 bg-islamic-navy/20 mx-auto my-4"></div>
                  <ul className="text-sm text-islamic-slate space-y-2">
                    <li>60% Santri Putra</li>
                   
                    <li>Usia 12-18 tahun</li>
                
                  </ul>
                </div>
              </AnimatedSectionWrapper>
              
              <AnimatedSectionWrapper 
                animation="scale-in" 
                delay={100}
                className="glass-card p-6 rounded-lg hover:shadow-elegant transition-all duration-300"
              >
                <div className="flex items-center justify-center mb-6">
                  <div className="w-20 h-20 rounded-full bg-islamic-emerald/10 flex items-center justify-center">
                    <BookOpen size={36} className="text-islamic-emerald" />
                  </div>
                </div>
                <div className="text-center">
                  <h3 className="text-3xl font-serif font-bold text-islamic-navy mb-2">
                    100+
                  </h3>
                  <p className="text-islamic-slate font-medium">
                    Pengajar & Staf
                  </p>
                  <div className="w-16 h-1 bg-islamic-emerald/20 mx-auto my-4"></div>
                  <ul className="text-sm text-islamic-slate space-y-2">
                    <li>Tenaga Pengajar</li>
                    <li>Asatidz</li>
                    <li>Staf Administrasi</li>
                    <li>Staf Pendukung</li>
                  </ul>
                </div>
              </AnimatedSectionWrapper>
              
              <AnimatedSectionWrapper 
                animation="scale-in" 
                delay={200}
                className="glass-card p-6 rounded-lg hover:shadow-elegant transition-all duration-300"
              >
                <div className="flex items-center justify-center mb-6">
                  <div className="w-20 h-20 rounded-full bg-islamic-gold/10 flex items-center justify-center">
                    <Calendar size={36} className="text-islamic-gold" />
                  </div>
                </div>
                <div className="text-center">
                  <h3 className="text-3xl font-serif font-bold text-islamic-navy mb-2">
                    Sejak 2021
                  </h3>
                  <p className="text-islamic-slate font-medium">
                    Tahun Berkarya
                  </p>
                  <div className="w-16 h-1 bg-islamic-gold/20 mx-auto my-4"></div>
                  <ul className="text-sm text-islamic-slate space-y-2">
                    <li>3 Tahun Beroperasi</li>
                   
                    <li>Tingkat Penerimaan Santri</li>
                    <li>Penghargaan Nasional</li>
                  </ul>
                </div>
              </AnimatedSectionWrapper>
            </div>
          </div>
        </PatternBackground>
        
        {/* Campus Facilities */}
        <section className="py-16 bg-islamic-navy relative overflow-hidden">
          <PatternBackground className="absolute inset-0" patternType="dots" patternColor="#ffffff" patternOpacity={0.05} />
          
          <div className="container mx-auto px-4 md:px-6 relative z-10">
            <AnimatedSectionWrapper className="text-center mb-16">
              <h2 className="text-3xl font-serif font-bold text-white mb-4">
                Fasilitas Pesantren
              </h2>
              <div className="geometric-divider bg-islamic-gold mx-auto"></div>
              <p className="text-islamic-cream/90 max-w-2xl mx-auto">
                Pesantren kami menyediakan fasilitas modern untuk mendukung perkembangan akademik dan pribadi santri.
              </p>
            </AnimatedSectionWrapper>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  icon: <MapPin className="text-islamic-gold" />,
                  title: "Gedung Akademik",
                  items: [
                    "20 Ruang Kelas Modern",
                    "Laboratorium IPA",
                    "Laboratorium Komputer",
                    "Perpustakaan dengan 10.000+ Buku",
                    "Pusat Pembelajaran Bahasa"
                  ]
                },
                {
                  icon: <MapPin className="text-islamic-gold" />,
                  title: "Fasilitas Ibadah",
                  items: [
                    "Masjid Utama",
                    "Aula Tahsin & Tahfidz",
                    "Pusat Kajian Islam",
                    "Mushola di Setiap Gedung",
                    "Tempat Wudhu"
                  ]
                },
                {
                  icon: <MapPin className="text-islamic-gold" />,
                  title: "Fasilitas Asrama",
                  items: [
                    "Asrama Terpisah Putra & Putri",
                    "Ruang Makan",
                    "Area Rekreasi",
                    "Ruang Santai Santri",
                    "Poliklinik"
                  ]
                },
                {
                  icon: <MapPin className="text-islamic-gold" />,
                  title: "Fasilitas Olahraga",
                  items: [
                    "Lapangan Sepak Bola",
                    "Lapangan Basket",
                    "Aula Olahraga Indoor",
                    "Kolam Renang",
                    "Lintasan Atletik"
                  ]
                },
                {
                  icon: <MapPin className="text-islamic-gold" />,
                  title: "Area Ekstrakurikuler",
                  items: [
                    "Studio Seni & Keterampilan",
                    "Ruang Nasyid",
                    "Ruang Klub Debat",
                    "Area Berkebun",
                    "Laboratorium Robotika"
                  ]
                },
                {
                  icon: <MapPin className="text-islamic-gold" />,
                  title: "Fasilitas Pendukung",
                  items: [
                    "Gedung Administrasi",
                    "Ruang Bimbingan Konseling",
                    "Ruang Rapat",
                    "Pusat Informasi Tamu",
                    "Ruang Tunggu Wali Santri"
                  ]
                }
              ].map((facility, index) => (
                <AnimatedSectionWrapper 
                  key={index} 
                  animation="fade-in" 
                  delay={index * 50}
                  className="bg-white/10 backdrop-blur-sm border border-white/20 p-6 rounded-lg hover:bg-white/15 transition-all duration-300"
                >
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-islamic-gold/20 flex items-center justify-center">
                      {facility.icon}
                    </div>
                    <h3 className="text-lg font-display font-semibold text-white">
                      {facility.title}
                    </h3>
                  </div>
                  <ul className="space-y-2">
                    {facility.items.map((item, idx) => (
                      <li key={idx} className="text-sm text-islamic-cream/80 flex items-center">
                        <div className="w-1.5 h-1.5 rounded-full bg-islamic-gold mr-2"></div>
                        {item}
                      </li>
                    ))}
                  </ul>
                </AnimatedSectionWrapper>
              ))}
            </div>
          </div>
        </section>
        
        {/* Contact CTA */}
        <section className="py-16">
          <div className="container mx-auto px-4 md:px-6">
            <AnimatedSectionWrapper className="glass-card max-w-3xl mx-auto p-8 rounded-lg">
              <h2 className="text-2xl font-serif font-bold text-islamic-navy mb-4 text-center">
                {t('contact_title', 'Ingin Berkunjung ke Pesantren Kami?')}
              </h2>
              <p className="text-islamic-slate mb-6 text-center">
                {t('contact_desc', 'Jadwalkan kunjungan untuk melihat langsung lingkungan pesantren dan bertemu para pengajar serta pengurus kami.')}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="#" className="btn-primary">
                  Jadwalkan Kunjungan
                </a>
                <a href="#" className="btn-outline">
                  Hubungi Kami
                </a>
              </div>
            </AnimatedSectionWrapper>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

const Organization: React.FC = () => (
  <PageContentProvider pageKey="organisasi">
    <OrganizationInner />
  </PageContentProvider>
);

export default Organization;
