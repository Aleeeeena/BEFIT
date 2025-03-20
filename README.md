# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript and enable type-aware lint rules. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.


exports.getallunapproveddietitianscontroller=async(req,res)=>{


    console.log("inside unapproveddietitian admin controller");


    try {
        
        const allunapproveddietitians=await users.find({role:"dietitian",
            isApproved:false})

        res.status(200).json(allunapproveddietitians)
    } catch (error) {

        res.status(401).json(error)
    }
    


    


}



{
    "userId": "67c6aa5e75c60bf51fa31a9f",
    "dietitianIds": ["67c575698a469877ff37f47b", "67c562bd9f1f7378d09617ec"],
    "subscribers": [
        {
            "dietitianId": "67c575698a469877ff37f47b",
            "userIds": ["67c6aa5e75c60bf51fa31a9f"]
        },
        {
            "dietitianId": "67c562bd9f1f7378d09617ec",
            "userIds": ["67c6aa5e75c60bf51fa31a9f"]
        }
    ],
    "totalamountearnedbydietitian": [
        { "dietitianId": "67c575698a469877ff37f47b", "amount": 100 },
        { "dietitianId": "67c562bd9f1f7378d09617ec", "amount": 80 }
    ],
    "montlyamountEarnedByEachDietitian": [
        { "dietitianId": "67c575698a469877ff37f47b", "amount": 50 },
        { "dietitianId": "67c562bd9f1f7378d09617ec", "amount": 40 }
    ],
    "startDate": "2025-03-01T00:00:00.000Z",
    "expiryDate": "2025-04-01T00:00:00.000Z",
    "paymentStatusofdietitianbyadmin": [
        { "dietitianId": "67c575698a469877ff37f47b", "status": "pending" },
        { "dietitianId": "67c562bd9f1f7378d09617ec", "status": "completed" }
    ],
    "isActive": true,
    "reports": [
        { "dietitianId": "67c575698a469877ff37f47b", "count": 2 },
        { "dietitianId": "67c562bd9f1f7378d09617ec", "count": 1 }
    ],
    "upidofdietitian": [
        { "dietitianId": "67c575698a469877ff37f47b", "upiId": "dietitian_smith@upi" },
        { "dietitianId": "67c562bd9f1f7378d09617ec", "upiId": "dietitian_emily@upi" }
    ]
}















import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getalldietitiansforuserAPI } from "../../services/allapi";




