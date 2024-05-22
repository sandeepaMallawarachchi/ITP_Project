import React, { useState, useEffect } from 'react'
import axios from 'axios';
import Navigation from './Navigation';

function SearchByName() {

    const [SearchValue, setSearchValue] = useState("");
    const [paymentDetails, setPaymentDetails] = useState([]);
    const [filteredPaymentDetails, setFilteredPaymentDetails] = useState([]);


    useEffect(() => {
        fetchpaymentdetails();
    },);

    useEffect(() => {
        filterPaymentDetails();
    }, [SearchValue, paymentDetails]);

    const fetchpaymentdetails = () => {
        axios.get(`https://hendriks-tea-management-system-backend.vercel.app/paymentdetails/`)
            .then(response => {
            setPaymentDetails(response.data);
            setFilteredPaymentDetails(response.data);
        })
            .catch((err) => {
                console.log(err);
            });
    }

    const filterPaymentDetails = () => {
        if (SearchValue.trim() === "") {
            // If search value is empty, display all payment details
            setFilteredPaymentDetails(paymentDetails);
        } else {
            // Filter payment details based on search value
            const filteredData = paymentDetails.filter(payment =>
                payment.customerName && payment.customerName.toLowerCase().includes(SearchValue.toLowerCase())
            );
            setFilteredPaymentDetails(filteredData);
        }
    }

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' };
        return new Date(dateString).toLocaleString('en-US', options);
    }

    return (
        <div>
            <Navigation />
            <div style={{ marginLeft: 645, marginTop: 160 }}>
                <br></br>
                <div style={{ position: 'relative' }}>
                    <input style={{ paddingLeft: '30px' }} className="w-72 h-10 px-4 mb-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 transition-colors duration-300" placeholder='Search' onChange={(e) => {
                        setSearchValue(e.target.value);
                    }}></input>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        style={{ position: 'absolute', right: '600px', top: '50%', transform: 'translateY(-50%)' }} // Position the icon
                    >
                        <path
                            d="M21.707 20.293l-5.285-5.285a7.48 7.48 0 10-.708.708l5.285 5.285a.5.5 0 00.707 0 .5.5 0 000-.707zM3 10.5a7.5 7.5 0 1114.998-.002A7.5 7.5 0 013 10.5z"
                        />
                    </svg>
                </div>
            </div>

            {filteredPaymentDetails.length > 0 ? (
                <div>

                    <table style={{ marginTop: "5px", marginLeft: "255px" }} className="tamin-w-full divide-y divide-gray-200ble">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer ID</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer Name</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Amount</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Pay Amount</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Credit Amount</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {filteredPaymentDetails.map((payment) => (
                                <tr key={payment._id}>
                                    <td className="px-6 py-4 whitespace-nowrap">{payment.customerID}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{payment.customerName}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{payment.totalamount}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{payment.payamount}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{payment.creditamount}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{new Date(payment.dateandtime).toLocaleDateString()}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{new Date(payment.dateandtime).toLocaleTimeString()}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <div>No results found</div>
            )}
        </div>
    )
}

export default SearchByName
