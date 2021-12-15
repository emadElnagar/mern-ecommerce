import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Typography } from '@mui/material';
import { detailsOrder, payOrder } from '../actions/OrderActions';
import Axios from 'axios';
import { PayPalButton } from 'react-paypal-button-v2';
import MessageBox from '../components/messagebox';
import './placeorder.css';
import { ORDER_PAY_RESET } from '../constants/OrderConst';
import LoadingBox from '../components/loadingbox';


export default function OrderScreen(props) {
  const orderId = props.match.params.id;
  const [sdkReady, setSdkReady] = useState(false);
  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, error, loading } = orderDetails;
  const orderPay = useSelector((state) => state.orderpay);
  const {
    loading: loadingPay,
    error: errorPay,
    success: successPay,
  } = orderPay;
  const dispatch = useDispatch();
  useEffect(() => {
    const addPayPalScript = async () => {
      const { data } = await Axios.get('/api/payment/paypal');
      const script = document.createElement('script');
      script.type = "text/javascript";
      script.src = `https://www.paypal.com/sdk/js?client-id=${data}`;
      script.async = true;
      script.onload = () => {
        setSdkReady(true);
      }
      document.body.appendChild(script);
    }
    if(!order || successPay || (order && order._id !== orderId)) {
      dispatch({ type: ORDER_PAY_RESET });
      dispatch(detailsOrder(orderId));
    } else {
      if(!order.isPaid) {
        if(!window.paypal) {
          addPayPalScript();
        } else {
          setSdkReady(true);
        }
      }
    }
  }, [dispatch, order, orderId, sdkReady, successPay]);
  const successPaymentHandler = (paymentResult) => {
    dispatch(payOrder(order, paymentResult));
  }
  return loading 
  ? <LoadingBox></LoadingBox>
  : error ? <MessageBox variant="danger">{error}</MessageBox>
  : (
    <div>
      <div className="row top">
        <div className="order">
          <ul className="order-info">
            <li>
              <strong>your name: </strong>
              { order.shippingInfo.firstName } { order.shippingInfo.lastName }
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
            {
              order.isPaid
              ? <MessageBox variant="success">paid at {order.paidAt}</MessageBox>
              : <MessageBox variant="danger">didn't paid</MessageBox>
            }
            {
              order.isDelivered 
              ? <MessageBox variant="success">delivered at {order.deliveredAt}</MessageBox>
              : <MessageBox variant="danger">didn't delivered yet</MessageBox>
            }
          </ul>
          
          <div className="order-summary">
            <Typography variant="h6">order summary</Typography>
            <ul className="order-summary-list">
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
            {
              !order.isPaid && (
                <>
                {
                  errorPay && (
                    <MessageBox variant="danger">{errorPay}</MessageBox>
                  )
                }
                {
                  loadingPay && (
                    <LoadingBox></LoadingBox>
                  )
                }
                <PayPalButton 
                  amount={order.totalPrice} 
                  onSuccess={successPaymentHandler} 
                ></PayPalButton>
                </>
              )
            }
          </div>
        </div>
      </div>
    </div>
  )
}