import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../hooks/useCart';
import classes from './header.module.css';
import { useAuth } from '../../hooks/useAuth';
import image from '../../assets/ai.png';
import Chatbot from '../../pages/Chatbot/Chatbot'; 

export default function Header() {
  const { user, logout } = useAuth();
  const { cart } = useCart();

  return (
    <header className={classes.header}>
      <div className={classes.container}>
        <div className={classes.logo_container}>
          <Link to="/" className={classes.logo}>
            Food Mine!
          </Link>
          <Link to="/chatbot" className={classes.image_logo}>
  <img src={image} alt="Chatbot" style={{ width: '50px', height: '50px' }} />
</Link>
          
          {/* <Link to="/chatbot" className={classes.chatbot_icon}chatbot>
            <img src={image} alt="Chatbot" />
          </Link> */}
        </div>
        <nav>
          <ul>
            {user ? (
              <li className={classes.menu_container}>
                <Link to="/dashboard">{user.name}</Link>
                <div className={classes.menu}>
                  <Link to="/profile">Profile</Link>
                  <Link to="/orders">Orders</Link>
                  <a onClick={logout}>Logout</a>
                </div>
              </li>
            ) : (
              <Link to="/login">Login</Link>
            )}

            <li>
              <Link to="/cart">
                Cart
                {cart.totalCount > 0 && (
                  <span className={classes.cart_count}>{cart.totalCount}</span>
                )}
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
