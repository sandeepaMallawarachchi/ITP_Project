import React, { useState, useEffect } from "react";
import axios from "axios";

export default function AddIncome() {
    const [liabilities, setLiabilities] = useState("");
    const [description, setDescription] = useState("");
    const [amount, setAmount] = useState("");

   

    function setData(e) {
        e.preventDefault();

        const newLiabilities = {
            liabilities,
            description,
            amount
        };

        axios.post("http://localhost:8070/incomeRt/addIncome", newLiabilities)
            .then(() => {
                alert("liabilities Added");
            })
            .catch((err) => {
                alert(err);
            });
    }

    return (
        <div className="container">
            <form onSubmit={setData}>

                <div className="mb-3">
                    <label htmlFor="description" className="form-label">liabilities</label><br></br>
                    <input type="text" className="form-control" id="description" placeholder="Type description" onChange={(e) => setLiabilities(e.target.value)} />
                </div>
                <br></br>

                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label><br></br>
                    <input type="text" className="form-control" id="description" placeholder="Type description" onChange={(e) => setDescription(e.target.value)} />
                </div>
                <br></br>

                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Amount</label><br></br>
                    <input type="text" className="form-control" id="description" placeholder="Type description" onChange={(e) => setAmount(e.target.value)} />
                </div>
                <br></br>

                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    );
}