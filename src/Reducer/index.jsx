import { combineReducers } from 'redux';
import productReducer from './Product';

const rootReducer = combineReducers({
    products: productReducer,
});

export default rootReducer;
