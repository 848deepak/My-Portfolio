import React, { useState, useRef, useEffect } from 'react';
import { FaUpload, FaTimes, FaImage, FaExclamationTriangle } from 'react-icons/fa';
import uploadService from '../../services/uploadService';

interface ImageUploadProps {
  currentImage?: string;
  onImageChange: (url: string | null) => void;
  folder?: string;
  maxSizeMB?: number;
  aspectRatio?: string;
  className?: string;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ 
  currentImage, 
  onImageChange, 
  folder = 'general',
  maxSizeMB = 2,
  aspectRatio = '4/3',
  className = ''
}) => {
  const [previewUrl, setPreviewUrl] = useState<string>('');
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Set initial preview if currentImage is provided
    if (currentImage) {
      setPreviewUrl(currentImage);
    }
  }, [currentImage]);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    try {
      // Validate file
      const validation = uploadService.validateFile(file, { maxSizeMB });
      if (!validation.valid) {
        setError(validation.error);
        return;
      }
      
      // Show preview immediately
      const preview = await uploadService.getFilePreview(file);
      setPreviewUrl(preview);
      
      // Upload file
      setError(null);
      setIsUploading(true);
      
      // In a real implementation, this would upload to your server
      // For now, we'll just simulate it
      try {
        // Simulating upload delay
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // In a real app, this would be the URL returned from the server
        const uploadedUrl = preview; 
        
        onImageChange(uploadedUrl);
        setIsUploading(false);
      } catch (error) {
        setError('Failed to upload image. Please try again.');
        setIsUploading(false);
        setPreviewUrl(currentImage || '');
      }
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('An unexpected error occurred');
      }
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const file = e.dataTransfer.files?.[0];
    if (!file) return;
    
    // Check if file is an image
    if (!file.type.startsWith('image/')) {
      setError('Only image files are allowed');
      return;
    }
    
    if (fileInputRef.current) {
      // Create a DataTransfer object and add the file
      const dataTransfer = new DataTransfer();
      dataTransfer.items.add(file);
      
      // Set the files property of the input element
      fileInputRef.current.files = dataTransfer.files;
      
      // Trigger the change event handler
      const event = new Event('change', { bubbles: true });
      fileInputRef.current.dispatchEvent(event);
    }
  };

  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const clearImage = () => {
    setPreviewUrl('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    onImageChange(null);
    setError(null);
  };

  return (
    <div className={className}>
      <div 
        className={`w-full border-2 rounded-lg overflow-hidden relative transition-all 
          ${isDragging ? 'border-primary border-dashed bg-primary/5' : 'border-gray-300'} 
          ${error ? 'border-red-500' : ''}`}
        style={{ aspectRatio }}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        {/* Preview Image */}
        {previewUrl ? (
          <div className="relative w-full h-full">
            <img 
              src={previewUrl} 
              alt="Preview" 
              className="w-full h-full object-cover"
            />
            
            {/* Loading Overlay */}
            {isUploading && (
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                <div className="bg-white p-3 rounded-full">
                  <div className="animate-spin rounded-full h-6 w-6 border-2 border-t-primary border-r-primary border-b-transparent border-l-transparent"></div>
                </div>
              </div>
            )}
            
            {/* Remove Button */}
            {!isUploading && (
              <button
                type="button"
                onClick={clearImage}
                className="absolute top-2 right-2 bg-red-600 text-white p-2 rounded-full hover:bg-red-700 shadow-md"
                title="Remove image"
              >
                <FaTimes size={14} />
              </button>
            )}
          </div>
        ) : (
          /* Empty State */
          <div 
            className="w-full h-full flex flex-col items-center justify-center p-6 cursor-pointer"
            onClick={triggerFileInput}
          >
            <FaImage className="text-gray-400 text-4xl mb-3" />
            <p className="text-gray-500 text-center mb-2">Drag and drop an image here, or click to select</p>
            <p className="text-gray-400 text-xs text-center">
              Maximum file size: {maxSizeMB}MB <br/>
              Accepted formats: JPEG, PNG, GIF, WebP
            </p>
            
            <button
              type="button"
              className="mt-4 px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark flex items-center gap-2"
            >
              <FaUpload /> Select Image
            </button>
          </div>
        )}
      </div>
      
      {/* Error Message */}
      {error && (
        <div className="mt-2 text-red-500 text-sm flex items-center gap-1">
          <FaExclamationTriangle />
          <span>{error}</span>
        </div>
      )}
      
      {/* Hidden File Input */}
      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        accept="image/*"
        onChange={handleFileChange}
      />
    </div>
  );
};

export default ImageUpload; 