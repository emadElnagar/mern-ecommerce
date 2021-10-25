import React from 'react';
import { Link } from 'react-router-dom';
import './header.css';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Badge from '@mui/material/Badge';
import { useSelector } from 'react-redux';


function Header() {
	const cart = useSelector(state => state.cart);
	const { cartItems } = cart;
	const cartTotal = cartItems.reduce((a, c) => a + c.qty, 0)
	return (
		<div className="header">
			<div className="logo"><Link to="/">tienda</Link></div>
			<div className="search">
				<input className="search-input" type="text" />
				<SearchIcon className="search-icon" />
			</div>
			<div className="header-navs">
				<span className="header-nav">signin</span>
				<span className="header-nav">orders</span>
				<span className="header-nav cart">
					<Link to="/cart">
						<Badge badgeContent={cartTotal} color="secondary">
							<ShoppingCartIcon className="cart-icon" color="light" />
						</Badge>
					</Link>
				</span>
			</div>
		</div>
	);
}

export default Header;