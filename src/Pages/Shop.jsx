// import React, { useEffect, useState } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
// import { fetchProducts, addToCart, productDetail } from '../Action/index';
// import AddToCart from '../Components/AddToCart';
// import toast, { Toaster } from 'react-hot-toast';

// const Shop = () => {
//     const products = useSelector((state) => state.products.items.products);
//     // const products = useSelector((state) => state.products.items);
//     const cart = useSelector((state) => state.products.cart);
//     const [isLiked, setIsLiked] = useState(false);
//     const [searchQuery, setSearchQuery] = useState('');

//     const [minPrice, setMinPrice] = useState('');
//     const [maxPrice, setMaxPrice] = useState('');


//     // const cart = useSelector((state) => state.products.cart); // Add this line
//     const dispatch = useDispatch();
//     const navigate = useNavigate();

//     useEffect(() => {
//         dispatch(fetchProducts());
//     }, [dispatch]);


//     const handleAddToCart = (product) => {

//         // console.log("🚀 ~ handleAddToCart:") 
//         // Check if the product is already in the cart
//         const productInCart = cart.find((item) => item.id === product.id);
//         if (!productInCart) {
//             toast.success('Item added to cart');
//             dispatch(addToCart({ ...product, quantity: 1 }))
//             // dispatch(addToCart(product));
//         }
//     };

//     const handleProductDetail = (productId) => {
//         dispatch(productDetail(productId));
//         navigate(`/productDetail/${productId}`);
//     };

//     // const handleLike = (productId) => {
//     //     // Find the corresponding product
//     //     const product = products.find((item) => item.id === productId);
//     //     if (product) {
//     //         // Toggle the like state of the product
//     //         product.isLiked = !product.isLiked;
//     //         setIsLiked(!isLiked);
//     //         toast.success('Liked!');
//     //     }
//     // };


//     const handleLike = (productId) => {
//         const product = products.find((item) => item.id === productId);
//         if (product) {
//             if (!product.isLiked) {
//                 toast.success('Liked!');
//             }
//             product.isLiked = !product.isLiked;
//             setIsLiked(!isLiked);
//         }
//     };

//     // const filteredProducts = products.filter((product) =>
//     //     product.title.toLowerCase().includes(searchQuery.toLowerCase())
//     // );

//     // const filteredProducts = products.filter((product) => {
//     //     const titleMatch = product.title.toLowerCase().includes(searchQuery.toLowerCase());
//     //     const priceMatch =
//     //         (minPrice === '' || parseFloat(product.price) >= parseFloat(minPrice)) &&
//     //         (maxPrice === '' || parseFloat(product.price) <= parseFloat(maxPrice));
//     //     return titleMatch && priceMatch;
//     // });

//     const filteredProducts = products.filter((product) => {
//         const titleMatch = product.title.toLowerCase().includes(searchQuery.toLowerCase());
//         const priceMatch = product.price.toString().includes(searchQuery);
//         return titleMatch || priceMatch;
//     });




//     if (!products || !Array.isArray(products)) {
//         return <p>Loading...</p>;
//     }

//     return (
//         <div>
//             <div className="container">
//                 <h1>Product List</h1>
//                 <input
//                     type="text"
//                     placeholder="Search products..."
//                     value={searchQuery}
//                     onChange={(e) => setSearchQuery(e.target.value)}
//                 />


//                 <div>
//                     <label htmlFor="minPrice">Min Price:</label>
//                     <input
//                         type="text"
//                         id="minPrice"
//                         value={minPrice}
//                         onChange={(e) => setMinPrice(e.target.value)}
//                     />
//                     <label htmlFor="maxPrice">Max Price:</label>
//                     <input
//                         type="text"
//                         id="maxPrice"
//                         value={maxPrice}
//                         onChange={(e) => setMaxPrice(e.target.value)}
//                     />
//                 </div>



//                 <div className="row">
//                     {filteredProducts.map((product) => (
//                         <div className='col-lg-4 mb-3 d-flex align-items-stretch' key={product.id}>
//                             <div className="card p-2">
//                                 <img src={product.thumbnail} onClick={() => handleProductDetail(product.id)} alt="" style={{ cursor: 'pointer' }} className="product-image w-100" />
//                                 {/* <img src={product.thumbnail} onClick={() => handleProductDetail(product.id)} alt="" className="product-image w-100" /> */}
//                                 <h2>{product.title}</h2>
//                                 <p>{product.description}</p>
//                                 <div className="d-flex align-items-center justify-content-between  mt-auto">
//                                     <p className='m-0'>Price: {product.price}</p>
//                                     <button className="btn" onClick={() => handleLike(product.id)}>
//                                         {product.isLiked ? (
//                                             <i className="fa-solid fa-heart fa-2x d-block m-0" style={{ color: ' #dc3545' }}></i>
//                                         ) : (
//                                             <i className="fa-regular fa-heart fa-2x d-block m-0 "></i>
//                                         )}
//                                     </button>
//                                     <button className="btn" onClick={() => handleProductDetail(product.id)}>
//                                         <i className="fa-solid fa-eye fa-2x d-block m-0"></i>
//                                     </button>
//                                     <AddToCart className='btn btn-primary' product={product} addToCart={handleAddToCart} />


