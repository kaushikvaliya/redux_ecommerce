import React, { Suspense } from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";
import HomePage from "./Pages/HomePage.jsx";
import HeaderComponent from "./CommonCompo/HeaderCompo.jsx";
import Aboutpage from './Pages/Aboutpage.jsx';
import ContactPage from './Pages/ContactPage.jsx';
import ServicesPage from './Pages/ServicesPage.jsx';
import Cart from './Pages/Cart.jsx';
import ProductDetail from './Pages/ProductDetail.jsx';
import Signup from './Pages/Signup';
import Login from './Pages/Login.jsx';
import Shop from './Pages/Shop.jsx';

// const AdminRouter = React.lazy(() => { return import('./Pages/Admin/AdminRoute.jsx') })

const Mainrouter = createBrowserRouter([
    {
        path: "/",
        element: <>
            <HeaderComponent />
            <HomePage />
        </>,

    }, {
        path: "/about",
        element:
            <>
                <HeaderComponent />
                <Aboutpage />
            </>

    }, {
        path: "/contact",
        element:
            <>
                <HeaderComponent />
                <ContactPage />
            </>

    },
    {
        path: "/services",
        element:
            <>
                <HeaderComponent />
                <ServicesPage />
            </>

    },
    {
        path: "/cart",
        element:
            <>
                <HeaderComponent />
                <Cart />
            </>

    },
    {
        path: "/shop",
        element:
            <>
                <HeaderComponent />
                <Shop />

            </>

    }, {
        path: "/productDetail/:productId",
        element:
            <>
                <HeaderComponent />
                <ProductDetail />
            </>

    }, {
        path: "/login",
        element:
            <>
                <HeaderComponent />

                <Login />
            </>

    }, {
        path: "/signup",
        element:
            <>
                <HeaderComponent />
                <Signup />
            </>

    }


]);
export default Mainrouter;