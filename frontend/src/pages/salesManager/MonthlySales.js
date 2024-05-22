import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function MonthlySales() {
    const { salesPersonID } = useParams();
    const [salesSummary, setSalesSummary] = useState({
        totalSales: "",
        totalAmount: "",
        salesDetails: [],
    });

    useEffect(() => {
        const fetchSalesDetails = async () => {
            try {
                const res = await axios.get(`https://hendriks-tea-management-system-backend.vercel.app/salesManagement/getSalespersonSales/${salesPersonID}`);
                const { totalSales, totalAmount, salesDetails } = res.data;
                setSalesSummary({ totalSales, totalAmount, salesDetails });
                console.log(totalSales, totalAmount, salesDetails);
            } catch (error) {
                console.log("Error fetching details", error.message);
            }
        };
        fetchSalesDetails();
    }, [salesPersonID]);

    return (
        <div className="absolute mt-40 left-[500px] w-1/2">
            <div className="mb-6">
                <label for="salesPerosnID" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Salesperson ID</label>
                <input
                    type="text"
                    id="salesPerosnID"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
                    readOnly
                    value={salesPersonID}
                />
            </div>
            <div className="mb-6">
                <label for="totalSales" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">TotalSales</label>
                <input
                    type="text"
                    id="totalSales"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
                    readOnly
                    value={salesSummary.totalSales}
                />
            </div>

            <div className="mb-6">
                <label for="totalAmount" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Total Amount</label>
                <input
                    type="text"
                    id="totalAmount"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
                    readOnly
                    value={salesSummary.totalAmount}
                />
            </div>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-14">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Product Name
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Amount
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Date
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {salesSummary.salesDetails.map((detail, index) => (
                            <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 text-black">
                                <td className="px-6 py-4">{detail.productName}</td>
                                <td className="px-6 py-4">{detail.amount}</td>
                                <td className="px-6 py-4">{detail.date}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {salesSummary.salesDetails.length === 0 && <span className="ml-64 px-6 py-4">No data found!</span>}
        </div>
    );
}
