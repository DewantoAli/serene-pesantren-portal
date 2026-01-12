
import React, { useEffect, useState } from 'react';
import { Calendar, MapPin, Users, Clock } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AnimatedSectionWrapper from '@/components/ui/AnimatedSectionWrapper';
import { supabase } from '@/integrations/supabase/client';

interface Activity {
  id: string;
  title: string;
  description: string | null;
  date: string;
  time: string | null;
  location: string | null;
  participants: string | null;
  media_type: string | null;
  media_url: string | null;
}

const KegiatanSantri: React.FC = () => {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchActivities = async () => {
      const { data, error } = await supabase
        .from('activities')
        .select('*')
        .eq('is_published', true)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching activities:', error);
      } else {
        setActivities(data || []);
      }
      setIsLoading(false);
    };

    fetchActivities();
  }, []);

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

            {isLoading ? (
              <div className="flex justify-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-islamic-teal"></div>
              </div>
            ) : activities.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-islamic-slate">Belum ada kegiatan yang dipublikasikan.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {activities.map((activity, index) => (
                  <AnimatedSectionWrapper 
                    key={activity.id}
                    animation="scale-in"
                    delay={index * 100}
                  >
                    <Card className="h-full overflow-hidden hover:shadow-elegant transition-all duration-300 group">
                      <div className="relative overflow-hidden">
                        {activity.media_type === 'image' || activity.media_type === null ? (
                          activity.media_url ? (
                            <img 
                              src={activity.media_url} 
                              alt={activity.title}
                              className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                            />
                          ) : (
                            <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
                              <span className="text-gray-400">No Image</span>
                            </div>
                          )
                        ) : (
                          <div className="w-full h-48 bg-black">
                            <iframe
                              src={activity.media_url || ''}
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
                          {activity.media_type === 'image' || activity.media_type === null ? 'Foto' : 'Video'}
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
                          {activity.time && (
                            <div className="flex items-center text-sm text-islamic-slate">
                              <Clock size={16} className="mr-2 text-islamic-teal" />
                              <span>{activity.time}</span>
                            </div>
                          )}
                          
                          {activity.location && (
                            <div className="flex items-center text-sm text-islamic-slate">
                              <MapPin size={16} className="mr-2 text-islamic-teal" />
                              <span>{activity.location}</span>
                            </div>
                          )}
                          
                          {activity.participants && (
                            <div className="flex items-center text-sm text-islamic-slate">
                              <Users size={16} className="mr-2 text-islamic-teal" />
                              <span>{activity.participants}</span>
                            </div>
                          )}
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
            )}
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
