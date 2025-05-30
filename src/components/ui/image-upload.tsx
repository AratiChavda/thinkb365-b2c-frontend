import { useState, useCallback } from 'react';
import { cn } from '@/lib/utils';
import { ImageIcon, UploadCloud } from 'lucide-react';

interface ImageUploadProps {
  onImageUpload: (imageUrl: string) => void;
  maxSize?: number; // in MB
  acceptedTypes?: string[];
  className?: string;
}

export function ImageUpload({
  onImageUpload,
  maxSize = 2,
  acceptedTypes = ['image/jpeg', 'image/png', 'image/webp'],
  className,
}: ImageUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string>('');

  const handleFile = useCallback(
    (file: File) => {
      setError('');

      if (!acceptedTypes.includes(file.type)) {
        setError('Please upload a valid image file (JPEG, PNG, or WebP)');
        return;
      }

      if (file.size > maxSize * 1024 * 1024) {
        setError(`File size must be less than ${maxSize}MB`);
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          onImageUpload(e.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    },
    [acceptedTypes, maxSize, onImageUpload]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      setIsDragging(false);

      const file = e.dataTransfer.files[0];
      if (file) {
        handleFile(file);
      }
    },
    [handleFile]
  );

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleFileInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        handleFile(file);
      }
    },
    [handleFile]
  );

  return (
    <div
      className={cn(
        'relative rounded-lg border-2 border-dashed transition-all duration-200 ease-in-out',
        isDragging
          ? 'border-primary bg-primary/5'
          : 'border-muted-foreground/25 hover:border-primary/50',
        className
      )}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
    >
      <input
        type="file"
        accept={acceptedTypes.join(',')}
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        onChange={handleFileInput}
      />
      <div className="p-8 text-center">
        <div
          className={cn(
            'mx-auto w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4 transition-transform duration-200',
            isDragging && 'scale-110'
          )}
        >
          {isDragging ? (
            <UploadCloud className="w-6 h-6 text-primary animate-bounce" />
          ) : (
            <ImageIcon className="w-6 h-6 text-primary" />
          )}
        </div>
        <div className="space-y-2">
          <p className="text-sm font-medium">
            {isDragging ? 'Drop your image here' : 'Drag & drop your image here'}
          </p>
          <p className="text-xs text-muted-foreground">
            or click to browse (max {maxSize}MB)
          </p>
          {error && (
            <p className="text-xs text-destructive font-medium animate-in fade-in slide-in-from-top-1">
              {error}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}