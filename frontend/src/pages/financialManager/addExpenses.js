import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function AddExpenses() {
    const navigate = useNavigate();
    const [date, setDate] = useState("");
    const [category, setCategory] = useState("");
    const [description, setDescription] = useState("");
    const [amount, setAmount] = useState("");
    const [error, setError] = useState("");
    const [totalSalary, setTotalSalary] = useState(0); // State to store total salary
    const [totalDelivery, setTotalDelivery] = useState(0); // State to store total delivery


    // Fetch total salary and total delivery when component mounts
    useEffect(() => {
        fetchTotalSalary();
        fetchTotalDelivery();
    }, []);

    // Function to fetch total salary
    const fetchTotalSalary = () => {
        axios.get("https://hendriks-tea-management-system-backend.vercel.app/totalSalary/totalSalary")
            .then(response => {
                setTotalSalary(response.data.totalSalary);
            })
            .catch(error => {
                console.error("Error fetching total salary:", error);
            });
    };

    // Function to fetch total delivery
    const fetchTotalDelivery = () => {
        axios.get("https://hendriks-tea-management-system-backend.vercel.app/report/")
            .then(response => {
                setTotalDelivery(response.data.totalCostSum);
            })
            .catch(error => {
                console.error("Error fetching total delivery:", error);
            });
    };

    //validation for date
    const handleDateChange = (e) => {
        const selectedDate = e.target.value;
        const currentDate = new Date().toISOString().split('T')[0];

        if (selectedDate > currentDate) {
            setError("Selected date cannot be a future date.");
        } else {
            setDate(selectedDate);
            setError("");
        }
    };

    //validation for amount
    const handleAmountChange = (e) => {
        const enterAmount = e.target.value;


        if (enterAmount > 0) {
            setAmount(enterAmount);
            setError("");

        } else {
            setError("Enter positive value");
        }
    };


    function setData(e) {
        e.preventDefault();

        let newAmount = amount;

        if (category === "salary") {
            newAmount = totalSalary;
        } else if (category === "delivery") {
            newAmount = totalDelivery;
        }

        const newExpense = {
            date,
            category,
            description,
            amount: newAmount
        };

        axios.post("https://hendriks-tea-management-system-backend.vercel.app/expenses/add", newExpense)
            .then(() => {
                alert("Expenses Added");
                // Reset form fields after successful submission
                setDate("");
                setCategory("");
                setDescription("");
                setAmount("");
                setError("");
            })
            .catch((err) => {
                setError(err.message || "An error occurred");
            });
    }

    return (
        <div className='absolute mt-48 left-1/3 w-1/2 '>
            <form onSubmit={setData}>
                {error && <div className="alert alert-danger">{error}</div>}
                <div className="mb-3">
                    <label htmlFor="date" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Date</label><br />
                    <input type="date" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        id="date"
                        onChange={handleDateChange}
                        max={
                            new Date().toISOString().split('T')[0]
                        }
                        value={date} required />
                    {error && <div className="text-danger">{error}</div>} {/* Display error message if error exists */}
                </div>

                <div className="mb-3">
                    <label htmlFor="category" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Category</label><br />
                    <select
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        required
                    >
                        <option value="">Select Category</option>
                        <option value="salary">Salary</option>
                        <option value="delivery">Delivery</option>
                        <option value="Water Bill">Water Bill</option>
                        <option value="Electricity Bill">Electricity Bill</option>
                        <option value="Other">Other</option>
                    </select>
                </div>

                <div className="mb-3">
                    <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label><br />
                    <input type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        id="description"
                        placeholder="Type description"
                        onChange={(e) => setDescription(e.target.value)}
                        value={description} required />
                </div>

                {/* Conditionally render the input field based on the selected category */}
                {["Water Bill", "Electricity Bill", "Other"].includes(category) ? (
                    <div className="mb-3">
                        <label htmlFor="amount" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Amount</label><br />
                        <input type="number" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            id="amount"
                            placeholder="Amount"
                            onChange={handleAmountChange}
                            value={amount} required />
                        {error && <div className="text-danger">{error}</div>} 
                    </div>
                ) : (
                    <div className="mb-3">
                        <label htmlFor="amount" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Amount</label><br />
                        <input type="number" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            id="amount"
                            placeholder="Amount"
                            value={category === "salary" ? totalSalary : category === "delivery" ? totalDelivery : amount} readOnly required />
                    </div>
                )}

                <button
                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-4 ml-64">Submit</button>
            </form>
        </div>
    );
}