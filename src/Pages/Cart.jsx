

// import React from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { removeFromCart, buyProducts } from '../Action/index';

// const Cart = () => {
//     const cart = useSelector((state) => state.products.cart);
//     const dispatch = useDispatch();

//     const handleRemoveFromCart = (productId) => {
//         dispatch(removeFromCart(productId));
//         console.log("🚀 ~ removeFromCart:", productId)
//     };

//     const handleBuyProducts = () => {
//         dispatch(buyProducts());
//     };

//     const calculateSubtotal = () => {
//         let subtotal = 0;
//         cart.forEach((product) => {
//             subtotal += product.price;
//         });
//         return subtotal;
//     };

//     const calculateTotalItems = () => {
//         let totalItems = 0;
//         cart.forEach((product) => {
//             totalItems += 1;
//         });
//         return totalItems;
//     };

//     return (
//         <div>
//             <h2>Cart</h2>
//             {cart.length > 0 ? (
//                 <div>
//                     {cart.map((product, index) => (
//                         <div className='col-12' key={product.id + index}>
//                             <h3>{product.name}</h3>
//                             <p>{product.description}</p>
//                             <p>Price: {product.price}</p>
//                             <div className="image-container" key={product.id}>
//                                 {product.images && product.images.length > 0 ? (
//                                     product.images.map((image, i) => (
//                                         <img key={i} src={image} alt={product.name} className="product-image" />
//                                     ))
//                                 ) : (
//                                     <p>No images available</p>
//                                 )}
//                             </div>
//                             <button onClick={() => handleRemoveFromCart(product.id)}>
//                                 Remove from Cart
//                             </button>

//                         </div>
//                     ))}
//                     <p>Subtotal: {calculateSubtotal()}</p>
//                     <p>Total Items: {calculateTotalItems()}</p>
//                     <button onClick={handleBuyProducts}>Buy Products</button>
//                 </div>
//             ) : (
//                 <p>No items in the cart.</p>
//             )}
//         </div>
//     );
// };

// export default Cart;




// import React from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { removeFromCart, buyProducts } from '../Action/index';

// const Cart = () => {
//     const cart = useSelector((state) => state.products.cart);
//     const dispatch = useDispatch();
//     const discountPercentage = 10.00; // Set the discount percentage here

//     const handleRemoveFromCart = (productId) => {
//         dispatch(removeFromCart(productId));
//         console.log("🚀 ~ removeFromCart:", productId)
//     };

//     const handleBuyProducts = () => {
//         dispatch(buyProducts());
//     };

//     const calculateSubtotal = () => {
//         let subtotal = 0;
//         cart.forEach((product) => {
//             subtotal += product.price;
//         });

//         // Calculate the discount amount
//         const discountAmount = (subtotal * discountPercentage) / 100;

//         // Apply the discount to the subtotal
//         const subtotalWithDiscount = subtotal - discountAmount;

//         return {
//             subtotal: subtotal.toFixed(2),
//             discountAmount: discountAmount.toFixed(2),
//             subtotalWithDiscount: subtotalWithDiscount.toFixed(2),
//         };
//     };

//     const calculateTotalItems = () => {
//         let totalItems = 0;
//         cart.forEach((product) => {
//             totalItems += 1;
//         });
//         return totalItems;
//     };

//     const { subtotal, discountAmount, subtotalWithDiscount } = calculateSubtotal();

//     return (
//         <div>
//             <h2>Cart</h2>
//             {cart.length > 0 ? (
//                 <div>
//                     {cart.map((product, index) => (
//                         <div className='col-12' key={`${product.id}-${index}`}>
//                             <h3>{product.name}</h3>
//                             <p>{product.description}</p>
//                             <p>Price: {product.price}</p>
//                             <div className="image-container" key={product.id}>
//                                 {product.images && product.images.length > 0 ? (
//                                     product.images.map((image, i) => (
//                                         <img key={`${i}-${product.id}`} src={image} alt={product.name} className="product-image" />

//                                     ))
//                                 ) : (
//                                     <p>No images available</p>
//                                 )}
//                             </div>
//                             <button onClick={() => handleRemoveFromCart(product.id)}>
//                                 Remove from Cart
//                             </button>

//                         </div>
//                     ))}
//                     <p>Subtotal: ${subtotal}</p>
//                     <p>Discount: ${discountAmount}</p>
//                     <p>Subtotal with Discount: ${subtotalWithDiscount}</p>
//                     <p>Total Items: {calculateTotalItems()}</p>
//                     <button onClick={handleBuyProducts}>Buy Products</button>
//                 </div>
//             ) : (
//                 <p>No items in the cart.</p>
//             )}
//         </div>
//     );
// };

