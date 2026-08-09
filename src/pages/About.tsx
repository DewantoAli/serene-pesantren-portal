
import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, BookOpen, Users, GraduationCap, Clock, ArrowRight, Award, Target, MapPin } from 'lucide-react';
import AnimatedSectionWrapper from '@/components/ui/AnimatedSectionWrapper';
import PatternBackground from '@/components/ui/PatternBackground';
import Header from '@/components/layout/Header';
import Seo from '@/components/seo/Seo';
import Footer from '@/components/layout/Footer';
import { PageContentProvider, usePageContent } from '@/hooks/usePageContent';

const AboutInner: React.FC = () => {
  const { t } = usePageContent();
  // Core values data
  const coreValues = [
    {
      icon: <BookOpen className="text-islamic-navy" />,
      title: "Ilmu Syar'i",
      description: "Kami mengutamakan pengajaran ilmu Islam yang otentik berlandaskan Al-Quran dan As-Sunnah."
    },
    {
      icon: <GraduationCap className="text-islamic-navy" />,
      title: "Keunggulan Akademik",
      description: "Kami berupaya mencapai standar prestasi akademik tertinggi pada seluruh mata pelajaran."
    },
    {
      icon: <Users className="text-islamic-navy" />,
      title: "Pembentukan Karakter",
      description: "Kami menekankan pembinaan akhlak, adab, dan kepribadian Islami pada setiap santri."
    },
    {
      icon: <Target className="text-islamic-navy" />,
      title: "Pengembangan Diri",
      description: "Kami menumbuhkan kemampuan kepemimpinan, kreativitas, dan berpikir kritis."
    },
    {
      icon: <Award className="text-islamic-navy" />,
      title: "Pengabdian & Tanggung Jawab",
      description: "Kami menanamkan semangat mengabdi dan rasa tanggung jawab kepada masyarakat."
    },
    {
      icon: <Clock className="text-islamic-navy" />,
      title: "Belajar Sepanjang Hayat",
      description: "Kami menanamkan kecintaan untuk terus belajar dan memperbaiki diri sepanjang hidup."
    }
  ];

  return (
    <>
      <Seo title="Tentang Kami | Pondok Pesantren Irsyadulhaq Manado" description="Profil, visi misi, dan nilai-nilai Pondok Pesantren Irsyadulhaq Manado dalam mendidik santri dengan ilmu syar’i, akhlak mulia, dan kurikulum terpadu." path="/about" />
      <Header />
      <main className="pt-28 pb-20 overflow-hidden">
        {/* Hero Section */}
        <section className="relative py-16 overflow-hidden">
          <div className="absolute inset-0 hero-gradient -z-10 opacity-90"></div>
          <PatternBackground className="absolute inset-0 -z-10 opacity-30" patternType="dots" patternColor="#ffffff" patternOpacity={0.1} />
          
          <div className="container mx-auto px-4 md:px-6 relative z-10">
            <AnimatedSectionWrapper className="text-center mb-8">
              <span className="inline-block px-4 py-1 mb-4 rounded-full bg-islamic-gold/20 text-islamic-cream text-sm font-medium">
                {t('hero_badge', 'Kisah Kami')}
              </span>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-white mb-4">
                {t('hero_title', 'Tentang Irsyadul Haq Manado')}
              </h1>
              <p className="text-islamic-cream/90 max-w-2xl mx-auto">
                {t('hero_desc', 'Kenali perjalanan, misi, dan visi kami dalam menghadirkan pendidikan Islam yang unggul.')}
              </p>
            </AnimatedSectionWrapper>
          </div>
        </section>
        
        {/* Our Story Section */}
        <section className="py-16">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <AnimatedSectionWrapper animation="fade-in-left" className="order-2 lg:order-1">
                <span className="inline-block px-4 py-1 mb-4 rounded-full bg-islamic-navy/10 text-islamic-navy text-sm font-medium">
                  Sejarah Kami
                </span>
                <h2 className="text-3xl md:text-4xl font-serif font-bold text-islamic-navy mb-4">
                  {t('story_title', 'A Legacy of Islamic Education Excellence')}
                </h2>
                <div className="geometric-divider"></div>
                <p className="text-islamic-slate mb-4">
                  {t('story_p1', "Pesantren Irsyadul Haq didirikan pada tahun 2021 dengan visi Mencetak generasi Rabbani dan Beraqidah lurus yang berlandaskan Al Qur'an dan As sunnah sebagaimana Pemahaman Salafush Shalih.")}
                </p>
                <p className="text-islamic-slate mb-6">
                  {t('story_p2', 'Dimulai dengan hanya 5 Santri dan 3 Ustadz di tempat sederhana, pesantren kami telah berkembang menjadi Pesantren ternama dengan lebih dari 20 Santri, fasilitas modern, dan kurikulum komprehensif yang menyeimbangkan studi Islam dengan keunggulan akademis.')}
                </p>
                <p className="text-islamic-slate mb-8">
                  {t('story_p3', 'Selama ini, kami tetap berkomitmen pada prinsip-prinsip dasar kami sambil beradaptasi dengan lanskap pendidikan yang terus berubah. Saat ini, Irsyadulhaq berdiri sebagai bukti dedikasi kami untuk menyediakan pendidikan Islam berkualitas yang mempersiapkan Santri untuk sukses di dunia dan akhirat.')}
                </p>
                <Link to="/organization" className="btn-primary inline-flex items-center space-x-2">
                  <span>Lihat Struktur Organisasi</span>
                  <ChevronRight size={18} />
                </Link>
              </AnimatedSectionWrapper>
              
              <AnimatedSectionWrapper animation="fade-in-right" delay={200} className="order-1 lg:order-2">
                <div className="relative">
                  <div className="aspect-[4/3] rounded-lg overflow-hidden shadow-elegant">
                    <img
                      src={t('story_image', 'https://ik.imagekit.io/uzuuvayyu/WhatsApp%20Image%202025-02-22%20at%209.56.40%20AM.jpeg?updatedAt=1742526180427')}
                      alt="Gedung Pondok Pesantren Irsyadulhaq Manado"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  <div className="absolute -bottom-10 -right-10 glass-card p-5 rounded-lg max-w-[260px]">
                    <div className="flex items-center space-x-3 mb-3">
                      <div className="w-12 h-12 rounded-full bg-islamic-gold flex items-center justify-center">
                        <Clock size={24} className="text-islamic-navy" />
                      </div>
                      <div>
                        <p className="text-islamic-navy font-medium">38+ Tahun</p>
                        <p className="text-sm text-islamic-navy/70">Pengalaman Pendidikan</p>
                      </div>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-1.5">
                      <div className="bg-islamic-gold h-1.5 rounded-full w-full"></div>
                    </div>
                  </div>
                </div>
              </AnimatedSectionWrapper>
            </div>
          </div>
        </section>
        
        {/* Mission & Vision */}
        <PatternBackground className="py-16" patternType="geometric">
          <div className="container mx-auto px-4 md:px-6">
            <AnimatedSectionWrapper className="text-center mb-16">
              <h2 className="text-3xl font-serif font-bold text-islamic-navy mb-4">
                Misi & Visi
              </h2>
              <div className="geometric-divider mx-auto"></div>
              <p className="text-islamic-slate max-w-2xl mx-auto">
                Prinsip yang kami pegang dan cita-cita kami untuk masa depan.
              </p>
            </AnimatedSectionWrapper>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <AnimatedSectionWrapper 
                animation="scale-in" 
                className="glass-card p-8 rounded-lg hover:shadow-elegant transition-all duration-300"
              >
                <div className="text-center mb-6">
                  <div className="w-16 h-16 rounded-full bg-islamic-teal/10 flex items-center justify-center mx-auto">
                    <div className="w-12 h-12 rounded-full bg-islamic-teal flex items-center justify-center">
                      <span className="text-white font-serif text-xl">M</span>
                    </div>
                  </div>
                  <h3 className="text-2xl font-display font-semibold text-islamic-navy mt-4">
                    Misi Kami
                  </h3>
                </div>
               
                <ul className="space-y-3">
                  {[
                    "Menanamkan sifat Amanah dan Akhlakul karimah berdasarkan tuntunan syari'at Islam",
                    "Menjalankan pendidikan yang berkelanjutan, aktif, tertib, disiplin dan efisien",
                    "Membekali Ilmu Alat sebagai modal memahami Ilmu Ghoyah",
                    "Menciptakan Tempat Belajar yang sehat, aman dan menyenangkan",
                    "Memperkuat, mengembangkan serta mendakwahkan pemahaman islam berdasarkan Al Qur'an dan As Sunnah secara berkesinambungan",
                    "Membentuk Santri yang cinta dan bangga terhadap Negara Kesatuan Republik Indonesia"
                  ].map((item, index) => (
                    <li key={index} className="flex items-start">
                      <div className="w-5 h-5 rounded-full bg-islamic-teal/20 flex items-center justify-center mt-1 mr-3">
                        <div className="w-2 h-2 rounded-full bg-islamic-teal"></div>
                      </div>
                      <span className="text-islamic-slate">{item}</span>
                    </li>
                  ))}
                </ul>
              </AnimatedSectionWrapper>
              
              <AnimatedSectionWrapper 
                animation="scale-in" 
                delay={200}
                className="glass-card p-8 rounded-lg hover:shadow-elegant transition-all duration-300"
              >
                <div className="text-center mb-6">
                  <div className="w-16 h-16 rounded-full bg-islamic-gold/10 flex items-center justify-center mx-auto">
                    <div className="w-12 h-12 rounded-full bg-islamic-gold flex items-center justify-center">
                      <span className="text-islamic-navy font-serif text-xl">V</span>
                    </div>
                  </div>
                  <h3 className="text-2xl font-display font-semibold text-islamic-navy mt-4">
                    Visi Kami
                  </h3>
                </div>
                <p className="text-islamic-slate text-center mb-6">
                 Mencetak generasi Rabbani dan Beraqidah lurus yang berlandaskan Al Qur'an dan As sunnah sebagaimana Pemahaman Salafush Shalih
                </p>
                <ul className="space-y-3">
                  {[
                    "Menjadi pusat keunggulan dalam pendidikan Islam",
                    "Menetapkan standar baru kurikulum terpadu Islam dan akademik",
                    "Mengembangkan metode pengajaran inovatif yang menjaga tradisi keilmuan Islam",
                    "Membangun reputasi dalam mencetak lulusan yang berilmu dan berakhlak",
                    "Menjadi model pendidikan berbasis nilai yang berkelanjutan"
                  ].map((item, index) => (
                    <li key={index} className="flex items-start">
                      <div className="w-5 h-5 rounded-full bg-islamic-gold/20 flex items-center justify-center mt-1 mr-3">
                        <div className="w-2 h-2 rounded-full bg-islamic-gold"></div>
                      </div>
                      <span className="text-islamic-slate">{item}</span>
                    </li>
                  ))}
                </ul>
              </AnimatedSectionWrapper>
            </div>
          </div>
        </PatternBackground>
        
        {/* Core Values */}
        <section className="py-16">
          <div className="container mx-auto px-4 md:px-6">
            <AnimatedSectionWrapper className="text-center mb-16">
              <h2 className="text-3xl font-serif font-bold text-islamic-navy mb-4">
                Nilai-Nilai Utama Kami
              </h2>
              <div className="geometric-divider mx-auto"></div>
              <p className="text-islamic-slate max-w-2xl mx-auto">
                Prinsip dasar yang menjadi pedoman pendidikan dan kehidupan di pesantren kami.
              </p>
            </AnimatedSectionWrapper>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {coreValues.map((value, index) => (
                <AnimatedSectionWrapper 
                  key={index} 
                  animation="scale-in" 
                  delay={index * 100}
                  className="glass-card p-6 rounded-lg decorative-corner hover:shadow-elegant transition-all duration-300"
                >
                  <div className="w-14 h-14 flex items-center justify-center rounded-lg bg-islamic-navy/10 mb-5">
                    {value.icon}
                  </div>
                  <h3 className="text-xl font-display font-semibold text-islamic-navy mb-3">
                    {value.title}
                  </h3>
                  <p className="text-islamic-slate mb-4">
                    {value.description}
                  </p>
                </AnimatedSectionWrapper>
              ))}
            </div>
          </div>
        </section>
        
        {/* Testimonials */}
        <section className="py-16">
          <div className="container mx-auto px-4 md:px-6">
            <AnimatedSectionWrapper className="text-center mb-16">
              <span className="inline-block px-4 py-1 mb-4 rounded-full bg-islamic-emerald/10 text-islamic-emerald text-sm font-medium">
                Testimoni
              </span>
              <h2 className="text-3xl font-serif font-bold text-islamic-navy mb-4">
                Apa Kata Mereka
              </h2>
              <div className="geometric-divider mx-auto"></div>
              <p className="text-islamic-slate max-w-2xl mx-auto">
                Simak pengalaman para santri, wali santri, dan alumni Irsyadul Haq.
              </p>
            </AnimatedSectionWrapper>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  quote: "Belajar di Irsyadulhaq benar-benar mengubah diri saya. Bukan hanya ilmu yang bertambah, tetapi juga kedekatan saya dengan agama.",
                  name: "Hassan Ahmad",
                  role: "Santri Kelas 11",
                  photo: "https://ik.imagekit.io/uzuuvayyu/250x250%20px.jpg?updatedAt=1742526171703"
                },
                {
                  quote: "Sebagai orang tua, saya kagum bagaimana pesantren ini menyeimbangkan prestasi akademik dengan nilai-nilai Islam. Anak-anak saya berkembang baik dalam ilmu maupun akhlak.",
                  name: "Fatima Rahman",
                  role: "Wali dari Dua Santri",
                  photo: "https://ik.imagekit.io/uzuuvayyu/250x250%20px.jpg?updatedAt=1742526171703"
                },
                {
                  quote: "Nilai-nilai dan pendidikan yang saya terima di Irsyadulhaq menjadi fondasi keberhasilan saya. Saya bangga menjadi alumni pesantren ini.",
                  name: "Dr. Yusuf Ibrahim",
                  role: "Alumni Angkatan 2005",
                  photo: "https://ik.imagekit.io/uzuuvayyu/250x250%20px.jpg?updatedAt=1742526171703"
                }
              ].map((testimonial, index) => (
                <AnimatedSectionWrapper 
                  key={index} 
                  animation="scale-in" 
                  delay={index * 100}
                  className="glass-card p-6 rounded-lg hover:shadow-elegant transition-all duration-300"
                >
                  <div className="mb-6">
                    <svg className="h-8 w-8 text-islamic-emerald/30" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                    </svg>
                  </div>
                  <p className="text-islamic-slate mb-6 italic">
                    "{testimonial.quote}"
                  </p>
                  <div className="flex items-center">
                    <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                      <img 
                        src={testimonial.photo} 
                        alt={testimonial.name} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="font-medium text-islamic-navy">{testimonial.name}</h4>
                      <p className="text-sm text-islamic-slate">{testimonial.role}</p>
                    </div>
                  </div>
                </AnimatedSectionWrapper>
              ))}
            </div>
          </div>
        </section>
        
        {/* Join Us CTA */}
        <PatternBackground className="py-16" patternType="geometric">
          <div className="container mx-auto px-4 md:px-6">
            <AnimatedSectionWrapper className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-serif font-bold text-islamic-navy mb-4">
                Bergabunglah Bersama Kami
              </h2>
              <div className="geometric-divider mx-auto"></div>
              <p className="text-islamic-slate mb-8 max-w-2xl mx-auto">
                Jadilah bagian dari keluarga besar Pondok Pesantren Irsyadulhaq. Pendaftaran untuk tahun ajaran mendatang telah dibuka.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/new-student" className="btn-primary inline-flex items-center space-x-2">
                  <span>Daftar Sekarang</span>
                  <ArrowRight size={18} />
                </Link>
                <Link to="/organization" className="btn-outline">
                  Selengkapnya
                </Link>
              </div>
            </AnimatedSectionWrapper>
          </div>
        </PatternBackground>
      </main>
      <Footer />
    </>
  );
};

const About: React.FC = () => (
  <PageContentProvider pageKey="tentang">
    <AboutInner />
  </PageContentProvider>
);

export default About;
