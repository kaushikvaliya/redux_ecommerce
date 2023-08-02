import API from '../http-common';
import APIlocal from '../http-local';
import {
    FETCH_PRODUCTS,
    ADD_TO_CART,
    BUY_PRODUCTS,
    REMOVE_FROM_CART,
    INCREMENT_QUANTITY,
    DECREMENT_QUANTITY,
    PRODUCT_DETAIL,
    USER_SIGNUP_SUCCESS,
    USER_LOGIN_SUCCESS,
    USER_SIGNUP_FAILURE,
    USER_LOGIN_FAILURE,
    USER_LOGOUT,
    UPDATE_PRODUCTS
} from './types';



export const fetchProducts = () => {
    return async (dispatch) => {
        try {
            const response = await API.get('/products');
            // const response = await API.get('/products');
            console.log(response.data); // Check the data returned by the API
            dispatch({
                type: FETCH_PRODUCTS,
                payload: response.data,
            });
        } catch (error) {
            console.log('Error:', error);
        }
    };
};


export const addToCart = (product) => {
    return {
        type: ADD_TO_CART,
        payload: product,
    };
};

export const buyProducts = () => {
    return {
        type: BUY_PRODUCTS,
    };
};

export const removeFromCart = (productId) => {
    return {
        type: REMOVE_FROM_CART,
        payload: productId,
    };
};

export const incrementQuantity = (productId) => {
    return {
        type: INCREMENT_QUANTITY,
        payload: productId,
    };
};

export const decrementQuantity = (productId) => {
    return {
        type: DECREMENT_QUANTITY,
        payload: productId,
    };
};


// export const productDetail = (product) => {
//     return {
//         type: PRODUCT_DETAIL,
//         payload: product,
//     };
// };


export const productDetail = (productId) => {
    return async () => {
        try {
            const response = await API.get(`/products/${productId}`);
            // console.log(response.data);
            return response.data

        } catch (error) {
            if (error.response && error.response.status === 404) {
                console.log('Product not found.');
            } else {
                console.log('Error:', error);
            }
        }
    };
};







export const userSignupRequest = (userData) => {
    return async (dispatch) => {
        try {
            // Add the role to the userData object
            const updatedUserData = { ...userData, role: '2' }; // Replace 'user' with the desired role value
            const response = await APIlocal.post(`/users`, updatedUserData); // Replace with your API endpoint



            // mockapi
            // const response = await APIlocal.post(`/crud`, userData); // Replace with your API endpoint

            // const userlogin = userdata.filter(el =>el.name===name1 &&el.email === email1 && el.password === password1);

            // if (userlogin.length) {
            //     console.log("userlogin");
            //     toast.success('Successfully toasted!')

            // } else {
            //     console.log("error");
            //     toast.error("This didn't work.")

            // }


            dispatch({ type: USER_SIGNUP_SUCCESS, payload: response.data });

            // Store user data in localStorage
            // localStorage.setItem('userData', JSON.stringify(response.data));
            // localStorage.setItem('userEmail', response.data.name);
            localStorage.setItem('userEmail', response.data.email);

        } catch (error) {
            dispatch({ type: USER_SIGNUP_FAILURE, payload: error.message });
            throw error;
        }
    };
};



export const userSignupSuccess = () => {
    return {
        type: USER_SIGNUP_SUCCESS,

    };
};

export const userSignupFailure = (error) => {
    return {
        type: USER_SIGNUP_FAILURE,
        payload: error,
    };
};





// export const userLoginRequest = (userData, userlogin) => {
//     return async (dispatch) => {
//         try {
//             const response = await APIlocal.get(`/users`, userData);

//             // console.log("🚀 ~ userLoginRequest response:", response.data);
//             // console.log("🚀 ~ userData:", userData.email);
//             // console.log("🚀 ~ userData:", userData.password);


//             const userlogin = response.data.filter((el) => {
//                 // console.log("🚀 ~  el.email:", el.email)
//                 // return el.email === userData.email && el.password === userData.password;
//                 return el.email === userData.email && el.password === userData.password;
//             });

//             console.log("🚀 ~ userlogin:", userlogin)
//             // if (userlogin.length) {
//             //     console.log("userlogin ");
//             //     dispatch({ type: USER_LOGIN_SUCCESS, payload: response.data });
//             // } else {
//             //     console.log("error");
//             //     dispatch({ type: USER_LOGIN_FAILURE, payload: 'Invalid credentials' });
//             // }

