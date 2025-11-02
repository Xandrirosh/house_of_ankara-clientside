import React from 'react'
import { IoClose } from 'react-icons/io5'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { FiLogIn } from "react-icons/fi";
import { FiLogOut } from "react-icons/fi";
import { toast } from 'react-hot-toast';
import summaryApi from '../common/SummaryApi.js';
import { logout } from '../store/userSlice';
import Axios from '../utils/Axios';
import AxiosToastError from '../utils/AxiosToastError';
import { HiExternalLink } from "react-icons/hi";
import isAdmin from '../utils/isAdmin';

const UserMenu = ({ close }) => {
    const loadingCategory = useSelector(state => state.product.loadingCategory)
    const categoryData = useSelector(state => state.product.allCategory)
    const user = useSelector((state) => state?.user)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleLogout = async () => {
        try {
            const response = await Axios({
                ...summaryApi.logout
            })

            if (response.data.success) {
                if (close) {
                    close()
                }
                dispatch(logout())
                localStorage.clear()
                toast.success(response.data.message)
                navigate('/')
            }
        } catch (error) {
            AxiosToastError(error)
        }
    }
    const handleCloseDashboard = () => {
        if (close) {
            close()
        }
    }
    const handleRedirectProductListPage = (id, cat) => {
        navigate(`/products?category=${id}&cat=${cat}`)
        handleCloseDashboard()
    }
    return (
        <div className='relative'>
            <div onClick={handleCloseDashboard} className='absolute right-2 top-2 cursor-pointer'>
                <IoClose size={20} />
            </div>
            <nav className='grid space-y-4'>
                <div className='font-semibold text-md text-center'>Explore Our Collections</div>
                <div className='container mx-auto my-1 grid grid-cols-3 md:grid-cols-8 lg:grid-cols-10 gap-2 border-b pb-2' >
                        {
                            loadingCategory ? (
                                new Array(10).fill(null).map((c, index) => {
                                    return (
                                        <div
                                            key={index + 'loadingcategory'}
                                            className='bg-white rounded p-1 grid gap-1 shadow animate-pulse'>
                                            <div className='bg-blue-100 min-h-3 rounded'></div>
                                            <div className='bg-blue-100 h-3 rounded'></div>
                                        </div>
                                    )
                                })
                            ) : (
                                categoryData.map((cat, index) => {
                                    return (
                                        <div
                                            key={cat._id + 'displayingcategory'}
                                            className='w-full h-full' onClick={() => handleRedirectProductListPage(cat._id, cat.name)}>
                                            <div className='bg-white rounded p-1 grid gap-1 shadow hover:shadow-lg cursor-pointer hover:scale-105 transition-all duration-150 ease-in'>
                                                <p className='text-center text-xs line-clamp-1'>{cat.name}</p>
                                            </div>
                                        </div>
                                    )
                                })
                            )
                        }
                </div>
                <div className='flex flex-col space-y-2.5'>
                    <div className='font-semibold text-sm'>My Account</div>
                    <div className='text-sm flex items-center gap-2 border-b pb-4'>
                        <span className='max-w-52 text-ellipsis line-clamp-1'> {user.name || user.mobile}<span className='text-green-600 font-medium'>{user.role === 'ADMIN' ? '{Admin}' : ''}</span></span>
                        <Link to={'profile'} onClick={handleCloseDashboard} className=' hover:text-blue-600'><HiExternalLink size={15} /></Link>
                    </div>
                    {
                        user?._id ? (
                            <>
                                {
                                    isAdmin(user.role) && (

                                        <Link onClick={handleCloseDashboard} to={"/category"} className='px-2 hover:bg-orange-200'>Category</Link>
                                    )
                                }
                                {
                                    isAdmin(user.role) && (
                                        <Link onClick={handleCloseDashboard} to={"/upload"} className='px-2 hover:bg-orange-200'>Upload Product</Link>

                                    )
                                }
                                {
                                    isAdmin(user.role) && (
                                        <Link onClick={handleCloseDashboard} to={"/product"} className='px-2 hover:bg-orange-200'>Product</Link>

                                    )
                                }
                                <Link onClick={handleCloseDashboard} to={"/order"} className='px-2 hover:bg-orange-200'>My Orders</Link>
                                <Link onClick={handleCloseDashboard} to={"/address"} className='px-2 hover:bg-orange-200'>Save Address</Link>
                                <button onClick={handleLogout} className='text-blue-800 hover:text-blue-600 cursor-pointer flex items-center gap-1'>
                                    <p>Logout</p>
                                    <FiLogOut />
                                </button>
                            </>
                        ) : (
                            <div>
                                <p className='text-gray-600 text-sm'>Please login to access your account</p>
                                <Link to="/login" className='text-blue-800 hover:text-blue-600 flex items-center gap-1' onClick={close}>
                                    <p>Login </p>
                                    <FiLogIn />
                                </Link>
                            </div>
                        )
                    }
                </div>
            </nav>

        </div>
    )
}

export default UserMenu