import React, { useEffect, useState } from 'react';
import Rating from '../components/rating';
import './product-screen.css';
import { useDispatch, useSelector } from 'react-redux';
import { porductDetails } from '../actions/productActions';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MessageBox from '../components/messagebox';
import LoadingBox from '../components/loadingbox';


export default function Home(props) {
  const dispatch = useDispatch();
  const productId = props.match.params.id;
  const [qty, setQty] = useState(1);
  const productsDetails = useSelector((state) => state.productsDetails);
  const { product, error, loading } = productsDetails;

  useEffect(() => {
    dispatch(porductDetails(productId));
  }, [dispatch, productId]);

  const addToCartHandler = () => {
    props.history.push(`/cart/${productId}?quantity=${qty}`);
  }
  
  return (
    <div>
      {loading? (
        <LoadingBox></LoadingBox>
      ) : error? (
        <MessageBox variant="error">{error}</MessageBox>
      ) : (
        <div>
          <div className="row top">
            <div className="product-image">
              <img src={product.image} alt={product.name} />
            </div>
            <div className="porduct-info">
              <ul>
                <h1>{product.name}</h1>
                <li>
                  <Rating rating={product.rating} reviesNum={product.reviesNum}></Rating>
                </li>
                <li>{product.price}$</li>
                <li>brand: {product.brand}</li>
                <li>{product.description}</li>
              </ul>
            </div>
            <div className="porduct-action">
              <div className="card">
                <ul>
                  <li>
                    <span>price :</span>
                    <span>{product.price}$</span>
                  </li>
                  <li>
                    <span>status :</span>
                    {product.countInStock > 0
                    ? (<span className="success">in stock</span>)
                    : (<span className="unavailable">unavailable</span>)}
                  </li>
                  {
                    product.countInStock > 0 && (
                      <li>
                        <span>quantity :</span>
                        <span>
                          <FormControl>
                            <Select
                              value={qty}
                              onChange={e => setQty(e.target.value)}
                              displayEmpty
                            >   
                              {
                                [...Array(product.countInStock).keys()].map((x) => (
                                  <MenuItem key={x + 1} value={x + 1}>{x + 1}</MenuItem>
                                ))
                              }
                            </Select>
                          </FormControl>
                        </span>
                      </li>
                    )
                  }
                  {
                    product.countInStock > 0
                      ? <button onClick={addToCartHandler}>add to cart</button>
                      : <Button variant="contained" disabled>add to cart</Button>
                  }
                </ul>
              </div>
            </div>
          </div>
        </div>
      )
    }
  </div>
  )
}