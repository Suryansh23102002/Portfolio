import React, { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import emailjs from '@emailjs/browser';
import { FiGithub, FiLinkedin, FiInstagram, FiMenu, FiX } from 'react-icons/fi';

const Header = ({ contactFormOpen, openContactForm, closeContactForm }) => {
  const [isOpen, setIsOpen] = useState(false);
  const formRef = useRef();

  useEffect(() => {
    // Initialize EmailJS with your public key from environment variables
    emailjs.init(import.meta.env.VITE_EMAILJS_PUBLIC_ID);
  }, []);

  const toggleMenu = () => setIsOpen(prev => !prev);

  const hrefMap = {
    Home: '#hero-section',
    About: '#about-section',
    Projects: '#project-section',
    Contact: '#contact-section',
  };

  const sendEmail = (e) => {
    e.preventDefault();
    emailjs
      .sendForm(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        formRef.current
      )
      .then(() => {
        alert('Message sent successfully!');
        e.target.reset();
        closeContactForm();
      })
      .catch(() => {
        alert('Failed to send message, please try again.');
      });
  };

  return (
    <header className="absolute w-full z-50 transition-all duration-300">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16 md:h-20">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ type: 'spring', stiffness: 100, damping: 25, delay: 0.3, duration: 1.2 }}
          className="flex items-center"
        >
          <div className="h-10 w-10 rounded-xl bg-gradient-to-r from-gray-500 to-gray-100 flex items-center justify-center text-purple-600 font-bold text-xl mr-3">
            SP
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-gray-300 to-gray-100 bg-clip-text text-transparent">Suryansh</span>
        </motion.div>

        <nav className="lg:flex hidden space-x-8">
          {['Home', 'About', 'Projects', 'Contact'].map((item, idx) => (
            <motion.a
              key={item}
              href={hrefMap[item]}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: 'spring', stiffness: 100, damping: 25, delay: 0.7 + idx * 0.2 }}
              className="relative text-gray-800 dark:text-gray-200 hover:text-violet-600 dark:hover:text-violet-400 font-medium transition-colors duration-300 group"
            >
              {item}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-violet-600 group-hover:w-full transition-all duration-300"></span>
            </motion.a>
          ))}
        </nav>

        <div className="md:flex hidden items-center space-x-4">
          <motion.a
            href="https://github.com/Suryansh23102002"
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.3, duration: 0.8 }}
            className="text-gray-700 dark:text-gray-300 hover:text-violet-600 dark:hover:text-violet-400 transition-colors duration-300"
          >
            <FiGithub className="w-5 h-5" />
          </motion.a>
          <motion.a
            href="https://www.linkedin.com/in/suryanshhpandey/"
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.3, duration: 0.8 }}
            className="text-gray-700 dark:text-gray-300 hover:text-violet-600 dark:hover:text-violet-400 transition-colors duration-300"
          >
            <FiLinkedin className="w-5 h-5" />
          </motion.a>
          <motion.button
            onClick={openContactForm}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.6, duration: 0.8, type: 'spring', stiffness: 100, damping: 15 }}
            className="ml-4 px-4 py-2 rounded-xl bg-gradient-to-r from-gray-400 to-gray-100 text-violet-700 font-bold hover:from-violet-700 hover:to-purple-700 hover:text-white transition-all duration-500"
          >
            Hire Me
          </motion.button>
        </div>

        <div className="md:hidden flex items-center">
          <motion.button whileTap={{ scale: 0.7 }} onClick={toggleMenu} className="text-gray-300">
            {isOpen ? <FiX className="h-6 w-6" /> : <FiMenu className="h-6 w-6" />}
          </motion.button>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: isOpen ? 1 : 0, height: isOpen ? 'auto' : 0 }}
        transition={{ duration: 0.5 }}
        className="md:hidden overflow-hidden bg-white dark:bg-gray-900 shadow-lg px-4 py-5 space-y-5"
      >
        <nav className="flex flex-col space-y-3">
          {['Home', 'About', 'Projects', 'Contact'].map((item) => (
            <a
              key={item}
              href={hrefMap[item]}
              className="text-gray-300 font-medium py-2"
              onClick={() => setIsOpen(false)}
            >
              {item}
            </a>
          ))}
        </nav>
        <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
          <div className="flex space-x-5">
            <a href="#">
              <FiGithub className="h-6 w-6 text-gray-300" />
            </a>
            <a href="#">
              <FiLinkedin className="h-6 w-6 text-gray-300" />
            </a>
            <a href="#">
              <FiInstagram className="h-6 w-6 text-gray-300" />
            </a>
          </div>
          <button
            onClick={() => {
              setIsOpen(false);
              openContactForm();
            }}
            className="mt-4 w-full px-4 py-2 rounded-lg bg-gradient-to-r from-violet-600 to-violet-400 font-bold"
          >
            Contact Me
          </button>
        </div>
      </motion.div>

      <AnimatePresence>
        {contactFormOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            role="dialog"
            aria-modal="true"
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 30 }}
              transition={{ type: 'spring', damping: 30, stiffness: 200, duration: 0.8 }}
              className="bg-gray-800 rounded-xl shadow-xl w-full max-w-md p-6"
            >
              <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold text-gray-300">Get In Touch</h1>
                <button type="button" onClick={closeContactForm}>
                  <FiX className="w-5 h-5 text-gray-300 font-extrabold" />
                </button>
              </div>
              <form ref={formRef} onSubmit={sendEmail} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">
                    Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Your Name"
                    required
                    className="w-full px-4 py-2 border border-gray-600 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-violet-500 bg-gray-700"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Your Email"
                    required
                    className="w-full px-4 py-2 border border-gray-600 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-violet-500 bg-gray-700"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-1">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows="4"
                    placeholder="How can we help you?"
                    required
                    className="w-full px-4 py-2 border border-gray-600 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-violet-500 bg-gray-700"
                  />
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.97 }}
                  type="submit"
                  className="w-full px-4 py-2 bg-gradient-to-r from-violet-600 to-violet-400 hover:from-violet-700 hover:to-purple-700 transition-all duration-300 rounded-lg shadow-md hover:shadow-lg hover:shadow-violet-600/50 text-white font-semibold"
                >
                  Send Message
                </motion.button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
