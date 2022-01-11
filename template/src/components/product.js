import { Typography } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
import './product.css';
import ProductRating from './rating';

function Product(props) {
	const {product} =props;
	return(
		<div key={product._id} className="product">
			<Link to={`/products/${product._id}`}>
				<img className="product-img" src={product.image} alt={product.name} />
				<div className="product-body">
					<Typography className="main-headign" variant="h4">{product.name}</Typography>
					<ProductRating rating={product.rating} reviesNum={product.reviesNum}></ProductRating>
					<Typography variant="body">{product.price}$</Typography>
					<div className="price"></div>
				</div>
			</Link>
		</div>
	);
}
export default Product;