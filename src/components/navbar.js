import React from 'react';
import '../assets/navbar.css';
import logo from '../assets/logo.png';
import {NavLink } from 'react-router-dom';


function Navbar() {
    return (
        <nav className='Navbar'>
        <header className='header'>
            <div className="logo">
                <img src={logo} alt="Logo" />
            </div>
        <ul className='nav-links' >
          <li><NavLink to="/home">Home</NavLink></li>
          <li><NavLink to="/">About</NavLink></li>
          <li><NavLink to="/form" >Donate</NavLink></li>
          <li><NavLink to="/">Dashboard</NavLink></li>
          <li><NavLink to="/">Transaction</NavLink></li>
          <li><NavLink to="/">Fund Overview</NavLink></li>
          <li><NavLink to="/">Connect Wallet</NavLink></li>
          <li><NavLink to="/">Contact</NavLink></li>
         
        </ul>
        </header>
    </nav>
    );
  }
 export default Navbar;