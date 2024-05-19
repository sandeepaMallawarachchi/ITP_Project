import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

function CurrentSale() {

    const { id, cusID, cusName } = useParams();
    const [salesSummary, setSalesSummary] = useState({
        cusID: "",
        subTotal: "",
        date: "",
        salesDetails: [],
    });

    const navigate = useNavigate();

    useEffect(() => {
        const fetchSaleDetails = async () => {
            try {

                const res = await axios.get(`https://hendriks-tea-management-system-backend.vercel.app/sales/getSalesSummary/${cusID}`);
                console.log(res.data);

                const saleData = res.data.sale || res.data;
                const { subTotal, date, salesDetails } = saleData;
                setSalesSummary({ subTotal, date, salesDetails });
            } catch (error) {
                console.log("Error fetching details", error.message);
            }
        };
        fetchSaleDetails();
    }, [cusID]);

    // const handleSubmit = async (e) => {
    //     e.preventDefault();

    //     try {
    //         await axios.put(`https://hendriks-tea-management-system-backend.vercel.app/salesmen/updateSalesmen/${id}`, salesmanDetails);
    //         alert('Details Updated successfully');
    //         navigate(`/salesmenDashboard/${id}`);
    //     } catch (error) {
    //         console.log("Error!", error.message);
    //     }
    // };

    const handleAddMoreSale = () => {
        navigate(`/sales/AddNewSale/${id}`);
    };

    const deleteBtn = (saleID) => {
        navigate(`/sales/deleteSale/${id}/${cusID}/${saleID}`);
    };

    const totalamount = salesSummary.subTotal
    const handleConfirm = () => {
        navigate(`/payment/cash/${id}/${cusID}/${cusName}/${totalamount}`);
    };

    return (
        <div className='absolute mt-48 left-1/3 w-1/2 '>

            <div className="mb-6">
                <label for="cusID" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Customer ID</label>
                <input
                    type="text"
                    id="cusID"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
                    readOnly
                    value={cusID}
                />
            </div>

            <div className="mb-6">
                <label for="cusName" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Customer Name</label>
                <input
                    type="text"
                    id="cusName"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
                    readOnly
                    value={cusName}
                />
            </div>

            <div className="mb-6">
                <label for="date" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Current date</label>
                <input
                    type="text"
                    id="date"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
                    readOnly
                    value={salesSummary.date}
                />
            </div>

            <div className="mb-6">
                <label for="total" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Total price (LKR)</label>
                <input
                    type="text"
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
                                Amount
                            </th>
                            <th scope="col" className="px-6 py-3">
                                selling Price (LKR)
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {salesSummary.salesDetails.map((detail, index) => (
                            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 text-black" key={index}>
                                <td className="px-6 py-4">{detail.productName}</td>
                                <td className="px-6 py-4">{detail.amount}</td>
                                <td className="px-6 py-4">{detail.sellingPrice}</td>
                                <td><button type="button" className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900" onClick={() => deleteBtn(detail._id)}>Delete</button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <button type="submit" className="mt-5 focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                onClick={handleConfirm}>
                Confirm
            </button>

            <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                onClick={handleAddMoreSale}>
                Update
            </button>
        </div>
    )
};

export default CurrentSale;