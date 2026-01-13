import React, { useState, useRef } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { Upload, X, Loader2, Link as LinkIcon } from 'lucide-react';

interface StorageImageUploaderProps {
  value: string;
  onChange: (url: string) => void;
  bucket?: string;
  folder?: string;
}

const StorageImageUploader: React.FC<StorageImageUploaderProps> = ({ 
  value, 
  onChange, 
  bucket = 'activity-images',
  folder = 'activities'
}) => {
  const [isUploading, setIsUploading] = useState(false);
  const [useUrl, setUseUrl] = useState(!value || value.startsWith('http'));
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast.error('Hanya file gambar yang diperbolehkan');
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error('Ukuran file maksimal 5MB');
      return;
    }

    setIsUploading(true);
    try {
      // Generate unique filename
      const fileExt = file.name.split('.').pop();
      const fileName = `${folder}/${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;

      // Upload to Supabase Storage
      const { data, error } = await supabase.storage
        .from(bucket)
        .upload(fileName, file, {
          cacheControl: '3600',
          upsert: false
        });

      if (error) {
        throw error;
      }

      // Get public URL
      const { data: urlData } = supabase.storage
        .from(bucket)
        .getPublicUrl(data.path);

      onChange(urlData.publicUrl);
      setUseUrl(false);
      toast.success('Gambar berhasil diupload!');
    } catch (error: any) {
      console.error('Upload error:', error);
      toast.error('Gagal mengupload gambar: ' + error.message);
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleRemoveImage = () => {
    onChange('');
  };

  return (
    <div className="space-y-3">
      {/* Toggle between upload and URL */}
      <div className="flex gap-2">
        <Button
          type="button"
          variant={!useUrl ? "default" : "outline"}
          size="sm"
          onClick={() => setUseUrl(false)}
          className={!useUrl ? "bg-islamic-teal hover:bg-islamic-teal/90" : ""}
        >
          <Upload className="h-4 w-4 mr-1" />
          Upload
        </Button>
        <Button
          type="button"
          variant={useUrl ? "default" : "outline"}
          size="sm"
          onClick={() => setUseUrl(true)}
          className={useUrl ? "bg-islamic-teal hover:bg-islamic-teal/90" : ""}
        >
          <LinkIcon className="h-4 w-4 mr-1" />
          URL
        </Button>
      </div>

      {useUrl ? (
        <Input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="https://example.com/image.jpg"
        />
      ) : (
        <div className="space-y-2">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
            id="storage-image-upload"
          />
          <label
            htmlFor="storage-image-upload"
            className={`flex items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer transition-colors ${
              isUploading 
                ? 'border-gray-300 bg-gray-50' 
                : 'border-gray-300 hover:border-islamic-teal hover:bg-islamic-teal/5'
            }`}
          >
            {isUploading ? (
              <div className="flex flex-col items-center text-gray-500">
                <Loader2 className="h-8 w-8 animate-spin mb-2" />
                <span className="text-sm">Mengupload...</span>
              </div>
            ) : (
              <div className="flex flex-col items-center text-gray-500">
                <Upload className="h-8 w-8 mb-2" />
                <span className="text-sm">Klik untuk upload gambar</span>
                <span className="text-xs text-gray-400">Max 5MB (PNG, JPG, GIF)</span>
              </div>
            )}
          </label>
        </div>
      )}

      {/* Preview */}
      {value && (
        <div className="relative inline-block">
          <img
            src={value}
            alt="Preview"
            className="w-full max-w-xs h-32 object-cover rounded-lg border"
            onError={(e) => {
              e.currentTarget.src = '/placeholder.svg';
            }}
          />
          <Button
            type="button"
            variant="destructive"
            size="icon"
            className="absolute -top-2 -right-2 h-6 w-6 rounded-full"
            onClick={handleRemoveImage}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  );
};

export default StorageImageUploader;
