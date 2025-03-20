import React, { useState } from "react";


function Report() {
    const [rating, setRating] = useState(0);

  const handleRating = (newRating) => {
    setRating(newRating);
    alert(`You rated the client ${newRating} stars!`);
  };
  return (
    <div className="container mt-4">
      <h2 className="mb-4">👤 Client Details</h2>

      <div className="card p-4">
        <h4>John Doe</h4>
        <p><strong>Age:</strong> 30</p>
        <p><strong>Purpose:</strong> Weight Loss</p>
        <p><strong>Weight:</strong> 80 kg</p>
        <p><strong>Height:</strong> 175 cm</p>

        <h5 className="mt-3">🍽 Todays Meal Intake</h5>
        <ul>
          <li><strong>Early Morning:</strong> Green Tea</li>
          <li><strong>Morning:</strong> Oatmeal & Fruits</li>
          <li><strong>Lunch:</strong> Grilled Chicken Salad</li>
          <li><strong>Evening:</strong> Protein Shake</li>
          <li><strong>Night:</strong> Light Soup</li>
        </ul>

        <h5 className="mt-3">💧 Water Intake</h5>
        <p>**2L / 3L completed**</p>




        <h5 className="mt-3">⭐ Rate the Client</h5>
        <div>
          {[1, 2, 3, 4, 5].map((star) => (
            <span 
              key={star}
              className={`fs-3 ${star <= rating ? "text-warning" : "text-secondary"}`}
              style={{ cursor: "pointer" }}
              onClick={() => handleRating(star)}
            >
              ★
            </span>
          ))}
        </div>
       

        <button className="btn btn-secondary mt-3">Back</button>
      </div>
    </div>
  );
}

export default Report;