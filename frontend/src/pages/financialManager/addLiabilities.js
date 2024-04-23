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
        <div className="container">
            <form onSubmit={setData}>

                <div className="mb-3">
                    <label htmlFor="liabilities" className="form-label">Liabilities</label><br />
                    <input type="text" className="form-control" id="liabilities" placeholder="Type liabilities"
                        value={liabilities}
                        onChange={(e) => setLiabilities(e.target.value)} required />
                </div>

                <div className="mb-3">
                    <label htmlFor="descriptionInput" className="form-label">Description</label><br />
                    <input type="text" className="form-control" id="descriptionInput" placeholder="Type description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)} required />
                </div>

                <div className="mb-3">
                    <label htmlFor="amountInput" className="form-label">Amount</label><br />
                    <input type="text" className="form-control" id="amountInput" placeholder="Type amount"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)} required />
                </div>

                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    );
}
