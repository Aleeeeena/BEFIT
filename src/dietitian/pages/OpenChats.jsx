import React, { useEffect, useState } from "react";
import { FaComments } from "react-icons/fa";
import { Link } from "react-router-dom";
import { getallclientAPI } from "../../services/allapi";




function OpenChats() {

   const [chatclient, setchatclient] = useState([]);

      useEffect(() => {
        handleclient();
      }, []);

    const handleclient = async () => {
      const id = sessionStorage.getItem("userid");
  
      try {
        const result = await getallclientAPI(id);
        console.log(result.data);
        setchatclient(result.data);
      } catch (error) {
        console.log(error);
      }
    };


    const handleclick=(id)=>{
      sessionStorage.setItem("myclientid",id)
    }
  return (
    <div className="container mt-4">
      <h2 className="mb-4">💬 Chat with Clients</h2>

      <ul className="list-group">
        {/* Sample client chat list */}
       {
       chatclient.length>0?
     ( 
      chatclient.map(r=>(


        <li className="list-group-item d-flex justify-content-between align-items-center">
       {r.userId.username}
        <Link to='/openchat/:id'><button onClick={()=>handleclick(r.userId._id)} className="btn btn-primary btn-sm">
          <FaComments className="me-1" /> Open Chat
        </button></Link>
      </li>

      ))
     ):(<p>no clients</p>)
        
      }

      
      </ul>
    </div>
  );
}

export default OpenChats;
