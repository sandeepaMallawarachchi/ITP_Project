import React, { useEffect, useState } from 'react';
import axios from 'axios';
// import { useParams, useNavigate } from 'react-router-dom';

export default function AddNewSale() {

    // const { id } = useParams();
    const [salesPersonName, setSalesPersonName] = useState("");
    const [teaType, setTeaType] = useState("");
    const [totalStock, setTotalStock] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = axios.post(`http://localhost:5000/salesManagement/addStock`, {
                salesPersonName,
                teaType,
                totalStock,
            });
            alert("Stock added");
            console.log(res.data);

            setSalesPersonName("");
            setTeaType("");
            setTotalStock("");
        } catch (error) {
            alert("Error adding stock!");
        }
    };

    return (
        <div className='absolute mt-48 left-1/3 w-1/2 '>
            <form onSubmit={handleSubmit}>

                <div className="mb-6">
                    <label for="SalesPersonName" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Enter Salesperson Name</label>
                    <input
                        type="text"
                        id="SalesPersonName"
                        placeholder="someone"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        required
                        onChange={(e) => {

                            setSalesPersonName(e.target.value);
                        }}
                    />
                </div>
                <div className="mb-6">
                    <label for="product Name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Enter Product Name</label>
                    <input
                        type="text"
                        id="product Name"
                        placeholder="product 1"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        required
                        onChange={(e) => {

                            setTeaType(e.target.value);
                        }}
                    />
                </div>
                <div className="mb-6">
                    <label for="amount" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Enter Amount</label>
                    <input
                        type="text"
                        id="amount"
                        placeholder="1000 KG"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        required
                        onChange={(e) => {

                            setTotalStock(e.target.value);
                        }}
                    />
                </div>

                <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Add Stock</button>
            </form>
            {/* <button type="button" className="btn btn-success" onClick={handleSalesSummary}>Confirm Sale</button> */}

        </div>
    );
}