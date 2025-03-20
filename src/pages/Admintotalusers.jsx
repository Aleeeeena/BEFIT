import React, { useContext, useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { allusersforadminAPI, deleteuserforadminAPI } from "../services/allapi";
import Subscribedusers from "./Subscribedusers";
import ContextAPI, { AllUsersContextAPI } from "../context/Contextapi";





function Admintotalusers() {
  const [show, setShow] = useState(false);
   const[selectedUser, setSelectedUser] = useState(); // Initialize as null

   const[users,setallusers]=useState()

   const[del,setdel]=useState()

   useEffect(() => {
    handletotalusers()

   }, [])
   

   const{setAllUsersResponse}=useContext(AllUsersContextAPI)

   const handledelete = async (id) => {
    




    try {



      const res=await deleteuserforadminAPI(id)
       console.log(res);

       if (res.status==200) {

        handletotalusers()
        
       }
       
      
      
    } catch (error) {
      console.log(error);
      
      
    }

  };
  


   const handletotalusers=async()=>{

    try {

     
      const allusers=await allusersforadminAPI()
     setallusers(allusers.data)
      console.log(users);
      setAllUsersResponse(allusers.data)

      //setallusersresponse(users)
      
      


      
    } catch (error) {

      console.log(error);
      
      
    }

    
  }

  const handleClose = () => {
    setShow(false);
    setSelectedUser(null);
  };

  const handleShow = (user) => {
    setSelectedUser(user);
    setShow(true);
  };

  //const { allusersresponse } = useContext(allusersresponsecontext);

  //console.log(allusersresponse);

  return (
    <>
      <div className="container mt-4">
        <h2>Total Users</h2>

       

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
           users?.map(user=>(



            <tr>
            <td>{user.username}</td>
            <td>
              <button  onClick={()=>handleShow(user)} className="btn btn-info me-2">View Details</button>

              <button onClick={() => handledelete(user._id)} className="btn btn-danger">Remove user</button>


            </td>
          </tr>

           ))
           
          }
          </tbody>
        </table>
      </div>
    </div>




    <br /><br />


    <Subscribedusers/>

    <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>All Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        {selectedUser ? (
            <>
              <div><strong>Username:</strong> {selectedUser.username}</div>
              <div><strong>Email:</strong> {selectedUser.email || "N/A"}</div>
      
           
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

export default Admintotalusers