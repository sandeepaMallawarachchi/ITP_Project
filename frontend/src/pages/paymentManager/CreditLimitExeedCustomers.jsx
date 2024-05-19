import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link, useParams } from 'react-router-dom';
import AdminNavigation from './AdminNavigation';

function CreditLimitExeedCustomers() {

    const { id } = useParams()
    const [CreditLimitExeedCustomers, setCreditLimitExeedCustomers] = useState([]);


    useEffect(() => {
        getpaymentdetails();
    },);

    const getpaymentdetails = () => {
        axios.get(`https://hendriks-tea-management-system-backend.vercel.app/paymentdetails/`).then(response => {
            const paymentDetails = response.data;

            const groupcustomers = paymentDetails.reduce((acc, payment) => {
                const { customerID, customerName, creditamount, bannedstatus } = payment;
                acc[customerID] = acc[customerID] || { customerID, customerName, totalCredit: 0, bannedstatus };
                acc[customerID].totalCredit += creditamount;
                return acc;
            })
            const filteredcustomers = Object.values(groupcustomers)
                .filter(customer => customer.totalCredit > 30000);
            setCreditLimitExeedCustomers(filteredcustomers);
        })
    }

    const hadleBanButton = async (customerID) => {
        const resoponse = await axios.put(`https://hendriks-tea-management-system-backend.vercel.app/paymentdetails/ban/${customerID}`, {
            bannedstatus: true
        })
    }

    const hadleUnbanButton = async (customerID) => {
        const response = await axios.put(`https://hendriks-tea-management-system-backend.vercel.app/paymentdetails/ban/${customerID}`, {
            bannedstatus: false
        })
    }


    return (
        <div>

            <AdminNavigation />

            <div style={{ marginLeft: 256, marginTop: 170 }}>
                <table className="mt-4 ml-0 w-full border-collapse border border-gray-200">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="px-2 py-2">Customer ID</th>
                            <th className="px-2 py-2">Customer Name</th>
                            <th className="px-2 py-2">Total Credit Amount</th>
                            <th className="px-2 py-2">Actions</th>
                            <th className="px-8 py-2" >Banned Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {CreditLimitExeedCustomers.map(customer => (
                            <tr key={customer.customerID}>
                                <td className="border px-1 py-2">{customer.customerID}</td>
                                <td className="border px-1 py-2">{customer.customerName}</td>
                                <td className="border px-1 py-2">{customer.totalCredit} LKR</td>
                                <td className="border px-1 py-2"><Link to={`/payment/viewalltransactions/${customer.customerID}/${id}`}><button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2">View all Transactions</button></Link> <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mr-2" onClick={() => hadleBanButton(customer.customerID)} >Ban</button> <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => hadleUnbanButton(customer.customerID)}>Unban</button></td>
                                <td className="border px-1 py-4 flex items-center">
                                    <span className={customer.bannedstatus ? "text-red-500" : "text-green-500"}>
                                        {customer.bannedstatus ? 'Banned' : 'Not Banned'}
                                    </span>
                                    <span className="w-4 h-4 rounded-full ml-2" style={{ backgroundColor: customer.bannedstatus ? '#EF4444' : '#10B981' }}></span>
                                </td>

                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

        </div>
    )
}

export default CreditLimitExeedCustomers