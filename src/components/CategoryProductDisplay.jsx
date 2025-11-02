import { useEffect, useRef, useState } from 'react'
import AxiosToastError from '../utils/AxiosToastError'
import Axios from '../utils/Axios'
import SummaryApi from '../common/SummaryApi'
import CardLoading from './CardLoading'
import CardProduct from './CardProduct'


const CategoryProductDisplay = ({ id, name }) => {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const containerRef = useRef()
    const loadingCardNumber = new Array(6).fill(null)

    const fetchCategoryProduct = async () => {
        try {
            setLoading(true)
            const response = await Axios({
                ...SummaryApi.getProductsByCategory,
                data: {
                    id: id
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
        fetchCategoryProduct()
    }, [id])

    
    return (
        <div>
            <div className='container mx-auto p-4 flex items-center justify-between gap-4'>
                <h3 className='font-bold text-lg md:text-xl'>{name}</h3>
            </div>
            <div className='relative flex items-center'>
                <div className='flex gap-4 md:gap-6 lg:gap-6 container mx-4 px-4 overflow-x-scroll scrollbar-none scroll-smooth' ref={containerRef}>
                    {loading &&
                        loadingCardNumber.map((_, index) => {
                            return (
                                <CardLoading key={'displayproducts' + index} />
                            )
                        })
                    }
                    {
                        data.map((p, index) => {
                            return (
                                <CardProduct data={p} key={p._id + 'CategoryProductdisplay' + index} />
                            )
                        })
                    }


                </div>
            </div>
        </div>
    )
}

export default CategoryProductDisplay