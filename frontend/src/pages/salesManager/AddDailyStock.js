import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Alert } from "flowbite-react";
import { HiInformationCircle } from "react-icons/hi";

export default function AddDailyStock() {
    const [salesPersonID, setSalesPersonID] = useState("");
    const [salesPersonName, setSalesPersonName] = useState("");
    const [productName, setProductName] = useState([]);
    const [selectedTeaType, setSelectedTeaType] = useState("");
    const [totalStock, setTotalStock] = useState("");
    const [error, setError] = useState(false);
    const [errStock, setErrStock] = useState(false);
    const [errSalesPersonId, setErrSalesPersonId] = useState(false);
    const [errSalesPersonName, setErrSalesPersonName] = useState(false);
    const [successAlert, setSuccessAlert] = useState(false);
    const [errorsAlert, setErrorAlert] = useState(false);

    useEffect(() => {
        const fetchProductName = async () => {
            try {
                const res = await axios.get(`https://hendriks-tea-management-system-backend.vercel.app/inventory/product/getTeaPack`);
                const products = res.data.map(item => item.productName);
                setProductName(products);
            } catch (error) {
                setErrorAlert(true);
                setError(true);

                setTimeout(() => {
                    setErrorAlert(false);
                }, 5000);

                console.log(error.message);
            }
        }

        fetchProductName();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!selectedTeaType) {
            setError(true);
            return;
        }

        if (!totalStock || parseInt(totalStock) <= 0) {
            setErrStock(true);
            return;
        }

        try {
            const res = await axios.post(`https://hendriks-tea-management-system-backend.vercel.app/salesManagement/addStock`, {
                salesPersonID,
                salesPersonName,
                productName: selectedTeaType,
                totalStock,
            });
            console.log(res.data);

            setSalesPersonID("");
            setSalesPersonName("");
            setSelectedTeaType("");
            setTotalStock("");

            setSuccessAlert(true);

            setTimeout(() => {
                setSuccessAlert(false);
            }, 5000);

        } catch (error) {
            setError(true);
            setErrorAlert(true);

            setTimeout(() => {
                setErrorAlert(false);
            }, 5000);

            console.log(error.message);
        }
    };

    const handleSalesPersonIDChange = (value) => {
        const regex = /^s\d*$/;
        if (regex.test(value) || value === "") {
            setSalesPersonID(value);
            setErrSalesPersonId(false);
        } else {
            setErrSalesPersonId(true);
        }
    };

    const handleSalesNameChange = (value) => {
        const regex = /^[a-zA-Z\s]+$/;
        if (regex.test(value) || value === "") {
            setSalesPersonName(value);
            setErrSalesPersonName(false);
        } else {
            setErrSalesPersonName(true);
        }
    };

    const handleNumericInput = (value, setter) => {
        const regex = /^[0-9\b]+$/;
        if (regex.test(value) || value === "") {
            setter(value);
        }
    };

    return (
        <div className='absolute mt-48 left-1/3 w-1/2 '>
            <Alert color="info" className={`absolute ${successAlert ? 'w-full text-center -mt-14 left-0' : 'hidden'}`}>
                <span className="font-medium">Stock added successfully</span>
            </Alert>
            <Alert color="failure" icon={HiInformationCircle} className={`absolute ${errorsAlert ? 'w-full text-center -mt-14 left-0' : 'hidden'}`}>
                <span className="font-medium">Error adding stock!</span>
            </Alert>
            <form onSubmit={handleSubmit}>
                <div className="mb-6">
                    <label htmlFor="salesPersonID" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Enter Salesperson ID</label>
                    <input
                        type="text"
                        id="salesPersonID"
                        placeholder="s123"
                        className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${errSalesPersonId ? 'border-red-600 border-2 focus:ring-red-600' : ''}`}
                        required
                        value={salesPersonID}
                        onChange={(e) => handleSalesPersonIDChange(e.target.value)}
                    />
                    {errSalesPersonId && <p className="text-red-600 text-sm mt-1">Salesperson ID must start with 's' followed by numbers.</p>}
                </div>

                <div className="mb-6">
                    <label htmlFor="SalesPersonName" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Enter Salesperson Name</label>
                    <input
                        type="text"
                        id="SalesPersonName"
                        placeholder="someone"
                        className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${errSalesPersonName ? 'border-red-600 border-2 focus:ring-red-600' : ''}`}
                        required
                        value={salesPersonName}
                        onChange={(e) => handleSalesNameChange(e.target.value)}
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="productName" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select product name</label>
                    <select
                        className={`form-control bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${error ? 'border-red-600 border-2 focus:ring-red-600' : ''}`}
                        value={selectedTeaType}
                        onChange={(e) => setSelectedTeaType(e.target.value)}
                        required
                    >
                        <option value="">Select Tea Type</option>
                        {productName.map((type, index) => (
                            <option key={index} value={type}>{type}</option>
                        ))}
                    </select>
                </div>

                <div className="mb-6">
                    <label htmlFor="amount" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Enter Amount</label>
                    <input
                        type="number"
                        id="amount"
                        placeholder="1000 KG"
                        className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${errStock ? 'border-red-600 border-2 focus:ring-red-600' : ''}`}
                        required
                        value={totalStock}
                        onChange={(e) => handleNumericInput(e.target.value, setTotalStock)}
                    />
                </div>

                <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Add Stock</button>
            </form>
        </div>
    );
}
