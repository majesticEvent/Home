// API service for handling media uploads and gallery operations

const API_BASE_URL = 'http://localhost:3001/api';

// Mock data for development
const mockGalleryItems = [
  {
    id: 1,
    title: "Beautiful Wedding Ceremony",
    description: "A magical moment captured during the wedding ceremony with stunning decorations and happy couple.",
    eventType: "wedding",
    eventDate: "2024-01-15",
    type: "image",
    fileName: "wedding1.jpg",
    fileSize: 2048576,
    uploadDate: "2024-01-20T10:30:00Z",
    url: "https://images.pexels.com/photos/1024993/pexels-photo-1024993.jpeg?auto=compress&cs=tinysrgb&w=800"
  },
  {
    id: 2,
    title: "Anniversary Celebration",
    description: "50th anniversary celebration with family and friends, filled with love and memories.",
    eventType: "anniversary",
    eventDate: "2024-01-20",
    type: "image",
    fileName: "anniversary1.jpg",
    fileSize: 1536000,
    uploadDate: "2024-01-22T14:15:00Z",
    url: "https://images.pexels.com/photos/1729931/pexels-photo-1729931.jpeg?auto=compress&cs=tinysrgb&w=800"
  },
  {
    id: 3,
    title: "Corporate Event Highlights",
    description: "Professional corporate event with networking and presentations.",
    eventType: "corporate",
    eventDate: "2024-02-01",
    type: "video",
    fileName: "corporate_event.mp4",
    fileSize: 15728640,
    uploadDate: "2024-02-03T09:00:00Z",
    url: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4"
  },
  {
    id: 4,
    title: "Birthday Party Fun",
    description: "Colorful birthday celebration with decorations, cake, and entertainment.",
    eventType: "birthday",
    eventDate: "2024-02-10",
    type: "image",
    fileName: "birthday1.jpg",
    fileSize: 1843200,
    uploadDate: "2024-02-12T16:45:00Z",
    url: "https://images.pexels.com/photos/1729931/pexels-photo-1729931.jpeg?auto=compress&cs=tinysrgb&w=800"
  },
  {
    id: 5,
    title: "Engagement Ceremony",
    description: "Romantic engagement ceremony with beautiful ring exchange moment.",
    eventType: "engagement",
    eventDate: "2024-02-14",
    type: "image",
    fileName: "engagement1.jpg",
    fileSize: 2097152,
    uploadDate: "2024-02-16T11:20:00Z",
    url: "https://images.pexels.com/photos/1024993/pexels-photo-1024993.jpeg?auto=compress&cs=tinysrgb&w=800"
  },
  {
    id: 6,
    title: "Wedding Reception Dance",
    description: "Joyful wedding reception with dancing and celebration.",
    eventType: "wedding",
    eventDate: "2024-02-20",
    type: "video",
    fileName: "wedding_dance.mp4",
    fileSize: 25165824,
    uploadDate: "2024-02-22T18:30:00Z",
    url: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_2mb.mp4"
  }
];

// Simulate API delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Upload media files
export const uploadMedia = async (formData) => {
  try {
    // Simulate upload delay
    await delay(2000);
    
    // In a real application, you would send the formData to your backend
    // const response = await fetch(`${API_BASE_URL}/upload`, {
    //   method: 'POST',
    //   body: formData
    // });
    
    // For now, we'll simulate a successful upload
    const file = formData.get('file');
    const title = formData.get('title');
    const description = formData.get('description');
    const eventType = formData.get('eventType');
    const eventDate = formData.get('eventDate');
    
    const newItem = {
      id: Date.now() + Math.random(),
      title,
      description,
      eventType,
      eventDate,
      type: file.type.startsWith('image/') ? 'image' : 'video',
      fileName: file.name,
      fileSize: file.size,
      uploadDate: new Date().toISOString(),
      url: URL.createObjectURL(file) // In production, this would be the server URL
    };
    
    // Store in localStorage for demo purposes
    const existingItems = JSON.parse(localStorage.getItem('galleryItems') || '[]');
    const updatedItems = [newItem, ...existingItems];
    localStorage.setItem('galleryItems', JSON.stringify(updatedItems));
    
    return {
      success: true,
      data: newItem
    };
    
  } catch (error) {
    console.error('Upload error:', error);
    throw new Error('Upload failed');
  }
};

// Get gallery items
export const getGalleryItems = async () => {
  try {
    // Simulate API delay
    await delay(1000);
    
    // In a real application, you would fetch from your backend
    // const response = await fetch(`${API_BASE_URL}/gallery`);
    // const data = await response.json();
    
    // For demo purposes, combine localStorage items with mock data
    const localItems = JSON.parse(localStorage.getItem('galleryItems') || '[]');
    const allItems = [...localItems, ...mockGalleryItems];
    
    // Sort by upload date (newest first)
    return allItems.sort((a, b) => new Date(b.uploadDate) - new Date(a.uploadDate));
    
  } catch (error) {
    console.error('Error fetching gallery items:', error);
    throw new Error('Failed to fetch gallery items');
  }
};

// Delete media item
export const deleteMediaItem = async (itemId) => {
  try {
    await delay(500);
    
    // In a real application:
    // const response = await fetch(`${API_BASE_URL}/gallery/${itemId}`, {
    //   method: 'DELETE'
    // });
    
    // For demo purposes, remove from localStorage
    const existingItems = JSON.parse(localStorage.getItem('galleryItems') || '[]');
    const updatedItems = existingItems.filter(item => item.id !== itemId);
    localStorage.setItem('galleryItems', JSON.stringify(updatedItems));
    
    return { success: true };
    
  } catch (error) {
    console.error('Delete error:', error);
    throw new Error('Failed to delete item');
  }
};

// Search gallery items
export const searchGalleryItems = async (query, filters = {}) => {
  try {
    await delay(500);
    
    const allItems = await getGalleryItems();
    
    let filteredItems = allItems;
    
    // Apply text search
    if (query) {
      const searchTerm = query.toLowerCase();
      filteredItems = filteredItems.filter(item =>
        item.title.toLowerCase().includes(searchTerm) ||
        item.description.toLowerCase().includes(searchTerm) ||
        item.eventType.toLowerCase().includes(searchTerm)
      );
    }
    
    // Apply filters
    if (filters.type && filters.type !== 'all') {
      filteredItems = filteredItems.filter(item => item.type === filters.type);
    }
    
    if (filters.eventType) {
      filteredItems = filteredItems.filter(item => item.eventType === filters.eventType);
    }
    
    if (filters.dateFrom) {
      filteredItems = filteredItems.filter(item => 
        new Date(item.eventDate) >= new Date(filters.dateFrom)
      );
    }
    
    if (filters.dateTo) {
      filteredItems = filteredItems.filter(item => 
        new Date(item.eventDate) <= new Date(filters.dateTo)
      );
    }
    
    return filteredItems;
    
  } catch (error) {
    console.error('Search error:', error);
    throw new Error('Search failed');
  }
};

// Get media item by ID
export const getMediaItem = async (itemId) => {
  try {
    await delay(300);
    
    const allItems = await getGalleryItems();
    const item = allItems.find(item => item.id === itemId);
    
    if (!item) {
      throw new Error('Item not found');
    }
    
    return item;
    
  } catch (error) {
    console.error('Error fetching media item:', error);
    throw new Error('Failed to fetch media item');
  }
};