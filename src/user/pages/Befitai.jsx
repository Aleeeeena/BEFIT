import React, { useState } from "react";

const Befitai = () => {
  const [userInput, setUserInput] = useState("");
  const [response, setResponse] = useState("Waiting for input...");

  const getResponse = async () => {
    setResponse("Thinking...");

    const apiKey = process.env.REACT_APP_HUG;
    console.log("API Key from env:", process.env.REACT_APP_HUG);

    const model = "HuggingFaceH4/zephyr-7b-beta";

    const data = {
      inputs: userInput,
      parameters: { max_new_tokens: 100 },
    };

    try {
      const res = await fetch(`https://api-inference.huggingface.co/models/${model}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await res.json();
      setResponse(result[0]?.generated_text || "I couldn't find an answer.");
    } catch (error) {
      console.error(error);
      setResponse("Error fetching response.");
    }
  };

  return (
    <div className="flex container mt-5 flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="bg-white container shadow-lg rounded-2xl p-6 max-w-md w-full">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-4">🤖 Befit AI - Your Fitness Assistant</h2>
        <input
          type="text"
          className="form-control container"
          placeholder="Ask me anything about nutrition."
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
        />
       <div className="d-flex justify-content-center mt-3"> <button 
          className="btn btn-success"
          onClick={getResponse}
        >
          Send
        </button></div>
        <p className="mt-4 text-center text-gray-700 bg-gray-200 p-3 rounded-lg">{response}</p>
      </div>
    </div>
  );
};

export default Befitai;