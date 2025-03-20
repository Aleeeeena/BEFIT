import React, { useState } from "react";

function ConsultForm() {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    need: "",
    mealIntake: "",
    waterIntake: "",
  });

  const [recommendation, setRecommendation] = useState(""); // Stores doctor's recommendation
  const [submitted, setSubmitted] = useState(false); // Track if data is submitted

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("User Consultation Data:", formData);
    setSubmitted(true);
    alert("Your consultation request has been sent! A dietitian will respond soon.");

  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center mb-4">Consult a Dietitian</h2>

        {/* Consultation Form */}
        {!submitted ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block font-medium">Name:</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full p-2 border rounded"
              />
            </div>

            <div>
              <label className="block font-medium">Age:</label>
              <input
                type="number"
                name="age"
                value={formData.age}
                onChange={handleChange}
                required
                className="w-full p-2 border rounded"
              />
            </div>

            <div>
              <label className="block font-medium">Your Need (e.g., Weight Loss, Muscle Gain):</label>
              <input
                type="text"
                name="need"
                value={formData.need}
                onChange={handleChange}
                required
                className="w-full p-2 border rounded"
              />
            </div>

            <div>
              <label className="block font-medium">Today's Meal Intake:</label>
              <input
                type="text"
                name="mealIntake"
                value={formData.mealIntake}
                onChange={handleChange}
                required
                className="w-full p-2 border rounded"
              />
            </div>

            <div>
              <label className="block font-medium">Today's Water Intake (in liters):</label>
              <input
                type="number"
                step="0.1"
                name="waterIntake"
                value={formData.waterIntake}
                onChange={handleChange}
                required
                className="w-full p-2 border rounded"
              />
            </div>

            <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
              Send
            </button>
          </form>
        ) : (
          <div className="text-center text-green-600 font-semibold">
            ✅ Consultation request sent! Awaiting doctor’s response.
          </div>
        )}

        {/* Doctor's Recommendation Section */}
        {submitted && (
          <div className="mt-6 p-4 bg-gray-200 rounded-lg">
            <h3 className="text-lg font-semibold">Doctor's Recommendation:</h3>
            {recommendation ? (
              <p className="text-gray-700 mt-2">{recommendation}</p>
            ) : (
              <p className="text-gray-500 mt-2">No recommendation yet.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default ConsultForm;
