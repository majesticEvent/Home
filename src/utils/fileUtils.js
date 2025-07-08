// File utility functions

export const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

export const getFileType = (file) => {
  return file.type.startsWith('image/') ? 'image' : 'video';
};

export const validateFile = (file, maxSize = 50 * 1024 * 1024) => {
  const errors = [];
  
  // Check file size
  if (file.size > maxSize) {
    errors.push('File is too large. Maximum size is 50MB.');
  }
  
  // Check file type
  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'video/mp4', 'video/webm', 'video/ogg'];
  if (!allowedTypes.includes(file.type)) {
    errors.push('Invalid file type. Please upload images or videos only.');
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};

export const createFilePreview = (file) => {
  return {
    file,
    id: Math.random().toString(36).substr(2, 9),
    preview: URL.createObjectURL(file),
    type: getFileType(file),
    name: file.name,
    size: file.size
  };
};

export const revokeFilePreview = (preview) => {
  if (preview && preview.startsWith('blob:')) {
    URL.revokeObjectURL(preview);
  }
};