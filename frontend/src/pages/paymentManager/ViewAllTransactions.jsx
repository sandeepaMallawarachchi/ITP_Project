import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';


function ViewAllTransactions() {

  let { customerID } = useParams();
  const [paymentDetails, setPaymentDetails] = useState([]);

  useEffect(() => {
    getPaymentDetails();
  })

  const getPaymentDetails = () => {
    axios.get(`http://localhost:8070/paymentdetails/${customerID}`).then(response => {
      setPaymentDetails(response.data);
    })
  }



  return (
    <div>
      {paymentDetails.length > 0 ? (
        <div>
          <h1>Payment Details for Customer : {customerID}</h1>

          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Total Amount</th>
                <th>Pay Amount</th>
                <th>Credit Amount</th>
              </tr>
            </thead>
            <tbody>
              {paymentDetails.map((payment) => (
                <tr key={payment._id}>
                  <td>{payment.dateandtime}</td>
                  <td>{payment.totalamount}</td>
                  <td>{payment.payamount}</td>
                  <td>{payment.creditamount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : null}
    </div>
  )
}

export default ViewAllTransactions