import { useContext, useState } from "react";
import { FaUsers, FaUserMd, FaMoneyBillWave, FaChartBar, FaSignOutAlt, FaCog, FaTachometerAlt } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import ContextAPI, { AlldietitiansContextAPI, AllUsersContextAPI, tokenauthcontext } from "../context/Contextapi";


//import { allusersforadminAPI } from "../services/allapi";
//import { allusersresponsecontext } from "../context/Contextapi";








const Admindash= () => {
  const [selectedTab, setSelectedTab] = useState("dashboard");
 /// const{setallusersresponse}=useContext(allusersresponsecontext)
const{allUsersResponse}=useContext(AllUsersContextAPI)
console.log(allUsersResponse);

    const navigate=useNavigate()
 const{alldietitiansresponse}=useContext(AlldietitiansContextAPI)

 const{setisauthorized}=useContext(tokenauthcontext)
 const logout=()=>{

  sessionStorage.clear()
  setisauthorized(false)
  navigate('/')
    }
  return (
<>



<div className="vh-100">
      {/* Sidebar */}
    
      
      {/* Main Content */}
      <div className="w-100">
        {/* Navbar */}
        <nav className="navbar navbar-expand-lg navbar-light bg-light p-3">
  <div className="container-fluid">
    <h5 className="m-0">Admin Dashboard</h5>
    <button onClick={logout} className="btn btn-danger ms-auto">
      Logout
    </button>
  </div>
</nav>

       

        {/* Page Content */}

        <div className="p-4">
         
            <div>
              <h2>📊 Overview</h2>
              <div className="row">
                <div className="col-md-3">
                  <div className="card bg-primary text-white p-3">
                    <Link to={'/total-users'} className="text-decoration-none text-white" ><h5><FaUsers /> Total Users</h5>
                    <p>{allUsersResponse.length}</p></Link>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="card bg-success text-white p-3">
                   <Link to={'/total-dietians'} className="text-decoration-none text-white" > <h5><FaUserMd /> Total Dietitians</h5>
                   <p>{alldietitiansresponse.length}</p></Link>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="card bg-warning text-dark p-3">
                    <Link className="text-decoration-none text-white" to='/total-payment'><h5><FaMoneyBillWave /> Total Payments</h5>
                    <p className="text-warning">total</p>
                    </Link>
                  </div>
                </div>
               
              </div>
            </div></div></div>
            
            
            
            
          
      
            </div>
          


</>

          


  );
};

export default Admindash;