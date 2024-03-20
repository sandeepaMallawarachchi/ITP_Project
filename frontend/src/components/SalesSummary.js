import React, { useState, useEffect } from "react";
import axios from "axios";
// import { useParams, useNavigate } from "react-router-dom";

function SalesSummary() {
    const [cusID, setCusID] = useState("");
    const [salesSummary, setSalesSummary] = useState({
        subTotal: "",
        date: "",
        salesDetails: [],
    });

    // const navigate = useNavigate();

    useEffect(() => {
        const fetchSaleDetails = async () => {
            try {
                const res = await axios.get(`http://localhost:5000/sales/getSalesSummary/${cusID}`);
                const saleData = res.data.sale || res.data;
                const { subTotal, date, salesDetails } = saleData;
                setSalesSummary({ subTotal, date, salesDetails });
            } catch (error) {
                console.log("Error fetching details", error.message);
            }
        };
        fetchSaleDetails();
    }, [cusID]);

    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     // Do something when confirming sales details
    // };

    return (
        <div className='absolute mt-48 left-1/3 w-1/2 '>
            <div class="mb-6">
                <label for="cusID" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Enter Customer ID</label>
                <input
                    type="password"
                    id="cusID"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"                    placeholder="Enter customer ID"
                    required
                    onChange={(e) => {

                        setCusID(e.target.value);
                    }}
                />
            </div>

            <form>
                <div class="mb-6">
                    <label for="date" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Current date</label>
                    <input
                        type="password"
                        id="date"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        required
                        readOnly
                        value={salesSummary.date}
                    />
                </div>
                <div class="mb-6">
                    <label for="total" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Total price</label>
                    <input
                        type="password"
                        id="total"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        required
                        readOnly
                        value={salesSummary.subTotal}
                    />
                </div>

                <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-14">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    Product name
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    selling Price
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Amount
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Total Price
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {salesSummary.salesDetails.map((detail, index) => (
                                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700" key={index}>
                                    <td className="px-6 py-4">{detail.teaType}</td>
                                    <td className="px-6 py-4">{detail.sellingPrice}</td>
                                    <td className="px-6 py-4">{detail.amount}</td>
                                    <td className="px-6 py-4">{detail.totalPrice}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

            </form>
        </div>
    )
}

export default SalesSummary;
