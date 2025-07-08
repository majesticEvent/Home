import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Heart, Star, Users, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';
import './Home.css';

const Home = () => {
  const features = [
    {
      icon: <Heart className="feature-icon" />,
      title: "Dream Weddings",
      description: "Creating magical moments that last a lifetime with personalized wedding planning services."
    },
    {
      icon: <Star className="feature-icon" />,
      title: "Premium Events",
      description: "Luxury event planning for corporate gatherings, anniversaries, and special celebrations."
    },
    {
      icon: <Users className="feature-icon" />,
      title: "Expert Team",
      description: "Professional event coordinators with years of experience in creating unforgettable moments."
    },
    {
      icon: <Calendar className="feature-icon" />,
      title: "Full Planning",
      description: "Complete event management from concept to execution, handling every detail perfectly."
    }
  ];

  const stats = [
    { number: "500+", label: "Events Completed" },
    { number: "10+", label: "Years Experience" },
    { number: "50+", label: "Happy Couples" },
    { number: "100%", label: "Satisfaction Rate" }
  ];

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-background">
          <video autoPlay muted loop playsInline>
            <source src="https://player.vimeo.com/external/371433846.sd.mp4?s=236da2f3c0fd273d2c6d9a064f3ae35579b2bbdf&profile_id=139&oauth2_token_id=57447761" type="video/mp4" />
          </video>
          <div className="hero-overlay"></div>
        </div>
        
        <div className="container">
          <motion.div 
            className="hero-content"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1>Creating Majestic Moments</h1>
            <p>Transform your special day into an unforgettable celebration with our expert wedding and event planning services.</p>
            <div className="hero-buttons">
              <Link to="/upload" className="btn btn-primary">
                Share Your Moments <ArrowRight size={16} />
              </Link>
              <Link to="/events" className="btn btn-outline">
                View Our Work
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <div className="container">
          <div className="section-heading">
            <h6>| Our Services</h6>
            <h2>Why Choose Majestic Moments</h2>
            <p>We specialize in creating extraordinary experiences that reflect your unique style and vision.</p>
          </div>
          
          <div className="grid grid-4">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="feature-card"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                {feature.icon}
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats">
        <div className="container">
          <div className="grid grid-4">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                className="stat-card"
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

      {/* CTA Section */}
      <section className="cta">
        <div className="container">
          <motion.div
            className="cta-content"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2>Ready to Create Your Perfect Event?</h2>
            <p>Let's bring your vision to life with our expert planning and attention to detail.</p>
            <Link to="/contact" className="btn btn-primary">
              Get Started Today <ArrowRight size={16} />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;