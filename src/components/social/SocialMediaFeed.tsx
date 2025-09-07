import React, { useState, useEffect } from 'react';
import { Instagram, Facebook, Youtube, ExternalLink, Calendar, Heart, MessageCircle, Share2 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

interface SocialPost {
  id: string;
  platform: 'instagram' | 'facebook' | 'youtube';
  title: string;
  content: string;
  image?: string;
  video?: string;
  url: string;
  likes: number;
  comments: number;
  shares?: number;
  date: string;
  thumbnail?: string;
}

const SocialMediaFeed: React.FC = () => {
  const [posts, setPosts] = useState<SocialPost[]>([]);
  const [loading, setLoading] = useState(false);
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null);
  const { toast } = useToast();

  // Mock data for demo - will be replaced with API calls
  const mockPosts: SocialPost[] = [
    {
      id: '1',
      platform: 'instagram',
      title: 'Kegiatan Tahfidz Pagi',
      content: 'Para santri memulai hari dengan muraja\'ah Al-Quran',
      image: '/lovable-uploads/3e4352c1-687f-47e6-ad0f-ea924c3a58ef.png',
      url: 'https://instagram.com/p/example1',
      likes: 124,
      comments: 15,
      date: '2024-01-15T08:00:00Z'
    },
    {
      id: '2',
      platform: 'youtube',
      title: 'Kajian Tafsir Surat Al-Baqarah',
      content: 'Ustadz memberikan penjelasan mendalam tentang ayat-ayat pilihan',
      thumbnail: '/lovable-uploads/df6366a9-1018-4237-bffb-263beadecc59.png',
      url: 'https://youtube.com/watch?v=example2',
      likes: 89,
      comments: 23,
      date: '2024-01-14T15:30:00Z'
    },
    {
      id: '3',
      platform: 'facebook',
      title: 'Pengumuman Wisuda Santri',
      content: 'Alhamdulillah, 45 santri telah menyelesaikan program tahfidz 30 juz',
      image: '/lovable-uploads/3e4352c1-687f-47e6-ad0f-ea924c3a58ef.png',
      url: 'https://facebook.com/irsyadulhaq.manado/posts/example3',
      likes: 156,
      comments: 42,
      shares: 28,
      date: '2024-01-13T10:15:00Z'
    }
  ];

  const fetchSocialMediaData = async () => {
    setLoading(true);
    try {
      // TODO: Replace with actual API calls when Supabase is integrated
      // This will call edge functions that securely use API keys
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setPosts(mockPosts);
      setLastUpdate(new Date());
      
      toast({
        title: "Berhasil",
        description: "Feed media sosial telah diperbarui",
      });
    } catch (error) {
      console.error('Error fetching social media data:', error);
      toast({
        title: "Error",
        description: "Gagal memperbarui feed media sosial",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSocialMediaData();
    
    // Auto-refresh every 30 minutes
    const interval = setInterval(fetchSocialMediaData, 30 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case 'instagram':
        return <Instagram size={16} className="text-pink-500" />;
      case 'facebook':
        return <Facebook size={16} className="text-blue-600" />;
      case 'youtube':
        return <Youtube size={16} className="text-red-500" />;
      default:
        return null;
    }
  };

  const getPlatformColor = (platform: string) => {
    switch (platform) {
      case 'instagram':
        return 'from-pink-500 to-purple-600';
      case 'facebook':
        return 'from-blue-600 to-blue-700';
      case 'youtube':
        return 'from-red-500 to-red-600';
      default:
        return 'from-gray-500 to-gray-600';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="font-display text-xl font-semibold text-islamic-navy">
          Feed Media Sosial
        </h3>
        <div className="flex items-center space-x-4">
          {lastUpdate && (
            <span className="text-xs text-islamic-slate">
              Terakhir diperbarui: {lastUpdate.toLocaleTimeString('id-ID')}
            </span>
          )}
          <Button
            onClick={fetchSocialMediaData}
            disabled={loading}
            size="sm"
            variant="outline"
          >
            {loading ? 'Memperbarui...' : 'Perbarui'}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {posts.map((post) => (
          <Card key={post.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
            <CardContent className="p-0">
              {/* Platform Header */}
              <div className={`bg-gradient-to-r ${getPlatformColor(post.platform)} p-3`}>
                <div className="flex items-center space-x-2">
                  {getPlatformIcon(post.platform)}
                  <span className="text-white text-sm font-medium capitalize">
                    {post.platform}
                  </span>
                  <div className="flex items-center text-white/80 text-xs ml-auto">
                    <Calendar size={12} className="mr-1" />
                    {formatDate(post.date)}
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-4">
                <h4 className="font-medium text-islamic-navy mb-2 line-clamp-2">
                  {post.title}
                </h4>
                <p className="text-sm text-islamic-slate mb-3 line-clamp-3">
                  {post.content}
                </p>

                {/* Media */}
                {(post.image || post.thumbnail) && (
                  <div className="mb-3 rounded-lg overflow-hidden">
                    <img 
                      src={post.image || post.thumbnail} 
                      alt={post.title}
                      className="w-full h-40 object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                )}

                {/* Engagement Stats */}
                <div className="flex items-center justify-between text-xs text-islamic-slate mb-3">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1">
                      <Heart size={12} />
                      <span>{post.likes}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <MessageCircle size={12} />
                      <span>{post.comments}</span>
                    </div>
                    {post.shares && (
                      <div className="flex items-center space-x-1">
                        <Share2 size={12} />
                        <span>{post.shares}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* View Post Button */}
                <a
                  href={post.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-1 text-xs text-islamic-teal hover:text-islamic-navy transition-colors"
                >
                  <span>Lihat Post</span>
                  <ExternalLink size={10} />
                </a>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {posts.length === 0 && !loading && (
        <div className="text-center py-8 text-islamic-slate">
          <p>Belum ada konten media sosial tersedia.</p>
          <Button onClick={fetchSocialMediaData} className="mt-4">
            Muat Konten
          </Button>
        </div>
      )}
    </div>
  );
};

export default SocialMediaFeed;