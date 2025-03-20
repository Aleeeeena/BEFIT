import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../assets/images.png'










function Header() {

  
  
  return (
   <>
   <nav className="navbar navbar-expand-lg bg-dark">
      <div className="container-fluid">
        <Link to={"/"} className="navbar-brand text-white d-flex align-items-center">
          <img src={logo} alt="Logo" width="40" height="40" className="me-2" />
          <span className="fs-4 fw-bold">BEfit</span>
        </Link>
      </div>
    </nav>
   
   </>
  )
}

export default Header