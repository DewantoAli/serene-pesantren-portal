import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Calendar, MapPin, Play } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface Activity {
  id: string;
  title: string;
  description: string | null;
  date: string;
  location: string | null;
  media_type: string | null;
  media_url: string | null;
}

/** Extract a YouTube video ID from any common YouTube URL form. */
function youtubeId(url: string): string | null {
  const m = url.match(/(?:youtube\.com\/(?:embed\/|watch\?v=|v\/)|youtu\.be\/)([\w-]{11})/);
  return m ? m[1] : null;
}

/** Resolve a thumbnail image URL for an activity. */
function thumbUrl(a: Activity): string | null {
  if (a.media_type === 'image' || !a.media_type) {
    return a.media_url || null;
  }
  // video: try YouTube thumbnail
  if (a.media_url) {
    const ytId = youtubeId(a.media_url);
    if (ytId) return `https://img.youtube.com/vi/${ytId}/hqdefault.jpg`;
  }
  return null;
}

const KegiatanPreview: React.FC = () => {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      const { data, error } = await supabase
        .from('activities')
        .select('id, title, description, date, location, media_type, media_url')
        .eq('is_published', true)
        .order('created_at', { ascending: false })
        .limit(3);

      if (!error && data) setActivities(data);
      setIsLoading(false);
    };
    fetch();
  }, []);

  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <p className="text-xs uppercase tracking-[0.2em] text-primary mb-4">Kegiatan Santri</p>
            <h2 className="font-serif text-4xl md:text-5xl leading-tight text-foreground">
              Dokumentasi <em className="italic text-islamic-gold">terbaru</em>.
            </h2>
          </div>
          <Link to="/kegiatan-santri" className="inline-flex items-center gap-2 text-sm text-primary hover:underline">
            Lihat semua kegiatan <ArrowRight size={14} />
          </Link>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[0, 1, 2].map((i) => (
              <div key={i} className="aspect-[4/5] rounded-2xl bg-muted/40 animate-pulse" />
            ))}
          </div>
        ) : activities.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">
            <p>Belum ada kegiatan yang dipublikasikan.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {activities.map((a) => (
              <Link
                key={a.id}
                to="/kegiatan-santri"
                className="group block bg-card border border-border rounded-2xl overflow-hidden hover:shadow-elegant hover:-translate-y-1 transition-all duration-300"
              >
                <div className="relative aspect-[3/2] overflow-hidden">
                  {(() => {
                    const thumb = thumbUrl(a);
                    return thumb ? (
                      <>
                        <img
                          src={thumb}
                          alt={a.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          loading="lazy"
                        />
                        {a.media_type === 'video' && (
                          <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/30 transition-colors">
                            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-white/90 group-hover:scale-110 transition-transform">
                              <Play size={20} className="text-foreground ml-0.5" fill="currentColor" />
                            </div>
                          </div>
                        )}
                      </>
                    ) : (
                      <div className="w-full h-full bg-muted flex items-center justify-center">
                        <Calendar className="text-muted-foreground/40" size={32} />
                      </div>
                    );
                  })()}
                  <div className="absolute top-3 left-3 inline-flex items-center gap-1 bg-foreground/70 backdrop-blur-sm text-background px-3 py-1 rounded-full text-xs font-medium">
                    <Calendar size={12} />
                    {a.date}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-serif text-xl text-foreground mb-2 line-clamp-2">{a.title}</h3>
                  {a.description && (
                    <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">{a.description}</p>
                  )}
                  {a.location && (
                    <div className="mt-4 flex items-center gap-1.5 text-xs text-muted-foreground">
                      <MapPin size={12} />
                      <span>{a.location}</span>
                    </div>
                  )}
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default KegiatanPreview;
