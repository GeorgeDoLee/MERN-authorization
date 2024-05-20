import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RxHamburgerMenu } from "react-icons/rx"
import { IoIosCloseCircleOutline } from "react-icons/io";

import { resetUserInfo } from '../store/reducers/userReducers';
import { useQueryClient } from '@tanstack/react-query';

const navItems = [
    {
        name: 'Home',
        link: '/',
    },
    {
        name: 'About Us',
        link: '/'
    },
    {
        name: 'Contact Us',
        link: '/'
    }
]

const Header = () => {
    const [navShowing, setNavShowing] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const queryClient = useQueryClient();
    const userInfo = useSelector(state => state.user.userInfo);

    const logoutHandler = () => {
        dispatch(resetUserInfo());
        localStorage.removeItem('account');
        queryClient.invalidateQueries(['profile']);
    }

    const navVisibilityHandler = () => {
      setNavShowing(prev => !prev);
    }

    

  return (
    <section className='container sticky top-0 bottom-0 right-0 px-5 py-4 shadow-md sm:px-10'>
        <div className='relative flex items-center justify-between'>
            <h1 className='text-xl font-bold md:text-2xl text-zinc-800'>
                AUTH
            </h1>
            {navShowing ? (
                    <IoIosCloseCircleOutline onClick={navVisibilityHandler} className='block w-6 h-auto md:hidden' />
                ) : (
                    <RxHamburgerMenu onClick={navVisibilityHandler} className='block w-6 h-auto md:hidden' />
                )
            }
            <div className={`items-center ${navShowing ? 'flex top-0 text-center' : 'hidden'} flex-col md:flex-row bg-zinc-800 md:bg-transparent rounded-lg md:rounded-none py-10 md:py-0 w-full md:w-auto mt-[60px] md:mt-0 gap-10 md:gap-6 lg:gap-8 absolute md:relative md:flex`}>
                <nav>
                    <ul className='flex flex-col gap-10 md:gap-5 lg:gap-10 md:flex-row'>
                        {navItems.map((item, index) => (
                            <li key={index} className='font-semibold text-white md:text-base lg:text-lg md:text-zinc-800'>
                                <Link to={item.link} >{item.name}</Link>
                            </li>
                        ))}
                    </ul>
                </nav>
                
                <div className='flex gap-3 text-white lg:gap-5 md:text-zinc-800'>
                    {!userInfo ? (
                        <>
                            <button onClick={() => navigate('/sign-in')} className='px-5 py-1 text-base font-semibold border-2 border-white rounded-md md:px-3 lg:px-5 md:border-zinc-800'>Sign In</button>
                            <button onClick={() => navigate('/sign-up')} className='px-5 py-1 text-base font-semibold border-2 border-white rounded-md md:px-3 lg:px-5 md:border-zinc-800'>Sign Up</button>
                        </>
                    ) : (
                        <>
                            <button onClick={() => navigate('/profile')} className='py-1 text-base font-semibold border-2 border-white rounded-md md:px-3 lg:px-5 md:border-zinc-800'>Profile</button>
                            <button onClick={() => logoutHandler()} className='py-1 text-base font-semibold border-2 border-white rounded-md md:px-3 lg:px-5 md:border-zinc-800'>Log Out</button>
                        </>
                    )}
                </div>

            </div>
        </div>
    </section>
  )
}

export default Header
