import React, { useState, useEffect } from "react";
import axios from "axios";
import { Alert } from "flowbite-react";
import { HiInformationCircle } from "react-icons/hi";

function SalesSummary() {
    const [cusID, setCusID] = useState("");
    const [salesSummary, setSalesSummary] = useState({
        subTotal: "",
        date: "",
        salesDetails: [],
    });
    const [error, setError] = useState(false);
    const [errorsAlert, setErrorAlert] = useState(false);

    useEffect(() => {
        const fetchSaleDetails = async () => {
            try {
                const res = await axios.get(`http://localhost:8070/sales/getSalesSummary/${cusID}`);

                if (res.data.error) {
                    setError(true);
                    setSalesSummary({
                        subTotal: "",
                        date: "",
                        salesDetails: [],
                    });
                } else {
                    const saleData = res.data.sale || res.data;
                    const { subTotal, date, salesDetails } = saleData;
                    setSalesSummary({ subTotal, date, salesDetails });
                    setError(false);
                }
            } catch (error) {
                setError(true);
                setErrorAlert(true);

                // setTimeout(() => {
                //     setErrorAlert(false);
                // }, 3000);

                console.log("Error fetching details", error.message);
            }
        };

        if (cusID.trim() !== "") {
            fetchSaleDetails();
        } else {
            setError(false);
            setErrorAlert(false);
            setSalesSummary({
                subTotal: "",
                date: "",
                salesDetails: [],
            });
        }
    }, [cusID]);

    const handleChangeCusID = (e) => {
        const inputCusID = e.target.value.trim();
        setCusID(inputCusID);
        if (error && inputCusID !== "") {
            setError(false);
            setErrorAlert(false);
        }
    };

    return (
        <div className='absolute mt-48 left-1/3 w-1/2 '>
            <Alert color="failure" icon={HiInformationCircle} className={`absolute ${errorsAlert ? 'w-full text-center -mt-14' : 'hidden'}`}>
                <span className="font-medium">Invalid customer ID!</span>
            </Alert>
            <div className="mb-6">
                <label for="cusID" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Enter Customer ID</label>
                <input
                    type="text"
                    id="cusID"
                    placeholder="c123"
                    className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${error ? 'border-red-600 border-2 focus:ring-red-600' : ''}`}
                    required
                    onChange={handleChangeCusID}
                />
            </div>

            <form>
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
                                    selling Price
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Total Price (LKR)
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {salesSummary.salesDetails.map((detail, index) => (
                                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 text-black" key={index}>
                                    <td className="px-6 py-4">{detail.productName}</td>
                                    <td className="px-6 py-4">{detail.amount}</td>
                                    <td className="px-6 py-4">{detail.sellingPrice}</td>
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