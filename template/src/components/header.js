import React from 'react';
import './header.css';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

function Header() {
	return (
		<div className="header">
			<div className="logo">tienda</div>
			<div className="search">
				<input className="search-input" type="text" />
				<SearchIcon className="search-icon" />
			</div>
			<div className="header-navs">
				<span className="header-nav">signin</span>
				<span className="header-nav">orders</span>
				<span className="header-nav cart">
					<ShoppingCartIcon /> <span className="cart-num">0</span>
				</span>
			</div>
		</div>
	);
}

export default Header;