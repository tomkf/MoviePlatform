import React from 'react';
import { NavLink } from 'react-router-dom';
import Image from 'react-bootstrap/Image';
import logo from '../images/movieLogo.png'

const styles = { color: 'white', textDecoration: 'none' }

const Nav = () => (
    <div className="navContainer"> 
	<nav className="navBar">
     <Image  className="logo" src={logo} roundedCircle /> 
        <ul>
            <li><NavLink style={styles} to="/" exact>Home</NavLink></li>
            <li><NavLink style={styles} to="/about">About</NavLink></li>
            <li><NavLink style={styles} to="/discover">Discover</NavLink></li>
            <li><NavLink style={styles} to="/favorites">Your Favorites</NavLink></li>
            <li><NavLink style={styles} to="/ratings">Your Ratings</NavLink></li>
        </ul>
	</nav>
    </div>
);

export default Nav;