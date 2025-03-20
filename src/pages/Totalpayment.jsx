import React, { useEffect } from "react";
import { paymentpage } from "../services/allapi";
import { useState } from "react";


const TotalPayment= () => {



  useEffect(() => {
    pay()
  }, [])
  


const[total,settotal]=useState([])

  const pay=async()=>{
    try {


      const result=await paymentpage()

      settotal(result.data)

      
    } catch (error) {
      console.log(error);
      
      
    }
  }

  const calculateDaysLeft = (expiryDate) => {
    const expiry = new Date(expiryDate); // Convert expiryDate to Date object
    const currentDate = new Date(); // Get current date

    const timeDiff = expiry - currentDate; // Difference in milliseconds
    const daysLeft = Math.ceil(timeDiff / (1000 * 60 * 60 * 24)); // Convert to days

    return daysLeft > 0 ? daysLeft : "Expired"; // Show "Expired" if it's past due
};

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Total Payments</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 shadow-md rounded-lg">
          <thead>
            <tr className="bg-gray-200">
              <th className="py-2 px-4 border">Dietitian id</th>
              <th className="py-2 px-4 border">Subscribers</th>
              <th className="py-2 px-4 border">Amount</th>
              <th className="py-2 px-4 border">Subscription Plan</th>
              <th className="py-2 px-4 border">Days Left</th>
            </tr>
          </thead>
          <tbody>
          {
  total.length > 0 ? (
    total.map((item) =>
      item.subscribers.length > 0 ? (
        item.subscribers.map((subscriber, index) => {
          // Calculate days left
          const daysLeft = calculateDaysLeft(subscriber.expiryDate);

          return (
            <tr className="text-center" key={`${item._id}-${index}`}>
              <td className="py-2 px-4 border">{item._id}</td>
              <td className="py-2 px-4 border">{subscriber.userId}</td> {/* User ID or Name */}
              <td className="py-2 px-4 border">${subscriber.amountPaid}</td>
              <td className="py-2 px-4 border">Monthly</td>
              <td className="py-2 px-4 border">{daysLeft} Days</td>
            </tr>
          );
        })
      ) : (
        <tr className="text-center" key={item._id}>
          <td className="py-2 px-4 border">{item._id}</td>
          <td className="py-2 px-4 border">No Subscribers</td>
          <td className="py-2 px-4 border">-</td>
          <td className="py-2 px-4 border">-</td>
          <td className="py-2 px-4 border">N/A</td>
        </tr>
      )
    )
  ) : (
    <p>No data to show</p>
  )
}


            
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TotalPayment;
