import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function AddIncome() {
    const [category, setCategory] = useState("");
    const [description, setDescription] = useState("");
    const [amount, setAmount] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        // Set the current date when the component mounts
        const currentDate = new Date().toISOString().split('T')[0];
        setDate(currentDate);
    }, []);

    const [date, setDate] = useState(""); // Moved after useEffect

    const fetchTotalAmount = () => {
        axios.get("https://hendriks-tea-management-system-backend.vercel.app/getTotalIncome/getTotalSales")
            .then(response => {
                setAmount(response.data.totalSales);
            })
            .catch(error => {
                console.error("Error fetching total amount:", error);
            });
    };


    const handleCategoryChange = (e) => {
        const value = e.target.value;
        const regex = /^[a-zA-Z\s]*$/;

        if (regex.test(value)) {
            setCategory(value);
        } else {
            setError("Category can only contain alphabets and spaces.");
        }
    };

    useEffect(() => {
        fetchTotalAmount();
    }, []); // Empty dependency array to run once on component mount

    // Validation for amount
    // const handleAmountChange = (e) => {
    //     const enterAmount = e.target.value;

    //     if (!isNaN(enterAmount) && parseFloat(enterAmount) > 0) {
    //         setAmount(enterAmount);
    //         fetchTotalAmount(); // Fetch total amount when amount changes
    //         setError("");
    //     } else {
    //         setError("Enter a valid positive number");
    //     }
    // };

    function setData(e) {
        e.preventDefault();

        if (!category) {
            setError("Category is required and can only contain alphabets and spaces.");
            return;
        }


        const newIncome = {
            date,
            category,
            description,
            amount
        };

        axios.post("https://hendriks-tea-management-system-backend.vercel.app/incomeRt/addIncome", newIncome)
            .then(() => {
                alert("Income Added");
            })
            .catch((err) => {
                alert(err);
            });
    }

    return (
        <div className='absolute mt-48 left-1/3 w-1/2 '>
            <form onSubmit={setData}>
                {/* Date, category, description inputs */}
                {/* Amount input with onChange for handleAmountChange */}
                <div className="mb-3">
                    <label htmlFor="date" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Date</label><br></br>
                    <input type="date" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" id="date" value={date} disabled />
                </div>
                <br></br>

                <div className="mb-3">
                    <label htmlFor="category" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Category</label><br></br>
                    <input type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" id="category" placeholder="Enter expense category" value={category} onChange={handleCategoryChange} />
                    {error && <div className="text-danger">{error}</div>}
                </div>
                <br></br>

                <div className="mb-3">
                    <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label><br></br>
                    <input type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" id="description" placeholder="Type description" onChange={(e) => setDescription(e.target.value)} />
                </div>
                <br></br>
                <div className="mb-3">
                    <label htmlFor="amount" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Amount</label><br></br>
                    <input type="number" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" id="amount" placeholder="Enter amount" value={amount} />
                    
                </div>
                <br></br>

                <button
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-4 ml-64">Submit</button>
            </form>

        </div>
    );
}