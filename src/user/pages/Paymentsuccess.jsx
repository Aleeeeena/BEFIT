import { CheckCircle } from "lucide-react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Paymentsuccess = () => {
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      navigate("/userdashboard"); 
    }, 3000);
  }, [navigate]);

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-lg text-center max-w-md">
        <CheckCircle size={80} className="text-green-500 mx-auto" />
        <h2 className="text-2xl font-bold text-success mt-4">Payment Successful!</h2>
        <p className="text-gray-600 mt-2">Thank you for your purchase. Your transaction was successful.</p>
        <p className="text-gray-500 mt-1">Redirecting to your dashboard...</p>
        <button
          onClick={() => navigate("/mydietitians")}
          className="mt-6 px-6 py-2 bg-success-500 text-white rounded-lg hover:bg-green-600 transition"
        >
          Go to Dashboard
        </button>
      </div>
    </div>
  );
};

export default Paymentsuccess;
