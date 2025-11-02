export const baseURL = 'https://house-of-ankara-server.onrender.com'

const SummaryApi = {
    register: {
        url: 'api/user/register',
        method: 'post'
    },
    login: {
        url: 'api/user/login',
        method: 'post'
    },
    logout: {
        url: 'api/user/logout',
        method: 'get'
    },
    getUser: {
        url: 'api/user/me',
        method: 'get'
    },
    updateUser: {
        url: 'api/user/update-user',
        method: 'put'
    },
    forgotPassword: {
        url: 'api/user/forgot-password',
        method: 'put'
    },
    verifyForgotPasswordOtp: {
        url: 'api/user/verify-forgot-password-otp',
        method: 'put'
    },
    resetPassword: {
        url: 'api/user/reset-password',
        method: 'put'
    },
    refreshToken: {
        url: 'api/user/refresh-token',
        method: 'post'
    },
    getCategories: {
        url: 'api/category/get-category',
        method: 'get'
    },
    addCategory: {
        url: 'api/category/add-category',
        method: 'post'
    },
    updateCategory: {
        url: 'api/category/update-category',
        method: 'put'
    },
    deleteCategory: {
        url: 'api/category/delete-category',
        method: 'delete'
    },
    uploadImage: {
        url: 'api/file/upload-image',
        method: 'post'
    },
    createProduct: {
        url: 'api/product/add-product',
        method: 'post'
    },
    getProducts: {
        url: 'api/product/get-products',
        method: 'get'
    },
    getProductByCategory: (id) => [
        `api/product/get-product-by-category?category=${id}`,
        { method: 'GET' }
    ],
    getProductsByCategory: {
        url: 'api/product/get-products-by-category',
        method: 'post'
    },
    getProductDetails: (productId) => ({
        url: `api/product/get-product-details/${productId}`,
        method: 'get'
    }),
    updateProductDetails: {
        url: 'api/product/update-product-details',
        method: 'put'
    },
    deleteProductDetails: {
        url: 'api/product/delete-product',
        method: 'delete'
    },
    searchProduct: {
        url: 'api/product/search-product',
        method: 'post'
    },

}

export default SummaryApi
