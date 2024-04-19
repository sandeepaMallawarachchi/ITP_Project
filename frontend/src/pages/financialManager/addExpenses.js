import React, { useState, useEffect } from "react";
import axios from "axios";

export default function AddExpenses() {
    const [date, setDate] = useState("");
    const [category, setCategory] = useState("");
    const [description, setDescription] = useState("");
    const [amount, setAmount] = useState("");

    useEffect(() => {
        const fetchCategory = async () => {
            try {
                const res = await axios.get(`http://localhost:8070/add`);
                const productCategory = res.data.map(category => category.productCategory);
                console.log(productCategory);
                setCategory(productCategory);
            } catch (error) {
                console.log("error", error.message);
            }
        }

        fetchCategory();
    }, []);

    function setData(e) {
        e.preventDefault();

        const newExpenses = {
            date,
            category,
            description,
            amount
        };
        axios.post("http://localhost:8070/expenses/add", newExpenses)
            .then(() => {
                alert("Expenses Added");
            })
            .catch((err) => {
                alert(err);
            });
    }

    return (
        <div className="container">
            <form onSubmit={setData}>
                <div className="mb-3">
                    <label htmlFor="date" className="form-label">Date</label><br />
                    <input type="Date" className="form-control" id="date" placeholder="2024/01/20" onChange={(e) => {
                        setDate(e.target.value);
                    }} />
                </div>
                <br />

                <div className="mb-3">
                    <label htmlFor="category" className="form-label">Category</label><br />
                    <select
                        className="form-control"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        required
                    >
                        <option value="">Select category</option>
                        <option value="Salary">Salary</option>
                        <option value="Delivery">Delivery</option>
                        <option value="Supply">Supply</option>
                    </select>
                </div>
                <br />

                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label><br />
                    <input type="text" className="form-control" id="description" placeholder="Type description" onChange={(e) => {
                        setDescription(e.target.value);
                    }} />
                </div>
                <br />

                <div className="mb-3">
                    <label htmlFor="amount" className="form-label">Amount</label><br />
                    <input type="text" className="form-control" id="amount" placeholder="Type amount" onChange={(e) => {
                        setAmount(e.target.value);
                    }} />
                </div>
                <br />

                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    );
}
