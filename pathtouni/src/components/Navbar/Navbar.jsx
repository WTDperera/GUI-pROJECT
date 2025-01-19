import React from 'react'
import './Navbar.css'
import logo from '../../assets/logo.png'

const Navbar = () => {
  return (
    <nav className="container">
      <img src={logo} alt=""className="logo"/>
      <ul>
        <li>Home</li>
        <li>Sign in</li>
        <li>Local Gov Universities</li>
        <li>About Us</li>
        <li><button className='btn'>Contact Us</button></li>
      </ul>
    </nav>
  )
}

export default Navbar
