import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getalldietitiansforuserAPI } from "../../services/allapi";
import axios from "axios";


function ConsultPage() {
    const [all, setall] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        getalldiet();
    }, []);

    const getalldiet = async () => {
        try {
            const result = await getalldietitiansforuserAPI();
            if (result.status === 200) {
              console.log(result.data);
              
                setall(result.data);
            } else {
                alert("No dietitians active now");
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handlePayment = async (dietitianId, amount) => {
      try {
          const userId = sessionStorage.getItem("userid");
  
          const response = await axios.post("https://befitbackend.onrender.com/create", {
              userId,
              dietitianId, // Send dietitianId properly in request body
              amount
          });
  
          console.log(response);
  
          // Redirect user to PayPal payment page response.data.forwardLink;
          window.location.href = response.data.forwardLink;
      } catch (error) {
          console.log(error);
          alert("Payment initiation failed");
      }
  };
  

    return (
        <div className="container py-5">
            <h2 className="text-center mb-4">Meet Our Expert Dietitians</h2>

            {all.length > 0 ? (
                <div className="row">
                    {all.map((d, index) => (
                        <div key={index} className="col-md-4 mb-4">
                            <div className="card shadow-sm h-100">
                                <div className="card-body text-center">
                                    <h3 className="card-title">Dr. {d.username}</h3>
                                    <p className="card-text"><strong>Specialization:</strong> {d.specialization}</p>
                                    <p className="card-text"><strong>Experience:</strong> {d.experience} years</p>
                                    <button className="btn btn-primary" onClick={() => handlePayment(d._id, 50)}>
                                        PAY NOW
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-center">No data found</p>
            )}
        </div>
    );
};

export default ConsultPage;
