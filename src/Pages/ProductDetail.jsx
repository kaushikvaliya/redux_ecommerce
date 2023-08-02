// import React from 'react';

// const ProductDetail = () => {
//     return (
//         <div>
//             test
//         </div>
//     );
// };

// export default ProductDetail;

// import React, { useEffect, useState } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { useParams } from 'react-router-dom';
// import { productDetail } from '../Action/index';

// const ProductDetailPage = () => {
//     const products = useSelector((state) => state.products.items.products);
//     const { productId } = useParams();
//     const dispatch = useDispatch();
//     const [ProDetailsById, setProDetailsById] = useState(null);
//     const [loader, setLoader] = useState(false);
//     const [mainImage, setMainImage] = useState(null);

//     useEffect(() => {
//         getProdDataById();
//     }, [loader]);

//     const getProdDataById = async () => {
//         const prodData = await dispatch(productDetail(productId));
//         setProDetailsById(prodData);
//         // setMainImage(prodData?.images?.[0]);
//         setMainImage(prodData?.images && prodData.images[0]);
//         // console.log("🚀 ~ prodData.images[0]:", prodData.images[0])
//         // console.log("🚀 ~ prodData?.images:", prodData?.images)

//         setLoader(true);
//     };

//     if (!ProDetailsById) {
//         return <p>Loading...</p>;
//     }

//     return (
//         <div>
//             <h1>Product Detail</h1>
//             <div className="container">
//                 <div className="row align-items-center">
//                     <div className="col-lg-6">
//                         <div className="image-container" key={ProDetailsById.id}>
//                             <div className="row justify-content-between align-items-center">
//                                 <div className="col-lg-3">
//                                     {ProDetailsById.images && ProDetailsById.images.length > 0 ? (
//                                         ProDetailsById.images.slice(0, 4).map((image, i) => (
//                                             <img
//                                                 key={`${i}-${ProDetailsById.id}`}
//                                                 src={image}
//                                                 alt={ProDetailsById.name}
//                                                 style={{ width: '80px', height: '80px', cursor: 'pointer' }}
//                                                 className="product-image my-2"
//                                                 onClick={() => setMainImage(image)}
//                                             />
//                                         ))
//                                     ) : (
//                                         <p>No images available</p>
//                                     )}
//                                 </div>
//                                 <div className="col-lg-9">
//                                     {mainImage ? (
//                                         <img
//                                             src={mainImage}
//                                             alt={ProDetailsById.name}
//                                             className="product-image  d-block m-aouto "
//                                             style={{
//                                                 width: '100%',
//                                                 height: 'auto',
//                                                 transition: 'transform 0.3s',
//                                             }}
//                                             onMouseEnter={(e) =>
//                                                 (e.target.style.transform = 'scale(.9)')
//                                             }
//                                             onMouseLeave={(e) =>
//                                                 (e.target.style.transform = 'scale(.5)')
//                                             }
//                                         />
//                                     ) : (
//                                         <p>No images available</p>
//                                     )}
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                     <div className="col-lg-6">
//                         <h2>{ProDetailsById.title}</h2>
//                         <p>{ProDetailsById.description}</p>
//                         <p>Price: {ProDetailsById.price}</p>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default ProductDetailPage;





import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { addToCart, productDetail } from '../Action/index';
import ReactImageMagnify from 'react-image-magnify';
import AddToCart from '../Components/AddToCart';
import toast, { Toaster } from 'react-hot-toast';


const ProductDetailPage = () => {
    const cart = useSelector((state) => state.products.cart);
    const { productId } = useParams();
    const dispatch = useDispatch();
    const [ProDetailsById, setProDetailsById] = useState(null);
    const [loader, setLoader] = useState(false);
    const [mainImage, setMainImage] = useState(null);


    useEffect(() => {
        getProdDataById();
    }, [loader]);



    const getProdDataById = async () => {
        const prodData = await dispatch(productDetail(productId));
        setProDetailsById(prodData);
        // setMainImage(prodData?.images?.[0]);

        setMainImage(prodData?.images && prodData.images[0]);
        setLoader(true);
    };

    if (!ProDetailsById) {
        return <p>Loading...</p>;
    }
    const handleAddToCart = (product) => {
        const productInCart = cart.find((item) => item.id === product.id);
        if (!productInCart) {
            toast.success('Item added to cart');
            dispatch(addToCart({ ...product, quantity: 1 }))
        }
    };
    return (
        <div>
            <h1>Product Detail</h1>
            <div className="container">
                <div className="col-lg-11">
                    <div className="row align-items-center">
                        <div className="col-lg-6 m-auto">
                            <div className="image-container" key={ProDetailsById.id}>
                                <div className="row justify-content-between align-items-center">
                                    <div className="col-lg-3">
                                        {ProDetailsById.images && ProDetailsById.images.length > 0 ? (
                                            ProDetailsById.images.map((image, i) => (
                                                <img
                                                    key={`${i}-${ProDetailsById.id}`}
                                                    src={image}
                                                    alt={ProDetailsById.name}
                                                    style={{ width: '80px', height: '80px', cursor: 'pointer' }}
                                                    className="product-image my-2"
                                                    onClick={() => setMainImage(image)}
                                                />
                                            ))
                                        ) : (
                                            <p>No images available</p>
                                        )}
                                    </div>

                                    <div className="col-lg-9">
                                        {mainImage ? (
                                            <ReactImageMagnify {...{
                                                smallImage: {
                                                    alt: 'Wristwatch by Ted Baker London',
                                                    isFluidWidth: true,
                                                    src: mainImage,
                                                },
                                                largeImage: {
                                                    src: mainImage,
                                                    width: 900,
                                                    height: 1200
                                                }
                                                , isHintEnabled: true
                                            }} />
                                        ) : (
                                            <p>No images available</p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4">
                            <h2>{ProDetailsById.title}</h2>
                            <p>{ProDetailsById.description}</p>
                            <div className="d-flex align-items-center justify-content-between  mt-auto">
                                <p className='m-0'>Price: {ProDetailsById.price}</p>
                                <AddToCart className='btn btn-primary' product={ProDetailsById} addToCart={handleAddToCart} />
                            </div>
                        </div>
                    </div>
                </div>
                <Toaster />

            </div>
        </div >
    );
};

export default ProductDetailPage;








// import React, { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';

// const ProductDetail = ({ productId }) => {
//     const dispatch = useDispatch();
//     const product = useSelector((state) => state.productDetail);

//     useEffect(() => {
//         dispatch(productDetail(productId));
//     }, [dispatch, productId]);

//     if (!product) {
//         return <p>Loading...</p>;
//     }

//     return (
//         <div>
//             <h1>Product Detail</h1>
//             <div>
//                 <img src={product.thumbnail} alt="" className="product-image" />
//                 <h2>{product.title}</h2>
//                 <p>{product.description}</p>
//                 <p>Price: {product.price}</p>
//             </div>
//         </div>
//     );
// };

// export default ProductDetail;

