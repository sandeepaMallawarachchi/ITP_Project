import React, { useState, useEffect } from "react";
import axios from "axios";

export default function AddIncome() {
    const [date, setDate] = useState("");
    const [category, setCategory] = useState("");
    const [description, setDescription] = useState("");
    const [amount, setAmount] = useState("");

    useEffect(() => {
        axios.get("http://localhost:8070/totalIncome/getMonthlyIncome")
            .then((res) => {
                const totalIncome = res.data.totalIncome; // Assuming totalIncome is the correct key in your response
                setAmount(totalIncome);
            })
            .catch((error) => {
                alert(error.message);
            });
    }, []);

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
                <div className="mb-3">
                    <label htmlFor="date" className="form-label">Date</label><br></br>
                    <input type="Date" className="form-control" id="date" placeholder="2024/01/20" onChange={(e) => setDate(e.target.value)} />
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
                    <input type="text" className="form-control" id="amount" placeholder="Type description" value={amount} readOnly />
                </div>
                <br></br>

                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    );
}