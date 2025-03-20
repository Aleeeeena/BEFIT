import React, { useEffect, useState } from "react";
import { getallclientAPI, postplanAPI } from "../../services/allapi";
import { Link } from "react-router-dom";

function ViewClients() {
  const [client, setClient] = useState([]);
  const [clientMealData, setClientMealData] = useState({}); // Stores meal data separately for each client

  useEffect(() => {
    handleClient();
  }, []);

  // Function to fetch all clients
  const handleClient = async () => {
    const id = sessionStorage.getItem("userid");
    try {
      const result = await getallclientAPI(id);
      console.log("Fetched Clients:", result.data);
      setClient(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  // Handle input changes for a specific client
  const handleChange = (e, clientId) => {
    setClientMealData((prevData) => ({
      ...prevData,
      [clientId]: {
        ...prevData[clientId],
        [e.target.name]: e.target.value,
      },
    }));
  };

  // Save meal data for a specific client
  const handleSave = async (id) => {
    const dietitianId = sessionStorage.getItem("userid");
    const senderId = sessionStorage.getItem("userid");
    const clientId = id._id;
    const senderType = "dietitianmodel";

    const clientData = clientMealData[clientId] || {}; // Get stored meal data for this client

    const reqBody = {
      dietitianId,
      clientId,
      senderId,
      senderType,
      treatmentDetails: clientData,
      chatMessage: "",
    };

    console.log("Sending Data:", reqBody);

    try {
      const response = await postplanAPI(reqBody);
      console.log("Response:", response);
      if (response.status === 201) {
        alert("Treatment plan updated successfully!");
      }
    } catch (error) {
      console.error("Error in API Call:", error);
    }
  };


  const handleview=(id)=>{
    sessionStorage.setItem("client",id)
  }
  return (
    <div className="container mt-4">
      <h2 className="mb-4 text-center">👨‍⚕️ My Clients</h2>

      {client.length > 0 ? (
        <table className="table table-striped table-bordered text-center">
          <thead className="table-dark">
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Early Morning</th>
              <th>Morning</th>
              <th>Lunch</th>
              <th>Evening</th>
              <th>Night</th>
              <th>Water Intake (L)</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {client.map((i, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{i.userId.username}</td>

                {/* Meal Input Fields */}
                {["earlyMorning", "morning", "lunch", "evening", "night", "waterIntake"].map((meal, idx) => (
                  <td key={idx}>
                    <input
                      type={meal === "waterIntake" ? "number" : "text"}
                      className="form-control text-center"
                      placeholder={meal === "waterIntake" ? "Liters" : "Enter meal"}
                      name={meal}
                      value={clientMealData[i.userId._id]?.[meal] || ""}
                      onChange={(e) => handleChange(e, i.userId._id)}
                    />
                  </td>
                ))}

                {/* Action Buttons */}
                <td>
                  <div className="d-flex justify-content-center gap-2">
                    <button className="btn btn-success btn-sm" onClick={() => handleSave(i.userId)}>
                      Save
                    </button>
                    <Link to="/view/client/progress">
                      <button onClick={()=>handleview(i.userId._id)} className="btn btn-primary btn-sm">View</button>
                    </Link>
                  
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-center text-muted">No clients found.</p>
      )}
    </div>
  );
}

export default ViewClients;
