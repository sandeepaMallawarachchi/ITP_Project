import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useReactToPrint } from 'react-to-print';
import { Alert } from "flowbite-react";
import { HiInformationCircle } from "react-icons/hi";
import logo from '../../images/logo.png';

function SalesSummary() {
    const [cusID, setCusID] = useState("");
    const [salesSummary, setSalesSummary] = useState({
        subTotal: "",
        date: "",
        salesDetails: [],
    });
    const [error, setError] = useState(false);
    const [errorsAlert, setErrorAlert] = useState(false);
    const [showLogoAndTitle, setShowLogoAndTitle] = useState(false);

    useEffect(() => {
        const fetchSaleDetails = async () => {
            try {
                const res = await axios.get(`https://hendriks-tea-management-system-backend.vercel.app/sales/getSalesSummary/${cusID}`);

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
                    setShowLogoAndTitle(true)
                }
            } catch (error) {
                setError(true);
                setErrorAlert(true);
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

    const componentRef = useRef();

    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
        onBeforeGetContent: () => setShowLogoAndTitle(true),
        onAfterPrint: () => setShowLogoAndTitle(false),
        pageStyle: `
            @page {
                size: A4;
                margin: 2cm;
            }
            body {
                font-family: Arial, sans-serif;
                font-size: 12px;
            }
            table {
                width: 100%;
                border-collapse: collapse;
                margin-top: 50px;
            }
            th, td {
                border: 1px solid #dddddd;
                text-align: center;
                padding: 8px;
            }
            th {
                background-color: #f2f2f2;
            }
            tr:nth-child(even) {
                background-color: #f2f2f2;
            }
            .logo {
                position: absolute;
                top: 0;
                left: 0;
                z-index: 9999;
                margin: 10px;
                content: url(${logo});
            }
            .title {
                text-align: center;
                font-size: 2rem;
                font-weight: bold;
                color: green;
                margin-top: 170px
            }
        `
    });

    return (
        <div className='absolute mt-48 left-1/3 w-1/2 '>
            <Alert color="failure" icon={HiInformationCircle} className={`absolute ${errorsAlert ? 'w-full text-center -mt-14' : 'hidden'}`}>
                <span className="font-medium">Invalid customer ID!</span>
            </Alert>
            <div className="mb-6">
                <label htmlFor="cusID" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Enter Customer ID</label>
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
                    <label htmlFor="date" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Current date</label>
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
                    <label htmlFor="total" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Total price (LKR)</label>
                    <input
                        type="text"
                        id="total"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        required
                        readOnly
                        value={salesSummary.subTotal}
                    />
                </div>

                <button
                    type="button"
                    onClick={handlePrint}
                    id='title'
                    className="mt-5 focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
                    Download sales summary
                </button>

                <div ref={componentRef} className="relative overflow-x-auto shadow-md sm:rounded-lg mt-5">

                    <img className='ml-56 logo' />
                    <h1 className='text-center text-2xl font-bold text-green-500 title'>Sales Summary</h1>

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