import React from 'react'
import { FaLinkedin, FaGithub } from "react-icons/fa";
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <section className='container px-10 py-10 bg-zinc-800'>
      <div className='flex flex-col items-center gap-10 text-white'>
        <div className='flex flex-col items-center gap-5'>
          <h3 className='text-lg font-semibold'>Quick Links</h3>
          <ul className='flex gap-10 text-base'>
            <li>
              <Link to='/'>home</Link>
            </li>
            <li>
              <Link to='/'>about us</Link>
            </li>
            <li>
              <Link to='/'>contact us</Link>
            </li>
          </ul>
        </div>
        
        <div className='flex items-center justify-between w-full'>
          <p>
            &copy; Digital property of George Dolidze
          </p>
          
          <div className='flex gap-5'>
            <FaLinkedin className='w-8 h-auto' />
            <FaGithub className='w-8 h-auto' />
          </div>
        </div>
      </div>
    </section>
  )
}

export default Footer
