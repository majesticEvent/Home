import React from 'react';
import { X, Download, Calendar, Tag, Clock } from 'lucide-react';
import { motion } from 'framer-motion';
import './MediaModal.css';

const MediaModal = ({ item, onClose }) => {
  if (!item) return null;

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = item.url;
    link.download = item.fileName || `${item.title}.${item.type === 'image' ? 'jpg' : 'mp4'}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <motion.div
      className="modal-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="modal-content"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-header">
          <h2>{item.title}</h2>
          <div className="modal-actions">
            <button
              className="action-btn download-btn"
              onClick={handleDownload}
              title="Download"
            >
              <Download size={20} />
            </button>
            <button
              className="action-btn close-btn"
              onClick={onClose}
              title="Close"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        <div className="modal-body">
          <div className="media-container">
            {item.type === 'image' ? (
              <img src={item.url} alt={item.title} />
            ) : (
              <video src={item.url} controls autoPlay muted />
            )}
          </div>
        </div>

        <div className="modal-footer">
          <div className="media-info">
            <div className="info-section">
              <h4>Description</h4>
              <p>{item.description || 'No description provided.'}</p>
            </div>

            <div className="info-grid">
              <div className="info-item">
                <Tag className="info-icon" />
                <div>
                  <span className="info-label">Event Type</span>
                  <span className="info-value">{item.eventType}</span>
                </div>
              </div>

              {item.eventDate && (
                <div className="info-item">
                  <Calendar className="info-icon" />
                  <div>
                    <span className="info-label">Event Date</span>
                    <span className="info-value">
                      {new Date(item.eventDate).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              )}

              <div className="info-item">
                <Clock className="info-icon" />
                <div>
                  <span className="info-label">Uploaded</span>
                  <span className="info-value">
                    {new Date(item.uploadDate).toLocaleDateString()}
                  </span>
                </div>
              </div>

              {item.fileSize && (
                <div className="info-item">
                  <div className="info-icon">📁</div>
                  <div>
                    <span className="info-label">File Size</span>
                    <span className="info-value">{formatFileSize(item.fileSize)}</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default MediaModal;