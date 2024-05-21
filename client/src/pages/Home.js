

import React from 'react'
import MainLayout from '../components/MainLayout'

const Home = () => {
  return (
    <MainLayout>
      <section className='container px-5 py-12'>
        <div className='flex flex-col items-center gap-6 text-zinc-800'>
          <h1 className='text-xl font-bold text-center sm:text-3xl'>Welcome to the MERN Authorization Demo</h1>
          <p className='max-w-xl text-sm italic font-semibold text-justify sm:text-center sm:text-base'>
            This website is designed to demonstrate the fundamental features of a user authorization system utilizing the MERN stack, which comprises MongoDB, Express.js, React.js, and Node.js, and is styled using TailwindCSS.
          </p>
        </div>
        
        <div className='flex flex-col items-center gap-3 mt-20 text-zinc-800'>
          <h2 className='text-lg font-semibold'>Features</h2>
          <ul className='flex flex-col gap-2'>
            <li className='text-base italic font-semibold'>
              Sign Up <span className='not-italic font-normal'>- Users can create a new account by entering their basic information.</span>
            </li>
            <li className='text-base italic font-semibold'>
              Sign In <span className='not-italic font-normal'>- Existing users can log in using their credentials.</span>
            </li>
            <li className='text-base italic font-semibold'>
              Profile <span className='not-italic font-normal'>- Once logged in, users can view their personal profile information.</span>
            </li>
            <li className='text-base italic font-semibold'>
              Edit <span className='not-italic font-normal'>- Users have the ability to update their profile details at any time.</span>
            </li>
            <li className='text-base italic font-semibold'>
              Delete <span className='not-italic font-normal'>- Users can permanently delete their account from the system.</span>
            </li>
          </ul>
        </div>
      </section>
    </MainLayout>
  )
}

export default Home
