import React from 'react';
import {Link} from 'react-router-dom';

import './NavBar.scss';
import Logo from '../../components/haliforniaapparel.com-wide.jpg';
import Login from '../Login/Login';


export default function NavBar() {

    
    return(
        <div className="nav-container">
            <div className="nav-links">
                <div id="header-logo">
                    <img src={Logo} height="75px" width="175px" alt="logo"/>
                </div>
                <div className="links">
                <Link to="/">Home</Link>
                <Link to="/mens">Men's</Link>
                <Link to="/womens">Women's</Link>
                <Link to="/bag">Shopping Bag</Link>
                <Login />
                
                </div>
            </div>            
        </div>
    )
}