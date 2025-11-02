import Axios from './Axios'
import SummaryApi from '../common/SummaryApi.js'
const FetchUserDetails = async() => {
    try {
       const response = await Axios({
        ...SummaryApi.getUser,
       })
       return response.data
    } catch (error) {
        console.log(error)
    }
 
}
export default FetchUserDetails