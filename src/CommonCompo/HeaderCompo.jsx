import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect, useState } from 'react';
import {
    MDBContainer,
    MDBNavbar,
    MDBNavbarBrand,
    MDBNavbarToggler,
    MDBIcon,
    MDBNavbarNav,
    MDBNavbarItem,
    MDBDropdown,
    MDBDropdownToggle,
    MDBDropdownMenu,
    MDBDropdownItem,
    MDBCollapse,
} from 'mdb-react-ui-kit';
import { Link, useNavigate } from 'react-router-dom';
import { userLogout } from '../Action/index';


const FunctionCompoDynamicSubMenu = () => {
    const [showBasic, setShowBasic] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate()
    const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('userEmail'));


    // const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.userEmail); // Updated condition
    // console.log(localStorage.userEmail);
    const handleLogout = () => {
        dispatch(userLogout()); // Dispatch the userLogout action
        console.log("Successfully logged out");
        setIsLoggedIn(false);
        navigate("/")
    };
    const cart = useSelector((state) => state.products.cart); // Get the cart items from Redux store

    const menuItems = [
        {
            title: 'Home',
            url: `/`,
        },
        {
            title: 'Shop',
            url: `/shop`,
        },
        {
            title: 'about',
            url: `/about`,
        },
        {
            title: 'Services',
            url: '/services',
            submenu: [
                {
                    title: 'web design',
                    url: 'web-design',
                },
                {
                    title: 'web development',
                    url: 'web-dev',
                },
                {
                    title: 'SEO',
                    url: 'seo',
                },
            ],
        }
    ];

    const MenuData = menuItems.map((data, index) => {
        if (data.submenu != undefined) {
            var submenudata = data.submenu.map((submenu, index) => {
                return <MDBDropdownItem key={index} link>{submenu.title}</MDBDropdownItem>;
            });
        }
        if (data.submenu == null) {
            return (
                <MDBNavbarItem key={index}>
                    <Link className='nav-link' to={data.url}>
                        {data.title}
                    </Link>
                </MDBNavbarItem>
            );
        } else {
            return (
                <MDBNavbarItem key={index}>
                    <MDBDropdown>
                        <MDBDropdownToggle tag='a' className='nav-link' role='button'>
                            {data.title}
                        </MDBDropdownToggle>
                        <MDBDropdownMenu>{submenudata}</MDBDropdownMenu>
                    </MDBDropdown>
                </MDBNavbarItem>
            );
        }
    });

    return (
        <>
            <MDBNavbar expand='lg' light bgColor='light' className='sticky-top' >
                <MDBContainer fluid>
                    <MDBNavbarBrand href='#'>Brand</MDBNavbarBrand>

                    <MDBNavbarToggler
                        aria-controls='navbarSupportedContent'
                        aria-expanded='false'
                        aria-label='Toggle navigation'
                        onClick={() => setShowBasic(!showBasic)}
                    >
                        <MDBIcon icon='bars' fas />
                    </MDBNavbarToggler>

                    <MDBCollapse navbar show={showBasic}>
                        <MDBNavbarNav className='ms-auto w-auto mb-2 mb-lg-0 '>
                            {MenuData}
                            <MDBNavbarItem>
                                <Link className='nav-link' to='/cart'>
                                    <div className="cart">
                                        <span className="count">{cart.length}</span>

                                        <i className="fa-solid fa-cart-shopping"></i>
                                    </div>
                                    {/* Cart <span className='badge bg-primary'></span> */}
                                </Link>
                            </MDBNavbarItem>


                            {isLoggedIn ? (
                                <MDBNavbarItem>
                                    <button onClick={handleLogout} className='nav-link btn btn-primary text-light'>
                                        Logout
                                    </button>
                                </MDBNavbarItem>
                            ) : (
                                <MDBNavbarItem>
                                    <Link className='nav-link btn btn-primary text-light' to='/login'>
                                        Login
                                    </Link>
                                </MDBNavbarItem>
                            )}


                        </MDBNavbarNav>
                    </MDBCollapse>
                </MDBContainer>
            </MDBNavbar>
        </>
    );
};

export default FunctionCompoDynamicSubMenu;
