import React, { useState, useRef } from 'react';
import { Upload, Video, Link, X, Play } from 'lucide-react';
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface MediaUploaderProps {
  id: string;
  className?: string;
  defaultMedia?: { type: 'image' | 'video'; url: string; };
  onMediaChange?: (media: { type: 'image' | 'video'; url: string; } | null) => void;
  height?: string;
  width?: string;
  storageKey?: string;
  label?: string;
  accept?: 'image' | 'video' | 'both';
}

const MediaUploader: React.FC<MediaUploaderProps> = ({
  id,
  className = '',
  defaultMedia = null,
  onMediaChange,
  height = '300px',
  width = '100%',
  storageKey,
  label = 'Upload Media',
  accept = 'both'
}) => {
  const [media, setMedia] = useState<{ type: 'image' | 'video'; url: string; } | null>(defaultMedia);
  const [cloudUrl, setCloudUrl] = useState('');
  const [showUrlInput, setShowUrlInput] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    if (storageKey) {
      const savedMedia = localStorage.getItem(storageKey);
      if (savedMedia) {
        try {
          const parsedMedia = JSON.parse(savedMedia);
          setMedia(parsedMedia);
          onMediaChange?.(parsedMedia);
        } catch (error) {
          console.error('Error parsing saved media:', error);
        }
      }
    }
  }, [storageKey, onMediaChange]);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const fileType = file.type.startsWith('image/') ? 'image' : 'video';
      
      // Check if file type is allowed
      if (accept === 'image' && fileType !== 'image') return;
      if (accept === 'video' && fileType !== 'video') return;

      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
      const newMedia: { type: 'image' | 'video'; url: string; } = { type: fileType as 'image' | 'video', url: result };
        setMedia(newMedia);
        
        if (storageKey) {
          localStorage.setItem(storageKey, JSON.stringify(newMedia));
        }
        
        onMediaChange?.(newMedia);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCloudUrl = () => {
    if (cloudUrl) {
      // Detect if URL is video or image based on extension or platform
      const videoPatterns = [
        /youtube\.com\/watch/,
        /youtu\.be\//,
        /vimeo\.com/,
        /\.mp4$/,
        /\.webm$/,
        /\.ogg$/,
        /\.mov$/
      ];
      
      const isVideo = videoPatterns.some(pattern => pattern.test(cloudUrl.toLowerCase()));
      const mediaType = isVideo ? 'video' : 'image';
      
      let processedUrl = cloudUrl;
      
      // Convert YouTube URLs to embed format
      if (cloudUrl.includes('youtube.com/watch')) {
        const videoId = cloudUrl.split('v=')[1]?.split('&')[0];
        if (videoId) {
          processedUrl = `https://www.youtube.com/embed/${videoId}`;
        }
      } else if (cloudUrl.includes('youtu.be/')) {
        const videoId = cloudUrl.split('youtu.be/')[1]?.split('?')[0];
        if (videoId) {
          processedUrl = `https://www.youtube.com/embed/${videoId}`;
        }
      }
      
      const newMedia: { type: 'image' | 'video'; url: string; } = { type: mediaType as 'image' | 'video', url: processedUrl };
      setMedia(newMedia);
      
      if (storageKey) {
        localStorage.setItem(storageKey, JSON.stringify(newMedia));
      }
      
      onMediaChange?.(newMedia);
      setCloudUrl('');
      setShowUrlInput(false);
    }
  };

  const removeMedia = () => {
    setMedia(null);
    if (storageKey) {
      localStorage.removeItem(storageKey);
    }
    onMediaChange?.(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const getAcceptTypes = () => {
    if (accept === 'image') return 'image/*';
    if (accept === 'video') return 'video/*';
    return 'image/*,video/*';
  };

  return (
    <div className={cn('space-y-4', className)}>
      {label && (
        <label className="block text-sm font-medium text-islamic-navy mb-2">
          {label}
        </label>
      )}
      
      <Card className="overflow-hidden" style={{ height, width }}>
        {media ? (
          <div className="relative h-full group">
            {media.type === 'image' ? (
              <img 
                src={media.url} 
                alt="Uploaded media"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-black flex items-center justify-center">
                {media.url.includes('youtube.com/embed') ? (
                  <iframe 
                    src={media.url}
                    className="w-full h-full"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                ) : (
                  <video 
                    src={media.url}
                    controls
                    className="w-full h-full object-cover"
                  >
                    Your browser does not support the video tag.
                  </video>
                )}
              </div>
            )}
            
            <div className="absolute top-2 left-2 bg-islamic-navy/70 text-white px-2 py-1 rounded text-xs">
              {media.type === 'image' ? 'Gambar' : 'Video'}
            </div>
            
            <button 
              onClick={removeMedia}
              className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <X size={16} />
            </button>
          </div>
        ) : (
          <div className="h-full flex flex-col items-center justify-center p-8 text-center border-2 border-dashed border-islamic-teal/30 bg-islamic-cream/10">
            <div className="mb-4">
              {accept === 'video' ? (
                <Video size={48} className="text-islamic-teal/50" />
              ) : (
                <Upload size={48} className="text-islamic-teal/50" />
              )}
            </div>
            
            <h3 className="text-lg font-medium text-islamic-navy mb-2">
              Upload {accept === 'image' ? 'Gambar' : accept === 'video' ? 'Video' : 'Media'}
            </h3>
            
            <p className="text-sm text-islamic-slate mb-4">
              Drag & drop file atau klik untuk browse
            </p>
            
            <div className="space-y-2 w-full max-w-xs">
              <Input
                ref={fileInputRef}
                type="file"
                accept={getAcceptTypes()}
                onChange={handleFileUpload}
                className="hidden"
                id={id}
              />
              
              <Button 
                type="button"
                variant="outline"
                onClick={() => fileInputRef.current?.click()}
                className="w-full"
              >
                <Upload size={16} className="mr-2" />
                Upload dari PC
              </Button>
              
              <Button 
                type="button"
                variant="outline"
                onClick={() => setShowUrlInput(!showUrlInput)}
                className="w-full"
              >
                <Link size={16} className="mr-2" />
                URL Cloud
              </Button>
            </div>
            
            {showUrlInput && (
              <div className="mt-4 w-full max-w-xs space-y-2">
                <Input
                  type="url"
                  placeholder="https://youtube.com/watch?v=... atau URL gambar"
                  value={cloudUrl}
                  onChange={(e) => setCloudUrl(e.target.value)}
                  className="w-full"
                />
                <Button 
                  onClick={handleCloudUrl}
                  disabled={!cloudUrl}
                  className="w-full bg-islamic-teal hover:bg-islamic-teal/90"
                >
                  Tambahkan
                </Button>
              </div>
            )}
          </div>
        )}
      </Card>
    </div>
  );
};

export default MediaUploader;