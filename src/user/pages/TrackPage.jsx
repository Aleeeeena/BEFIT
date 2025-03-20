import React, { useState } from "react";
import '../components/track.css';

function TrackPage() {
  // State for BMI Calculator
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [bmi, setBmi] = useState(null);
  const [bmiStatus, setBmiStatus] = useState("");

  // Function to calculate BMI
  const calculateBMI = () => {
    if (weight && height) {
      let heightInMeters = height / 100;
      let calculatedBmi = (weight / (heightInMeters * heightInMeters)).toFixed(2);
      setBmi(calculatedBmi);
      if (calculatedBmi < 18.5) setBmiStatus("Underweight");
      else if (calculatedBmi >= 18.5 && calculatedBmi < 24.9) setBmiStatus("Normal Weight");
      else if (calculatedBmi >= 25 && calculatedBmi < 29.9) setBmiStatus("Overweight");
      else setBmiStatus("Obese");
    }
  };

  return (
    <div className="track-container">
      <h2 className="text-center">Track Your Health</h2>

      {/* BMI Calculator */}
      <div className="tracker-section">
        <h3>BMI Calculator</h3>
        <input
          type="number"
          placeholder="Weight (kg)"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
        />
        <input
          type="number"
          placeholder="Height (cm)"
          value={height}
          onChange={(e) => setHeight(e.target.value)}
        />
        <button onClick={calculateBMI}>Calculate BMI</button>
        {bmi && (
          <p>
            Your BMI: <strong>{bmi}</strong> ({bmiStatus})
          </p>
        )}
      </div>


     
    </div>
  );
}

export default TrackPage;
