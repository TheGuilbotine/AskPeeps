import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import LogoutButton from './auth/LogoutButton';
import SearchBar from './SearchQuestions';
import './NavBar.css'

const NavBar = () => {
    const sessionUser = useSelector((state) => state.session.user)
    const location = useLocation();

    return (
    <div className="navbar__container">
        <nav className="navbar-links__container">
            <div className="navbar-link__container">
                {location.pathname !== '/' && <NavLink className="navbar-link" to='/' exact={true} activeClassName='active'>
                    Home
                </NavLink>}
            </div>
            <div className="navbar-link__container">
                {(location.pathname === '/' & sessionUser) ? <NavLink className="navbar-link" to='/feed' exact={true} activeClassName='active'>
                    {sessionUser.username}'s Questions Feed
                </NavLink> : null}
                {location.pathname === '/' && <NavLink className="navbar-link" to='/feed' exact={true} activeClassName='active'>
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
                <SearchBar />
                <LogoutButton className="navbar-button"/>
            </div>}
        </nav>
    </div>
    );
}

export default NavBar;
