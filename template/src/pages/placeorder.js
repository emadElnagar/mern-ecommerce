import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import CheckoutSteps from '../components/checkoutSteps';
import { Typography } from '@mui/material';
import Button from '@mui/material/Button';
import { createOrder } from '../actions/OrderActions';
import './placeorder.css';
import { ORDER_CREATE_RESET } from '../constants/OrderConst';

export default function Placeorder(props) {
  const cart = useSelector((state) => state.cart);
  if(!cart.shippingInfo) {
    props.history.push("/shipping")
  }
  const priceFormat = (num) => Number(num.toFixed(2));
  cart.itemsPrice = priceFormat(
    cart.cartItems.reduce((a, c) => a + c.qty * c.price, 0)
  );
  const orderCreate = useSelector((state) => state.orderCreate);
  const {loading, success, error, order} = orderCreate;
  cart.shippingPrice = priceFormat(10);
  cart.taxPrice = priceFormat(0.15 * cart.itemsPrice);
  cart.totalPrice = cart.itemsPrice + cart.shippingPrice + cart.taxPrice;
  const dispatch = useDispatch();
  const placeOrderHandler = () => {
    dispatch(createOrder({...cart, orderItems: cart.cartItems}));
  }
  useEffect(() => {
    if(success) {
      props.history.push(`/order/${order._id}`);
      dispatch({type: ORDER_CREATE_RESET});
    }
  }, [dispatch, order, props.history, success])
  return (
    <div>
      <CheckoutSteps step1 step2 step3></CheckoutSteps>
      <div className="row top">
        <div className="order">
          <ul className="order-info">
            <li>
              <strong>your name: </strong>
              { cart.shippingInfo.firstName } { cart.shippingInfo.lastName }
            </li>
            <li>
              <strong>your address: </strong>
              { cart.shippingInfo.address }
            </li>
            <li>
              <strong>your city: </strong>
              { cart.shippingInfo.city }
            </li>
            <li>
              <strong>your country: </strong>
              { cart.shippingInfo.country }
            </li>
            <li>
              <strong>your phone: </strong>
              { cart.shippingInfo.phoneNumber }
            </li>
          </ul>
          
          <div className="order-summary">
            <Typography variant="h6">order summary</Typography>
            <ul>
              <li>
                <span>order Price:</span> <span>{cart.itemsPrice.toFixed(2)} $</span>
              </li>
              <li>
                <span>shipping price</span> <span>{cart.shippingPrice.toFixed(2)} $</span>
              </li>
              <li>
                <span>tax Price:</span> <span>{cart.taxPrice.toFixed(2)} $</span>
              </li>
              <li>
                <span>total Price:</span> <span>{cart.totalPrice.toFixed(2)} $</span>
              </li>
            </ul>
            {
              cart.cartItems.length === 0
              ? (
                <Button variant="contained" disabled>add to cart</Button>
                
              ) : (
                <Button variant="contained" onClick={placeOrderHandler}>
                  place order
                </Button>
              )
            }
            { loading && <loadignBox></loadignBox> }
            { error && <messageBox></messageBox> }
          </div>
          <ul className="order-items">
            <Typography variant="h6">your order</Typography>
            {
              cart.cartItems.map((item) => (
                <li className="order">
                  <li><img className="order-img" src={item.image} alt={item.name} /></li>
                  <li>
                    <Link to={`/products/${item.product}`}>
                      {item.name}
                    </Link>
                  </li>
                  <li>
                    price : {item.price} x {item.qty} = {item.price * item.qty} $
                  </li>
                </li>
              ))
            }
          </ul>
        </div>
      </div>
    </div>
  )
}