import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import logo from '../assets/ankarahselogo.jpg'
import { IoMenu } from "react-icons/io5";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import UserMenu from './UserMenu';

const Header = () => {
    const [openUserMenu, setOpenUserMenu] = useState(false);
    return (
        <header className='h-20  sticky top-0 z-40 bg-white flex justify-between items-center  shadow-2xl'>
            <div className='flex items-center justify-between w-full px-2'>
                <div className='flex items-center'>
                    <Link to="/">
                        <div className='flex items-center'>
                            <img src={logo} alt="House of Ankara" className='h-12' />
                             <h1 className='text-md font-bold text-gray-800'>House of Ankara</h1>
                        </div>
                    </Link>
                </div>
                <div className='flex items-center cursor-pointer gap-1'>
                    <div>
                        <HiOutlineShoppingBag size={20} />
                    </div>
                    <div onClick={() => setOpenUserMenu(true)}>
                        <IoMenu size={25} />
                    </div>
                </div>
            </div>
            {
                openUserMenu && (
                    <div className='w-full h-auto bg-white shadow-lg rounded p-4 absolute top-20 right-0 z-50'>
                        <UserMenu close={() => setOpenUserMenu(false)} />
                    </div>
                )
            }
        </header>
    )
}

export default Header