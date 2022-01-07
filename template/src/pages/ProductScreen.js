import React, { useEffect, useState } from 'react';
import Rating from '../components/rating';
import './product-screen.css';
import { useDispatch, useSelector } from 'react-redux';
import { createReview, porductDetails } from '../actions/productActions';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MessageBox from '../components/messagebox';
import LoadingBox from '../components/loadingbox';
import { Link } from 'react-router-dom';
import { PRODUCT_REVIEW_CREATE_RESET } from '../constants/productConst';
import Swal from 'sweetalert2';


export default function Home(props) {
  const dispatch = useDispatch();
  const productId = props.match.params.id;
  const [qty, setQty] = useState(1);
  const productsDetails = useSelector((state) => state.productsDetails);
  const { product, error, loading } = productsDetails;
  const userSignIn = useSelector((state) => state.userSignIn);
  const { userInfo } = userSignIn;

  const productReviewCreate = useSelector((state) => state.productReviewCreate);
  const {
    loading: loadingReviewCreate,
    error: errorReviewCreate,
    success: successReviewCreate,
  } = productReviewCreate;

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  useEffect(() => {
    if (successReviewCreate) {
      Swal.fire(
        'DONE',
        'Review Submitted Successfully',
        'success'
      );      
      setRating('');
      setComment('');
      dispatch({ type: PRODUCT_REVIEW_CREATE_RESET });
    }
    dispatch(porductDetails(productId));
  }, [dispatch, productId, successReviewCreate]);

  const addToCartHandler = () => {
    props.history.push(`/cart/${productId}?quantity=${qty}`);
  }

  const submitHandler = (e) => {
    e.preventDefault();
    if (comment && rating) {
      dispatch(
        createReview(productId, { rating, comment, name: userInfo.firstname })
      );
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Please enter comment and rating',
      });      
    }
  };
  
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
            <div>
              <h2>Reviews</h2>
              {
                product.reviews &&
                product.reviews.length === 0 && (
                  <h4>There is no review</h4>
                )
              }
              <ul>
                {
                  product.reviews &&
                  product.reviews.map((review) => (
                    <li key={review._id}>
                      <strong>{review.name}</strong>
                      <Rating rating={review.rating} caption=" "></Rating>
                      <p>{review.createdAt.substring(0, 10)}</p>
                      <p>{review.comment}</p>
                    </li>
                  ))
                }
                <li>
                  {userInfo ? (
                    <form className="form1" onSubmit={submitHandler}>
                      <div>
                        <h2>Write a customer review</h2>
                      </div>
                      <div>
                        <label htmlFor="rating">Rating</label>
                        <select
                          id="rating"
                          value={rating}
                          onChange={(e) => setRating(e.target.value)}
                        >
                          <option value="">Select...</option>
                          <option value="1">1- Poor</option>
                          <option value="2">2- Fair</option>
                          <option value="3">3- Good</option>
                          <option value="4">4- Very good</option>
                          <option value="5">5- Excelent</option>
                        </select>
                      </div>
                      <div>
                        <label htmlFor="comment">Comment</label>
                        <textarea
                          id="comment"
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                        ></textarea>
                      </div>
                      <div>
                        <label />
                        <button className="primary" type="submit">
                          Submit
                        </button>
                      </div>
                      <div>
                        {loadingReviewCreate && <LoadingBox></LoadingBox>}
                        {errorReviewCreate && (
                          <MessageBox variant="danger">
                            {errorReviewCreate}
                          </MessageBox>
                        )}
                      </div>
                    </form>
                  ) : (
                    <MessageBox>
                      Please <Link to={`/signin?next=/products/${productId}`}>Sign In</Link> to write a review
                    </MessageBox>
                  )}
                </li>
              </ul>
            </div>
          </div>
        </div>
      )
    }

  </div>
  )
}