//         } catch (error) {
//             dispatch({ type: USER_LOGIN_FAILURE, payload: error.message });
//             throw error;
//         }
//     };
// };





export const userLoginRequest = (userData) => {
    return async (dispatch) => {
        try {
            const response = await APIlocal.get(`/users`, userData);

            const userlogin = response.data.filter((el) => {
                return el.email === userData.email && el.password === userData.password;
            });

            if (userlogin.length) {
                dispatch(userLoginSuccess(response.data));
                return userlogin; // Return userlogin array
            } else {
                dispatch(userLoginFailure('Invalid credentials'));
                return []; // Return an empty array when login fails
            }
        } catch (error) {
            dispatch(userLoginFailure(error.message));
            throw error;
        }
    };
};




// export const userLoginRequest = (userData) => {
//     return async (dispatch) => {
//         try {
//             // const response = await APIlocal.get(`/user?email=${email}&password=${password}`, userData); // Replace with your API endpoint for login
//             const response = await APIlocal.get(`/users`, userData); // Replace with your API endpoint for login
//             console.log("🚀 ~ userLoginRequest response:", response.data)
//             console.log("🚀 ~ userData:", userData.email)
//             console.log("🚀 ~ userData:", userData.password)

//             // const user = response.data

//             const userlogin = response.data.filter(
//                 (el) => el.email === userData.email && el.name === userData.name
//             );

//             console.log("🚀 ~ userlogin:", userlogin);


//             if (userlogin.length) {
//                 console.log("userlogin");
//                 // toast.success('Successfully logged in!');
//             } else {
//                 console.log("error");
//                 // toast.error("Login failed. Invalid credentials.");
//             }


//             dispatch({ type: USER_LOGIN_SUCCESS, payload: response.data });
//             // console.log("🚀 ~ response:", response)
//         } catch (error) {
//             dispatch({ type: USER_LOGIN_FAILURE, payload: error.message });
//             throw error;
//         }
//     };
// };




export const userLoginSuccess = (user) => {
    return {
        type: USER_LOGIN_SUCCESS,
        payload: user,
    };
};

export const userLoginFailure = (error) => {
    return {
        type: USER_LOGIN_FAILURE,
        payload: error,
    };
};



export const userLogout = () => {
    return (dispatch) => {
        // Clear user data from localStorage
        localStorage.removeItem('userEmail');
        // Dispatch USER_LOGOUT action
        dispatch({ type: USER_LOGOUT });
    };
};



export const updateProducts = (updatedProducts) => ({
    type: UPDATE_PRODUCTS,
    payload: updatedProducts,
});









// Create item


// export const createItem = (itemData) => {
//     return async (dispatch) => {
//         try {
//             const response = await APIlocal.post('/users', itemData); // Replace '/items' with your create endpoint
//             dispatch({ type: CREATE_ITEM_SUCCESS, payload: response.data });
//         } catch (error) {
//             dispatch({ type: CREATE_ITEM_FAILURE, payload: error.message });
//             throw error;
//         }
//     };
// };

// // Read item
// export const readItem = (itemId) => {
//     return async (dispatch) => {
//         try {
//             const response = await APIlocal.get(`/users/${itemId}`); // Replace '/items' with your read endpoint
//             dispatch({ type: READ_ITEM_SUCCESS, payload: response.data });
//         } catch (error) {
//             dispatch({ type: READ_ITEM_FAILURE, payload: error.message });
//             throw error;
//         }
//     };
// };

// // Update item
// export const updateItem = (itemId, updatedData) => {
//     return async (dispatch) => {
//         try {
//             const response = await APIlocal.put(`/users/${itemId}`, updatedData); // Replace '/items' with your update endpoint
//             dispatch({ type: UPDATE_ITEM_SUCCESS, payload: response.data });
//         } catch (error) {
//             dispatch({ type: UPDATE_ITEM_FAILURE, payload: error.message });
//             throw error;
//         }
//     };
// };

// // Delete item
// export const deleteItem = (itemId) => {
//     return async (dispatch) => {
//         try {
//             await APIlocal.delete(`/users/${itemId}`); // Replace '/items' with your delete endpoint
//             dispatch({ type: DELETE_ITEM_SUCCESS, payload: itemId });
//         } catch (error) {
//             dispatch({ type: DELETE_ITEM_FAILURE, payload: error.message });
//             throw error;
//         }
//     };
// };

