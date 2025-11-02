import { useParams } from 'react-router-dom'
import SummaryApi from '../common/SummaryApi'
import Axios from '../utils/Axios'
import { useEffect, useRef, useState } from 'react'
import AxiosToastError from '../utils/AxiosToastError'
import { FaAngleRight, FaAngleLeft } from "react-icons/fa";
import DisplayPriceKSH from '../utils/DisplayPriceKSH.js'
import priceWithDiscount from '../utils/priceWithDiscount.js'


const ProductDisplayPage = () => {
    const params = useParams()
    const { productId } = useParams();
    const [data, setData] = useState({
        name: '',
        image: []
    })

    const [loading, setLoading] = useState(false)
    const [image, setImage] = useState(0)
    const imageContainer = useRef()

    const fetchProductDetails = async () => {
        try {
            const response = await Axios({
                ...SummaryApi.getProductDetails(productId),
                data: {
                    productId: productId
                }
            })
            const { data: responseData } = response
            if (responseData.success) {
                setData(responseData.data)
            }
        } catch (error) {
            AxiosToastError(error)
        } finally {
            setLoading(false)
        }
    }
    useEffect(() => {
        fetchProductDetails()
    }, [params])

    return (
        <section className='container mx-auto p-2 grid lg:grid-cols-2'>
            <div className=''>
                <div className='bg-white w-full h-full rounded min-h-56 max-h-56 lg:min-h-[65vh] lg:max-h-[65vh] '>
                    <img
                        src={data.image[image]}
                        alt="image"
                        className='w-full h-full object-scale-down'
                    />
                </div>
                <div className='flex justify-center items-center gap-3 my-2'>
                    {
                        data.image.map((img, index) => {
                            return (
                                <div
                                    key={img + index + 'point'}
                                    className={`w-3 h-3 lg:w-5 lg:h-5 rounded-full ${index === image ? 'bg-black' : 'bg-slate-200'
                                        }`}
                                />
                            )
                        })
                    }
                </div>
                <div className="grid relative">
                    <div className="flex justify-start md:justify-center items-center gap-3 overflow-x-auto px-2 md:px-0 scrollbar-none">
                        {data.image.map((img, index) => (
                            <div
                                key={img + index}
                                className="w-16 h-16 md:w-20 md:h-20 min-w-16 min-h-16 md:min-w-20 md:min-h-20 cursor-pointer shadow-md rounded overflow-hidden transition-transform hover:scale-105"
                                onClick={() => setImage(index)}
                            >
                                <img
                                    src={img}
                                    alt={`Thumbnail ${index + 1}`}
                                    className="w-full h-full object-contain"
                                />
                            </div>
                        ))}
                    </div>
                </div>

            </div>
            <div className='p-4 lg:pl-7 text-base lg:text-lg'>
                <h2 className='font-semibold lg:text-3xl text-md'>{data.name}</h2>
                <div>
                    <p className='font-semibold'>Price</p>
                    <div className='flex items-center gap-2'>
                        <div className='border border-green-600 px-3 py-1 rounded bg-green-50 w-fit' >
                            <p className='font-semibold text-xs lg:text-xl text-green-700'>{DisplayPriceKSH(priceWithDiscount(data.price, data.discount))}</p>
                        </div>
                        {
                            Boolean(data.discount) && (
                                <p className='line-through text-sm text-neutral-500'>{DisplayPriceKSH(data.price)}</p>
                            )
                        }
                        {
                            Boolean(data.discount) && (
                                <p className='font-semibold text-sm text-green-600 '>{data.discount}% <span className='text-sm text-neutral-500'>off</span></p>
                            )
                        }
                    </div>
                    {
                        data.stock === 0 ? (
                            <p className='text-red-600 font-semibold text-xs'>Out of Stock</p>
                        ) : (
                            //<button className='my-2 px-4 py-1 bg-green-600 hover:bg-green-700 text-white rounded'>Add</button>
                            <div className='my-2 flex'>
                                {/**<AddToCartButton data={data}/>*/}
                            </div>
                        )
                    }
                </div>
                <div className=''>
                    <div className='flex gap-2 items-center'>
                        <p className='font-semibold'>Unit:</p>
                        <p className='text-sm'>{data.stock} pieces</p>
                    </div>
                    <div>
                        <p className='font-semibold'>Description</p>
                        <p className='text-sm'>{data.description}</p>
                    </div>
                    {
                        data?.more_details &&
                        Object.keys(data.more_details).map((element, index) => (
                            <div key={element}>
                                <p className='font-semibold'>{element}</p>
                                <p className='text-sm'>{data.more_details[element]}</p>
                            </div>
                        ))
                    }

                </div>
            </div>
        </section>
    )
}

export default ProductDisplayPage