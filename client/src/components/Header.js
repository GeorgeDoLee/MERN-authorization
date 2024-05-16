import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { resetUserInfo } from '../store/reducers/userReducers';

const navItems = [
    {
        name: 'Home',
        link: '/',
    },
    {
        name: 'About Us',
        link: '/about-us'
    },
    {
        name: 'Contact Us',
        link: '/contact-us'
    }
]
 
const Header = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const userInfo = useSelector(state => state.user.userInfo);

    const logoutHandler = () => {
        dispatch(resetUserInfo());
        localStorage.removeItem('account');
    }

  return (
    <section className='container px-10 py-4 sticky top-0 right-0 bottom-0 border-b border-zinc-800'>
        <div className='flex justify-between'>
            <h1 className='font-bold text-2xl text-zinc-800'>
                AUTH
            </h1>

            <div className='flex gap-8 items-center'>
                <nav>
                    <ul className='flex gap-10'>
                        {navItems.map((item, index) => (
                            <li key={index} className='text-lg font-semibold'>
                                <Link to={item.link} >{item.name}</Link>
                            </li>
                        ))}
                    </ul>
                </nav>
                        
                {!userInfo ? (
                    <div className='flex gap-5'>
                        <button onClick={() => navigate('/sign-in')} className='border border-zinc-800 px-5 py-1 rounded-md'>Sign In</button>
                        <button onClick={() => navigate('/sign-up')} className='border border-zinc-800 px-5 py-1 rounded-md'>Sign Up</button>
                    </div>
                ) : (
                    <button onClick={() => logoutHandler()} className='border border-zinc-800 px-5 py-1 rounded-md'>Log Out</button>
                )}
            </div>
        </div>
    </section>
  )
}

export default Header
