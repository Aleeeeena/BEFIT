import React, { useEffect, useState } from 'react'
import { getallsubscribedusersAPI } from '../services/allapi'
import { Button, Modal } from 'react-bootstrap'



function Subscribedusers() {

const[allsubs,setallsubs]=useState([])

useEffect(() => {
    getallsubscribers()
}, [])


const handleClose = () => {
    setShow(false);
    setSelectedUser(null);
  };

  const handleShow = (user) => {
    setSelectedUser(user);
    setShow(true);
  };
const [show, setShow] = useState(false);
   const[selectedUser, setSelectedUser] = useState()

  const getallsubscribers=async()=>{
    try {

        const result=await getallsubscribedusersAPI()
        if (result.status==200) {
           setallsubs(result.data)
            
            
        }
        
    } catch (error) {
        console.log(error);
        
        
    }
  }





  return (
    <>

<div className="container mt-4">
        <h2>Subscribed Users</h2>

       
<div className="table-responsive">
        <table className="table table-bordered mt-3">
          <thead className="bg-primary text-white">
            <tr>
              <th>Name</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
          



           { 
            allsubs.length>0?

            allsubs.map(e=>(


                 <tr>
                    <td>{e.userId.username}</td>
                    <td>
                      <button onClick={()=>handleShow(e)}   className="btn btn-info me-2">View Details</button>
        
                    
        
        
                    </td>
                  </tr>

            ))
            
       :
          <p>no subscribed users</p>
}
         
          </tbody>
        </table>
      </div>
    </div>


    
    <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>All Details of Subscribed user</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        {selectedUser ? (
            <>
              <div><strong>Username:</strong> {selectedUser.userId.username}</div>
              <div><strong>Email:</strong> {selectedUser.userId.email || "N/A"}</div>
              <div><strong>subscribed dietitian:</strong> {selectedUser.subscriptions.map(r=>(
              r.dietitianId.username

              
              ))}</div>

              <div><strong>amount paid:</strong> {selectedUser.subscriptions.map(r=>(
              r.amountPaid

              
              ))}</div>
               <div><strong>start date:</strong> {selectedUser.subscriptions.map(r=>(
              r.startDate

              
              ))}</div>

<div><strong>End date:</strong> {selectedUser.subscriptions.map(r=>(
              r.expiryDate

              
              ))}</div>
      
           
            </>
          ) : (
            <p>Loading user data...</p>
          )}
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

export default Subscribedusers