import { useState } from 'react'
import { useSelector } from 'react-redux'
import { FaCloudUploadAlt } from 'react-icons/fa'
import { RiDeleteBin6Line } from 'react-icons/ri'
import { IoClose } from 'react-icons/io5'
import Loading from '../components/Loading'
import uploadImage from '../utils/uploadImage.js'
import ViewImage from '../components/ViewImage.jsx'
import AddField from '../components/AddField.jsx'
import SuccessAlert from '../utils/SuccessAlert.js'
import Axios from '../utils/Axios.js'
import SummaryApi from '../common/SummaryApi'
import AxiosToastError from '../utils/AxiosToastError.js'

const UploadProduct = () => {
  const [data, setData] = useState({
    name: '',
    image: [],
    category: [],
    stock: '',
    price: '',
    discount: '',
    description: '',
    more_details: '',
  })
  const allCategory = useSelector(state => state.product.allCategory)
  const [imageLoading, setImageLoading] = useState(false)
  const [ImageFullScreen, setImageFullScreen] = useState('')
  const [openAddField, setOpenAddField] = useState(false)
  const [fieldName, setFieldName] = useState('')
  const [selectCategory, setSelectcategory] = useState('')

  const handleChange = (e) => {
    const { name, value } = e.target
    setData((prev) => {
      return {
        ...prev,
        [name]: value
      }
    })
  }
  const handleUploadImage = async (e) => {
    const file = e.target.files[0]

    if (!file) return;

    setImageLoading(true)
    const response = await uploadImage(file)
    const imageResponse = response.data.secure_url;

    setData((prev) => {
      return {
        ...prev,
        image: [...prev.image, imageResponse]
      }

    })
    setImageLoading(false)

  }
  const handleAddField = () => {
    setData((prev) => {
      return {
        ...prev,
        more_details: {
          ...prev.more_details,
          [fieldName]: ''
        }
      }
    })
    setFieldName('')
    setOpenAddField(false)
  }
  const handleDeleteImage = async (index) => {
    data.image.splice(index, 1)
    setData((prev) => {
      return {
        ...prev
      }
    })
  }
  const handleRemoveCategory = async (index) => {
    data.category.splice(index, 1)
    setData((prev) => {
      return {
        ...prev
      }
    })
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await Axios({
        ...SummaryApi.createProduct,
        data: data
      })
      const { data: responseData } = response
      if (responseData.success) {
        SuccessAlert(responseData.message)
        setData({
          name: '',
          image: [],
          category: [],
          stock: '',
          price: '',
          discount: '',
          description: '',
          more_details: {},
        })
      }
    } catch (error) {
      AxiosToastError(error)
    }
  }
  return (
    <section>
      <div className='bg-white p-5 shadow-md flex items-center justify-between'>
        <h1 className=' font-semibold'>Upload Product</h1>
      </div>
      <div className='grid p-3' >
        <form onSubmit={handleSubmit} className='grid gap-2' >
          <div className='grid gap-1'>
            <label htmlFor="name">Name</label>
            <input
              id='name'
              name='name'
              type="text"
              placeholder='enter product name'
              value={data.name}
              onChange={handleChange}
              required
              className='bg-blue-50 p-2 outline-none border focus-within:border-primary-200 rounded'
            />
          </div>
          <div className='grid gap-1'>
            <label htmlFor="description">Description </label>
            <textarea
              id='description'
              name='description'
              type="text"
              placeholder='enter product description'
              value={data.description}
              onChange={handleChange}
              required
              multiple
              rows={3}
              className='bg-blue-50 p-2 outline-none border focus-within:border-primary-200 rounded resize-none'
            />
          </div>
          <div>
            <p>Image</p>
            <div>
              <label htmlFor='productImage' className='bg-blue-100 h-24 border rounded flex justify-center items-center cursor-pointer'>
                <div className='text-center flex justify-center items-center flex-col cursor-pointer'>
                  {
                    imageLoading ? <Loading /> : (
                      <>
                        <FaCloudUploadAlt size={35} />
                        <p>Upload Image</p>
                      </>
                    )
                  }

                </div>
                <input
                  type="file"
                  id='productImage'
                  className='hidden'
                  accept='image/*'
                  onChange={handleUploadImage}
                />
              </label>
              <div className='flex flex-wrap gap-4'>
                {
                  data.image.map((img, index) => {
                    return (
                      <div key={img + index} className='h-20 w-20 min-w-20 mt-1 bg-blue-50 border relative group'>
                        <img
                          src={img}
                          alt={img}
                          onClick={() => setImageFullScreen(img)}
                          className='w-full h-full object-scale-down cursor-pointer'
                        />
                        <div onClick={() => handleDeleteImage(index)} className='absolute bottom-0 right-0  p-1 bg-red-200 hover:bg-red-600 rounded hidden group-hover:block cursor-pointer'>
                          <RiDeleteBin6Line />
                        </div>
                      </div>
                    )
                  })
                }
              </div>
            </div>
          </div>
          <div className='grid gap-1'>
            <label htmlFor="">Category</label>
            <div>
              <select
                value={selectCategory}
                onChange={(e) => {
                  const value = e.target.value
                  const category = allCategory.find(el => el._id === value)

                  setData((prev) => {
                    return {
                      ...prev,
                      category: [...prev.category, category]
                    }
                  })
                  setSelectcategory('')
                }}
                className='bg-blue-50 border w-full p-2 rounded '
              >
                <option value={""}>select category</option>
                {
                  allCategory.map((c, index) => {
                    return (
                      <option key={c._id} value={c?._id}>{c.name}</option>
                    )
                  })
                }
              </select>
              <div className='flex flex-wrap gap-3'>
                {
                  data.category.map((c, index) => {
                    return (
                      <div key={c._id + index + 'productsection'} className='text-sm flex items-center gap-1 bg-blue-50 mt-2'>
                        <p>{c.name}</p>
                        <div className='hover:text-red-600 cursor-pointer'>
                          <IoClose size={20} onClick={() => handleRemoveCategory(index)} />
                        </div>
                      </div>
                    )
                  })
                }
              </div>
            </div>
          </div>
          <div className='grid gap-1'>
            <label htmlFor="stock">Number of Stock</label>
            <input
              id='stock'
              name='stock'
              type='number'
              placeholder='enter product stock'
              value={data.stock}
              onChange={handleChange}
              required
              className='bg-blue-50 p-2 outline-none border focus-within:border-primary-200 rounded'
            />
          </div>
          <div className='grid gap-1'>
            <label htmlFor="price">Price</label>
            <input
              id='price'
              name='price'
              type='number'
              placeholder='enter product price'
              value={data.price}
              onChange={handleChange}
              required
              className='bg-blue-50 p-2 outline-none border focus-within:border-primary-200 rounded'
            />
          </div>
          <div className='grid gap-1'>
            <label htmlFor="discount">Discount</label>
            <input
              id='discount'
              name='discount'
              type='number'
              placeholder='enter product discount'
              value={data.discount}
              onChange={handleChange}
              required
              className='bg-blue-50 p-2 outline-none border focus-within:border-primary-200 rounded'
            />
          </div>
          {/** adding more fields*/}
          {
            Object?.keys(data?.more_details)?.map((k, index) => {
              return (
                <div className='grid gap-1'>
                  <label htmlFor={k}>{k}</label>
                  <input
                    id={k}
                    type='text'
                    value={data?.more_details[k]}
                    onChange={(e) => {
                      const value = e.target.value
                      setData((prev) => {
                        return {
                          ...prev,
                          more_details: {
                            ...prev.more_details,
                            [k]: value
                          }
                        }
                      })
                    }}
                    required
                    className='bg-blue-50 p-2 outline-none border focus-within:border-primary-200 rounded'
                  />
                </div>
              )
            })
          }
          <div onClick={() => setOpenAddField(true)} className='hover:bg-primary-200 bg-white py-1 px-3 w-32 text-center font-semibold border border-primary-200 hover:text-neutral-900 cursor-pointer rounded '>
            Add Fields
          </div>
          <button className='hover:bg-primary-100 bg-primary-200 py-1 px-3 w-full text-center font-semibold border border-primary-200 hover:text-neutral-900 cursor-pointer rounded '>
            Submit
          </button>
        </form>
      </div>
      {
        ImageFullScreen && (
          <ViewImage url={ImageFullScreen} close={() => setImageFullScreen('')} />
        )
      }
      {
        openAddField && (
          <AddField
            value={fieldName}
            onChange={(e) => setFieldName(e.target.value)}
            submit={handleAddField}
            close={() => setOpenAddField(false)}
          />
        )
      }
    </section>
  )
}

export default UploadProduct