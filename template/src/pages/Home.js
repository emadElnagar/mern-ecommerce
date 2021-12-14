import React, { useEffect } from 'react';
import Product from '../components/product';
import { useDispatch, useSelector } from 'react-redux';
import { productsList } from '../actions/productActions';
import MessageBox from '../components/messagebox';

export default function Home() {
  const dispatch = useDispatch();
  const productList = useSelector( state => state.productList );
  const { loading, error, products } = productList;
  useEffect(() => {
    dispatch(productsList());
  }, [dispatch])
  return (
    <div>
      {loading? (
          <loadingBox></loadingBox>
        ) : error? (
          <MessageBox variant="error">{error}</MessageBox>
        ) : (
          <div className="products">
            {products.map((product) => (
              <Product key={product._id} product={product} ></Product>
            ))}
          </div>
        )
      }
    </div>
  )
}