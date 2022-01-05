import { applyMiddleware, createStore, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { CartReducer } from './reducers/CartReducer';

import { 
  orderCreateReducer, 
  orderDetailReducer, 
  orderHistoryReducer, 
  orderPayReducer 
} from './reducers/OrderReducer';

import { 
  productListReducer, 
  productDetailsReducer, 
  productReviewCreateReducer 
} from './reducers/productReducers';

import { 
  userDetailsReducer, 
  userSigninReducer, 
  userSignupReducer, 
  userUpdateProfileReducer 
} from './reducers/userReducer';

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
  orderCreate: orderCreateReducer,
  orderDetails: orderDetailReducer,
  orderpay: orderPayReducer,
  orderList: orderHistoryReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer,
  productReviewCreate: productReviewCreateReducer,
})

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, initialState, composeEnhancer(applyMiddleware(thunk)));

export default store;
