import React from 'react';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import '../assets/styles/Navigation.css'

export const Navigation = () => {
    const location = useLocation();
    console.log(location);
    return (
        <nav className='navigation-container'>
            <Link to="/board" className={location.pathname === '/board' ? 'active-nav' : ''}>Board</Link>
            <Link to="/settings" className={location.pathname === '/settings' ? 'active-nav' : ''}>Settings</Link>
        </nav>
    )
};