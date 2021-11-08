import { applyMiddleware, createStore, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { CartReducer } from './reducers/CartReducer';
import { productListReducer, productDetailsReducer } from './reducers/productReducers';
import { userSigninReducer, userSignupReducer } from './reducers/userReducer';

const initialState = {
  userSignIn: {
    userInfo: localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo'))
    : null
  },
  cart: {
    cartItems: localStorage.getItem('cartItems')
    ? JSON.parse(localStorage.getItem('cartItems'))
    : [],
  },
};
const reducer = combineReducers({
  productList: productListReducer,
  productsDetails: productDetailsReducer,
  cart: CartReducer,
  userSignIn: userSigninReducer,
  userSignUp: userSignupReducer,
})

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, initialState, composeEnhancer(applyMiddleware(thunk)));

export default store;