import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function UpdateExpenses() {
    const { id } = useParams();
    const [details, setDetails] = useState({
        date: "",
        category: "",
        description: "",
        amount: "",
    });

    useEffect(() => {
        const fetchExpenses = async () => {
            try {
                const response = await axios.get(`http://localhost:3013/expenses/get/${id}`);
                const expenseData = response.data.expense; // Assuming the response has an 'expense' property
                setDetails({
                    date: expenseData.date || "",
                    category: expenseData.category || "",
                    description: expenseData.description || "",
                    amount: expenseData.amount || "",
                });
            } catch (error) {
                console.error("Error fetching expenses details", error.message);
            }
        };
        fetchExpenses();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await axios.put(`http://localhost:3013/expenses/update/${id}`, details);
            alert("Details Updated!");
        } catch (error) {
            console.error("Error updating expenses details", error.message);
        }
    };

    return (
        <div className="container" style={{ width: "600px" }}>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="date" className="form-label">Date</label>
                    <input type="text" className="form-control" id="date" value={details.date} onChange={(e) => setDetails({...details, date: e.target.value})} />
                </div>
                <div className="mb-3">
                    <label htmlFor="category" className="form-label">Category</label>
                    <input type="text" className="form-control" id="category" value={details.category} onChange={(e) => setDetails({...details, category: e.target.value})} />
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <input type="text" className="form-control" id="description" value={details.description} onChange={(e) => setDetails({...details, description: e.target.value})} />
                </div>
                <div className="mb-3">
                    <label htmlFor="amount" className="form-label">Amount</label>
                    <input type="text" className="form-control" id="amount" value={details.amount} onChange={(e) => setDetails({...details, amount: e.target.value})} />
                </div>
                <button type="submit" className="btn btn-primary">Update</button>
            </form>
        </div>
    );
}

export default UpdateExpenses;
