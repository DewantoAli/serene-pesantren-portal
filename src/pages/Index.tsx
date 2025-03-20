
import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, BookOpen, Users, GraduationCap, Calendar, ArrowRight, MapPin } from 'lucide-react';
import AnimatedSectionWrapper from '@/components/ui/AnimatedSectionWrapper';
import PatternBackground from '@/components/ui/PatternBackground';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

const Index: React.FC = () => {
  return (
    <>
      <Header />
      <main className="overflow-hidden">
        {/* Hero Section */}
        <section className="relative pt-28 pb-20 md:pt-36 md:pb-32 overflow-hidden">
          <div className="absolute inset-0 hero-gradient -z-10 opacity-90"></div>
          <PatternBackground className="absolute inset-0 -z-10 opacity-30" patternType="dots" patternColor="#ffffff" patternOpacity={0.1} />
          
          <div className="container mx-auto px-4 md:px-6 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <AnimatedSectionWrapper animation="fade-in-left" className="text-center lg:text-left">
                <span className="inline-block px-4 py-1 mb-4 rounded-full bg-islamic-gold/20 text-islamic-cream text-sm font-medium">
                  Mendidik Pemimpin Masa Depan
                </span>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white mb-6 leading-tight">
                  Pendidikan Islam <br className="hidden lg:inline" />
                  <span className="text-islamic-sand">Untuk Masa Depan Cerah</span>
                </h1>
                <p className="text-islamic-cream/90 text-lg mb-8 max-w-xl mx-auto lg:mx-0">
                  Pondok Pesantren Irsyadulhaq menggabungkan nilai-nilai Islam tradisional dengan pendidikan modern untuk mengembangkan individu yang utuh.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                  <Link to="/registration" className="btn-accent">
                    Daftar Sekarang
                  </Link>
                  <Link to="/about" className="flex items-center justify-center space-x-2 bg-white/10 backdrop-blur-sm text-white px-6 py-3 rounded-lg hover:bg-white/20 transition-all duration-300">
                    <span>Pelajari Lebih Lanjut</span>
                    <ChevronRight size={18} />
                  </Link>
                </div>
              </AnimatedSectionWrapper>
              
              <AnimatedSectionWrapper animation="fade-in-right" delay={200} className="hidden lg:block relative">
                <div className="relative">
                  <div className="aspect-[4/3] rounded-lg overflow-hidden shadow-elegant">
                    <img 
                      src="https://images.unsplash.com/photo-1579613832125-5d34a13ffe2a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" 
                      alt="Santri di Pondok Pesantren Irsyadulhaq" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute -bottom-8 -left-8 glass-card p-5 rounded-lg max-w-[260px]">
                    <div className="flex items-center space-x-3 mb-3">
                      <div className="w-12 h-12 rounded-full bg-islamic-emerald flex items-center justify-center">
                        <Users size={24} className="text-white" />
                      </div>
                      <div>
                        <p className="text-islamic-navy font-medium">1000+</p>
                        <p className="text-sm text-islamic-navy/70">Santri</p>
                      </div>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-1.5">
                      <div className="bg-islamic-emerald h-1.5 rounded-full w-[85%]"></div>
                    </div>
                  </div>
                  <div className="absolute -top-8 -right-8 glass-card p-5 rounded-lg max-w-[260px]">
                    <div className="flex items-center space-x-3 mb-3">
                      <div className="w-12 h-12 rounded-full bg-islamic-gold flex items-center justify-center">
                        <BookOpen size={24} className="text-islamic-navy" />
                      </div>
                      <div>
                        <p className="text-islamic-navy font-medium">30+</p>
                        <p className="text-sm text-islamic-navy/70">Tahun Pengalaman</p>
                      </div>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-1.5">
                      <div className="bg-islamic-gold h-1.5 rounded-full w-[95%]"></div>
                    </div>
                  </div>
                </div>
              </AnimatedSectionWrapper>
            </div>
          </div>
          
          <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-background to-transparent"></div>
        </section>
        
        {/* Services Section */}
        <section className="py-20">
          <div className="container mx-auto px-4 md:px-6">
            <AnimatedSectionWrapper className="text-center mb-16">
              <span className="inline-block px-4 py-1 mb-4 rounded-full bg-islamic-emerald/10 text-islamic-emerald text-sm font-medium">
                Program Kami
              </span>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-islamic-navy mb-4">
                Pendidikan Islam Komprehensif
              </h2>
              <div className="geometric-divider mx-auto"></div>
              <p className="text-islamic-slate max-w-2xl mx-auto">
                Kami menawarkan berbagai program yang dirancang untuk membina santri secara intelektual, spiritual, dan moral.
              </p>
            </AnimatedSectionWrapper>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  icon: <BookOpen className="text-islamic-emerald" />,
                  title: "Studi Al-Quran",
                  description: "Mempelajari Al-Quran secara mendalam dengan tajwid dan program menghafal yang benar.",
                  delay: 0
                },
                {
                  icon: <GraduationCap className="text-islamic-emerald" />,
                  title: "Keunggulan Akademis",
                  description: "Kurikulum akademis yang ketat mengikuti standar pendidikan nasional.",
                  delay: 100
                },
                {
                  icon: <Users className="text-islamic-emerald" />,
                  title: "Pembentukan Karakter",
                  description: "Mengembangkan nilai-nilai moral, etika, dan keterampilan kepemimpinan pada santri.",
                  delay: 200
                }
              ].map((service, index) => (
                <AnimatedSectionWrapper 
                  key={index} 
                  animation="scale-in" 
                  delay={service.delay}
                  className="glass-card p-6 rounded-lg decorative-corner hover:shadow-elegant transition-shadow duration-300"
                >
                  <div className="w-14 h-14 flex items-center justify-center rounded-lg bg-islamic-emerald/10 mb-5">
                    {service.icon}
                  </div>
                  <h3 className="text-xl font-display font-semibold text-islamic-navy mb-3">
                    {service.title}
                  </h3>
                  <p className="text-islamic-slate mb-4">
                    {service.description}
                  </p>
                  <a href="#" className="islamic-link inline-flex items-center space-x-1 text-islamic-emerald">
                    <span>Pelajari lebih lanjut</span>
                    <ArrowRight size={16} />
                  </a>
                </AnimatedSectionWrapper>
              ))}
            </div>
          </div>
        </section>
        
        {/* About Section Preview */}
        <PatternBackground className="py-20" patternType="geometric">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <AnimatedSectionWrapper animation="fade-in-left" className="order-2 lg:order-1">
                <span className="inline-block px-4 py-1 mb-4 rounded-full bg-islamic-navy/10 text-islamic-navy text-sm font-medium">
                  Tentang Kami
                </span>
                <h2 className="text-3xl md:text-4xl font-serif font-bold text-islamic-navy mb-4">
                  Warisan Keunggulan dalam Pendidikan Islam
                </h2>
                <div className="geometric-divider"></div>
                <p className="text-islamic-slate mb-6">
                  Didirikan pada tahun 1985, Pondok Pesantren Irsyadulhaq telah berdedikasi menyediakan pendidikan Islam berkualitas selama lebih dari tiga dekade. Institusi kami menggabungkan pengajaran Islam tradisional dengan pendekatan pendidikan modern.
                </p>
                <ul className="space-y-3 mb-8">
                  {[
                    "Pendidik yang berkualifikasi dan berpengalaman",
                    "Fasilitas modern dengan nilai-nilai tradisional",
                    "Kurikulum seimbang antara mata pelajaran Islam dan umum",
                    "Lingkungan yang aman dan mendukung untuk santri"
                  ].map((item, index) => (
                    <li key={index} className="flex items-start">
                      <div className="w-5 h-5 rounded-full bg-islamic-teal/20 flex items-center justify-center mt-1 mr-3">
                        <div className="w-2 h-2 rounded-full bg-islamic-teal"></div>
                      </div>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <Link to="/about" className="btn-primary">
                  Jelajahi Kisah Kami
                </Link>
              </AnimatedSectionWrapper>
              
              <AnimatedSectionWrapper animation="fade-in-right" delay={200} className="order-1 lg:order-2">
                <div className="relative">
                  <div className="aspect-[4/3] rounded-lg overflow-hidden shadow-elegant">
                    <img 
                      src="https://images.unsplash.com/photo-1585036156261-1e2b76f1af3c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80" 
                      alt="Gedung Pondok Pesantren Irsyadulhaq" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full flex items-center justify-center bg-islamic-navy/30 backdrop-blur-sm border border-white/20">
                    <div className="w-24 h-24 rounded-full bg-islamic-navy flex items-center justify-center">
                      <span className="font-serif text-lg text-white">Sejak<br/>1985</span>
                    </div>
                  </div>
                </div>
              </AnimatedSectionWrapper>
            </div>
          </div>
        </PatternBackground>
        
        {/* Registration CTA */}
        <section className="py-20 bg-islamic-navy relative overflow-hidden">
          <PatternBackground className="absolute inset-0" patternType="dots" patternColor="#ffffff" patternOpacity={0.05} />
          <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-background to-transparent"></div>
          
          <div className="container mx-auto px-4 md:px-6 relative z-10">
            <AnimatedSectionWrapper className="max-w-3xl mx-auto text-center">
              <span className="inline-block px-4 py-1 mb-4 rounded-full bg-islamic-gold/20 text-islamic-cream text-sm font-medium">
                Pendaftaran Dibuka
              </span>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-4">
                Mulai Perjalanan Anda dengan Irsyadulhaq Hari Ini
              </h2>
              <div className="geometric-divider bg-islamic-gold mx-auto"></div>
              <p className="text-islamic-cream/90 mb-8 max-w-2xl mx-auto">
                Pendaftaran sekarang dibuka untuk tahun ajaran mendatang. Bergabunglah dengan komunitas kami dan mulai perjalanan Anda menuju masa depan cerah yang dipandu oleh prinsip-prinsip Islam.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/registration" className="btn-accent">
                  Daftar Sekarang
                </Link>
                <a href="#" className="btn-outline border-white/20 text-white hover:bg-white/10">
                  Unduh Brosur
                </a>
              </div>
            </AnimatedSectionWrapper>
          </div>
          
          <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-background to-transparent"></div>
        </section>
        
        {/* Upcoming Events */}
        <section className="py-20">
          <div className="container mx-auto px-4 md:px-6">
            <AnimatedSectionWrapper className="text-center mb-16">
              <span className="inline-block px-4 py-1 mb-4 rounded-full bg-islamic-coral/10 text-islamic-coral text-sm font-medium">
                Tetap Terupdate
              </span>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-islamic-navy mb-4">
                Acara Mendatang
              </h2>
              <div className="geometric-divider mx-auto"></div>
              <p className="text-islamic-slate max-w-2xl mx-auto">
                Bergabunglah dengan kami untuk acara pendidikan dan komunitas sepanjang tahun.
              </p>
            </AnimatedSectionWrapper>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  date: "15 Juni 2023",
                  title: "Hari Open House",
                  description: "Kunjungi kampus kami, temui guru dan pelajari kurikulum kami.",
                  location: "Kampus Utama",
                  delay: 0
                },
                {
                  date: "10 Juli 2023",
                  title: "Lomba Menghafal Al-Quran",
                  description: "Kompetisi tahunan yang menampilkan keterampilan menghafal Al-Quran santri.",
                  location: "Aula Utama",
                  delay: 100
                },
                {
                  date: "5 Agustus 2023",
                  title: "Orientasi Tahun Ajaran Baru",
                  description: "Sesi penyambutan untuk santri baru yang bergabung dengan komunitas kami.",
                  location: "Area Pertemuan",
                  delay: 200
                }
              ].map((event, index) => (
                <AnimatedSectionWrapper 
                  key={index} 
                  animation="scale-in" 
                  delay={event.delay}
                  className="glass-card p-6 rounded-lg hover:shadow-elegant transition-all duration-300"
                >
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-12 h-12 rounded-full bg-islamic-coral/10 flex items-center justify-center">
                      <Calendar size={20} className="text-islamic-coral" />
                    </div>
                    <span className="text-sm text-islamic-coral font-medium">{event.date}</span>
                  </div>
                  <h3 className="text-xl font-display font-semibold text-islamic-navy mb-3">
                    {event.title}
                  </h3>
                  <p className="text-islamic-slate mb-4">
                    {event.description}
                  </p>
                  <div className="flex items-center space-x-2 text-sm text-islamic-slate mb-4">
                    <MapPin size={16} />
                    <span>{event.location}</span>
                  </div>
                  <a href="#" className="islamic-link inline-flex items-center space-x-1 text-islamic-coral">
                    <span>Pelajari lebih lanjut</span>
                    <ArrowRight size={16} />
                  </a>
                </AnimatedSectionWrapper>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Index;
