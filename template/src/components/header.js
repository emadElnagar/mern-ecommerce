import React from 'react';
import { Link } from 'react-router-dom';
import './header.css';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Badge from '@mui/material/Badge';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { useDispatch, useSelector } from 'react-redux';
import { signout } from '../actions/UserActions';


function Header() {
	const cart = useSelector(state => state.cart);
	const { cartItems } = cart;
	const cartTotal = cartItems.reduce((a, c) => a + c.qty, 0);
	const userSignIn = useSelector(state => state.userSignIn);
	const {userInfo} = userSignIn;
	const dispatch = useDispatch();
	const signoutHandler = () => {
		dispatch(signout());
	};
	return (
		<div className="header">
			<div className="logo"><Link to="/">tienda</Link></div>
			<div className="search">
				<input className="search-input" type="text" />
				<SearchIcon className="search-icon" />
			</div>
			<div className="header-navs">
				<span className="header-nav">
					{
						userInfo
						? (
							<div className="dropdown">
								<Link to="#">{userInfo.firstName}<ArrowDropDownIcon /></Link>
								<ul className="dropdown-content">
									<li>
										<Link to="signout" onClick={signoutHandler}>sign out</Link>
									</li>
								</ul>
							</div>
						) : (
							<Link to="/signin">signin</Link>
						)
					}
				</span>
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