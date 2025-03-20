import React, { useContext, useEffect, useState } from 'react'
import { Button, Modal } from 'react-bootstrap';
import { allunapproveddietitians, approvedietitianAPI, getallactive, getallsubscribersofthedietitianAPI, pendingtodoneAPI, rejectdietitianAPI, removedietitianAPI } from '../services/allapi';
import ContextAPI, { AlldietitiansContextAPI } from '../context/Contextapi';







function Totaldietian() {
   const[status,setstatus]=useState([])
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
           setstatus(result.data[0].paymentStatus)
            
          

            
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


   const handleremove=async(id)=>{
    try {


      const result=await removedietitianAPI(id)
     console.log(result);
     
     
      
    } catch (error) {
      console.log(error);
      
      
    }
    getactivedietitinas()

   }      
        
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
  href={`https://befitbackend.onrender.com/${d.certificate}`} 
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
         onClick={()=>handleremove(d._id)}
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
         
         {status.length>0 && (
  <div>
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
  </div>
)}



         
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