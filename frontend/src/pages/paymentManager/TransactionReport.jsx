import React from 'react'
import { useParams } from 'react-router-dom'
import { useLocation } from 'react-router-dom';
import Navigation from './Navigation';

function TransactionReport() {

  const location = useLocation();
  const {customerID , payamount , totalcreditamount , payTimeDateFormate} = location.state;

  const payDate = new Date(payTimeDateFormate) // parse the payTime String object to Date object

  const formattedDate = payDate.toLocaleDateString();
  const formattedTime = payDate.toLocaleTimeString();

  return (
    <div>
      <Navigation/>
      <div className="flex justify-center items-center h-screen bg-gray-200" style={{marginTop:40, marginLeft:80}}>
      <div className="bg-white rounded-lg shadow-md p-8">
        <h1 className="text-red-500 text-3xl font-bold mb-4">Transaction Report</h1>
        <hr className="border-b-2 border-red-500 mb-4" /> {/* Line under Customer ID */}
        <div className="flex flex-col mb-4">
          <span className="text-lg font-semibold">Customer ID:</span>
          <span className="text-xl">{customerID}</span>
        </div>
        <div className="flex flex-col mb-4">
          <span className="text-lg font-semibold">You Pay:</span>
          <span className="text-xl">RS.{payamount}</span>
        </div>
        <div className="flex flex-col mb-4">
          <span className="text-lg font-semibold">You have to pay:</span>
          <span className="text-xl">RS.{totalcreditamount}</span>
        </div>
        <div className="flex flex-col mb-4">
          <span className="text-lg font-semibold">Date:</span>
          <span className="text-xl">{formattedDate}</span>
        </div>
        <div className="flex flex-col">
          <span className="text-lg font-semibold">Time:</span>
          <span className="text-xl">{formattedTime}</span>
        </div>
      </div>
    </div>
    </div>
  )
}

export default TransactionReport
