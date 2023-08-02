
import rootReducer from '../Reducer/index';
import { legacy_createStore as createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk';

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;



// import rootReducer from '../Reducer/index';
// import { applyMiddleware } from "redux";
// import { legacy_createStore as createStore } from 'redux'

// import { composeWithDevTools } from "redux-devtools-extension";
// import thunk from "redux-thunk"

// console.log("custom store");
// let intialState = {}
// const middleware = [thunk];
// let store = createStore(
//     rootReducer,
//     intialState,
//     composeWithDevTools(applyMiddleware(...middleware))
// )
// // composeWithDevTools(applyMiddleware(thunk,other))
// export default store;