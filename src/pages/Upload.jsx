import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload as UploadIcon, X, Image, Video, FileText } from 'lucide-react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { uploadMedia } from '../services/api';
import './Upload.css';

const Upload = () => {
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    eventType: '',
    eventDate: ''
  });

  const onDrop = useCallback((acceptedFiles) => {
    const newFiles = acceptedFiles.map(file => ({
      file,
      id: Math.random().toString(36).substr(2, 9),
      preview: URL.createObjectURL(file),
      type: file.type.startsWith('image/') ? 'image' : 'video'
    }));
    
    setFiles(prev => [...prev, ...newFiles]);
    toast.success(`${acceptedFiles.length} file(s) added successfully!`);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif'],
      'video/*': ['.mp4', '.webm', '.ogg']
    },
    maxSize: 50 * 1024 * 1024, // 50MB
    onDropRejected: (rejectedFiles) => {
      rejectedFiles.forEach(({ errors }) => {
        errors.forEach(error => {
          if (error.code === 'file-too-large') {
            toast.error('File is too large. Maximum size is 50MB.');
          } else if (error.code === 'file-invalid-type') {
            toast.error('Invalid file type. Please upload images or videos only.');
          }
        });
      });
    }
  });

  const removeFile = (id) => {
    setFiles(prev => {
      const fileToRemove = prev.find(f => f.id === id);
      if (fileToRemove) {
        URL.revokeObjectURL(fileToRemove.preview);
      }
      return prev.filter(f => f.id !== id);
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (files.length === 0) {
      toast.error('Please select at least one file to upload.');
      return;
    }

    if (!formData.title || !formData.eventType) {
      toast.error('Please fill in all required fields.');
      return;
    }

    setUploading(true);
    
    try {
      const uploadPromises = files.map(({ file }) => {
        const data = new FormData();
        data.append('file', file);
        data.append('title', formData.title);
        data.append('description', formData.description);
        data.append('eventType', formData.eventType);
        data.append('eventDate', formData.eventDate);
        
        return uploadMedia(data);
      });

      await Promise.all(uploadPromises);
      
      toast.success('Files uploaded successfully!');
      
      // Reset form
      setFiles([]);
      setFormData({
        title: '',
        description: '',
        eventType: '',
        eventDate: ''
      });
      
    } catch (error) {
      console.error('Upload error:', error);
      toast.error('Upload failed. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="upload-page">
      <div className="page-header">
        <div className="container">
          <h1>Share Your Memories</h1>
          <p>Upload your beautiful wedding photos, event videos, and special moments with us.</p>
        </div>
      </div>

      <div className="upload-content">
        <div className="container">
          <motion.div
            className="upload-form-container"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <form onSubmit={handleSubmit} className="upload-form">
              {/* Dropzone */}
              <div
                {...getRootProps()}
                className={`dropzone ${isDragActive ? 'active' : ''}`}
              >
                <input {...getInputProps()} />
                <UploadIcon className="upload-icon" />
                <h3>
                  {isDragActive
                    ? 'Drop your files here...'
                    : 'Drag & drop files here, or click to browse'
                  }
                </h3>
                <p>Support for images (JPEG, PNG, GIF) and videos (MP4, WebM) up to 50MB</p>
              </div>

              {/* File Preview */}
              {files.length > 0 && (
                <div className="file-preview">
                  <h4>Selected Files ({files.length})</h4>
                  <div className="preview-grid">
                    {files.map(({ id, file, preview, type }) => (
                      <div key={id} className="preview-item">
                        <div className="preview-media">
                          {type === 'image' ? (
                            <img src={preview} alt={file.name} />
                          ) : (
                            <video src={preview} muted />
                          )}
                          <div className="preview-overlay">
                            {type === 'image' ? <Image size={24} /> : <Video size={24} />}
                          </div>
                        </div>
                        <div className="preview-info">
                          <p className="file-name">{file.name}</p>
                          <p className="file-size">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                        </div>
                        <button
                          type="button"
                          className="remove-btn"
                          onClick={() => removeFile(id)}
                        >
                          <X size={16} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Form Fields */}
              <div className="form-fields">
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="title" className="form-label">
                      Title *
                    </label>
                    <input
                      type="text"
                      id="title"
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      className="form-input"
                      placeholder="Enter a title for your upload..."
                      required
                    />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="eventType" className="form-label">
                      Event Type *
                    </label>
                    <select
                      id="eventType"
                      name="eventType"
                      value={formData.eventType}
                      onChange={handleInputChange}
                      className="form-select"
                      required
                    >
                      <option value="">Select Event Type</option>
                      <option value="wedding">Wedding</option>
                      <option value="anniversary">Anniversary</option>
                      <option value="birthday">Birthday</option>
                      <option value="corporate">Corporate Event</option>
                      <option value="engagement">Engagement</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="eventDate" className="form-label">
                      Event Date
                    </label>
                    <input
                      type="date"
                      id="eventDate"
                      name="eventDate"
                      value={formData.eventDate}
                      onChange={handleInputChange}
                      className="form-input"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="description" className="form-label">
                    Description
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    className="form-textarea"
                    placeholder="Tell us about this special moment..."
                    rows="4"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="btn btn-primary submit-btn"
                disabled={uploading || files.length === 0}
              >
                {uploading ? (
                  <>
                    <div className="spinner" />
                    Uploading...
                  </>
                ) : (
                  <>
                    <UploadIcon size={16} />
                    Upload Files
                  </>
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Upload;