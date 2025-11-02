import Footer from "./components/Footer"
import Header from "./components/Header"
import { Outlet } from "react-router-dom"
import { Toaster } from "react-hot-toast"
import { useDispatch } from "react-redux"
import AxiosToastError from "./utils/AxiosToastError"
import Axios from "./utils/Axios"
import SummaryApi from "./common/SummaryApi"
import { setAllCategory, setLoadingCategory } from "./store/productSlice"
import { useEffect } from "react"

const App = () => {
  const dispatch = useDispatch();

  const fetchCategories = async () => {
    try {
      dispatch(setLoadingCategory(true))
      const response = await Axios({
        ...SummaryApi.getCategories,
      })

      const { data: responseData } = response

      if (responseData.success) {
        dispatch(setAllCategory(responseData.data))
      }

    } catch (error) {
      AxiosToastError(error)
    } finally {
      dispatch(setLoadingCategory(false))
    }
  }
  useEffect(() => {
    fetchCategories()
  }, [])
  return (
    <>
      <Header />
      <main className='lg:min-h-[85vh] min-h-[75vh]'>
        <Outlet />
      </main>
      <Footer />
      <Toaster />
    </>
  )
}

export default App
