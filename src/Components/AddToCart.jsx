import React from 'react';

const AddToCart = ({ product, addToCart, className }) => {
    return (
        <div>
            <button className={className} onClick={() => addToCart(product)}><i className="fa-solid fa-2x fa-cart-shopping"></i></button>
        </div>
    );
};

export default AddToCart;
