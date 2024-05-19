import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom';
import Navigation from './Navigation';



function PaymentAdminLogin() {

  const { id } = useParams();
  const [paymentAdminDetails, setPaymentAdminDetails] = useState([]);
  const [userenterID, setuserenterID] = useState("");
  const [userenterpassword, setuserenterpassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    getpaymentadmindetails();
  }, []);

  const getpaymentadmindetails = () => {
    axios.get(`https://hendriks-tea-management-system-backend.vercel.app/paymentadmin/get`).then(response => {
      setPaymentAdminDetails(response.data);
    }).catch((err) => {
      console.log(err);
    })
  }

  function AdminValidation() {
    for (const admin of paymentAdminDetails) {

      const enteredID = parseInt(userenterID);

      if (enteredID === admin.ID && userenterpassword === admin.password) {
        console.log("Success ! ");
        navigate(`/payment/paymentadminhome/${id}`);
        return; //if found one match it exit the loop
      }
      console.log("Invalid !");
      alert("Invalid ID or Password ! ");
    }
  }

  return (

    <div>

      <Navigation />

      <div className="bg-gray-100 flex items-center justify-center h-screen">
        <div className="bg-white p-8 rounded-lg shadow-md w-80">
          <h2 className="text-2xl font-semibold mb-4">Login</h2>
          <form >
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-600 mb-1">
                ID
              </label>
              <input
                type="email"
                id="email"
                name="email"

                onChange={(e) => setuserenterID(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                placeholder="Enter your ID"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="block text-gray-600 mb-1">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"

                onChange={(e) => setuserenterpassword(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                placeholder="Enter your password"
              />
            </div>
            <button
              onClick={AdminValidation}
              disabled={paymentAdminDetails.length === 0}
              className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
            >
              Login
            </button>
          </form>
        </div>
      </div>



    </div>
  )
}

export default PaymentAdminLogin