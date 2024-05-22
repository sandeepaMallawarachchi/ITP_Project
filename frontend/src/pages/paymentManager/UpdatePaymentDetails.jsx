import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom';
import Navigation from './Navigation';

function UpdatePaymentDetails() {

    const { salesId } = useParams();
    const [customerID, setCustomerID] = useState("");
    const [paymentDetails, setPaymentDetails] = useState([]);
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState('');


    useEffect(() => {
        if (customerID !== "") {
            fetchPaymentDetails();
        }
    }, [customerID]);

    const fetchPaymentDetails = () => {
        axios.get(`https://hendriks-tea-management-system-backend.vercel.app/paymentdetails/${customerID}`).then(response => {
            setPaymentDetails(response.data);
        }).catch((err) => {
            console.log(err);
        })
    };

    const handleUpdate = () => {
        navigate("/updatepaymentdetails2/${id}");
    };

    const handleInputChange = (e) => {
        const inputValue = e.target.value.trim(); // Trim whitespace
        if (inputValue === '') {
            setCustomerID(null); // If input is empty, set customerID to null
            setErrorMessage('');
        } else if (!isNaN(inputValue)) {
            setCustomerID(Number(inputValue));
            setErrorMessage('');
        } else {
            setCustomerID(''); // Set an empty string here
            setErrorMessage('Customer ID must be a number!');
        }
    };

    const sumofprevoiuscreditamounts = paymentDetails.reduce((total, payment) => total + payment.creditamount, 0);
    sessionStorage.setItem('sumofprevoiuscreditamounts', sumofprevoiuscreditamounts);

    return (
        <div>
            <Navigation />

            <div style={{ marginTop: 200, marginLeft: 320 }}>
                <input
                    placeholder='Enter Customer ID'
                    value={customerID}
                    onChange={handleInputChange}
                    className={`w-72 h-10 px-4 mb-2 border rounded-md focus:outline-none transition-colors duration-300 ${errorMessage ? 'border-red-500' : 'border-gray-300'} ${!errorMessage && 'focus:border-blue-500'}}
                    id="form2Example1"
                    style={{ marginTop: "180px", marginLeft: "300px" }`}
                    required
                />
            </div>
            {errorMessage && <small style={{ color: 'red', marginLeft: 325 }}>{errorMessage}</small>}
            <br />

            {paymentDetails.length > 0 ? (
                <div>

                    <table style={{ marginTop: "5px", marginLeft: "255px" }} className="tamin-w-full divide-y divide-gray-200ble">
                        <thead className="bg-gray-50">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer ID</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Amount</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Pay Amount</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Credit Amount</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {paymentDetails.map((payment) => (
                                <tr key={payment._id}>
                                    <td className="px-6 py-4 whitespace-nowrap">{payment.customerID}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{payment.totalamount}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{payment.payamount}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{payment.creditamount}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{new Date(payment.dateandtime).toLocaleDateString()}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{new Date(payment.dateandtime).toLocaleTimeString()}</td>
                                    <td className="px-6 py-4 whitespace-nowrap"><Link to={`/payment/updatepaymentdetails2/${payment._id}/${salesId}`}><button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Update</button></Link></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : null}


        </div>
    )
}

export default UpdatePaymentDetails