// export default Cart;



import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, buyProducts, incrementQuantity, decrementQuantity } from '../Action/index';
import toast, { Toaster } from 'react-hot-toast';



const Cart = () => {
    const cart = useSelector((state) => state.products.cart);
    console.log("🚀 ~ cart:", cart)
    const dispatch = useDispatch();


    const handleRemoveFromCart = (productId) => {
        dispatch(removeFromCart(productId));
        toast.success('Item remove to cart');
    };

    const handleBuyProducts = () => {
        dispatch(buyProducts());
    };

    const handleIncrementQuantity = (productId) => {
        console.log("🚀 ~ productId:", productId)
        dispatch(incrementQuantity(productId));
    };

    const handleDecrementQuantity = (productId) => {
        dispatch(decrementQuantity(productId));
    };
    const calculateSubtotal = () => {
        let subtotal = 0;
        let discount = 0;

        cart.forEach((product) => {
            discount = product.discountPercentage || 0;
            subtotal += product.price * product.quantity;

        });

        const discountAmount = (subtotal * discount) / 100;
        const subtotalWithDiscount = subtotal - discountAmount;

        // console.log("🚀 ~ subtotal:", subtotal.toFixed(2))
        // console.log("🚀 ~ discountAmount:", discountAmount.toFixed(2))
        // console.log("🚀 ~ subtotalWithDiscount:", subtotalWithDiscount.toFixed(2))
        return {
            subtotal: subtotal.toFixed(2),
            discountAmount: discountAmount.toFixed(2),
            subtotalWithDiscount: subtotalWithDiscount.toFixed(2),
        };
    };


    const calculateTotalItems = () => {
        let totalItems = 0;
        cart.forEach((product) => {
            totalItems += (product.quantity || 0);
            // console.log(product.thumbnail);
        });
        return totalItems;
    };



    const { subtotal, discountAmount, subtotalWithDiscount } = calculateSubtotal();

    return (
        <div className='container'>
            <h2>Cart</h2>
            {cart.length > 0 ? (
                <div>
                    {cart.map((product, index) => (
                        <div className='row align-items-center border my-2' key={`${product.id}-${index}`}>

                            <div className="col">
                                <img src={product.thumbnail} alt="" className="product-image" style={{ width: "100px", height: '100px' }} />
                            </div>

                            <div className="col">
                                <h3>{product.title}</h3>
                            </div>
                            <div className="col">
                                <p>Price: {product.price}</p>
                                {/* <p>{product.discountPercentage}</p> */}
                            </div>

                            <div className="col">
                                <div className="stepper-input">
                                    <button onClick={() => handleDecrementQuantity(product.id)} className="stepper-input__button">-</button>
                                    <div className="stepper-input__content">
                                        <span>{product.quantity ? product.quantity.toString() : ''}</span>
                                    </div>
                                    <button onClick={() => handleIncrementQuantity(product.id)} className="stepper-input__button">+</button>
                                </div>
                            </div>

                            <div className="col">
                                <button className='stepper-input__button' onClick={() => handleRemoveFromCart(product.id)}>
                                    Remove Cart
                                    {/* &nbsp;<i className="fa-solid h6 fa-trash-can" style={{ color: '#d60a33' }}></i> */}
                                </button>
                            </div>

                        </div>
                    ))}

                    <div className="row">
                        <div className="col">
                            <p>Total Items: {calculateTotalItems()}</p>
                        </div>

                        <div className="col">
                            <p>Discount: - ₹{discountAmount}</p>
                        </div>
                        <div className="col">
                            <p>Subtotal: ₹{subtotal}</p>
                        </div>
                    </div>


                    <div className="row ">
                        <div className="col">
                            <p>Subtotal with Discount: ₹{subtotalWithDiscount}</p>
                        </div>

                        <div className="col">
                            <button onClick={handleBuyProducts}>Buy Products</button>
                        </div>

                    </div>

                </div>
            ) : (
                <p>No items in the cart.</p>
            )}
            <Toaster />
        </div>
    );
};

export default Cart;









// all image show image Array 

{/* <div className="image-container" key={product.id}>
    {product.images && product.images.length > 0 ? (
    product.images.map((image, i) => (
    <img key={`${i}-${product.id}`} src={image} alt={product.name} className="product-image" />
    ))
    ) : (
    <p>No images available</p>
    )}
</div> */}



// one image show image Array 

{/* <div className="image-container" key={product.id}>
    {product.images && product.images.length > 1 ? (
    <img src={product.images[1]} alt={product.name} className="product-image" style={{ width: "100px", height: '100px' }} />
    ) : (
    <p>No second image available</p>
    )}
    </div> */}