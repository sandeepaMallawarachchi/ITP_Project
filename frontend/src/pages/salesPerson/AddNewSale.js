import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { Alert } from "flowbite-react";
import { HiInformationCircle } from "react-icons/hi";

export default function AddNewSale() {

    const { id } = useParams();
    const [productName, setProductName] = useState("");
    const [amount, setAmount] = useState("");
    const [sellingPrice, setSellingPrice] = useState("");
    const [unitPrice, setUnitPrice] = useState("");
    const [cusID, setCusID] = useState("");
    const [cusName, setCusName] = useState("");
    const [error, setError] = useState(false);
    const [errCusId, setErrCusId] = useState(false);
    const [errCusName, setErrCusName] = useState(false);
    const [productNames, setProductNames] = useState([]);
    const [successAlert, setSuccessAlert] = useState(false);
    const [errorsAlert, setErrorAlert] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProductName = async () => {
            try {
                const res = await axios.get(`https://hendriks-tea-management-system-backend.vercel.app/sales/stocks/${id}`);
                const productNames = res.data.map(item => item.productName);
                console.log(productNames);
                setProductNames(productNames);
            } catch (error) {
                console.log("error", error.message);
            }
        }

        fetchProductName();
    }, []);

    const handleChangeProductName = (selectedProductName) => {
        setProductName(selectedProductName);

        const fetchStandardPrice = async () => {
            try {
                const res = axios.get(`https://hendriks-tea-management-system-backend.vercel.app/sales/getStandardPrice/${selectedProductName}`);
                console.log((await res).data.unitPrice);
                setUnitPrice((await res).data.unitPrice);
            } catch (error) {
                console.log("error", error.message);
            }
        };
        fetchStandardPrice();
    };

    const handleNumericInput = (value, setter) => {
        const regex = /^[0-9\b]+$/;
        if (regex.test(value) || value === "") {
            setter(value);
        }
    };

    const handleCusIDChange = (value) => {
        const regex = /^c\d*$/;
        if (regex.test(value) || value === "") {
            setCusID(value);
            setErrCusId(false);
        } else {
            setErrCusId(true);
        }
    };

    const handleCusNameChange = (value) => {
        const regex = /^[a-zA-Z\s]+$/;
        if (regex.test(value) || value === "") {
            setCusName(value);
            setErrCusName(false);
        } else {
            setErrCusName(true);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.post(`https://hendriks-tea-management-system-backend.vercel.app/sales/addSale/${id}`, {
                productName,
                amount,
                sellingPrice,
                unitPrice,
                cusID,
                cusName,
            });

            if (res.data.error) {
                setError(true);
                setErrorAlert(true);
                setSuccessAlert(false);

                setTimeout(() => {
                    setErrorAlert(false);
                }, 5000);
            } else {
                setSuccessAlert(true);
                console.log(res.data);

                setProductName("");
                setAmount("");
                setSellingPrice("");
                setUnitPrice("");
                setError(false);

                setTimeout(() => {
                    setSuccessAlert(false);
                }, 5000);

            }
        } catch (error) {
            setError(true);
            setErrorAlert(true);

            setTimeout(() => {
                setErrorAlert(false);
            }, 5000);
        }
    };

    const handleSalesSummary = () => {
        navigate(`/sales/currentSale/${id}/${cusID}/${cusName}`);
    };

    return (
        <div className='absolute mt-48 left-1/3 w-1/2 '>
            <Alert color="info" className={`absolute ${successAlert ? 'w-full text-center -mt-20 left-0' : 'hidden'}`}>
                <span className="font-medium">Sale added successfully</span>
            </Alert>
            <Alert color="failure" icon={HiInformationCircle} className={`absolute ${errorsAlert ? 'w-full text-center -mt-20 left-0' : 'hidden'}`}>
                <span className="font-medium">Error adding sale!</span>
            </Alert>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="cusID" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Enter Customer ID</label>
                    <input
                        type="text"
                        id="cusID"
                        className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${errCusId ? 'border-red-600 border-2 focus:ring-red-600' : ''}`}
                        placeholder="c123"
                        required
                        value={cusID}
                        onChange={(e) => handleCusIDChange(e.target.value)}
                    />
                    {errCusId && <p className="text-red-600 text-sm mt-1">Customer ID must start with 'c' followed by numbers.</p>}
                </div>
                <div className="mb-3">
                    <label htmlFor="cusName" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Enter Customer Name</label>
                    <input
                        type="text"
                        id="cusName"
                        className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${errCusName ? 'border-red-600 border-2 focus:ring-red-600' : ''}`}
                        placeholder="someone"
                        required
                        value={cusName}
                        onChange={(e) => handleCusNameChange(e.target.value)}
                    />
                    {errCusName && <p className="text-red-600 text-sm mt-1">Customer Name should not contain special characters or numbers.</p>}
                </div>
                <div className="mb-3">
                    <label htmlFor="teaType" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Enter product name</label>
                    <select
                        className="form-control bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        value={productName}
                        onChange={(e) => handleChangeProductName(e.target.value)}
                        required
                    >
                        <option value="">Select Tea Type</option>
                        {productNames.map((type, index) => (
                            <option key={index} value={type}>{type}</option>
                        ))}
                    </select>
                </div>
                <div className="mb-3">
                    <label htmlFor="amount" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Enter tea amount</label>
                    <input
                        type="text"
                        className={`form-control bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${error ? 'border-red-600 border-2 focus:ring-red-600' : ''}`}
                        required
                        value={amount}
                        placeholder='100 KG'
                        id="amount"
                        onChange={(e) => handleNumericInput(e.target.value, setAmount)}
                    />
                    {error && <p className="text-red-600 text-sm mt-1">Amount should be lower than remaining stock</p>}
                </div>
                <div className="mb-3">
                    <label htmlFor="unitPrice" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Standard price</label>
                    <input
                        type="text"
                        className="form-control bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        required
                        placeholder='LKR 1000'
                        id="unitPrice"
                        value={unitPrice}
                        readOnly
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="sellingPrice" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Enter tea selling price</label>
                    <input
                        type="text"
                        className="form-control bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        required
                        value={sellingPrice}
                        placeholder='LKR 1000'
                        id="sellingPrice"
                        onChange={(e) => handleNumericInput(e.target.value, setSellingPrice)}
                    />
                </div>

                <button type="submit"
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    Add sale
                </button>
            </form>
            <button type="button"
                className="mt-5 focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                onClick={handleSalesSummary}>
                Confirm Sale
            </button>
        </div >
    );
}
