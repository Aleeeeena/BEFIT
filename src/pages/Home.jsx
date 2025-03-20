import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { Link } from 'react-router-dom'



function Home() {
  return (
   <>
    <div className="bg-light min-vh-100 d-flex flex-column">
      <Header />
      
      <div className="container text-center my-5">
        <h3 className="fw-bold text-primary">
          🚀 Welcome to <span className="text-dark">BEfit</span> – Your Ultimate Fitness & Diet Companion!
        </h3>

        <p className="lead text-muted mt-4">
          BEfit is a <span className="text-success fw-bold">smart, AI-powered platform</span> designed to help you achieve your health and wellness goals.
          Whether you are a <span className="text-dark fw-bold">fitness enthusiast</span>, a <span className="text-dark fw-bold">dietitian</span> looking to guide clients, or someone just starting their 
          <span className="text-danger fw-bold"> healthy lifestyle journey</span>, BEfit has everything you need.
        </p>

        <p className="text-muted">
          With personalized <span className="fw-bold">diet plans</span>, workout tracking, expert dietitian consultations, AI-driven nutrition guidance, and a 
          supportive community, BEfit ensures that you stay on track towards a <span className="text-success fw-bold">healthier, fitter you</span>.
        </p>

        <Link to="/register-user" className="btn btn-dark px-4 py-2 fw-bold mt-3">
          Get Started Today 🚀
        </Link>
      </div>

      <br />

      <Footer />
    </div>
   
   
   </>
  )
}

export default Home