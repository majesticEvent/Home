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
    const result = await emailjs.send(
      'service_s7xftls',          // your EmailJS service ID
      'template_vza89hp',         // your EmailJS template ID
      {
        from_name: formData.name,
        from_email: formData.email,
        phone: formData.phone,
        event_type: formData.eventType,
        event_date: formData.eventDate,
        message: formData.message,
      },
      '6esZzpKWZjIp-9f5B'          // your EmailJS public key
    );
    console.log('EmailJS result:', result);
    return { success: true };
  } catch (error) {
    console.error('EmailJS Error:', error);
    throw new Error('Failed to send message via EmailJS');
  }
};
