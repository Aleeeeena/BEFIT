import React from 'react'
import logo from '../assets/images.png'

function Footer() {
  return (
   <>

<footer className="bg-dark text-white py-5">
      <div className="container-fluid">
        <div className="row justify-content-between px-5">
          
          {/* Logo & About */}
          <div className="col-md-4 mb-4">
            <div className="fw-bold fs-5">
              <img style={{ height: '40px' }} src={logo} alt="BEfit Logo" className="me-2" />
              BEfit
            </div>
            <p className="text-muted mt-2" style={{ fontSize: '15px' }}>
              Your ultimate AI-powered fitness and diet companion, helping you achieve your health and wellness goals effortlessly.
            </p>
          </div>

          {/* Links Section */}
          <div className="col-md-2 mb-4">
            <h5 className="mb-3">Links</h5>
            <a href="/" className="text-decoration-none text-white d-block">Home</a>
            <a href="/login" className="text-decoration-none text-white d-block">Login</a>
            <a href="/register" className="text-decoration-none text-white d-block">Register</a>
          </div>

          {/* Guide Section */}
          <div className="col-md-2 mb-4">
            <h5 className="mb-3">Guide</h5>
            <a href="#" className="text-decoration-none text-white d-block">React</a>
            <a href="#" className="text-decoration-none text-white d-block">React Bootstrap</a>
            <a href="#" className="text-decoration-none text-white d-block">Router</a>
          </div>

          {/* Contact Section */}
          <div className="col-md-3">
            <h5 className="mb-3">Contact Us</h5>
            <input
              type="email"
              placeholder="Enter your email"
              className="form-control rounded mb-2"
              style={{ height: '45px' }}
            />
            <button className="btn btn-danger w-100" style={{ height: '45px' }}>
              Reach Out
            </button>

            <div className="d-flex justify-content-between mt-3 fs-4">
              <a href="#" className="text-white"><i className="fa-brands fa-facebook"></i></a>
              <a href="#" className="text-white"><i className="fa-brands fa-twitter"></i></a>
              <a href="#" className="text-white"><i className="fa-brands fa-github"></i></a>
              <a href="#" className="text-white"><i className="fa-brands fa-linkedin"></i></a>
              <a href="#" className="text-white"><i className="fa-brands fa-instagram"></i></a>
              <a href="#" className="text-white"><i className="fa-solid fa-phone"></i></a>
            </div>
          </div>

        </div>
      </div>
    </footer>
   

   
   
   </>
  )
}

export default Footer