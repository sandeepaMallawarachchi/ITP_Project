import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function UpdateExpenses() {
    const { expenseID } = useParams();
    const [details, setDetails] = useState({
        date: "",
        category: "",
        description: "",
        amount: "",
    });

    useEffect(() => {
        const fetchExpenses = async () => {
            try {
                const response = await axios.get(`https://hendriks-tea-management-system-backend.vercel.app/expenses/get/${expenseID}`);
                const expenseData = response.data.financial; // Assuming the response has a 'financial' property

                if (expenseData && Object.keys(expenseData).length > 0) {
                    setDetails({
                        date: expenseData.date || "",
                        category: expenseData.category || "",
                        description: expenseData.description || "",
                        amount: expenseData.amount || "",
                    });
                } else {
                    console.error("Expense data is undefined or empty");
                }
            } catch (error) {
                console.error("Error fetching expenses details", error.message);
            }
        };
        fetchExpenses();
    }, [expenseID]);    

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await axios.put(`https://hendriks-tea-management-system-backend.vercel.app/expenses/update/${expenseID}`, details);
            alert("Details Updated!");
        } catch (error) {
            console.error("Error updating expenses details", error.message);
        }
    };

    return (
        <div className='absolute mt-48 left-1/3 w-1/2 '>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="date" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Date</label>
                    <input type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" id="date" value={details.date} onChange={(e) => setDetails({ ...details, date: e.target.value })} />
                </div>
                <div className="mb-3">
                    <label htmlFor="category" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Category</label>
                    <input type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" id="category" value={details.category} onChange={(e) => setDetails({ ...details, category: e.target.value })} />
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
                    <input type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" id="description" value={details.description} onChange={(e) => setDetails({ ...details, description: e.target.value })} />
                </div>
                <div className="mb-3">
                    <label htmlFor="amount" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Amount</label>
                    <input type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" id="amount" value={details.amount} onChange={(e) => setDetails({ ...details, amount: e.target.value })} />
                </div>
                <button type="submit"  className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-4 ml-64" >Update</button>
            </form>
        </div>
    );
}

export default UpdateExpenses;
