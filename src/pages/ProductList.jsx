import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Axios from '../utils/Axios'
import SummaryApi from '../common/SummaryApi'
import AxiosToastError from '../utils/AxiosToastError'
import { useLocation } from 'react-router-dom';
import DisplayPriceKSH from '../utils/DisplayPriceKSH'

const ProductList = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const categoryId = queryParams.get('category');
  const categoryName = queryParams.get('cat');
  const navigate = useNavigate()
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch products by category
  const fetchProducts = async () => {
    try {
      const response = await Axios(
        ...SummaryApi.getProductByCategory(categoryId)
      )
      const { data } = response.data
      setProducts(data)
      setLoading(false)
    } catch (error) {
      AxiosToastError(error)
    }
  }

  useEffect(() => {
    fetchProducts()
  }, [categoryId])

   const handleProductClick = (product) => {
    if (product?._id) {
      navigate(`/product/${product._id}`);
    } else {
      console.warn('Product ID is missing:', product);
    }
  };


  return (
    <section className='container mx-auto px-4 py-6'>
      <h2 className='text-xl font-bold mb-4'>Products in {categoryName}</h2>
      {loading ? (
        <p>Loading products...</p>
      ) : products.length === 0 ? (
        <p>No products found in this category.</p>
      ) : (
        <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
          {products.map(product => (
            <div key={product._id} onClick={() => handleProductClick(product)} className='border p-2 rounded shadow hover:shadow-md transition cursor-pointer'>
              <img
                src={product.image[0]}
                alt={product.name}
                className='w-full h-40 object-cover rounded'
              />
              <h3 className='text-sm font-semibold mt-2'>{product.name}</h3>
              <p className='text-xs text-gray-600'>{DisplayPriceKSH(product.price)}</p>
            </div>
            
          ))}
        </div>
      )}
    </section>
  )
}

export default ProductList