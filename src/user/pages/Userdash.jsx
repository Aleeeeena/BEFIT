import React from "react";
import '../components/Userdash.css';




import {
  FaDumbbell,
  FaUser,
  FaRobot,
  FaChartLine,
  FaTint,
  FaWeight,
  FaHome,
  FaTicketAlt,
  FaCommentDots,
  FaSignOutAlt,
  FaCalendarCheck,
  FaChalkboardTeacher,
} from "react-icons/fa";
import bg from "../../assets/bg.jpg";
import subscribed from "../../assets/subscribed.jpg";
import work from "../../assets/work.png";
import { Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

function Userdash() {
  return (
    <div className="p-6 bg-gray-100 min-h-screen flex flex-col items-center">
      {/* Profile Section */}
      <div className="p-4 bg-white shadow-md rounded-lg mb-6 text-left w-full max-w-4xl text-xl font-semibold flex items-center gap-3">
        <FaUser className="text-blue-500 text-2xl" /> <Link className="text-decoration-none text-black" to='/user-profile-settings'>Profile</Link>
      </div>

      {/* Ad Section */}
      <div
        className="h-40 w-full max-w-4xl rounded-lg flex flex-col justify-center items-center text-center text-black text-lg font-semibold p-6"
        style={{
          //backgroundImage: `url(${bg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          color: "white",
        }}
      >
         <h3 style={{fontFamily:'Merriweather',fontSize:'60px'}} className="mb-2 fw-bold">Hey,<span className="text-danger">Achiever</span> Wecome To bEFIT </h3>
         <p>YOUR FITNESS PARTNER</p>
        <h3 style={{fontFamily:'Dancing Script',color:"red"}} className="mb-2">UNLOCK YOUR BEST SELF</h3>
        <h4 className="mb-4">GET PREMIUM AT $50/MONTH</h4>
        <button className="bg-danger text-white px-4 py-2 rounded border-danger">
         <Link className="text-decoration-none text-light" to='/user-consult'>SUBSCRIBE</Link>
        </button>
    </div>


     

      <br />
      {/* Feature Section */}
      <Row className="g-3 justify-content-center">
        <Col xs={6} sm={4} md={3} lg={2} className="d-flex justify-content-center">
          <div className="feature-box workout">
            <FaDumbbell className="icon" /><Link className="text-decoration-none text-white" to='/user-workout'>Workout</Link>
          </div>
        </Col>
      



        <Col xs={6} sm={4} md={3} lg={2} className="d-flex justify-content-center">
          <div className="feature-box consult">
            <FaChalkboardTeacher className="icon" /> <Link className="text-decoration-none text-white" to='/user-consult'>Consult</Link>
          </div>
        </Col>




        <Col xs={6} sm={4} md={3} lg={2} className="d-flex justify-content-center">
          <div className="feature-box consult">
            <FaChalkboardTeacher className="icon" /> <Link className="text-decoration-none text-white" to='/befitai'>BEFIT AI</Link>
          </div>
        </Col>



        <Col xs={6} sm={4} md={3} lg={2} className="d-flex justify-content-center">
          <div className="feature-box consult">
            <FaChalkboardTeacher className="icon" /> <Link className="text-decoration-none text-white" to='/mydietitians'>Mydietitian</Link>
          </div>
        </Col>





        <Col xs={6} sm={4} md={3} lg={2} className="d-flex justify-content-center">
          <div className="feature-box track">
            <FaChartLine className="icon" /> <Link className="text-decoration-none text-white" to='/user-track-progress'>Track Progress</Link>
          </div>
        </Col>
      </Row>

      <br />
      <br />
    

      {/* Footer */}
     
    </div>
  );
}

export default Userdash;
