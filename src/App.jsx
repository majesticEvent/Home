import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { GalleryProvider } from './context/GalleryContext';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Gallery from './pages/Gallery';
import Upload from './pages/Upload';
import Events from './pages/Events';
import Contact from './pages/Contact';
import './App.css';

function App() {
  return (
    <GalleryProvider>
      <Router>
        <div className="App">
          <Header />
          <main>
            <Routes>
              <Route path="/home" element={<Home />} />
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/upload" element={<Upload />} />
              <Route path="/events" element={<Events />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </main>
          <Footer />
          <Toaster 
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: '#363636',
                color: '#fff',
              },
              success: {
                duration: 3000,
                theme: {
                  primary: '#4aed88',
                },
              },
            }}
          />
        </div>
      </Router>
    </GalleryProvider>
  );
}

export default App;