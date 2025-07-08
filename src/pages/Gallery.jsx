import React, { useState, useEffect } from 'react';
import { Search, Filter, Eye, Download } from 'lucide-react';
import { motion } from 'framer-motion';
import { useGallery } from '../context/GalleryContext';
import MediaModal from '../components/MediaModal';
import './Gallery.css';

const Gallery = () => {
  const { 
    filteredItems, 
    loading, 
    filter, 
    searchTerm, 
    setFilter, 
    setSearchTerm 
  } = useGallery();
  const [selectedItem, setSelectedItem] = useState(null);

  const filters = [
    { key: 'all', label: 'All Media' },
    { key: 'image', label: 'Images' },
    { key: 'video', label: 'Videos' }
  ];

  const eventTypes = [
    { key: 'wedding', label: 'Weddings', color: '#ff6b6b' },
    { key: 'anniversary', label: 'Anniversaries', color: '#4ecdc4' },
    { key: 'birthday', label: 'Birthdays', color: '#45b7d1' },
    { key: 'corporate', label: 'Corporate', color: '#96ceb4' },
    { key: 'engagement', label: 'Engagements', color: '#feca57' },
    { key: 'other', label: 'Other', color: '#a55eea' }
  ];

  const getEventTypeColor = (eventType) => {
    const type = eventTypes.find(t => t.key === eventType);
    return type ? type.color : '#f35525';
  };

  if (loading) {
    return (
      <div className="gallery-page">
        <div className="page-header">
          <div className="container">
            <h1>Gallery</h1>
            <p>Explore our collection of beautiful memories and special moments.</p>
          </div>
        </div>
        <div className="loading">
          <div className="spinner" />
          <p>Loading gallery...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="gallery-page">
      <div className="page-header">
        <div className="container">
          <h1>Gallery</h1>
          <p>Explore our collection of beautiful memories and special moments.</p>
        </div>
      </div>

      <div className="gallery-content">
        <div className="container">
          {/* Controls */}
          <div className="gallery-controls">
            <div className="search-box">
              <Search className="search-icon" />
              <input
                type="text"
                placeholder="Search by title, description, or event type..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
            </div>

            <div className="filter-buttons">
              {filters.map(filterOption => (
                <button
                  key={filterOption.key}
                  className={`filter-btn ${filter === filterOption.key ? 'active' : ''}`}
                  onClick={() => setFilter(filterOption.key)}
                >
                  {filterOption.label}
                </button>
              ))}
            </div>
          </div>

          {/* Gallery Grid */}
          {filteredItems.length === 0 ? (
            <div className="empty-state">
              <div className="empty-content">
                <Filter size={48} />
                <h3>No items found</h3>
                <p>Try adjusting your search or filter criteria.</p>
              </div>
            </div>
          ) : (
            <motion.div 
              className="gallery-grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              {filteredItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  className="gallery-item"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  onClick={() => setSelectedItem(item)}
                >
                  <div className="item-media">
                    {item.type === 'image' ? (
                      <img src={item.url} alt={item.title} loading="lazy" />
                    ) : (
                      <video src={item.url} muted preload="metadata" />
                    )}
                    <div className="item-overlay">
                      <div className="overlay-content">
                        <Eye size={24} />
                        <span>View</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="item-content">
                    <h3 className="item-title">{item.title}</h3>
                    <p className="item-description">
                      {item.description || 'No description provided.'}
                    </p>
                    <div className="item-meta">
                      <span 
                        className="event-badge"
                        style={{ backgroundColor: getEventTypeColor(item.eventType) }}
                      >
                        {eventTypes.find(t => t.key === item.eventType)?.label || item.eventType}
                      </span>
                      <span className="upload-date">
                        {new Date(item.uploadDate).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </div>

      {/* Media Modal */}
      {selectedItem && (
        <MediaModal
          item={selectedItem}
          onClose={() => setSelectedItem(null)}
        />
      )}
    </div>
  );
};

export default Gallery;