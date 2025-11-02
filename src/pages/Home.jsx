import banner from '../assets/ankarabanner.jpg'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import CategoryProductDisplay from '../components/CategoryProductDisplay'

const Home = () => {
    const loadingCategory = useSelector(state => state.product.loadingCategory)
    const categoryData = useSelector(state => state.product.allCategory)
    const navigate = useNavigate()
    const handleRedirectProductListPage = (id, cat) => {
        navigate(`/products?category=${id}&cat=${cat}`)
    }
    return (
        <section>
            <div className='container mx-auto my-2 px-2 grid gap-4'>
                <div className={`w-full h-full min-h-25 rounded bg-blue-200 ${!banner && 'animate-pulse px-4'} `}>
                    {/* desktop banner*/}
                    <img
                        src={banner}
                        alt="banner"
                        className='w-full h-64 rounded-md hidden lg:block md:block'
                    />
                    {/* desktop mobile*/}
                    <img
                        src={banner}
                        alt="banner"
                        className='w-full h-full rounded-md lg:hidden md:hidden'
                    />
                </div>
                <div>
                    <h2 className='text-lg font-bold text-center'>Explore Our Collections</h2>
                    <p className='text-xs text-center'>Browse through our exclusive range of products inspired by the rich heritage of Ankara.</p>
                    <div className='container mx-auto my-2 grid grid-cols-3 md:grid-cols-8 lg:grid-cols-10 gap-2 border-b pb-4' >
                        {
                            loadingCategory ? (
                                new Array(10).fill(null).map((c, index) => {
                                    return (
                                        <div
                                            key={index + 'loadingcategory'}
                                            className='bg-white rounded p-4 min-h-36 grid gap-2 shadow animate-pulse'>
                                            <div className='bg-blue-100 min-h-20 rounded'></div>
                                            <div className='bg-blue-100 h-8 rounded'></div>
                                        </div>
                                    )
                                })
                            ) : (
                                categoryData.map((cat, index) => {
                                    return (
                                        <div
                                            key={cat._id + 'displayingcategory'}
                                            className='w-full h-full' onClick={() => handleRedirectProductListPage(cat._id, cat.name)}>
                                            <div className='bg-white rounded p-2 min-h-40 grid gap-2 shadow hover:shadow-lg cursor-pointer hover:scale-105 transition-all duration-150 ease-in'>
                                                <img
                                                    src={cat.image}
                                                    alt=""
                                                    className='w-full h-full object-scale-down'
                                                />
                                                <p className='text-center text-xs'>{cat.name}</p>
                                            </div>
                                        </div>
                                    )
                                })
                            )
                        }
                    </div>
                </div>
            </div>
            {
                categoryData.map((c, index) => {
                    if (!c?.name) return null; // skip if name is missing
                    return (
                        <CategoryProductDisplay key={c._id + 'categoryproductdisplay'} id={c._id} name={c.name} />
                    );
                })
            }
        </section>
    )
}

export default Home