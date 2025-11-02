import { useState } from 'react'
import UploadCategoryModels from '../components/UploadCategoryModels'
import { useEffect } from 'react'
import Loading from '../components/Loading'
import NoData from '../components/NoData'
import SummaryApi from '../common/SummaryApi.js'
import Axios from '../utils/Axios'
import EditCategory from '../components/EditCategory'
import ConfirmBox from '../components/ConfirmBox'
import toast from 'react-hot-toast'
import AxiosToastError from '../utils/AxiosToastError'

const Category = () => {
  const [openUploadCategory, setOpenUploadCategory] = useState(false)
  const [loading, setLoading] = useState(false)
  const [categoryData, setCategoryData] = useState([])
  const [openEdit, setOpenEdit] = useState(false)
  const [editData, setEditData] = useState({
    name: '',
    image: '',
  })

  const [openConfirmBoxDelete, setOpenConfirmBoxDelete] = useState(false)
  const [deleteCategory, setDeleteCategory] = useState({
    _id: ''
  })

  {/* const allCategory = useSelector(state => state.product.allCategory)

    useEffect(() => {
        setCategoryData(allCategory)

    }, [allCategory]) **/}

  const fetchCategories = async () => {
    try {
      setLoading(true)

      const response = await Axios({
        ...SummaryApi.getCategories,
      })

      const { data: responseData } = response

      if (responseData.success) {
        setCategoryData(responseData.data)
      }

    } catch (error) {

    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchCategories()
  }, [])

  const handleDeleteCategory = async () => {
    try {
      setLoading(true)
      const response = await Axios({
        ...SummaryApi.deleteCategory,
        data: deleteCategory
      })
      const { data: responseData } = response

      if (responseData.success) {
        toast.success(responseData.message)
        fetchCategories()
        setOpenConfirmBoxDelete(false)
      }
    } catch (error) {
      AxiosToastError(error)
    } finally {
      setLoading(false)
    }
  }
  return (
    <section>
      <div className='bg-white p-5 shadow-md flex items-center justify-between'>
        <h1 className=' font-semibold'>Category</h1>
        <button onClick={() => setOpenUploadCategory(true)} className='text-sm border border-primary-200 hover:bg-primary-200 px-3 py-1 rounded hover:bg-black hover:text-white'>Add Category</button>
      </div>
      {
        !categoryData[0] && !loading && (
          <NoData />
        )
      }
      <div className='p-4 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2' >

        {
          categoryData.map((category, index) => {
            return (
              <div className='w-32 h-56 shadow-lg rounded-md ' key={category._id}>
                <div>
                  <img
                    src={category.image}
                    alt={category.name}
                    className='w-full rounded object-scale-down'
                  />
                  <h1 className='text-center font-medium text-xs mt-0.5'>{category.name}</h1>
                </div>
                <div className='items-center h-10 flex gap-2 '>
                  <button onClick={() => {
                    setOpenEdit(true)
                    setEditData(category)
                  }} className='flex-1 bg-green-100 hover:bg-green-200 text-green-600 font-semibold py-1 text-sm rounded'>
                    Edit
                  </button>
                  <button onClick={() => {
                    setOpenConfirmBoxDelete(true)
                    setDeleteCategory(category)
                  }}
                    className='flex-1  bg-red-100 hover:bg-red-200 text-red-600 font-semibold py-1 text-sm rounded'>
                    Delete
                  </button>
                </div>
              </div>
            )
          })
        }
      </div>
      {
        loading && (
          <Loading />
        )
      }

      {
        openUploadCategory && (
          <UploadCategoryModels fetchData={fetchCategories} close={() => setOpenUploadCategory(false)} />
        )
      }
      {
        openEdit && (
          <EditCategory data={editData} close={() => setOpenEdit(false)} fetchData={fetchCategories} />
        )
      }
      {
        openConfirmBoxDelete && (
          <ConfirmBox cancel={() => setOpenConfirmBoxDelete(false)} confirm={handleDeleteCategory} close={() => setOpenConfirmBoxDelete(false)} />
        )
      }

    </section>
  )
}

export default Category