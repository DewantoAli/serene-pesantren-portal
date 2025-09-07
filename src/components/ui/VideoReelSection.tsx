import React from 'react';
import { Play, Instagram, Facebook, Youtube } from 'lucide-react';
import { cn } from '@/lib/utils';

const VideoReelSection: React.FC = () => {
  const reels = [
    {
      id: 1,
      thumbnail: "/lovable-uploads/3e4352c1-687f-47e6-ad0f-ea924c3a58ef.png",
      title: "Kegiatan Harian Santri",
      platform: "instagram",
      views: "2.1K"
    },
    {
      id: 2,
      thumbnail: "/lovable-uploads/df6366a9-1018-4237-bffb-263beadecc59.png",
      title: "Pembina Karakter Islam",
      platform: "https://www.youtube.com/shorts/ooKSulHGEu8",
      views: "5.3K"
    },
    {
      id: 3,
      thumbnail: "/lovable-uploads/3e4352c1-687f-47e6-ad0f-ea924c3a58ef.png",
      title: "Wisuda Santri 2024",
      platform: "https://www.facebook.com/reel/1927700628021972",
      views: "3.7K"
    }
  ];

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case 'instagram':
        return <Instagram size={16} className="text-pink-500" />;
      case 'facebook':
        return <Facebook size={16} className="text-blue-600" />;
      case 'youtube':
        return <Youtube size={16} className="text-red-500" />;
      default:
        return <Play size={16} />;
    }
  };

  return (
    <div className="bg-gradient-to-r from-islamic-navy/5 to-islamic-teal/5 py-8 mt-20">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-8">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-islamic-navy mb-2">
            Video Terbaru
          </h2>
          <p className="text-islamic-slate">
            Saksikan kegiatan dan perkembangan santri kami
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reels.map((reel) => (
            <div 
              key={reel.id}
              className="group relative overflow-hidden rounded-xl bg-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer"
            >
              <div className="relative aspect-[9/16] max-h-80 overflow-hidden">
                <img 
                  src={reel.thumbnail} 
                  alt={reel.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors duration-300" />
                
                {/* Play Button */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-white/90 backdrop-blur-sm rounded-full p-4 group-hover:scale-110 transition-transform duration-300">
                    <Play size={24} className="text-islamic-navy fill-current ml-1" />
                  </div>
                </div>
                
                {/* Platform Badge */}
                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-full p-2">
                  {getPlatformIcon(reel.platform)}
                </div>
                
                {/* Views Counter */}
                <div className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-sm rounded-full px-3 py-1">
                  <span className="text-white text-xs font-medium">{reel.views}</span>
                </div>
              </div>
              
              <div className="p-4">
                <h3 className="font-medium text-islamic-navy group-hover:text-islamic-teal transition-colors duration-300">
                  {reel.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-8">
          <button className="btn-primary">
            Lihat Semua Video
          </button>
        </div>
      </div>
    </div>
  );
};

export default VideoReelSection;
