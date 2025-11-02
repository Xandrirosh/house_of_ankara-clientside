import SummaryApi from "../common/SummaryApi.js";
import Axios from "./Axios";
// This function uploads an image to the server using Axios.
// It creates a FormData object, appends the image to it, and sends a POST request to the server.
// If the request is successful, it returns the response data.
const uploadImage = async(image) => {
    try {
        const formData = new FormData();
        formData.append('image', image);
        const response = await Axios({
            ...SummaryApi.uploadImage,
            data: formData,
            withCredentials: true,
        })
        return response.data;
    } catch (error) {
        return error
    }
}

export default uploadImage