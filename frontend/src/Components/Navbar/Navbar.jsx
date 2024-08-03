import React, {useState,useRef, useContext} from 'react'
import './Navbar.css'
import logo from '../Assets/logo.png'
import cart_icon from '../Assets/cart_icon.png'
import { Link } from 'react-router-dom'
import dropdown from "../Assets/dropdown.png"
import { ShopContext } from '../../Context/ShopContext'

const Navbar = () => {
  const [menu,setmenu]=useState("shop")
  const menuRef= useRef(null);
  const {getTotalItems}=useContext(ShopContext)

  const dropdown_toggle = (e) => {
    if (menuRef.current) {
      menuRef.current.classList.toggle('nav-menu-visible');
    }
    if (e.target) {
      e.target.classList.toggle('open');
    }
  };
  return (
    <div className='navbar'>
      <div className="nav-logo">
        <img src={logo} alt="" />
        <p>Digital Dreams.</p>
      </div>
      <img className='nav-dropdown' onClick={dropdown_toggle} src={dropdown} alt="" />
      <ul ref={menuRef} className="nav-menu">
        <li onClick={()=>setmenu("shop")}>{menu==='shop'?<hr/>:<></>}<Link style={{textDecoration:'none'}} to='/'>Shop</Link></li>
        <li onClick={()=>setmenu("men")}>{menu==='men'?<hr/>:<></>}<Link style={{textDecoration:'none'}} to='/men'>Men </Link> </li>
        <li onClick={()=>setmenu("women")}> {menu==='women'?<hr/>:<></>}<Link style={{textDecoration:'none'}} to='/women'>Women</Link> </li>
        <li onClick={()=>setmenu("kids")}> {menu==='kids'?<hr/>:<></>}<Link style={{textDecoration:'none'}} to='/kid'>Kids</Link></li>
      </ul>
      <div className="nav-login-cart">
        {localStorage.getItem('auth-token')
        ?<button onClick={()=>{localStorage.removeItem('auth-token');window.location.replace('/')} }>Logout</button>:<Link to='/login'><button>Login</button></Link>}
        
        
        <Link to='/cart'><img src={cart_icon} alt="" /></Link>
        <div className="nav-cart-count">{getTotalItems()}</div>
        </div>

    </div>
  )
}

export default Navbar