import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Navigation from './Navigation';
import AdminNavigation from './AdminNavigation';


function ViewAllTransactions() {

   let {customerID} = useParams();
   const [paymentDetails , setPaymentDetails] = useState([]);

   useEffect(() => {
    getPaymentDetails();
   })
    
   const getPaymentDetails = () => {
      axios.get(`https://hendriks-tea-management-system-backend.vercel.app/paymentdetails/${customerID}`).then(response => {
        setPaymentDetails(response.data);
      })
   }

   

  return (
    <div>
      <AdminNavigation/>
       {paymentDetails.length > 0 ? (
        <div>
        <h1>Payment Details for Customer : {customerID}</h1>
        
        <table style={{ marginTop: "148px", marginLeft:"258px" }} className="tamin-w-full divide-y divide-gray-200ble">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Amount</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Pay Amount</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Credit Amount</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
                            {paymentDetails.map((payment) => (
                                <tr key={payment._id}>
                                    <td className="px-6 py-4 whitespace-nowrap">{new Date(payment.dateandtime).toLocaleDateString()}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{new Date(payment.dateandtime).toLocaleTimeString()}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{payment.totalamount}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{payment.payamount}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{payment.creditamount}</td>
                                </tr>
                            ))}
                        </tbody>
        </table>
        </div>
        ):null}
    </div>
  )
}

export default ViewAllTransactions