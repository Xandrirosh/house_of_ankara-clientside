import React, { useState } from 'react'
import SummaryApi from '../common/summaryApi'
import Axios from '../utils/Axios'
import toast from 'react-hot-toast'
import AxiosToastError from '../utils/AxiosToastError'
import DisplayPriceKSH from '../utils/DisplayPriceKSH'
import EditProduct from './EditProduct'
import ConfirmBox from './ConfirmBox'

const ProductCardAdmin = ({ data, fetchProductData }) => {
    const [editOpen, setEditOpen] = useState(false)
    const [openDelete, setOpenDelete] = useState(false)
    const handleDeleteProduct = async () => {
        try {
            const response = await Axios({
                ...SummaryApi.deleteProductDetails,
                data: {
                    _id: data._id
                }
            })
            const { data: responseData } = response
            if (responseData.success) {
                toast.success(responseData.message)
                if (fetchProductData) {
                    fetchProductData()
                }
                setOpenDelete(false)
            }
        } catch (error) {
            AxiosToastError(error)
        }
    }
  return (
    <div className='w-36 p-4 rounded bg-gray-100 text-black text-xs md:text-sm lg:text-base '>
            <div>
                <img
                    src={data?.image[0]}
                    alt={data?.name}
                    className='w-full h-full object-scale-down rounded'
                />
            </div>
            <p className='text-ellipsis line-clamp-2 font-semibold text-xs'>{data?.name}</p>
            <div>{data?.unit}</div>
            <div className='flex gap-1 text-green-700 font-semibold'>
                <div>{DisplayPriceKSH(data?.price)}</div>
            </div>
            <div className='grid grid-cols-2 gap-2 py-2'>
                <button onClick={() => setEditOpen(true)} className='border px-1 py-1 text-sm border-green-600 bg-green-100 text-green-800 hover:bg-green-200 rounded'>
                    edit
                </button>
                <button onClick={() => setOpenDelete(true)} className='border px-1 py-1 text-sm  border-red-600 bg-red-100 text-red-800 hover:bg-red-200 rounded'>
                    delete
                </button>
            </div>
            {
                editOpen && (
                    <EditProduct fetchProductData={fetchProductData} data={data} close={() => setEditOpen(false)} />
                )
            }
            {
                openDelete && (
                    <ConfirmBox confirm={handleDeleteProduct} cancel={() => setOpenDelete(false)} close={() => setOpenDelete(false)} />
                )
            }
        </div>
  )
}

export default ProductCardAdmin