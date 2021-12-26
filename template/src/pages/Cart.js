import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeFromCart } from '../actions/CartActions';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import './table.css';

export default function Cart(props) {
  const productId = props.match.params.id;
  const qty = props.location.search? Number(props.location.search.split('=')[1]) : 1;
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const dispatch = useDispatch();
  useEffect(() => {
    if(productId) {
      dispatch(addToCart(productId, qty));
    }
  }, [dispatch, productId, props.history, qty]);
  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
    props.history.push('/cart');
  };
  const checkoutHandler = () => {
    props.history.push('/signin?redirect=shipping');
  }
  return (
    <div className="row center">
      {
        cartItems.length === 0
          ? (
            <div className="error">
              <h1>your cart is empty yet</h1>
              <Link to="/">continue shopping</Link>
            </div>
          ) : (
            <div className="table-container">
              <div className="table">
                <h1>your shopping cart</h1>
                <table>
                  <thead>
                    <tr>
                      <th>product</th>
                      <th>image</th>
                      <th>price</th>
                      <th>quantity</th>
                      <th>total price</th>
                      <th>remove</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      cartItems.map((item) => (
                        <tr>
                          <td>
                            <Link to={`/products/${item.product}`}>
                              {item.name}
                            </Link>
                          </td>
                          <td><img src={item.image} alt={item.name} /></td>
                          <td>{item.price}$</td>
                          <td>{item.qty}</td>
                          <td>{item.price * item.qty}$</td>
                          <td>
                            <button
                              onClick={ () => removeFromCartHandler(item.product) }
                              className="delete-button"
                              title="Remove product"
                            >
                              <DeleteIcon />
                            </button>
                          </td>
                        </tr>
                      ))
                    }
                  </tbody>
                  <tfoot>
                    <tr>
                      <th colSpan="4">cart total price</th>
                      <th>{cartItems.reduce((a, c) => a + c.price * c.qty, 0)}$</th>
                      <th>
                        <button 
                          onClick={ () => cartItems.map((item) => removeFromCartHandler(item.product)) }
                          className="delete-button" 
                          title="Remove all products"
                        >
                          <DeleteIcon />
                        </button>
                      </th>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>
          )
      }
      <div className="checkout-card">
        <h2>
          subtotal ({cartItems.reduce((a, c) => a + c.qty, 0)}) items
          : {cartItems.reduce((a, c) => a + c.price * c.qty, 0)}$
        </h2>
        {
          cartItems.length === 0
            ? (
              <Button variant="contained" disabled>checkout</Button>
            ) : (
              <button onClick={checkoutHandler}>checkout</button>
            )
        }
      </div>
    </div>
  )
}