import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUsers, FaMoneyBillWave, FaComments, FaRobot, FaCalendarAlt, FaSignOutAlt } from "react-icons/fa";
import { tokenauthcontext } from "../../context/Contextapi";


function Dietitiandashboard() {

  const{setisauthorized}=useContext(tokenauthcontext)
  const navigate=useNavigate()
  
  const logout=()=>{

    sessionStorage.clear()
    setisauthorized(false)
    navigate('/')
      }
  return (
    <div className="d-flex">
      {/* Sidebar */}
      <div className="bg-dark text-white p-3 vh-100" style={{ width: "250px" }}>
       

          <ul>
          <li className="mt-5">
           <button className="btn btn-danger" onClick={logout}><FaSignOutAlt className="me-2" /> Logout</button>
              
           
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="p-4 w-100">
        <h2 className="mb-4">👋 Welcome, Dietitian!</h2>

        <div className="d-flex flex-wrap gap-4">
          {/* Clients Card */}
          <div className="card text-center p-4 shadow" style={{ width: "18rem" }}>
            <FaUsers size={40} className="text-primary mx-auto mb-3" />
            <h5>Total Clients</h5>
            <h2 className="text-light">12</h2>
            <Link to='/dietitian/clients' className="btn btn-outline-primary mt-2">View Clients</Link>
          </div>

          {/* Earnings Card */}
          <div className="card text-center p-4 shadow" style={{ width: "18rem" }}>
            <FaMoneyBillWave size={40} className="text-success mx-auto mb-3" />
            <h5>Total Earnings</h5>
            <h2 className="text-light">$2,500</h2>
            <Link to='/dietitian-earnings' className="btn btn-outline-success mt-2">View Earnings</Link>
          </div>

          {/* Chat Card */}
          <div className="card text-center p-4 shadow" style={{ width: "18rem" }}>
            <FaComments size={40} className="text-warning mx-auto mb-3" />
            <h5>Messages</h5>
            <h2 className="text-light">5 New</h2>
            <Link to='/dietitian/chat' className="btn btn-outline-warning mt-2">Open Chat</Link>
          </div>

         
        </div>
      </div>
    </div>
  );
}

export default Dietitiandashboard;
