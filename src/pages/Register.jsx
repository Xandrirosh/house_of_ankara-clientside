import React, { useState } from 'react'
import { FaEyeSlash } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import toast from 'react-hot-toast';
import Axios from '../utils/Axios';
import SummaryApi from '../common/SummaryApi.js';
import AxiosToastError from '../utils/AxiosToastError';
import {Link, useNavigate } from 'react-router-dom'

const Register = () => {
  const [data, setData] = useState({
    name: '',
    email: '',
    mobile: '',
    password: '',
    confirmPassword: ''
  })

  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const navigate = useNavigate()

 

  const handleChange = (e) => {
    const { name, value } = e.target
    setData((prev) => {
      return {
        ...prev,
        [name]: value
      }
    })
  }

  const validateValue = Object.values(data).every(el => el)

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (data.password !== data.confirmPassword) {
      toast.error(
        'password and confirm password fields must be same'
      )
      return
    }

    try {
      const response = await Axios({
        ...SummaryApi.register,
        data: data

      })

      if (response.data.error) {
        toast.error(response.data.message)
      }

      if (response.data.success) {
        toast.success(response.data.message)
        setData({
          name: '',
          email: '',
          mobile: '',
          password: '',
          confirmPassword: ''
        })

        navigate('/login')
      }

    } catch (error) {
      AxiosToastError(error)
    }

  }
  return (
    <>
      <section className='w-full container mx-auto px-2'>
        <div className='bg-white my-4 w-full max-w-lg mx-auto rounded p-7'>
          <p className='flex justify-center text-black font-bold text-2xl'>Welcome To House Of Ankara</p>

          <form className='grid gap-4 mt-6 border p-2 rounded' onSubmit={handleSubmit}>

            <div className='grid gap-1'>
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                autoFocus
                name='name'
                id='name'
                value={data.name}
                onChange={handleChange}
                placeholder='enter your name'
                className='bg-blue-50 p-2 border rounded outline-none focus:border-amber-400'
              />
            </div>

            <div className='grid gap-1'>
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                name='email'
                id='email'
                value={data.email}
                onChange={handleChange}
                placeholder='enter your email'
                className='bg-blue-50 p-2 border rounded outline-none focus:border-amber-400'
              />
            </div>

            <div className='grid gap-1'>
              <label htmlFor="mobile">Mobile:</label>
              <input
                type="mobile"
                name='mobile'
                id='mobile'
                value={data.mobile}
                onChange={handleChange}
                placeholder='enter your mobile number'
                className='bg-blue-50 p-2 border rounded outline-none focus:border-amber-400'
              />
            </div>

            <div className='grid gap-1'>
              <label htmlFor=" password">Password:</label>

              <div className='bg-blue-50 p-2 border rounded flex items-center focus-within:border-amber-400'>
                <input
                  type={showPassword ? 'text' : 'password'}
                  name='password'
                  id='password'
                  value={data.password}
                  onChange={handleChange}
                  placeholder='enter your password'
                  className='w-full outline-none'
                />
                <div onClick={() => setShowPassword(prev => !prev)} className='cursor-pointer'>
                  {
                    showPassword ? (
                      <FaEye />
                    ) : (
                      <FaEyeSlash />
                    )
                  }
                </div>
              </div>
            </div>

            <div className='grid gap-1'>
              <label htmlFor=" confirmPassword">Confirm password:</label>

              <div className='bg-blue-50 p-2 border rounded flex items-center focus-within:border-amber-400'>
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  name='confirmPassword'
                  id='confirmPassword'
                  value={data.confirmPassword}
                  onChange={handleChange}
                  placeholder='enter your confirm password'
                  className='w-full outline-none'
                />
                <div onClick={() => setShowConfirmPassword(prev => !prev)} className='cursor-pointer'>
                  {
                    showConfirmPassword ? (
                      <FaEye />
                    ) : (
                      <FaEyeSlash />
                    )
                  }
                </div>
              </div>
            </div>

            <button disabled={!validateValue} className={`${validateValue ? 'bg-gray-600 hover:bg-black' : 'bg-gray-500'}
             text-white font-semibold rounded py-2 my-3 tracking-wide`}>
              Register
            </button>
          </form>
          <p className='text-center text-sm'>
            Already have an account ? <Link to={'/login'}
            className='font-semibold text-blue-700 hover:text-blue-800'>Login</Link>
          </p>
        </div>
      </section>
    </>
  )
}

export default Register