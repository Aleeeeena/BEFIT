import React, { useEffect, useState } from "react";
import { getearningdetails } from "../../services/allapi";

function ViewEarnings() {


  const[earnings,setearnings]=useState([])


  useEffect(() => {

    fetchdetails()
   
  }, [])
  

  const fetchdetails=async()=>{

    const id=sessionStorage.getItem("userid")

    try {


      const result=await getearningdetails(id)
      console.log(result.data);
      setearnings(result.data)
      
      
    } catch (error) {

      console.log(error);
      
      
    }
  }
  return (
    <div className="container mt-4">
    <h2 className="mb-4">💰 Earnings Overview</h2>

    {earnings.length > 0 ? (
      <table className="table table-striped table-bordered">
        <thead className="table-dark">
          <tr>
            <th>#</th>
            <th>Subscriber ID</th>
            <th>Subscription Type</th>
            <th>Paid Amount</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {earnings.map((r, index) =>
            r.subscribers.map((w, subIndex) => (
              <tr key={`${index}-${subIndex}`}>
                <td>{index + 1}</td>
                <td>{w.userId}</td>
                <td>Monthly</td>
                <td>{w.amountPaid}</td>
                <td>{new Date(w.startDate).toLocaleDateString()}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    ) : (
      <p>No data to show</p>
    )}
  </div>
);
};

export default ViewEarnings;