
import React from 'react';
import { Calendar, MapPin, Users, Clock } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AnimatedSectionWrapper from '@/components/ui/AnimatedSectionWrapper';

const KegiatanSantri: React.FC = () => {
  const activities = [
    {
      id: 1,
      title: "Kajian Tafsir Al-Quran",
      date: "15 Januari 2025",
      time: "08:00 - 10:00",
      location: "Masjid Utama",
      participants: "Seluruh Santri",
      media: { type: 'image' as const, url: "https://ik.imagekit.io/uzuuvayyu/3.jpeg?updatedAt=1749089018271" },
      description: "Kajian mendalam tentang tafsir Al-Quran dengan menggunakan pendekatan klasik dan kontemporer."
    },
    {
      id: 2,
      title: "Kompetisi Hafalan Quran",
      date: "22 Januari 2025",
      time: "14:00 - 17:00",
      location: "Aula Pesantren",
      participants: "Santri Tahfidz",
      media: { type: 'video' as const, url: "https://www.youtube.com/shorts/6NO0tb6TcVo" },
      description: "Kompetisi tahunan untuk menguji kemampuan hafalan Al-Quran santri dengan berbagai kategori."
    },
    {
      id: 3,
      title: "Bakti Sosial Masyarakat",
      date: "28 Januari 2025",
      time: "06:00 - 12:00",
      location: "Desa Sekitar",
      participants: "Santri Kelas Atas",
      media: { type: 'image' as const, url: "https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b?w=800&h=600&fit=crop" },
      description: "Kegiatan pengabdian masyarakat berupa pembersihan lingkungan dan bantuan sosial."
    },
    {
      id: 4,
      title: "Halaqah Kitab Kuning",
      date: "5 Februari 2025",
      time: "19:30 - 21:00",
      location: "Ruang Kajian",
      participants: "Santri Senior",
      media: { type: 'video' as const, url: "https://www.youtube.com/embed/ScMzIvxBSi4" },
      description: "Pembahasan kitab-kitab klasik Islam dengan metode tradisional halaqah."
    },
    {
      id: 5,
      title: "Rihlah Ilmiah",
      date: "12 Februari 2025",
      time: "05:00 - 18:00",
      location: "Masjid Bersejarah",
      participants: "Seluruh Santri",
      media: { type: 'image' as const, url: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&h=600&fit=crop" },
      description: "Perjalanan edukatif mengunjungi tempat-tempat bersejarah Islam untuk memperluas wawasan."
    },
    {
      id: 6,
      title: "Lomba Kaligrafi Arab",
      date: "18 Februari 2025",
      time: "13:00 - 16:00",
      location: "Ruang Seni",
      participants: "Santri Berbakat",
      media: { type: 'video' as const, url: "https://www.youtube.com/embed/jfKfPfyJRdk" },
      description: "Kompetisi seni kaligrafi Arab untuk mengembangkan kreativitas dan kecintaan terhadap seni Islam."
    }
  ];

  return (
    <>
      <Header />
      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-16 bg-gradient-to-r from-islamic-navy to-islamic-teal text-white">
          <div className="container mx-auto px-4 md:px-6">
            <AnimatedSectionWrapper className="text-center">
              <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">
                Kegiatan Santri
              </h1>
              <p className="text-xl text-islamic-cream/90 max-w-3xl mx-auto">
                Berbagai aktivitas edukatif dan pengembangan diri yang diselenggarakan untuk membentuk karakter santri yang berakhlak mulia
              </p>
            </AnimatedSectionWrapper>
          </div>
        </section>

        {/* Activities Grid */}
        <section className="py-20">
          <div className="container mx-auto px-4 md:px-6">
            <AnimatedSectionWrapper className="text-center mb-12">
              <span className="inline-block px-4 py-1 mb-4 rounded-full bg-islamic-teal/10 text-islamic-teal text-sm font-medium">
                Agenda Terbaru
              </span>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-islamic-navy mb-4">
                Kegiatan Mendatang
              </h2>
              <div className="geometric-divider mx-auto"></div>
            </AnimatedSectionWrapper>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {activities.map((activity, index) => (
                <AnimatedSectionWrapper 
                  key={activity.id}
                  animation="scale-in"
                  delay={index * 100}
                >
                  <Card className="h-full overflow-hidden hover:shadow-elegant transition-all duration-300 group">
                    <div className="relative overflow-hidden">
                      {activity.media.type === 'image' ? (
                        <img 
                          src={activity.media.url} 
                          alt={activity.title}
                          className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                      ) : (
                        <div className="w-full h-48 bg-black">
                          <iframe
                            src={activity.media.url}
                            className="w-full h-full"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                          />
                        </div>
                      )}
                      <div className="absolute top-4 left-4 bg-islamic-navy/80 text-white px-3 py-1 rounded-full text-sm">
                        {activity.date}
                      </div>
                      <div className="absolute top-4 right-4 bg-islamic-teal/80 text-white px-2 py-1 rounded text-xs">
                        {activity.media.type === 'image' ? 'Foto' : 'Video'}
                      </div>
                    </div>
                    
                    <CardHeader>
                      <CardTitle className="text-islamic-navy text-xl font-display">
                        {activity.title}
                      </CardTitle>
                    </CardHeader>
                    
                    <CardContent className="space-y-4">
                      <p className="text-islamic-slate text-sm leading-relaxed">
                        {activity.description}
                      </p>
                      
                      <div className="space-y-2">
                        <div className="flex items-center text-sm text-islamic-slate">
                          <Clock size={16} className="mr-2 text-islamic-teal" />
                          <span>{activity.time}</span>
                        </div>
                        
                        <div className="flex items-center text-sm text-islamic-slate">
                          <MapPin size={16} className="mr-2 text-islamic-teal" />
                          <span>{activity.location}</span>
                        </div>
                        
                        <div className="flex items-center text-sm text-islamic-slate">
                          <Users size={16} className="mr-2 text-islamic-teal" />
                          <span>{activity.participants}</span>
                        </div>
                      </div>
                      
                      <div className="pt-4 border-t border-gray-100">
                        <button className="w-full bg-islamic-teal/10 text-islamic-teal hover:bg-islamic-teal hover:text-white transition-colors duration-300 py-2 px-4 rounded-lg text-sm font-medium">
                          Lihat Detail
                        </button>
                      </div>
                    </CardContent>
                  </Card>
                </AnimatedSectionWrapper>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-islamic-cream/10">
          <div className="container mx-auto px-4 md:px-6">
            <AnimatedSectionWrapper className="text-center">
              <h3 className="text-2xl md:text-3xl font-serif font-bold text-islamic-navy mb-4">
                Ingin Bergabung dengan Kegiatan Kami?
              </h3>
              <p className="text-islamic-slate mb-8 max-w-2xl mx-auto">
                Daftarkan diri Anda sebagai santri di Pondok Pesantren Irsyadul Haq dan ikuti berbagai kegiatan menarik yang akan mengembangkan potensi diri Anda.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="btn-primary">
                  Daftar Sekarang
                </button>
                <button className="btn-outline">
                  Hubungi Kami
                </button>
              </div>
            </AnimatedSectionWrapper>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default KegiatanSantri;
