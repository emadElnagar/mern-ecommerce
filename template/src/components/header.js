import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import './header.css';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Badge from '@mui/material/Badge';
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
				{
					userInfo
					?
					(
						<Fragment>
							<span className="header-nav">
								<div className="dropdown">
									<Link to="#">
										{userInfo.firstName} <span className="dropdown-icon">&#9660;</span>
									</Link>
									<ul className="dropdown-content">
										<li>
											<Link to="/profile">profile</Link>
										</li>
										<li>
											<Link to="/" onClick={signoutHandler}>sign out</Link>
										</li>
									</ul>
								</div>
							</span>
							<span className="header-nav">
								<Link to="/orderhistory">orders</Link>
							</span>
						</Fragment>
					)
					:
					(
						<Fragment>
							<span className="header-nav">
								<Link to="/signin">signin</Link>
							</span>
							<span className="header-nav">
								<Link to="/signup">signup</Link>
							</span>
						</Fragment>
					)
				}
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