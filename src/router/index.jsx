import { createBrowserRouter } from "react-router-dom";
import App from '../App';
import Home from "../pages/Home";
import Register from "../pages/Register";
import Login from "../pages/Login";
import Category from "../pages/Category";
import Product from "../pages/Product";
import UploadProduct from "../pages/UploadProduct";
import Address from "../pages/Address";
import Order from "../pages/Order";
import Profile from "../pages/Profile";
import AdminRoutes from '../layout/AdminRoutes';
import ProductList from "../pages/ProductList";
import ProductDisplayPage from "../pages/ProductDisplayPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
      {
        path: "/category",
        element: <AdminRoutes><Category /></AdminRoutes>,
      },
      {
        path: "/product",
        element: <AdminRoutes><Product /></AdminRoutes>,
      },
      {
        path: "/upload",
        element: <AdminRoutes><UploadProduct /></AdminRoutes>,
      },
      {
        path: "/address",
        element: <Address />,
      },
      {
        path: "/order",
        element: <Order />,
      },
      {
        path: "/products",
        element: <ProductList />,
      },
      {
        path: "/product/:productId",
        element: <ProductDisplayPage />,
      }
    ],
  },
]);

export default router;
