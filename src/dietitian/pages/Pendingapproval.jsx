import React from 'react';
import { useNavigate } from 'react-router-dom';

function Pendingapproval() {
  const navigate = useNavigate();

  return (
    <div className="d-flex flex-column align-items-center justify-content-center" 
         style={{ minHeight: '100vh', backgroundColor: '#f8f9fa' }}>

      <div className="bg-white shadow-lg p-5 text-center rounded" style={{ maxWidth: '500px' }}>
        <h2 className="text-danger">⏳ Approval Pending</h2>
        <p className="mt-3">
          Thank you for registering as a dietitian! Our team is reviewing your application.
          Please allow 3-5 business days for approval. We will notify you via email once your 
          account is activated.
        </p>
        <button className="btn btn-dark mt-3" onClick={() => navigate('/')}>
          Go to Home
        </button>
      </div>

    </div>
  );
}

export default Pendingapproval;
