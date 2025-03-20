import React, { useEffect, useState } from "react";
import { getreportAPI } from "../../services/allapi";

function ClientDetails() {
  const [report, setReport] = useState(null); // Store a single client's data

  useEffect(() => {
    fetchDetails();
  }, []);

  const fetchDetails = async () => {
    const dietid = sessionStorage.getItem("userid");
    const clientid = sessionStorage.getItem("client");

    try {
      const result = await getreportAPI(dietid, clientid);
      console.log("Fetched Report:", result.data);
      setReport(result.data.length > 0 ? result.data[0] : null); // Assuming one result per client
    } catch (error) {
      console.error("Error fetching client details:", error);
    }
  };

  if (!report) {
    return <h4 className="text-center mt-4">No client report found.</h4>;
  }

  return (
    <div className="container mt-4">
      <h2 className="mb-4">👤 Client Details</h2>

      <div className="card p-4">
        <h4>Client ID: {report.clientId}</h4>
        <p><strong>Age:</strong> {report.details.age}</p>
        <p><strong>Purpose:</strong> {report.details.purpose}</p>
        <p><strong>Weight:</strong> {report.details.weight} kg</p>
        <p><strong>Height:</strong> {report.details.height} cm</p>

        <h5 className="mt-3">🍽 Today's Meal Intake</h5>
        <ul>
          <li><strong>Early Morning:</strong> {report.details.todayMealIntake.earlyMorning || "N/A"}</li>
          <li><strong>Morning:</strong> {report.details.todayMealIntake.morning || "N/A"}</li>
          <li><strong>Lunch:</strong> {report.details.todayMealIntake.lunch || "N/A"}</li>
          <li><strong>Evening:</strong> {report.details.todayMealIntake.evening || "N/A"}</li>
          <li><strong>Night:</strong> {report.details.todayMealIntake.night || "N/A"}</li>
        </ul>

        <h5 className="mt-3">💧 Water Intake</h5>
        <p>{report.details.todayMealIntake.waterIntake}L</p>

        <h5 className="mt-3">📜 Treatment Plan</h5>
        <ul>
          <li><strong>Early Morning:</strong> {report.treatmentPlan.details.earlyMorning || "N/A"}</li>
          <li><strong>Morning:</strong> {report.treatmentPlan.details.morning || "N/A"}</li>
          <li><strong>Lunch:</strong> {report.treatmentPlan.details.lunch || "N/A"}</li>
          <li><strong>Evening:</strong> {report.treatmentPlan.details.evening || "N/A"}</li>
          <li><strong>Night:</strong> {report.treatmentPlan.details.night || "N/A"}</li>
        </ul>

      
      </div>

      <button className="btn btn-secondary mt-3" onClick={() => window.history.back()}>
        Back
      </button>
    </div>
  );
}

export default ClientDetails;
