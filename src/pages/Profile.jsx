import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react';
import AxiosToastError from '../utils/AxiosToastError';
import Axios from '../utils/Axios';
import SummaryApi from '../common/SummaryApi.js';
import toast from 'react-hot-toast';
import { setUserDetails } from '../store/userSlice';
import FetchUserDetails from '../utils/FetchUserDetails';
const Profile = () => {
  const user = useSelector(state => state.user)
  const dispatch = useDispatch()
  const [userData, setUserData] = useState({
    name: user.name,
    email: user.email,
    mobile: user.mobile
  })

  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setUserData({
      name: user.name,
      email: user.email,
      mobile: user.mobile
    })
  }, [user])

  const handleOnchange = (e) => {
    const { name, value } = e.target

    setUserData((prev) => {
      return {
        ...prev,
        [name]: value
      }
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      setLoading(true)
      const response = await Axios({
        ...SummaryApi.updateUser,
        data: userData
      })

      const { data: responseData } = response

      if (responseData.success) {
        toast.success(responseData.message)
        const userData = await FetchUserDetails()
        dispatch(setUserDetails(userData.data))
      }
    } catch (error) {
      AxiosToastError(error)
    } finally {
      setLoading(false)
    }
  }
  return (
    <div className='p-4'>
      {/**name ,email, mobile change password */}
      <h1 className='text-center font-bold text-2xl'>Edit Your Details</h1>
      <form className='my-4 grid gap-4 border p-2 rounded' onSubmit={handleSubmit} >
        <div className='grid'>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            placeholder='enter your name'
            className='p-2 bg-blue-50 outline-none border focus-within:border-blue-600 rounded'
            value={userData.name}
            name='name'
            onChange={handleOnchange}
            required
          />
        </div>

        <div className='grid'>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            placeholder='enter your email'
            className='p-2 bg-blue-50 outline-none border focus-within:border-blue-600 rounded'
            value={userData.email}
            name='email'
            onChange={handleOnchange}
            required
          />
        </div>

        <div className='grid'>
          <label htmlFor="mobile">Mobile:</label>
          <input
            type="number"
            placeholder='enter your mobile'
            className='p-2 bg-blue-50 outline-none border focus-within:border-blue-600 rounded'
            value={userData.mobile}
            name='mobile'
            onChange={handleOnchange}
            required
          />
        </div>

        <button className='border px-4 py-2 font-semibold bg-gray-600 hover:bg-black  text-white  tracking-wide rounded'>
          {
            loading ? 'loading...' : 'Submit'
          }
        </button>
      </form>
    </div>
  )
}

export default Profile