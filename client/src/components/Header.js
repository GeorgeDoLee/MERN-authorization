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
        link: '/'
    },
    {
        name: 'Contact Us',
        link: '/'
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
    <section className='container sticky top-0 bottom-0 right-0 px-10 py-4 shadow-md'>
        <div className='flex justify-between'>
            <h1 className='text-2xl font-bold text-zinc-800'>
                AUTH
            </h1>

            <div className='flex items-center gap-8'>
                <nav>
                    <ul className='flex gap-10'>
                        {navItems.map((item, index) => (
                            <li key={index} className='text-lg font-semibold text-zinc-800'>
                                <Link to={item.link} >{item.name}</Link>
                            </li>
                        ))}
                    </ul>
                </nav>
                        
                {!userInfo ? (
                    <div className='flex gap-5'>
                        <button onClick={() => navigate('/sign-in')} className='px-5 py-1 text-base font-semibold border-2 rounded-md border-zinc-800'>Sign In</button>
                        <button onClick={() => navigate('/sign-up')} className='px-5 py-1 text-base font-semibold border-2 rounded-md border-zinc-800'>Sign Up</button>
                    </div>
                ) : (
                    <button onClick={() => logoutHandler()} className='px-5 py-1 text-base font-semibold border-2 rounded-md border-zinc-800'>Log Out</button>
                )}
            </div>
        </div>
    </section>
  )
}

export default Header
