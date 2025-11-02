import React, { useState } from 'react'
import { IoClose } from "react-icons/io5";
import uploadImage from '../utils/uploadImage.js';
import Axios from '../utils/Axios.js';
import SummaryApi from '../common/SummaryApi.js';
import toast from 'react-hot-toast';
import AxiosToastError from '../utils/AxiosToastError.js';

const EditCategory = ({ close, fetchData, data: props }) => {
    const [data, setData] = useState({
        _id: props._id || '',
        name: props.name || '',
        image: props.image || '',
    })
    const [loading, setLoading] = useState(false);

    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setData((prev) => ({
            ...prev,
            [name]: value
        }))
    }


    const handleOnSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const response = await Axios({
                ...SummaryApi.updateCategory,
                data: data
            })
            const { data: responseData } = response;

            if (responseData.success) {
                toast.success(responseData.message);
                close();
                fetchData();
            }
        } catch (error) {
            AxiosToastError(error);
        } finally {
            setLoading(false)
        }
    }

    const handleUploadCategoryImage = async (e) => {
        const file = e.target.files[0];

        if (!file) return;
        setLoading(true);
        const response = await uploadImage(file)
        const imageResponse = response.data.secure_url;
        setLoading(false);
        setData((prev) => {
            return {
                ...prev,
                image: imageResponse
            }

        })

    }
    return (
        <section className='fixed top-0 left-0 w-full h-full bg-neutral-800 bg-opacity-60 flex items-center justify-center px-4'>
            <div className='bg-white p-3 rounded  w-full max-w-4xl '>
                <div className='flex items-center justify-between '>
                    <h1 className='font-semibold'> Update Category</h1>
                    <button onClick={close} className='w-fit block ml-auto'>
                        <IoClose size={25} />
                    </button>
                </div>
                <form className='my-3 grid gap-2' onSubmit={handleOnSubmit}>
                    <div className='grid gap-1'>
                        <label id='categoryName'>Name</label>
                        <input
                            type="text"
                            id='categoryName'
                            name='name'
                            value={data.name}
                            onChange={handleOnChange}
                            placeholder='Enter category name'
                            className='bg-blue-50  border border-blue-100 rounded p-2 outline-none focus-within:border-primary-200'
                        />
                    </div>
                    <div className='grid gap-1'>
                        <p>Image</p>
                        <div className='flex gap-4 flex-col lg:flex-row items-center'>
                            <div className='border bg-blue-50 h-36 w-full lg:w-36 md:w-36 flex items-center justify-center rounded'>
                                {
                                    data.image ? (
                                        <img
                                            src={data.image}
                                            alt="category"
                                            className='h-full w-full object-scale-down '
                                        />
                                    ) : (

                                        <p className='text-sm text-neutral-400'>No image</p>
                                    )
                                }
                            </div>
                            <label htmlFor="uploadCategoryImage">
                                <div className={`
                                ${!data.name ? 'bg-gray-400' : 'border-prima-200 hover:bg-blue-700'}
                                px-4 py-2 rounded cursor-pointer border font-medium
                             `}>
                                    {
                                        loading ? 'Uploading...' : ' Upload Image'
                                    }
                                </div>

                                <input disabled={!data.name} onChange={handleUploadCategoryImage} type="file" id='uploadCategoryImage' className='hidden' />
                            </label>
                        </div>
                    </div>
                    <button
                        className={
                            `
                        ${!data.name || !data.image ? 'bg-gray-600' : 'bg-gray-400 hover:bg-gray-600'}
                         px-4 py-2 rounded cursor-pointer font-semibold
                        `
                        }
                    >Update Category</button>
                </form>
            </div>
        </section>
    )
}

export default EditCategory