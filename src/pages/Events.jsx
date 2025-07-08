import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Heart, Users, Calendar, Star } from 'lucide-react';
import { motion } from 'framer-motion';
import './Events.css';

const Events = () => {
  const eventTypes = [
    {
      id: 1,
      title: "Dream Weddings",
      description: "From intimate ceremonies to grand celebrations, we create magical wedding experiences that reflect your unique love story.",
      image: "https://images.pexels.com/photos/1024993/pexels-photo-1024993.jpeg?auto=compress&cs=tinysrgb&w=800",
      features: ["Venue Selection", "Decoration & Styling", "Photography Coordination", "Catering Management"],
      icon: <Heart className="event-icon" />
    },
    {
      id: 2,
      title: "Anniversary Celebrations",
      description: "Celebrate your journey of love with elegant anniversary parties that honor your special milestones.",
      image: "https://images.pexels.com/photos/1729931/pexels-photo-1729931.jpeg?auto=compress&cs=tinysrgb&w=800",
      features: ["Romantic Themes", "Memory Displays", "Guest Coordination", "Special Surprises"],
      icon: <Star className="event-icon" />
    },
    {
      id: 3,
      title: "Corporate Events",
      description: "Professional event planning for conferences, product launches, and corporate celebrations.",
      image: "https://images.pexels.com/photos/1181396/pexels-photo-1181396.jpeg?auto=compress&cs=tinysrgb&w=800",
      features: ["Conference Setup", "AV Equipment", "Networking Events", "Brand Integration"],
      icon: <Users className="event-icon" />
    },
    {
      id: 4,
      title: "Birthday Parties",
      description: "Unforgettable birthday celebrations for all ages, from kids' parties to milestone birthdays.",
      image: "https://images.pexels.com/photos/1729931/pexels-photo-1729931.jpeg?auto=compress&cs=tinysrgb&w=800",
      features: ["Theme Parties", "Entertainment", "Custom Decorations", "Party Favors"],
      icon: <Calendar className="event-icon" />
    }
  ];

  const testimonials = [
    {
      name: "Sarah & Michael",
      event: "Wedding",
      text: "Majestic Moments made our dream wedding come true! Every detail was perfect, and the team was incredibly professional.",
      rating: 5
    },
    {
      name: "Corporate Client",
      event: "Product Launch",
      text: "Outstanding service for our product launch. The event was flawlessly executed and exceeded our expectations.",
      rating: 5
    },
    {
      name: "The Johnson Family",
      event: "50th Anniversary",
      text: "They helped us celebrate our parents' 50th anniversary in the most beautiful way. Highly recommended!",
      rating: 5
    }
  ];

  const stats = [
    { number: "50+", label: "Events Completed" },



    { number: "5+", label: "Years Experience" },


    { number: "40+", label: "Happy Couples" },


    { number: "90%", label: "Satisfaction Rate" }
  ];

  return (
    <div className="events-page">
      <div className="page-header">
        <div className="container">
          <h1>Our Event Services</h1>
          <p>Creating unforgettable moments with professional event planning and coordination.</p>
        </div>
      </div>

      {/* Event Types Section */}
      <section className="event-types">
        <div className="container">
          <div className="section-heading">
            <h6>| Our Services</h6>
            <h2>We Specialize In</h2>
            <p>From intimate gatherings to grand celebrations, we bring your vision to life.</p>
          </div>

          <div className="events-grid">
            {eventTypes.map((event, index) => (
              <motion.div
                key={event.id}
                className="event-card"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="event-image">
                  <img src={event.image} alt={event.title} />
                  <div className="event-overlay">
                    {event.icon}
                  </div>
                </div>
                
                <div className="event-content">
                  <h3>{event.title}</h3>
                  <p>{event.description}</p>
                  
                  <ul className="event-features">
                    {event.features.map((feature, idx) => (
                      <li key={idx}>✓ {feature}</li>
                    ))}
                  </ul>
                  
                  <Link to="/contact" className="btn btn-outline">
                    Learn More <ArrowRight size={16} />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="container">
          <div className="stats-grid">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                className="stat-item"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <h3>{stat.number}</h3>
                <p>{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials">
        <div className="container">
          <div className="section-heading">
            <h6>| Testimonials</h6>
            <h2>What Our Clients Say</h2>
            <p>Don't just take our word for it - hear from our satisfied clients.</p>
          </div>

          <div className="testimonials-grid">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                className="testimonial-card"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="testimonial-content">
                  <div className="stars">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="star filled" />
                    ))}
                  </div>
                  <p>"{testimonial.text}"</p>
                </div>
                <div className="testimonial-author">
                  <h4>{testimonial.name}</h4>
                  <span>{testimonial.event}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <motion.div
            className="cta-content"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2>Ready to Plan Your Perfect Event?</h2>
            <p>Let's discuss your vision and create something extraordinary together.</p>
            <div className="cta-buttons">
              <Link to="/contact" className="btn btn-primary">
                Get Started <ArrowRight size={16} />
              </Link>
              <Link to="/gallery" className="btn btn-outline">
                View Gallery
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Events;