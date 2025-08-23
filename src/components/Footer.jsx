import React from 'react'
import { FiGithub, FiLinkedin, FiInstagram } from "react-icons/fi";

const Footer = () => {
  return (
    <footer className='bg-black text-white py-16 px-6 m-0'>
      <div className='max-w-6xl mx-auto'>
        <div className='flex flex-col md:flex-row justify-between items-center md:items-start gap-8'>
          {/* Logo */}
          <h2 className='text-3xl font-bold bg-gradient-to-r from-purple-400 to-purple-200 bg-clip-text text-transparent mb-6 md:mb-0 tracking-wide'>
            Suryansh Pandey
          </h2>

          {/* Connect / Social Links */}
          <div className='text-center md:text-left'>
            <h3 className='text-xl font-semibold mb-4 text-purple-200'>
              Connect
            </h3>
            <div className='flex justify-center md:justify-start space-x-4'>
              <a href="https://github.com/Suryansh23102002" aria-label="GitHub" className='text-gray-400 hover:text-violet-400 transition-transform duration-300 hover:scale-110'>
                <FiGithub size={24} />
              </a>
              <a href="https://www.linkedin.com/in/suryanshhpandey/" aria-label="LinkedIn" className='text-gray-400 hover:text-violet-400 transition-transform duration-300 hover:scale-110'>
                <FiLinkedin size={24} />
              </a>
              
            </div>
          </div>
        </div>

        <div className='border-t border-gray-700 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center'>
          <p className='text-gray-400 text-sm'>
            © 2025 Suryansh. All rights reserved.
          </p>

          <div className='flex space-x-6 mt-4 md:mt-0'>
            <a href="#" className='text-gray-400 hover:text-white text-sm transition-colors duration-300'>
              Privacy Policy
            </a>
            <a href="#" className='text-gray-400 hover:text-white text-sm transition-colors duration-300'>
              Terms of Service
            </a>
            <a href="#" className='text-gray-400 hover:text-white text-sm transition-colors duration-300'>
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