//                                 </div>
//                             </div>
//                         </div>
//                     ))}
//                 </div>
//                 {/* <p>Cart Count: {cart.length}</p> */}
//                 <Toaster />
//             </div>
//         </div>
//     );
// };

// export default Shop;







import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchProducts, addToCart, productDetail, updateProducts } from '../Action/index';
import AddToCart from '../Components/AddToCart';
import toast, { Toaster } from 'react-hot-toast';

const Shop = () => {
    const products = useSelector((state) => state.products.items?.products);
    const cart = useSelector((state) => state.products.cart);
    const [isLiked, setIsLiked] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    // const [Loader, setLoader] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

    const handleAddToCart = (product) => {
        const productInCart = cart.find((item) => item.id === product.id);
        if (!productInCart) {
            toast.success('Item added to cart');
            dispatch(addToCart({ ...product, quantity: 1 }));
        }
    };

    const handleProductDetail = (productId) => {
        dispatch(productDetail(productId));
        navigate(`/productDetail/${productId}`);
    };


    // var kkk = window.location.href;
    // console.log("🚀 ~ kkk:", kkk)
    // kkk = window.location
    // console.log("🚀 ~ kkk:", kkk)


    // const handleLike = (productId) => {
    //     const product = products.find((item) => item.id === productId);
    //     if (product) {
    //         if (!product.isLiked) {
    //             toast.success('Liked!');
    //         }
    //         product.isLiked = !product.isLiked;
    //         setIsLiked(!isLiked);
    //     }
    // };

    const handleLike = (productId) => {
        const updatedProducts = products.map((product) => {
            if (product.id === productId) {
                if (!product.isLiked) {
                    toast.success('Liked!');
                }
                return { ...product, isLiked: !product.isLiked };
            }
            return product;
        });

        setIsLiked(!isLiked);
        dispatch(updateProducts(updatedProducts));
    };


    if (!products || !Array.isArray(products)) {
        return <p>Loading...</p>;
    }

    // const filteredProducts = products.filter((product) =>
    //     product.title.toLowerCase().includes(searchQuery.toLowerCase())
    // );

    // const filteredProducts = products.filter((product) => {
    // const priceMatch = product.price.toString().includes(searchQuery);
    //     const titleMatch = product.title.toLowerCase().includes(searchQuery.toLowerCase());
    //     return titleMatch || priceMatch;
    // });

    const filteredProducts = products.filter((product) => {
        const Price = product.price.toString().includes(searchQuery);
        const titleMatch = product.title.toLowerCase().includes(searchQuery.toLowerCase());
        const priceMatch =
            (minPrice === '' || parseFloat(product.price) >= parseFloat(minPrice)) &&
            (maxPrice === '' || parseFloat(product.price) <= parseFloat(maxPrice));
        return titleMatch || Price && priceMatch;
    });

    return (
        <div>
            <div className="container">

                <h1>Product List</h1>

                <div className="col-md-4 offset-md-4 my-3">
                    <div className="input-group">
                        <input type="text"
                            className="form-control"
                            placeholder="Search products..."
                            onChange={(e) => setSearchQuery(e.target.value)}
                            aria-label="Recipient's username" />
                        <div className="input-group-append">
                            <span className="input-group-text"><i className="fa fa-search"></i></span>
                        </div>
                    </div>
                </div>


                <div>
                    <label htmlFor="minPrice">Min Price:</label>
                    <input
                        type="text"
                        id="minPrice"
                        value={minPrice}
                        onChange={(e) => setMinPrice(e.target.value)}
                    />
                    <label htmlFor="maxPrice">Max Price:</label>
                    <input
                        type="text"
                        id="maxPrice"
                        value={maxPrice}
                        onChange={(e) => setMaxPrice(e.target.value)}
                    />
                </div>





                <div className="row">
                    {filteredProducts.map((product) => (
                        <div className="col-lg-4 mb-3 d-flex align-items-stretch" key={product.id}>
                            <div className="card p-2">
                                <img
                                    src={product.thumbnail}
                                    onClick={() => handleProductDetail(product.id)}
                                    alt=""
                                    style={{ cursor: 'pointer' }}
                                    className="product-image w-100"
                                />
                                <h2>{product.title}</h2>
                                <p>{product.description}</p>
                                <div className="d-flex align-items-center justify-content-between mt-auto">
                                    <p className="m-0">Price: {product.price}</p>
                                    <button className="btn" onClick={() => handleLike(product.id)}>
                                        {product.isLiked ? (
                                            <i
                                                className="fa-solid fa-heart fa-2x d-block m-0"
                                                style={{ color: '#dc3545' }}
                                            ></i>
                                        ) : (
                                            <i className="fa-regular fa-heart fa-2x d-block m-0 "></i>
                                        )}
                                    </button>
                                    <button className="btn" onClick={() => handleProductDetail(product.id)}>
                                        <i className="fa-solid fa-eye fa-2x d-block m-0"></i>
                                    </button>
                                    <AddToCart className="btn btn-primary" product={product} addToCart={handleAddToCart} />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>






                <Toaster />
            </div>
        </div>
    );
};

export default Shop;
