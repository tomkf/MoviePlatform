import React from 'react';
import { NavLink } from 'react-router-dom';

const Nav = () => (
	<nav>
        <ul>
            <li><NavLink to="/" exact>Home</NavLink></li>
            <li><NavLink to="/about">About</NavLink></li>
            <li><NavLink to="/discover">Discover</NavLink></li>
            <li><NavLink to="/favorites">Your Favorites</NavLink></li>
            <li><NavLink to="/ratings">Your Ratings</NavLink></li>
        </ul>
	</nav>
);

export default Nav;