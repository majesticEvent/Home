import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

const GalleryContext = createContext();

// Action types
const GALLERY_ACTIONS = {
  SET_LOADING: 'SET_LOADING',
  SET_ITEMS: 'SET_ITEMS',
  ADD_ITEM: 'ADD_ITEM',
  REMOVE_ITEM: 'REMOVE_ITEM',
  SET_FILTER: 'SET_FILTER',
  SET_SEARCH: 'SET_SEARCH',
  SET_ERROR: 'SET_ERROR'
};

// Initial state
const initialState = {
  items: [],
  filteredItems: [],
  loading: false,
  error: null,
  filter: 'all',
  searchTerm: ''
};

// Reducer
const galleryReducer = (state, action) => {
  switch (action.type) {
    case GALLERY_ACTIONS.SET_LOADING:
      return { ...state, loading: action.payload };
    
    case GALLERY_ACTIONS.SET_ITEMS:
      return { ...state, items: action.payload, loading: false };
    
    case GALLERY_ACTIONS.ADD_ITEM:
      const newItems = [action.payload, ...state.items];
      return { ...state, items: newItems };
    
    case GALLERY_ACTIONS.REMOVE_ITEM:
      const filteredItems = state.items.filter(item => item.id !== action.payload);
      return { ...state, items: filteredItems };
    
    case GALLERY_ACTIONS.SET_FILTER:
      return { ...state, filter: action.payload };
    
    case GALLERY_ACTIONS.SET_SEARCH:
      return { ...state, searchTerm: action.payload };
    
    case GALLERY_ACTIONS.SET_ERROR:
      return { ...state, error: action.payload, loading: false };
    
    default:
      return state;
  }
};

// Mock data
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
    type: "image",
    fileName: "corporate_event.jpg",
    fileSize: 15728640,
    uploadDate: "2024-02-03T09:00:00Z",
    url: "https://images.pexels.com/photos/1181396/pexels-photo-1181396.jpeg?auto=compress&cs=tinysrgb&w=800"
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
  }
];

// Provider component
export const GalleryProvider = ({ children }) => {
  const [state, dispatch] = useReducer(galleryReducer, initialState);
  const [storedItems, setStoredItems] = useLocalStorage('galleryItems', []);

  // Load initial data
  useEffect(() => {
    const loadItems = () => {
      dispatch({ type: GALLERY_ACTIONS.SET_LOADING, payload: true });
      
      // Simulate API delay
      setTimeout(() => {
        const allItems = [...storedItems, ...mockGalleryItems];
        const uniqueItems = allItems.filter((item, index, self) => 
          index === self.findIndex(i => i.id === item.id)
        );
        
        dispatch({ type: GALLERY_ACTIONS.SET_ITEMS, payload: uniqueItems });
      }, 1000);
    };

    loadItems();
  }, [storedItems]);

  // Filter items based on current filter and search term
  useEffect(() => {
    let filtered = state.items;

    // Apply type filter
    if (state.filter !== 'all') {
      filtered = filtered.filter(item => item.type === state.filter);
    }

    // Apply search filter
    if (state.searchTerm) {
      const searchLower = state.searchTerm.toLowerCase();
      filtered = filtered.filter(item =>
        item.title.toLowerCase().includes(searchLower) ||
        item.description.toLowerCase().includes(searchLower) ||
        item.eventType.toLowerCase().includes(searchLower)
      );
    }

    dispatch({ type: GALLERY_ACTIONS.SET_ITEMS, payload: state.items });
  }, [state.filter, state.searchTerm, state.items]);

  // Actions
  const addItem = (item) => {
    const newItem = {
      ...item,
      id: Date.now() + Math.random(),
      uploadDate: new Date().toISOString()
    };
    
    dispatch({ type: GALLERY_ACTIONS.ADD_ITEM, payload: newItem });
    setStoredItems(prev => [newItem, ...prev]);
  };

  const removeItem = (itemId) => {
    dispatch({ type: GALLERY_ACTIONS.REMOVE_ITEM, payload: itemId });
    setStoredItems(prev => prev.filter(item => item.id !== itemId));
  };

  const setFilter = (filter) => {
    dispatch({ type: GALLERY_ACTIONS.SET_FILTER, payload: filter });
  };

  const setSearchTerm = (term) => {
    dispatch({ type: GALLERY_ACTIONS.SET_SEARCH, payload: term });
  };

  const getFilteredItems = () => {
    let filtered = state.items;

    if (state.filter !== 'all') {
      filtered = filtered.filter(item => item.type === state.filter);
    }

    if (state.searchTerm) {
      const searchLower = state.searchTerm.toLowerCase();
      filtered = filtered.filter(item =>
        item.title.toLowerCase().includes(searchLower) ||
        item.description.toLowerCase().includes(searchLower) ||
        item.eventType.toLowerCase().includes(searchLower)
      );
    }

    return filtered;
  };

  const value = {
    ...state,
    filteredItems: getFilteredItems(),
    addItem,
    removeItem,
    setFilter,
    setSearchTerm
  };

  return (
    <GalleryContext.Provider value={value}>
      {children}
    </GalleryContext.Provider>
  );
};

// Custom hook to use gallery context
export const useGallery = () => {
  const context = useContext(GalleryContext);
  if (!context) {
    throw new Error('useGallery must be used within a GalleryProvider');
  }
  return context;
};