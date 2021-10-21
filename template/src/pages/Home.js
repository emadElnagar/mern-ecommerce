import React from 'react';
import Product from '../components/product';
import data from '../data';

export default function Home() {
    return (
        <div className="products">
            {data.products.map((product) => (
              <Product key={product.id} product={product} ></Product>
            ))}
        </div>
    )
}