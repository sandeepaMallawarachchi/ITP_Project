import React, { useState, useEffect } from "react";
import axios from "axios";

export default function AddExpenses() {
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
        axios.get("http://localhost:8070/totalSalary/totalSalary")
            .then(response => {
                setTotalSalary(response.data.totalSalary);
            })
            .catch(error => {
                console.error("Error fetching total salary:", error);
            });
    };

    // Function to fetch total delivery
    const fetchTotalDelivery = () => {
        axios.get("http://localhost:8070/report/")
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
        const currentDate = new Date().toISOString().split('T')[0]; // Get current date in 'YYYY-MM-DD' format

        if (selectedDate > currentDate) {
            setError("Selected date cannot be a future date.");
        } else {
            setDate(selectedDate);
            setError(""); // Clear error if date is valid
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

        axios.post("http://localhost:8070/expenses/add", newExpense)
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
        <div className="container">
            <form onSubmit={setData}>
                {error && <div className="alert alert-danger">{error}</div>}
                <div className="mb-3">
            <label htmlFor="date" className="form-label">Date</label><br />
            <input type="date" className="form-control" id="date" onChange={handleDateChange} value={date} required />
            {error && <div className="text-danger">{error}</div>} {/* Display error message if error exists */}
        </div>

                <div className="mb-3">
                    <label htmlFor="category" className="form-label">Category</label><br />
                    <select
                        className="form-control"
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
                    <label htmlFor="description" className="form-label">Description</label><br />
                    <input type="text" className="form-control" id="description" placeholder="Type description" onChange={(e) => setDescription(e.target.value)} value={description} required />
                </div>

                {/* Conditionally render the input field based on the selected category */}
                {["Water Bill", "Electricity Bill", "Other"].includes(category) ? (
                    <div className="mb-3">
                        <label htmlFor="amount" className="form-label">Amount</label><br />
                        <input type="number" className="form-control" id="amount" placeholder="Amount" onChange={handleAmountChange} value={amount} required />
                        {error && <div className="text-danger">{error}</div>} {/* Display error message if error exists */}
                    </div>
                ) : (
                    <div className="mb-3">
                        <label htmlFor="amount" className="form-label">Amount</label><br />
                        <input type="number" className="form-control" id="amount" placeholder="Amount" value={category === "salary" ? totalSalary : category === "delivery" ? totalDelivery : amount} readOnly required />
                    </div>
                )}

                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    );
}
