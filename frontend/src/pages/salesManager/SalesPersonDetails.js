import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

export default function SalesPersonDetails() {
    const [salesPersonDetails, setSalesPersonDetails] = useState([]);
    const { id } = useParams();
    useEffect(() => {
        const fetchSalesPersonDetails = async () => {
            try {
                const res = await axios.get("https://hendriks-tea-management-system-backend.vercel.app/salesManagement/getSalespersons");
                setSalesPersonDetails(res.data.salesPersonDetails);
                console.log(res.data);
            } catch (error) {
                console.log("Error fetching details", error.message);
            }
        };
        fetchSalesPersonDetails();
    }, []);

    const navigate = useNavigate();

    const handleShowDetails = (salespersonID) => {
        navigate(`/salesManager/monthlySales/${salespersonID}/${id}`);
    };

    return (
        <div className="absolute mt-40 left-80 w-3/4">
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
                            <th scope="col" className="px-6 py-3">
                                Sales Details
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {salesPersonDetails.map((detail, index) => (
                            <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 text-black">
                                <td className="px-6 py-4">{detail.name}</td>
                                <td className="px-6 py-4">{detail.email}</td>
                                <td className="px-6 py-4">{detail.phone}</td>
                                <td className="px-6 py-4">{detail.address}</td>
                                <td className="px-6 py-4">
                                    <button
                                        type="button"
                                        className="mt-5 focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                                        onClick={() => handleShowDetails(detail.salespersonID, id)}
                                    >
                                        Show Details
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {(!salesPersonDetails || salesPersonDetails.length === 0) && <span className="ml-64 px-6 py-4">No data found!</span>}
        </div>
    );
}