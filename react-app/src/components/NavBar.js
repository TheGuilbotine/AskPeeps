import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import LogoutButton from './auth/LogoutButton';
import './NavBar.css'

const NavBar = () => {
    const sessionUser = useSelector((state) => state.session.user)
    const location = useLocation();
    const [optionsOn, setOptionsOn] = useState(false);

    return (
    <div className="navbar__container">
        <nav className="navbar-links__container">
            <div className="navbar-link__container">
                {location.pathname != '/' && <NavLink className="navbar-link" to='/' exact={true} activeClassName='active'>
                    Home
                </NavLink>}
            </div>
            <div className="navbar-link__container">
                {sessionUser && <NavLink className="navbar-link" to='/feed' exact={true} activeClassName='active'>
                    {sessionUser.username}'s Questions Feed
                </NavLink>}
            </div>
            {!sessionUser && <div className="navbar-link__container">
                <NavLink className="navbar-link" to='/login' exact={true} activeClassName='active'>
                    Login
                    </NavLink>
            </div>}
            {!sessionUser && <div className="navbar-link__container">
                <NavLink className="navbar-link" to='/sign-up' exact={true} activeClassName='active'>
                    Sign Up
                </NavLink>
            </div>}
            {sessionUser && <div className="navbar-link__container">
                <LogoutButton className="navbar-button"/>
            </div>}
            <div>
                <button className='nav_sidebar_icons' onClick={()=> setOptionsOn(!optionsOn)}>
                    <i className="fas fa-bars" />
                </button>
          </div>
        </nav>
        <div className="sidebar" style={!optionsOn ? {transform: 'translateX(100%)'} : {}}>
            <div className='sidebar_container'>
                <div className="arrow-button" onClick={() => setOptionsOn(!optionsOn)}>
                    <i className="fas fa-arrow-left"></i>
                </div>
            </div>
        </div>
    </div>
    );
}

export default NavBar;
