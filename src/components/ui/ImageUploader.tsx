
import React, { useState, useEffect } from 'react';
import { Upload, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Input } from './input';

interface ImageUploaderProps {
  id: string;
  className?: string;
  defaultImage?: string;
  onImageChange?: (imageDataUrl: string | null) => void;
  height?: string;
  width?: string;
  storageKey?: string;
  label?: string;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({
  id,
  className,
  defaultImage,
  onImageChange,
  height = 'h-40',
  width = 'w-full',
  storageKey,
  label = 'Upload Image'
}) => {
  const [image, setImage] = useState<string | null>(defaultImage || null);

  useEffect(() => {
    // Load from localStorage if storageKey is provided
    if (storageKey) {
      const savedImage = localStorage.getItem(storageKey);
      if (savedImage) {
        setImage(savedImage);
        onImageChange?.(savedImage);
      }
    }
  }, [storageKey, onImageChange]);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setImage(result);
        
        // Save to localStorage if storageKey is provided
        if (storageKey) {
          localStorage.setItem(storageKey, result);
        }
        
        // Call the callback if provided
        onImageChange?.(result);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setImage(null);
    if (storageKey) {
      localStorage.removeItem(storageKey);
    }
    onImageChange?.(null);
  };

  return (
    <div className={cn('relative group', className)}>
      {image ? (
        <div className={cn('relative rounded-lg overflow-hidden', height, width)}>
          <img 
            src={image} 
            alt="Uploaded content" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
            <label htmlFor={id} className="cursor-pointer bg-white text-islamic-navy rounded-full p-2 hover:bg-islamic-teal hover:text-white transition-colors">
              <Upload size={18} />
              <Input 
                id={id} 
                type="file" 
                accept="image/*" 
                className="hidden" 
                onChange={handleImageUpload}
              />
            </label>
            <button 
              onClick={removeImage}
              className="bg-white text-red-500 rounded-full p-2 hover:bg-red-500 hover:text-white transition-colors"
            >
              <X size={18} />
            </button>
          </div>
        </div>
      ) : (
        <label 
          htmlFor={id} 
          className={cn(
            'flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors',
            height, width
          )}
        >
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <Upload className="w-8 h-8 mb-3 text-gray-400" />
            <p className="mb-2 text-sm text-gray-500"><span className="font-medium">{label}</span></p>
            <p className="text-xs text-gray-400">PNG, JPG or GIF</p>
          </div>
          <Input 
            id={id} 
            type="file" 
            accept="image/*" 
            className="hidden" 
            onChange={handleImageUpload}
          />
        </label>
      )}
    </div>
  );
};

export default ImageUploader;
