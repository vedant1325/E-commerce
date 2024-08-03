import React from 'react'
import "./Navbar.css"
import navlogo from "../../assets/nav-logo.svg"
import Addaheading from "../../assets/Addaheading.jpg"
import navprofile from "../../assets/nav-profile.svg"


const Navbar = () => {
  return (
    <div className='navbar'>
        <img width="266" height="65"  className='nav-logo' alt="" src={Addaheading} />
        <img  src={navprofile} alt="" className='nav-profile' />
      
    </div>
  )
}

export default Navbar
