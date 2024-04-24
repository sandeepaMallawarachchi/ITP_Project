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
                const response = await axios.get(`http://localhost:8070/expenses/get/${expenseID}`);
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
            await axios.put(`http://localhost:8070/expenses/update/${expenseID}`, details);
            alert("Details Updated!");
        } catch (error) {
            console.error("Error updating expenses details", error.message);
        }
    };

    return (
        <div className='absolute mt-48 left-1/3 w-1/2 '>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="date" className="form-label">Date</label>
                    <input type="text" className="form-control" id="date" value={details.date} onChange={(e) => setDetails({ ...details, date: e.target.value })} />
                </div>
                <div className="mb-3">
                    <label htmlFor="category" className="form-label">Category</label>
                    <input type="text" className="form-control" id="category" value={details.category} onChange={(e) => setDetails({ ...details, category: e.target.value })} />
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <input type="text" className="form-control" id="description" value={details.description} onChange={(e) => setDetails({ ...details, description: e.target.value })} />
                </div>
                <div className="mb-3">
                    <label htmlFor="amount" className="form-label">Amount</label>
                    <input type="text" className="form-control" id="amount" value={details.amount} onChange={(e) => setDetails({ ...details, amount: e.target.value })} />
                </div>
                <button type="submit" className="btn btn-primary">Update</button>
            </form>
        </div>
    );
}

export default UpdateExpenses;
