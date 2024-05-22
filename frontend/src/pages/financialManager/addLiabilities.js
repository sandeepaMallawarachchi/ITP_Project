import React, { useState } from "react";
import axios from "axios";

export default function AddIncome() {
    const [liabilities, setLiabilities] = useState("");
    const [description, setDescription] = useState("");
    const [amount, setAmount] = useState("");
    const [error, setError] = useState(""); // State for error message

    const setData = async (e) => {
        e.preventDefault();

        const newLiabilities = {
            liabilities,
            description,
            amount
        };

        try {
            await axios.post("https://hendriks-tea-management-system-backend.vercel.app/balanceRt/addbalances", newLiabilities);
            alert("Liabilities Added");
            // Optionally, you can reset the form fields after successful submission
            setLiabilities("");
            setDescription("");
            setAmount("");
        } catch (err) {
            alert("Error adding liabilities");
            console.error(err);
        }


    };


    const handleCategoryChange = (e) => {
        const value = e.target.value;
        const regex = /^[a-zA-Z\s]*$/;

        if (regex.test(value)) {
            setLiabilities(value);
            setError(""); // Clear any existing error messages
        } else {
            setError("Category can only contain alphabets and spaces.");
        }
    };

   // Validation for amount
   const handleAmountChange = (e) => {
    const value = e.target.value;
    const regex = /^[0-9]*$/; // Only allows positive numbers

    if (regex.test(value) && value > 0) {
        setAmount(value);
        setError(""); // Clear any existing error messages
    } else {
        setError("Amount can only be a positive number.");
    }
};

    

    return (
        <div className='absolute mt-48 left-1/3 w-1/2 '>
            <form onSubmit={setData}>

            <div className="mb-3">
            {error && <div className="text-danger">{error}</div>}
                    <label htmlFor="liabilities" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Liabilities</label><br />
                    <input 
                        type="text" 
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                        id="liabilities" 
                        placeholder="Type liabilities"
                        value={liabilities}
                        onChange={handleCategoryChange}
                        required 
                    />
                     
                </div>

                <div className="mb-3">
                    <label htmlFor="descriptionInput" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label><br />
                    <input type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" id="descriptionInput" placeholder="Type description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)} required />
                </div>

                <div className="mb-3">
                    <label htmlFor="amountInput" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Amount</label><br />
                    <input 
                        type="number" 
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                        id="amountInput" 
                        placeholder="Type amount"
                        value={amount}
                        onChange={handleAmountChange}
                        required 
                    />
                    
                </div>


                <button
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-4 ml-64">Submit</button>
            </form>
        </div>
    );
}