import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function AddNewSale() {
    const [salesPersonID, setSalesPersonID] = useState("");
    const [salesPersonName, setSalesPersonName] = useState("");
    const [productName, setProductName] = useState([]);
    const [selectedTeaType, setSelectedTeaType] = useState("");
    const [totalStock, setTotalStock] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchProductName = async () => {
            try {
                const res = await axios.get(`http://localhost:8070/inventory/product/getTeaPack`);
                const products = res.data.map(item => item.productName);
                setProductName(products);
            } catch (error) {
                setError("Error fetching product names");
            }
        }

        fetchProductName();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!selectedTeaType || !totalStock) {
            setError("Please select a product name and enter the amount");
            return;
        }

        try {
            const res = await axios.post(`http://localhost:8070/salesManagement/addStock`, {
                salesPersonID,
                salesPersonName,
                productName: selectedTeaType, 
                totalStock,
            });
            alert("Stock added");
            console.log(res.data);

            setSalesPersonID("");
            setSalesPersonName("");
            setSelectedTeaType("");
            setTotalStock("");
            setError("");
        } catch (error) {
            setError("Error adding stock!");
        }
    };

    return (
        <div className='absolute mt-48 left-1/3 w-1/2 '>
            <form onSubmit={handleSubmit}>
                <div className="mb-6">
                    <label htmlFor="salesPersonID" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Enter Salesperson ID</label>
                    <input
                        type="text"
                        id="salesPersonID"
                        placeholder="s123"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        required
                        value={salesPersonID}
                        onChange={(e) => setSalesPersonID(e.target.value)}
                    />
                </div>

                <div className="mb-6">
                    <label htmlFor="SalesPersonName" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Enter Salesperson Name</label>
                    <input
                        type="text"
                        id="SalesPersonName"
                        placeholder="someone"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        required
                        value={salesPersonName}
                        onChange={(e) => setSalesPersonName(e.target.value)}
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="productName" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select product name</label>
                    <select
                        className="form-control bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        required
                        value={totalStock}
                        onChange={(e) => setTotalStock(e.target.value)}
                    />
                </div>

                <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Add Stock</button>
            </form>
        </div>
    );
}
