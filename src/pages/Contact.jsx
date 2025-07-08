import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send } from 'lucide-react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { sendContactForm } from '../services/api';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    eventType: '',
    eventDate: '',
    message: ''
  });
  const [submitting, setSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.message) {
      toast.error('Please fill in all required fields.');
      return;
    }

    setSubmitting(true);
    
    try {
      await sendContactForm(formData);
      
      toast.success('Message sent successfully! We\'ll get back to you soon.');
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        eventType: '',
        eventDate: '',
        message: ''
      });
      
    } catch (error) {
      toast.error('Failed to send message. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: <Phone className="contact-icon" />,
      title: "Phone Number",
      details: "+91 9557565320",
      description: "Call us for immediate assistance"
    },
    {
      icon: <Mail className="contact-icon" />,
      title: "Email Address",
      details: "majesticmomentsweddingevent01@gmail.com",
      description: "Send us your queries anytime"
    },
    {
      icon: <MapPin className="contact-icon" />,
      title: "Office Location",
      details: "Taj Ganj, Agra 282001",
      description: "Visit our office for consultation"
    },
    {
      icon: <Clock className="contact-icon" />,
      title: "Working Hours",
      details: "Mon - Sat: 9:00 AM - 8:00 PM",
      description: "Sunday: By appointment only"
    }
  ];

  return (
    <div className="contact-page">
      <div className="page-header">
        <div className="container">
          <h1>Contact Us</h1>
          <p>Let's discuss your dream event and bring your vision to life.</p>
        </div>
      </div>

      <div className="contact-content">
        <div className="container">
          <div className="contact-grid">
            {/* Contact Information */}
            <motion.div
              className="contact-info"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="section-heading">
                <h6>| Get In Touch</h6>
                <h2>Let's Create Something Amazing Together</h2>
                <p>
                  Planning your dream event? We're here to help you every step of the way. 
                  From intimate gatherings to grand celebrations, let's make your special day unforgettable.
                </p>
              </div>

              <div className="contact-cards">
                {contactInfo.map((info, index) => (
                  <motion.div
                    key={index}
                    className="contact-card"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    {info.icon}
                    <div className="contact-details">
                      <h4>{info.title}</h4>
                      <p className="contact-value">{info.details}</p>
                      <p className="contact-description">{info.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              className="contact-form-container"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <form onSubmit={handleSubmit} className="contact-form">
                <h3>Send Us a Message</h3>
                
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="name" className="form-label">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="form-input"
                      placeholder="Your full name..."
                      required
                    />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="email" className="form-label">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="form-input"
                      placeholder="your.email@example.com"
                      required
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="phone" className="form-label">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="form-input"
                      placeholder="+91 XXXXX XXXXX"
                    />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="eventType" className="form-label">
                      Event Type
                    </label>
                    <select
                      id="eventType"
                      name="eventType"
                      value={formData.eventType}
                      onChange={handleInputChange}
                      className="form-select"
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

                <div className="form-group">
                  <label htmlFor="eventDate" className="form-label">
                    Preferred Event Date
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

                <div className="form-group">
                  <label htmlFor="message" className="form-label">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    className="form-textarea"
                    placeholder="Tell us about your event vision, requirements, and any specific details..."
                    rows="5"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="btn btn-primary submit-btn"
                  disabled={submitting}
                >
                  {submitting ? (
                    <>
                      <div className="spinner" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send size={16} />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            </motion.div>
          </div>

          {/* Map Section */}
          <motion.div
            className="map-section"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="map-container">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3559.195933728792!2d78.04214271504366!3d27.175144983010782!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x397476d8c60fcb6f%3A0xf55d2b5b9dbad8a3!2sTaj%20Ganj%2C%20Agra%2C%20Uttar%20Pradesh%20282001!5e0!3m2!1sen!2sin!4v1622228345678!5m2!1sen!2sin"
                width="100%"
                height="400"
                style={{ border: 0, borderRadius: '15px' }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Majestic Moments Location"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Contact;