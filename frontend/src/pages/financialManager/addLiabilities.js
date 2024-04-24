import React, { useState } from "react";
import axios from "axios";

export default function AddIncome() {
    const [liabilities, setLiabilities] = useState("");
    const [description, setDescription] = useState("");
    const [amount, setAmount] = useState("");

    const setData = async (e) => {
        e.preventDefault();

        const newLiabilities = {
            liabilities,
            description,
            amount
        };

        try {
            await axios.post("http://localhost:8070/balanceRt/addbalances", newLiabilities);
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

    

    return (
        <div className='absolute mt-48 left-1/3 w-1/2 '>
            <form onSubmit={setData}>

                <div className="mb-3">
                    <label htmlFor="liabilities" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Liabilities</label><br />
                    <input type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" id="liabilities" placeholder="Type liabilities"
                        value={liabilities}
                        onChange={(e) => setLiabilities(e.target.value)} required />
                </div>

                <div className="mb-3">
                    <label htmlFor="descriptionInput" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label><br />
                    <input type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" id="descriptionInput" placeholder="Type description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)} required />
                </div>

                <div className="mb-3">
                    <label htmlFor="amountInput" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Amount</label><br />
                    <input type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" id="amountInput" placeholder="Type amount"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)} required />
                </div>

                <button
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-4 ml-64">Submit</button>
            </form>
        </div>
    );
}