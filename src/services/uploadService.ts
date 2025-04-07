import axios from 'axios';

interface UploadConfig {
  maxSizeMB?: number;
  allowedTypes?: string[];
  folder?: string;
}

class UploadService {
  private defaultConfig: UploadConfig = {
    maxSizeMB: 2, // Default max file size: 2MB
    allowedTypes: ['image/jpeg', 'image/png', 'image/gif', 'image/webp'], // Default allowed file types
    folder: 'general' // Default upload folder
  };

  /**
   * Validates file size and type
   */
  validateFile(file: File, config: UploadConfig = {}): { valid: boolean; error?: string } {
    const { maxSizeMB, allowedTypes } = { ...this.defaultConfig, ...config };
    
    // Check file size
    if (file.size > (maxSizeMB || 2) * 1024 * 1024) {
      return {
        valid: false,
        error: `File too large. Maximum size is ${maxSizeMB}MB.`
      };
    }
    
    // Check file type
    if (allowedTypes && !allowedTypes.includes(file.type)) {
      return {
        valid: false,
        error: `Invalid file type. Allowed types: ${allowedTypes.map(type => type.split('/')[1]).join(', ')}`
      };
    }
    
    return { valid: true };
  }

  /**
   * Converts a file to base64 for preview
   */
  getFilePreview(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      
      reader.onload = () => {
        resolve(reader.result as string);
      };
      
      reader.onerror = () => {
        reject(new Error('Failed to read file'));
      };
      
      reader.readAsDataURL(file);
    });
  }

  /**
   * Uploads a file to the server
   */
  async uploadFile(file: File, folder?: string): Promise<string> {
    try {
      // Validate file
      const validation = this.validateFile(file, { folder });
      if (!validation.valid) {
        throw new Error(validation.error);
      }
      
      // Create form data
      const formData = new FormData();
      formData.append('file', file);
      if (folder) {
        formData.append('folder', folder);
      }
      
      // Upload file
      const response = await axios.post('/api/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      
      return response.data.url;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Upload failed: ${error.message}`);
      }
      throw new Error('Upload failed with unknown error');
    }
  }

  /**
   * Uploads multiple files to the server
   */
  async uploadMultiple(files: File[], folder?: string): Promise<string[]> {
    const uploadPromises = Array.from(files).map(file => this.uploadFile(file, folder));
    return Promise.all(uploadPromises);
  }

  /**
   * Deletes a file from the server
   */
  async deleteFile(fileUrl: string): Promise<void> {
    try {
      // Extract file ID or path from URL
      const fileId = fileUrl.split('/').pop();
      
      if (!fileId) {
        throw new Error('Invalid file URL');
      }
      
      await axios.delete(`/api/upload/${fileId}`);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Delete failed: ${error.message}`);
      }
      throw new Error('Delete failed with unknown error');
    }
  }
}

// Create instance
const uploadService = new UploadService();

export default uploadService; 