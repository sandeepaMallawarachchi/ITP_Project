import React from 'react';
import {Link} from 'react-router-dom';
import Navigation from './Navigation';

export default function home() {
  return (
    <div style={{marginLeft:400, marginTop:200}}>
      <Navigation/>
        <h1>Select payment type</h1>
        <Link to="/payment/cash"><input type="radio"></input></Link>
        <label>Cash</label><br></br>
        <Link to="/payment/cardpayment"><input type="radio"></input></Link>
        <label>Card payment</label><br></br>
        <Link to="/payment/updatepaymentdetails"><button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">updatePaymentDetails</button></Link><br></br><br></br>
        
        <Link to="/payment/paymentadmin"><button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Payment Admin page</button></Link><br></br><br></br>
        
        <Link to="/payment/deletepaymentdetails"><button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Delete Payment Details</button></Link><br></br><br></br>``
        
        <Link to="/payment/searchbyname"><button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Search by Name</button></Link>
    </div>
  )
}
