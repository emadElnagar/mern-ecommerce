import React from 'react';
import data from '../data';
import Rating from '../components/rating';
import './product-screen.css';

export default function Home(props) {
    const product = data.products.find(x => x.id === props.match.params.id);
    if(!product){
        return(
            <div className="error-msg">
                <h1>product not found!</h1>
            </div>
        )
    }
    return (
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
                        <li>{product.description}</li>
                    </ul>
                </div>
                <div className="porduct-action">
                    <div className="card">
                        <ul>
                            <li>price: {product.price}$</li>
                            <li>
                                status: {product.countInStock >0
                                ?(<span className="success">in stock</span>)
                                :(<span className="error">unavailable</span>)}
                            </li>
                            <button>add to cart</button>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}