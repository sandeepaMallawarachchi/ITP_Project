import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function OrderDetails() {
    const { id } = useParams();
    const [orderDetails, setOrderDetails] = useState([]);

    useEffect(() => {
        const fetchOrderDetails = async () => {
            try {
                const res = await axios.get(`https://hendriks-tea-management-system-backend.vercel.app/inventory/orders/getAllOrders`);
                setOrderDetails(res.data);
            } catch (error) {
                console.log("Error fetching details", error.message);
            }
        };
        fetchOrderDetails();
    }, [id]);

    return (
        <div className='absolute mt-48 left-80 w-3/4 '>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-14">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Product name
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Tea type
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Amount
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {orderDetails.map((detail, index) => (
                            <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 text-black">
                                <td className="px-6 py-4">{detail.productName}</td>
                                <td className="px-6 py-4">{detail.teaType}</td>
                                <td className="px-6 py-4">{detail.quantity}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {orderDetails.length === 0 && <span className="ml-64 px-6 py-4">No data found!</span>}
        </div>
    )
}

export default OrderDetails;
