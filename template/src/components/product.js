import React from 'react';
import { Link } from 'react-router-dom';
import './product.css';
import Rating from './rating';

function Product(props) {
	const {product} =props;
	return(
		<div key={product.id} className="product">
			<Link to={`/products/${product.id}`}>
				<img className="product-img" src={product.image} alt={product.name} />
			</Link>
			<div className="product-body">
				<Link to={`/products/${product.id}`}>
					<h2>{product.name}</h2>
				</Link>
				<Rating rating={product.rating} reviesNum={product.reviesNum}></Rating>
				<div className="price">{product.price}$</div>
			</div>
		</div>
	);
}
export default Product;