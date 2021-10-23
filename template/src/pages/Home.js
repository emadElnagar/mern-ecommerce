import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Product from '../components/product';

export default function Home() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    useEffect(() => {
        const fetchData = async() => {
            try {
                setLoading(true);
                const { data } = await axios.get('/api/products');
                setLoading(false);
                setProducts(data);
            } catch(err) {
                setError(err.message);
                setLoading(false);
            }
        };
        fetchData();
    }, [])
    return (
        <div>
            {loading? (
                    <loadingBox></loadingBox>
                ) : error? (
                    <messageBox variant="error">{error}</messageBox>
                ) : (
                    <div className="products">
                        {products.map((product) => (
                            <Product key={product.id} product={product} ></Product>
                        ))}
                    </div>
                )
            }
        </div>
    )
}