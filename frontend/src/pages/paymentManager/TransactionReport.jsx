import React from 'react'
import { useParams } from 'react-router-dom'
import { useLocation } from 'react-router-dom';

function TransactionReport() {

  const location = useLocation();
  const {customerID , payamount , totalcreditamount , payTimeDateFormate} = location.state;

  const payDate = new Date(payTimeDateFormate) // parse the payTime String object to Date object

  const formattedDate = payDate.toLocaleDateString();
  const formattedTime = payDate.toLocaleTimeString();

  return (
    <div style={{marginLeft:450 , marginTop:200 , boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)', height:350 , width:400}}>
        <h1 style={{color:'red'}}>Transaction Report</h1>
        <br></br>
        <h2 style={{marginLeft:30}}>Customer ID : {customerID}</h2>
        <hr style={{ width: '50%', marginLeft: 50 }} /> {/* Line under Customer ID */}
        <h2>You Pay : RS.{payamount}</h2>
        <h2>You have to pay : RS.{totalcreditamount}</h2>
        <h2>Date : {formattedDate}</h2>
        <h2>Time : {formattedTime}</h2>
    </div>
  )
}

export default TransactionReport