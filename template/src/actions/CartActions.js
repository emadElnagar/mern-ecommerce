import Axios from "axios";
import { 
  CART_ADD_ITEM, 
  CART_ROMOVE_ITEM, 
  CART_SAVE_SHIPPING_INFO 
} from "../constants/CartConst";

export const addToCart = (productId, qty) => async(dispatch, getstate) => {
  const { data } = await Axios.get(`/api/products/${productId}`);
  dispatch({
    type: CART_ADD_ITEM,
    payload: {
      name: data.name,
      image: data.image,
      price: data.price,
      countInStock: data.countInStock,
      brand: data.brand,
      product: data._id,
      qty,
    }
  })
}

export const removeFromCart = (productId) => (dispatch, getstate) => {
  dispatch({type: CART_ROMOVE_ITEM, payload: productId});
  localStorage.setItem('cartItems', JSON.stringify(getstate().cart.cartItems));
}

export const saveShippingInfo = (data) => (dispatch) => {
  dispatch({ type: CART_SAVE_SHIPPING_INFO, payload:data });
  localStorage.setItem('shippingInfo', JSON.stringify(data));
}