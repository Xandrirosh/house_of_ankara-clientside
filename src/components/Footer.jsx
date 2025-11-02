import React from 'react'
import { FaFacebook, FaInstagram, FaLinkedin, FaTiktok, FaTwitter } from 'react-icons/fa'

const Footer = () => {
  return (
     <footer className='border-t bg-gray-100 sticky bottom-0 '>
            <div className='container mx-auto p-4 text-center flex flex-col lg:flex-row lg:justify-between md:flex-row md:justify-between gap-2'>
                <p className="text-center text-gray-800">© 2025 House of ankara. All rights reserved.</p>
                <div className='flex items-center gap-4 justify-center text-2xl'>
                    <a href="" className='hover:text-blue-600'>
                        <FaFacebook />
                    </a>
                    <a href="" className='hover:text-blue-600'>
                        <FaTiktok />
                    </a>
                    <a href="" className='hover:text-blue-600'>
                        <FaInstagram />
                    </a>
                     <a href="" className='hover:text-blue-600'>
                        <FaTwitter />
                    </a>
                    <a href="" className='hover:text-blue-600'>
                        <FaLinkedin />
                    </a>
                </div>
            </div>
        </footer>
  )
}

export default Footer
