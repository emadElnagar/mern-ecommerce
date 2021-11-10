import { 
  CART_ADD_ITEM, 
  CART_ROMOVE_ITEM, 
  CART_SAVE_SHIPPING_INFO
} from "../constants/CartConst"
import { CART_EMPTY } from "../constants/OrderConst";

export const CartReducer = (state = { cartItems: [] }, action) => {
  switch(action.type) {
    case CART_ADD_ITEM:
      const item = action.payload;
      const existItem = state.cartItems.find((x) => x.product === item.product);
      if(existItem) {
          return {
            ...state,
            cartItems: state.cartItems.map((x) => x.product === existItem.product? item : x),
          };
      } else {
        return { ...state, cartItems: [...state.cartItems, item] };
      }
    case CART_ROMOVE_ITEM:
      return { ...state, cartItems: state.cartItems.filter((x) => x.product !== action.payload) };
    case CART_SAVE_SHIPPING_INFO:
      return { ...state, shippingInfo: action.payload };
    case CART_EMPTY:
      return {...state, cartItems: []};
    default:
      return state;
  }
}