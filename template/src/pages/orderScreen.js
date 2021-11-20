import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import CheckoutSteps from '../components/checkoutSteps';
import { Typography } from '@mui/material';
import './placeorder.css';
import { detailsOrder } from '../actions/OrderActions';

export default function OrderScreen(props) {
  const orderId = props.match.params.id;
  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, error, loading } = orderDetails;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(detailsOrder(orderId));
  }, [dispatch, orderId])
  return loading 
  ? <loadignBox></loadignBox>
  : error ? <messageBox>{error}</messageBox>
  : (
    <div>
      <CheckoutSteps step1 step2 step3></CheckoutSteps>
      <div className="row top">
        <div className="order">
          <ul className="order-info">
            <li>
              <strong>your name: </strong>
              { order.shippingInfo.firstName } { order.shippingInfo.lastName }
            </li>
            <li>
              <strong>your address: </strong>
              { order.shippingInfo.address }
            </li>
            <li>
              <strong>your city: </strong>
              { order.shippingInfo.city }
            </li>
            <li>
              <strong>your country: </strong>
              { order.shippingInfo.country }
            </li>
            <li>
              <strong>your phone: </strong>
              { order.shippingInfo.phoneNumber }
            </li>
            {order.isDelivered 
            ? <messageBox>delivered at {order.deliveredAt}</messageBox>
            : <messageBox>didn't delivered yet</messageBox>
          }
          </ul>
          
          <div className="order-summary">
            <Typography variant="h6">order summary</Typography>
            <ul>
              <li>
                <span>order Price:</span> <span>{order.itemsPrice.toFixed(2)} $</span>
              </li>
              <li>
                <span>shipping price</span> <span>{order.shippingPrice.toFixed(2)} $</span>
              </li>
              <li>
                <span>tax Price:</span> <span>{order.taxPrice.toFixed(2)} $</span>
              </li>
              <li>
                <span>total Price:</span> <span>{order.totalPrice.toFixed(2)} $</span>
              </li>
            </ul>
          </div>
          <ul className="order-items">
            <Typography variant="h6">your order</Typography>
            {
              order.orderItems.map((item) => (
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