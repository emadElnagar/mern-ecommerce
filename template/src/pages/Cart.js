import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addToCart } from '../actions/CartActions';

export default function Cart(props) {
  const productId = props.match.params.id;
  const qty = props.location.search? Number(props.location.search.split('=')[1]) : 1;
  const dispatch = useDispatch();
  useEffect(() => {
    if(productId) {
      dispatch(addToCart(productId, qty));
    }
  }, [dispatch, productId, qty]);
  return (
    <div>
      <h1>Your Cart</h1>
      <p>Add To Cart productid: {productId} || quantity: {qty}</p>
    </div>
  )
}