import React from "react";
import { Link } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";

function Subscribe() {
  return (
    <div className="container mx-auto p-6 min-h-screen flex flex-col items-center">
      <h2 className="text-3xl font-bold mb-4">Unlock Premium Benefits</h2>

      <div className="bg-white p-6 rounded-lg shadow-md max-w-lg w-full">
        <ul className="mb-4 space-y-3 text-lg">
          <li className="flex items-center gap-2">
            <FaCheckCircle className="text-green-500" /> Personalized Dietitian
          </li>
          <li className="flex items-center gap-2">
            <FaCheckCircle className="text-green-500" /> Meal Recommendations
          </li>
          <li className="flex items-center gap-2">
            <FaCheckCircle className="text-green-500" /> Progress Tracking
          </li>
          <li className="flex items-center gap-2">
            <FaCheckCircle className="text-green-500" /> Exclusive Workouts
          </li>
          <li className="flex items-center gap-2">
            <FaCheckCircle className="text-green-500" /> 24/7 Chat with Experts
          </li>
        </ul>

        <h3 className="text-2xl font-semibold mb-3 text-center">$19.99 / Month</h3>

        <button className="bg-success text-white  py-2 rounded ">
          Pay Now
        </button>
      </div>
      <br />

     <button className="btn btn-dark"> <Link to="/userdashboard" className="text-decoration-none text-white">
        Back to Dashboard
      </Link></button>
    </div>
  );
}

export default Subscribe;
