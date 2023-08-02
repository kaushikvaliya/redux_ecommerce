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
} from '../Action/types';

const initialState = {
    items: [], // Initial empty array for products
    cart: [], // Initial empty array for cart
    productDetail: null,
    products: [],

    currentUser: null,
    error: null,
    userEmail: null
};

const productsReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_PRODUCTS:
            return {
                ...state,
                items: action.payload,
            };


        case ADD_TO_CART:
            return {
                ...state,
                cart: [...state.cart, action.payload],
            };

        // case PRODUCT_DETAIL:
        //     console.log(action.payload);
        //     return {
        //         ...state,
        //         cart: state.cart.filter((product) => product.id !== action.payload),
        //     };



        case BUY_PRODUCTS:
            return {
                ...state,

                // cart: [], // Clear the cart after buying products
            };
        case REMOVE_FROM_CART:
            return {
                ...state,
                cart: state.cart.filter((product) => product.id !== action.payload),
            };

        case INCREMENT_QUANTITY:
            return {
                ...state,
                cart: state.cart.map((product) =>
                    product.id === action.payload ? { ...product, quantity: product.quantity + 1 } : product
                ),
            };

        case DECREMENT_QUANTITY:
            return {
                ...state,
                cart: state.cart.map((product) =>
                    product.id === action.payload && product.quantity > 1 ? { ...product, quantity: product.quantity - 1 } : product
                ),
            };


        case USER_SIGNUP_SUCCESS:
        case USER_LOGIN_SUCCESS:
            return {
                ...state,
                currentUser: action.payload,
                userEmail: action.payload.userEmail,
                error: null,
            };

        case USER_SIGNUP_FAILURE:
        case USER_LOGIN_FAILURE:
            return {
                ...state,
                currentUser: null,
                error: action.payload,
            };
        case USER_LOGOUT:
            return {
                ...state,
                userEmail: null,
                error: null,

            };
        case UPDATE_PRODUCTS:
            return {
                ...state,
                products: action.payload,
            };
        default:
            return state;
    }
};

export default productsReducer;




























// import {
//     CREATE_ITEM_SUCCESS,
//     CREATE_ITEM_FAILURE,
//     READ_ITEM_SUCCESS,
//     READ_ITEM_FAILURE,
//     UPDATE_ITEM_SUCCESS,
//     UPDATE_ITEM_FAILURE,
//     DELETE_ITEM_SUCCESS,
//     DELETE_ITEM_FAILURE,
//   } from '../actions/types';
  
//   const initialState = {
//     items: [],
//     error: null,
//   };
  
//   const itemReducer = (state = initialState, action) => {
//     switch (action.type) {
//       case CREATE_ITEM_SUCCESS:
//         return {
//           ...state,
//           items: [...state.items, action.payload],
//           error: null,
//         };
//       case CREATE_ITEM_FAILURE:
//         return {
//           ...state,
//           error: action.payload,
//         };
//       case READ_ITEM_SUCCESS:
//         return {
//           ...state,
//           items: [...state.items, action.payload],
//           error: null,
//         };
//       case READ_ITEM_FAILURE:
//         return {
//           ...state,
//           error: action.payload,
//         };
//       case UPDATE_ITEM_SUCCESS:
//         return {
//           ...state,
//           items: state.items.map((item) =>
//             item.id === action.payload.id ? action.payload : item
//           ),
//           error: null,
//         };
//       case UPDATE_ITEM_FAILURE:
//         return {
//           ...state,
//           error: action.payload,
//         };
//       case DELETE_ITEM_SUCCESS:
//         return {
//           ...state,
//           items: state.items.filter((item) => item.id !== action.payload),
//           error: null,
//         };
//       case DELETE_ITEM_FAILURE:
//         return {
//           ...state,
//           error: action.payload,
//         };
//       default:
//         return state;
//     }
//   };
  
//   export default itemReducer;
  