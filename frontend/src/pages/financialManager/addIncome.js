import React, { useState, useEffect } from "react";
import axios from "axios";

export default function AddIncome() {
    const [category, setCategory] = useState("");
    const [description, setDescription] = useState("");
    const [amount, setAmount] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        // Set the current date when the component mounts
        const currentDate = new Date().toISOString().split('T')[0];
        setDate(currentDate);
    }, []);

    const [date, setDate] = useState(""); // Moved after useEffect

    const fetchTotalAmount = () => {
        axios.get("http://localhost:8070/getTotalIncome/getTotalSales")
            .then(response => {
                setAmount(response.data.totalSales);
            })
            .catch(error => {
                console.error("Error fetching total amount:", error);
            });
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

        const newIncome = {
            date,
            category,
            description,
            amount
        };

        axios.post("http://localhost:8070/incomeRt/addIncome", newIncome)
            .then(() => {
                alert("Income Added");
            })
            .catch((err) => {
                alert(err);
            });
    }

    return (
        <div className="container">
            <form onSubmit={setData}>
                {/* Date, category, description inputs */}
                {/* Amount input with onChange for handleAmountChange */}
                <div className="mb-3">
                    <label htmlFor="date" className="form-label">Date</label><br></br>
                    <input type="date" className="form-control" id="date" value={date} disabled />
                </div>
                <br></br>

                <div className="mb-3">
                    <label htmlFor="category" className="form-label">Category</label><br></br>
                    <input type="text" className="form-control" id="category" placeholder="Enter expense category" onChange={(e) => setCategory(e.target.value)} />
                </div>
                <br></br>

                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label><br></br>
                    <input type="text" className="form-control" id="description" placeholder="Type description" onChange={(e) => setDescription(e.target.value)} />
                </div>
                <br></br>
                <div className="mb-3">
                    <label htmlFor="amount" className="form-label">Amount</label><br></br>
                    <input type="text" className="form-control" id="amount" placeholder="Enter amount" value={amount} />
                    {error && <div className="text-danger">{error}</div>}
                </div>
                <br></br>

                <button type="submit" className="btn btn-primary">Submit</button>
            </form>

        </div>
    );
}
