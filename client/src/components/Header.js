import React from 'react'
import { Link, useNavigate } from 'react-router-dom';

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

const NavItemRenderer = ({item}) => {
    return (  
        <li className='text-lg font-semibold'>
            <Link to={item.link} >{item.name}</Link>
        </li>
    );
}
 
const Header = () => {
    const navigate = useNavigate();

  return (
    <section className='container px-5 py-4 sticky top-0 right-0 bottom-0'>
        <div className='flex justify-between'>
            <h1 className='font-bold text-2xl text-zinc-800'>
                AUTH
            </h1>

            <div className='flex gap-8 items-center'>
                <nav>
                    <ul className='flex gap-5'>
                        {navItems.map((item, index) => (
                            <NavItemRenderer item={item} />
                        ))}
                    </ul>
                </nav>

                <div className='flex gap-5'>
                    <button onClick={() => navigate('/sign-in')} className='border border-zinc-800 px-5 py-1 rounded-md'>Sign In</button>
                    <button onClick={() => navigate('/sign-up')} className='border border-zinc-800 px-5 py-1 rounded-md'>Sign Up</button>
                </div>
            </div>
        </div>
    </section>
  )
}

export default Header
