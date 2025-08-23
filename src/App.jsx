import { useState, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import AboutSection from './components/AboutSection';
import ContactSection from './components/ContactSection';
import CustomCursor from './components/CustomCursor';
import Footer from './components/Footer';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import ProgressBar from './components/ProgressBar';
import ProjectSection from './components/ProjectSection';

function App() {
  const [contactFormOpen, setContactFormOpen] = useState(false);

  const openContactForm = () => setContactFormOpen(true);
  const closeContactForm = () => setContactFormOpen(false);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    ScrollTrigger.refresh();

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <>
      <Header 
        contactFormOpen={contactFormOpen} 
        openContactForm={openContactForm} 
        closeContactForm={closeContactForm} 
      />
      <HeroSection />
      <CustomCursor />
      <AboutSection />
      <ProjectSection />
      <ContactSection openContactForm={openContactForm} />
      <Footer />
      <ProgressBar />
    </>
  );
}

export default App;
