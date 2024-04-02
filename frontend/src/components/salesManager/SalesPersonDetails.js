import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function SalesPersonDetails() {

    const [salesPerosnDetails, setSalesPerosnDetails] = useState([]);

    useEffect(() => {
        const fetchSalesPersonDetails = async () => {
            try {
                const res = await axios.get(`http://localhost:8070/salesManagement/getSalespersons`);
                setSalesPerosnDetails(res.data);
            } catch (error) {
                console.log("Error fetching details", error.message);
            }
        };
        fetchSalesPersonDetails();
    }, []);

    return (
        <div className='absolute mt-48 left-80 w-3/4 '>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-14">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Name
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Email
                            </th>

                            <th scope="col" className="px-6 py-3">
                                Phone
                            </th>

                            <th scope="col" className="px-6 py-3">
                                Address
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {salesPerosnDetails.map((detail, index) => (
                            <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 text-black">
                                <td className="px-6 py-4">{detail.name}</td>
                                <td className="px-6 py-4">{detail.email}</td>
                                <td className="px-6 py-4">{detail.phone}</td>
                                <td className="px-6 py-4">{detail.address}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {salesPerosnDetails.length === 0 && <span className="ml-64 px-6 py-4">No data found!</span>}
        </div>
    )
}
