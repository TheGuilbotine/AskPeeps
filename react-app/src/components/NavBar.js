import React from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';
import './NavBar.css'

const NavBar = () => {
    return (
    <div className="navbar__container">
        <nav className="navbar-links__container">
            <div className="navbar-link__container">
                <NavLink className="navbar-link" to='/' exact={true} activeClassName='active'>
                    Home
                </NavLink>
            </div>
            <div className="navbar-link__container">
                <NavLink className="navbar-link" to='/feed' exact={true} activeClassName='active'>
                    Questions Feed
                </NavLink>
            </div>
            <div className="navbar-link__container">
                <NavLink className="navbar-link" to='/login' exact={true} activeClassName='active'>
                    Login
                    </NavLink>
            </div>
            <div className="navbar-link__container">
                <NavLink className="navbar-link" to='/sign-up' exact={true} activeClassName='active'>
                    Sign Up
                </NavLink>
            </div>
            <div className="navbar-link__container">
                <LogoutButton className="navbar-button"/>
            </div>
        </nav>
    </div>
    );
}

export default NavBar;