function ConsultPage() {





  const[all,setall]=useState([])

  useEffect(() => {
    getalldiet()
   
  }, [])
  


  const getalldiet=async()=>{


    try {

      const result=await getalldietitiansforuserAPI()
      if (result.status==200) {
        setall(result.data)

        
      }
      else{
        alert("no dietitians activenow")
      }
  
      

      
      
    } catch (error) {

      console.log(error);
      
      
    }
  }
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
                  <Link to="/user-subscribe" className="btn btn-primary">
                    CONSULT NOW
                  </Link>
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
















///









 const handlePayment = async (dietitianId, amount) => {
        try {

            const userId=sessionStorage.getItem("userid")
            sessionStorage.setItem("dietitianId", dietitianId);
            const response = await axios.post("http://localhost:3000/create", {
                userId,
                dietitianId,
                amount
            });
            console.log(response);
            
            

            window.location.href = `${response.data.forwardLink}&userId=${userId}&dietitianId=${dietitianId}`;
        } catch (error) {
            console.log(error);
            alert("Payment initiation failed");
        }
    };






    without save
    exports.successPayment = async (req, res) => {
    try {
        const { PayerID, paymentId } = req.query;

        console.log("Received Payment Details:", req.query);  // Debugging

        const execute_payment_json = { payer_id: PayerID };

        paypal.payment.execute(paymentId, execute_payment_json, (error, payment) => {
            if (error) {
                console.log(error);
                return res.status(500).json({ error: "Payment execution failed" });
            }

            res.json({ message: "Payment successful", payment });
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Something went wrong" });
    }
};



with save

exports.successPayment = async (req, res) => {
    try {
        const { PayerID, paymentId } = req.query;

        console.log("Received Payment Details:", req.query);  // Debugging

        if (!PayerID || !paymentId) {
            return res.status(400).json({ error: "Missing PayerID or paymentId" });
        }

        const execute_payment_json = { payer_id: PayerID };

        paypal.payment.execute(paymentId, execute_payment_json, async (error, payment) => {
            if (error) {
                console.log("PayPal Error:", error);
                return res.status(500).json({ error: "Payment execution failed" });
            }

            try {
                console.log("Payment Response:", payment); // Debugging

                const amountPaid = 50; // Hardcoded transaction amount

                const newsubscription = new subscription({
                    userId: PayerID, // Assigning userId as PayerID
                    dietitianIds: [paymentId], // Assuming paymentId corresponds to dietitian
                    subscribers: [{ dietitianId: paymentId, userIds: [PayerID] }],
                    totalamountearnedbydietitian: [{ dietitianId: paymentId, amount: amountPaid }],
                    montlyamountEarnedByEachDietitian: [{ dietitianId: paymentId, amount: amountPaid }],
                    paymentStatusofdietitianbyadmin: [{ dietitianId: paymentId, status: "pending" }],
                    reports: [{ dietitianId: paymentId, count: 0 }],
                    upidofdietitian: [{ dietitianId: paymentId, upiId: "sample-upi-id" }] // Update with actual UPI ID if available
                });

                await newsubscription.save();
                console.log("Subscription saved successfully!");

                res.json({ message: "Payment successful", payment });

            } catch (dbError) {
                console.error("Error saving subscription:", dbError);
                res.status(500).json({ error: "Subscription saving failed" });
            }
        });

    } catch (error) {
        console.log("Unexpected Error:", error);
        res.status(500).json({ error: "Something went wrong" });
    }
};





///working


const paypal=require('../config/paypalConfig');
const DietitianSubscription = require('../models/dietitiansubscriptionmodel');
const subscription = require('../models/subscriptionmodel');
const UserSubscription = require('../models/usersubscriptionmodel');


exports.createPayment = async (req, res) => {
    const { userId, dietitianId, amount } = req.body;

    const create_payment_json = {
        intent: "sale",
        payer: { payment_method: "paypal" },
        redirect_urls: {
            return_url: "http://localhost:3000/success",
            cancel_url: "http://localhost:3000/cancel"
        },
        transactions: [{
            amount: { currency: "USD", total: amount },
            description: `Subscription payment for dietitian ${dietitianId}`
        }]
    };

    paypal.payment.create(create_payment_json, (error, payment) => {
        if (error) {
            console.log(error);
            res.status(500).json({ error: "Payment creation failed" ,error});
        } else {
            for (let link of payment.links) {
                if (link.rel === "approval_url") {
                    res.json({ forwardLink: link.href });
                }
            }
        }
    });
};

exports.successPayment = async (req, res) => {
    try {
        const { PayerID, paymentId } = req.query;

        if (!PayerID || !paymentId) {
            return res.status(400).json({ error: "Missing required parameters" });
        }

        const execute_payment_json = { payer_id: PayerID };

        paypal.payment.execute(paymentId, execute_payment_json, async (error, payment) => {
            if (error) {
                console.log("PayPal Error:", error);
                return res.status(500).json({ error: "Payment execution failed" });
            }

            try {
                console.log("Payment Response:", payment);

                // Extract userId & dietitianId from PayPal's `custom` field
                const { userId, dietitianId } = JSON.parse(payment.transactions[0].custom);

                if (!dietitianId) {
                    return res.status(400).json({ error: "Dietitian ID not found in transaction data" });
                }

                // Store subscription details in database
                const newSubscription = new subscription({
                    userId,
                    dietitianIds: [dietitianId],
                    subscribers: [{ dietitianId, userIds: [userId] }],
                    totalamountearnedbydietitian: [{ dietitianId, amount: 50 }],
                    montlyamountEarnedByEachDietitian: [{ dietitianId, amount: 50 }],
                    paymentStatusofdietitianbyadmin: [{ dietitianId, status: "pending" }],
                    reports: [{ dietitianId, count: 0 }],
                    upidofdietitian: [{ dietitianId, upiId: "sample-upi-id" }],
                });

                await newSubscription.save();
                console.log("Subscription saved successfully!");

                res.json({ message: "Payment successful", payment });

            } catch (dbError) {
                console.error("Error saving subscription:", dbError);
                res.status(500).json({ error: "Subscription saving failed" });
            }
        });

    } catch (error) {
        console.log("Unexpected Error:", error);
        res.status(500).json({ error: "Something went wrong" });
    }
};



exports.cancelPayment = (req, res) => {
    res.json({ message: "Payment cancelled" });
};
















totoa;dietitian.jsx

import React, { useContext, useEffect, useState } from 'react'
import { Button, Modal } from 'react-bootstrap';
import { allunapproveddietitians, approvedietitianAPI, getallactive, getallsubscribersofthedietitianAPI, pendingtodoneAPI, rejectdietitianAPI } from '../services/allapi';
import ContextAPI, { AlldietitiansContextAPI } from '../context/Contextapi';







function Totaldietian() {

  const [paymentStatusMap, setPaymentStatusMap] = useState({});

  const [paymentStatus, setPaymentStatus] = useState("");
      const[selectedUser, setSelectedUser] = useState({});
    const [show, setShow] = useState(false);
    const [sub, setsub] = useState([]);


    const[alldietitians,setalldietitians]=useState()

    const[approve,setapprove]=useState(null)
    const[reject,setreject]=useState()


    const[allactive,setallactive]=useState([])
    
   

      const [showw, setShoww] = useState(false);

      const{setalldietitiansresponse}=useContext(AlldietitiansContextAPI)
    
      const handlelose = () => setShoww(false);
      const handleSshow = (user) =>{
        
        
        
        setShoww(true);
        setSelectedUser(user);
        handletotalsubscription(user)
      
      }


      useEffect(() => {
        
        handleUnapprovedDietitians()
        getactivedietitinas()
      }, [approve,reject])
      

      const handleClose = () => {
        setShow(false);
        setSelectedUser({});
      };
    
      const handleShow = (user) => {
        setSelectedUser(user);
        setShow(true);
        handletotalsubscription(user)
        



      };



      const handleSave = async () => {
        if (paymentStatusMap[selectedUser._id] === "done") {
          try {
            const result = await pendingtodoneAPI(selectedUser._id);
            if (result.status === 200) {
              console.log("Payment updated successfully:", result);
            }
          } catch (error) {
            console.log(error);
          }
        }
        handlelose();
      };
      


      const handletotalsubscription=async(user)=>

        {

          try {
           console.log(selectedUser);
           
            const result=await getallsubscribersofthedietitianAPI(user._id)
            console.log(result.data);
           setsub(result.data)
            
            
          

            
          } catch (error) {
            
          }
          
        }

      const handleUnapprovedDietitians = async () => {
        try {
            const alldiet = await allunapproveddietitians(); // Fetch data
            setalldietitians(alldiet.data.dietitians); // Update state
            
           // Log the latest data
            console.log("Updated dietitians:", alldiet.data.dietitians);
        } catch (error) {
            console.error("Error fetching unapproved dietitians:", error);
        }
    };
    

    const handleapprove = (id) => {
      const { username, email, password, role, certificate, specialization, isApproved, createdAt, updatedAt } = alldietitians;
  
      approvedietitianAPI(id, { username, email, password, role, certificate, specialization, isApproved, createdAt, updatedAt })
          .then((result) => {
              console.log(result.data); 
              
              if (result.status === 200) {
                  setapprove(result.data);
              }
          })
          .catch((error) => {
              console.error("Error approving dietitian:", error);
          });
  };
  

const handlereject=async(id)=>{

  try {


    const result=await rejectdietitianAPI(id)
   
      if (result.status==200) {
        alert("approval rejected succefully")
        setreject(result.data)

        
      }
    
    
  } catch (error) {
    console.log(error);
    
    
  }

}


//active dietitians


const getactivedietitinas=async()=>{



  try {

    const result=await getallactive()
    console.log(result.data);
    setallactive(result.data)
    console.log(allactive);
    setalldietitiansresponse(result.data)
    
    
    
  } catch (error) {
    console.log(error);
    
    
  }
}


const handlePaymentStatusChange = (userId, status) => {
  setPaymentStatusMap((prev) => ({ ...prev, [userId]: status }));
};


         
        
  return (
  <>


<div className="p-6">
      {/* Pending Requests Section */}
      <h2 className="text-2xl font-semibold mb-4">Pending Requests</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 shadow-md rounded-lg">
          <thead>
            <tr className="bg-gray-200">
              <th className="py-2 px-4 border">Name</th>
              <th className="py-2 px-4 border">Certificate</th>
              <th className="py-2 px-4 border">Action</th>
            </tr>
          </thead>
          <tbody>
            
             {alldietitians?.map((d) => (
              <tr className="text-center" key={d._id}>
                <td className="py-2 px-4 border">{d.username}</td>
                <td className="py-2 px-4 border">
                <a
  href={`http://localhost:3000/${d.certificate}`} 
  target="_blank" 
  rel="noopener noreferrer"
  className="text-blue-500 underline"
>
  View Certificate
</a>

                   
                </td>
                <td className="py-2 px-4 border">
                  <button

                  onClick={()=>handleapprove(d._id)}
                    className="bg-success text-white px-4 py-1 rounded hover:bg-green-600 transition"
                  >
                    Approve
                  </button>
                  <button
                    className="bg-danger text-white px-4 py-1 rounded hover:bg-red-600 ml-5 transition"
                    onClick={()=>handlereject(d._id)}
                  >
                    Reject
                  </button>
                </td>
              </tr>
            ))}
            
             
          
          </tbody>
        </table>
      </div>
  

      {/* Active Dietitians Section */}
      <h2 className="text-2xl font-semibold mt-6 mb-4">Active Dietitians</h2>


      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 shadow-md rounded-lg">
          <thead>
           

            <tr className="bg-gray-200">
              <th className="py-2 px-4 border">Name</th>
              <th className="py-2 px-4 border">Details</th>
              <th className="py-2 px-4 border">specialization</th>

             
             
              <th className="py-2 px-4 border">Action</th>
              <th>Subscription details</th>
            </tr>

         
          </thead>
          <tbody>
  {allactive.length > 0 ? (
    allactive.map((d, index) => (
      <tr key={index} className="text-center">
        <td className="py-2 px-4 border">{d.username}</td>

        <td className="py-2 px-4 border">
          <button
            onClick={() => handleShow(d)}
            className="bg-success py-2 px-4 text-white  rounded"
          >
            View details
          </button>
        </td>

        <td className="py-2 px-4 border">
          {d.specialization}
        </td>

        <td className="py-2 px-4 border">
          <button
           // onClick={() => handleRemove(d.id)}
            className="bg-danger text-white px-4 py-1 rounded "
          >
            Remove
          </button>
        </td>

        <td className="py-2 px-4 border">
          <button
            onClick={() => handleSshow(d)}
            className="bg-info text-white px-4 py-1 rounded"
          >
            See details
          </button>
        </td>
      </tr>
    ))
  ) : (
    <tr>
      <td colSpan="5" className="text-center py-4">
        No data to show
      </td>
    </tr>
  )}
</tbody>

        </table>
      </div>
    
    </div>



    <Modal
        show={showw}
        onHide={handlelose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Name</Modal.Title>
        </Modal.Header>
        <Modal.Body>
         <div>TotalEarnings: {sub.length > 0 ? sub[0].monthlyEarnings: 0}</div>
         <label>
  <input  
    onChange={(e) => handlePaymentStatusChange(selectedUser._id, e.target.value)} 
    type="radio" 
    name="paymentStatus" 
    value="pending" 
    checked={paymentStatusMap[selectedUser._id] === "pending"}
  /> Pending
</label>
<label className="ml-4">
  <input  
    onChange={(e) => handlePaymentStatusChange(selectedUser._id, e.target.value)}  
    type="radio" 
    name="paymentStatus" 
    value="done" 
    checked={paymentStatusMap[selectedUser._id] === "done"}
  /> Payment Done
</label>


         
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handlelose}>
            Close
          </Button>
          <Button onClick={handleSave} variant="primary">SAVE</Button>
        </Modal.Footer>
      </Modal>
  
    
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Name</Modal.Title>
        </Modal.Header>
        <Modal.Body>
         <div>username:{selectedUser.username}</div>
         <div>email:{selectedUser.email}</div>
         
         <div>subscribers: {sub.length > 0 ? sub[0].subscribers.length : 0}</div>

         <div>reports: {sub.length > 0 ? sub[0].reports: 0}</div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button  onClick={handleClose} variant="primary">Understood</Button>
        </Modal.Footer>
      </Modal>


      
  
  
  
  </>
  )
}

export default Totaldietian






import React, { useEffect, useState } from "react";
import { getallclientAPI, postplanAPI } from "../../services/allapi";
import { Link } from "react-router-dom";


function ViewClients() {
  useEffect(() => {
    handleclient();
  }, []);

  const [client, setclient] = useState([]);

  const [data, setData] = useState({
    earlyMorning: "",
    morning: "",
    lunch: "",
    evening: "",
    night: "",
    waterIntake: "",
  });

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSave = async (id) => {
    const dietitianid = sessionStorage.getItem("userid");
    const senderid = sessionStorage.getItem("userid");
    const clientid = id._id;  // Ensure clientId is a string, not an object
    const senderType = "dietitianmodel";

    const reqBody = {
        dietitianId: dietitianid,
        clientId: clientid,   // Ensure it's a string
        senderId: senderid,
        senderType: senderType, 
        treatmentDetails: { ...data }, 
        chatMessage: ""
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


  const handleclient = async () => {
    const id = sessionStorage.getItem("userid");

    try {
      const result = await getallclientAPI(id);
      console.log(result.data);
      setclient(result.data);
    } catch (error) {
      console.log(error);
    }
  };

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
                
                {["earlyMorning", "morning", "lunch", "evening", "night", "waterIntake"].map((meal, idx) => (
                  <td key={idx}>
                    <input
                      type={meal === "waterIntake" ? "number" : "text"}
                      className="form-control text-center"
                      placeholder={meal === "waterIntake" ? "Liters" : "Enter meal"}
                      name={meal}
                      value={data[meal]}
                      onChange={handleChange}
                    />
                  </td>
                ))}
                <td>
                  <div className="d-flex justify-content-center gap-2">
                    <button className="btn btn-success btn-sm" onClick={()=>handleSave(i.userId)}>
                      Save
                    </button>
                    <Link to="/view/client/progress">
                      <button className="btn btn-primary btn-sm">View</button>
                    </Link>
                    <button className="btn btn-danger btn-sm">Remove</button>
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