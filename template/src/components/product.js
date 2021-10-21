import React from 'react';
import './product.css';
import Rating from './rating';

function Product(props) {
	const {product} =props;
	return(
		<div key={product.id} className="product">
			<a href={`/products/${product.id}`}>
				<img className="product-img" src={product.image} alt={product.name} />
			</a>
			<div className="product-body">
				<a href={`/products/${product.id}`}>
					<h2>{product.name}</h2>
				</a>
				<Rating rating={product.rating} reviesNum={product.reviesNum}></Rating>
				<div className="price">{product.price}$</div>
			</div>
		</div>
	);
}
export default Product;