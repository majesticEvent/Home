// Enhanced API service for handling media uploads and gallery operations
import { createFilePreview } from '../utils/fileUtils';

// Simulate API delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Simulate file upload
export const uploadMedia = async (fileData) => {
  try {
    await delay(1500);
    
    // Simulate successful upload
    const uploadedItem = {
      ...fileData,
      id: Date.now() + Math.random(),
      uploadDate: new Date().toISOString(),
      url: fileData.preview // In production, this would be the server URL
    };
    
    return {
      success: true,
      data: uploadedItem
    };
    
  } catch (error) {
    console.error('Upload error:', error);
    throw new Error('Upload failed');
  }
};

// Send contact form
export const sendContactForm = async (formData) => {
  try {
    await delay(2000);
    
    // Simulate sending email
    console.log('Contact form submitted:', formData);
    
    return { success: true };
    
  } catch (error) {
    console.error('Contact form error:', error);
    throw new Error('Failed to send message');
  }
};
