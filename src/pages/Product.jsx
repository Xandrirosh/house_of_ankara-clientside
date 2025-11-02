import React, { useEffect, useState } from 'react'
import Loading from '../components/Loading'
import { IoSearch } from 'react-icons/io5'
import SummaryApi from '../common/SummaryApi'
import Axios from '../utils/Axios'
import AxiosToastError from '../utils/AxiosToastError'
import ProductCardAdmin from '../components/ProductCardAdmin'

const Product = () => {
  const [productData, setProductData] = useState([])
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)
  const [totalPageCount, setTotalPageCount] = useState(1)
  const [search, setSearch] = useState('')
  const fetchProductData = async () => {
    try {
      setLoading(true)
      const response = await Axios({
        ...SummaryApi.getProducts,
        data: {
          page: page,
          limit: 10,
          search: search
        }
      })

      const { data: responseData } = response

      if (responseData.success) {
        setTotalPageCount(responseData.totalNoPage)
        setProductData(responseData.data)
      }
    } catch (error) {
      AxiosToastError(error)
    } finally {
      setLoading(false)
    }
  }
  useEffect(() => {
    fetchProductData()
  }, [page])

  const handleNextPage = () => {
    if (page !== totalPageCount) {
      setPage(prev => prev + 1)
    }
  }
  const handlePreviousPage = () => {
    if (page > 1) {
      setPage(prev => prev - 1)
    }
  }

  const handleSearchProduct = (e) => {
    const { value } = e.target
    setSearch(value)
    setPage(1)
  }
  useEffect(() => {
    let flag = true
    const interval = setTimeout(() => {
      if (flag) {
        fetchProductData()
        flag = false
      }
    }, 300)
    return () => {
      clearTimeout(interval)
    }
  }, [search])
  return (
    <section>
      <div className='bg-white p-5 shadow-md flex items-center justify-between gap-4'>
        <h1 className=' font-semibold'>Product</h1>
        <div className="h-full min-w-24 w-full ml-auto max-w-[30vh] px-4  py-2 border focus-within:border-primary-200 rounded  bg-blue-50 flex items-center gap-3">
          <IoSearch />
          <input
            type="text"
            placeholder="search here...."
            value={search}
            onChange={handleSearchProduct}
            className="h-full w-full  outline-none bg-transparent "
          />
        </div>
      </div>
      {
        loading && (
          <Loading />
        )
      }
      <div className="p-4">
        <div className="min-h-[50vh]">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 ">
            {
              productData.map((p, index) => {
                return (
                  <ProductCardAdmin key={p._id + index + 'product data'} data={p} fetchProductData={fetchProductData} />
                )
              })
            }
          </div>
        </div>

        <div className="flex justify-between my-4 ">
          <button onClick={handlePreviousPage} className="border border-primary-200 px-4 py-1 hover:bg-primary-200">Previous</button>
          <button className="w-full bg-slate-50">{page}/{totalPageCount}</button>
          <button onClick={handleNextPage} className="border border-primary-200 px-4 py-1 hover:bg-primary-200">Next</button>
        </div>
      </div>
    </section>
  )
}

export default Product