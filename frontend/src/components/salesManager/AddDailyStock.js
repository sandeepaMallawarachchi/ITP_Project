import React, { useEffect, useState } from 'react';
import axios from 'axios';
// import { useParams, useNavigate } from 'react-router-dom';

export default function AddNewSale() {

    // const { id } = useParams();
    const [salesPersonName, setSalesPersonName] = useState("");
    const [teaType, setTeaType] = useState("");
    const [totalStock, setTotalStock] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = axios.post(`http://localhost:5000/salesManagement/addStock`, {
                salesPersonName,
                teaType,
                totalStock,
            });
            alert("Stock added");
            console.log(res.data);

            setSalesPersonName("");
            setTeaType("");
            setTotalStock("");
        } catch (error) {
            alert("Error adding stock!");
        }
    };

    return (
        <div id='addSale'>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label for="SalesPersonName" className="form-label">Enter Salesperson Name</label>
                    <input type="text" className="form-control" required id="SalesPersonName" onChange={(e) => {

                        setSalesPersonName(e.target.value);
                    }} />
                </div>
                <div className="mb-3">
                    <label for="teaType" className="form-label">Enter tea type</label>
                    <input type="text" className="form-control" required id="teaType" onChange={(e) => {

                        setTeaType(e.target.value);
                    }} />
                </div>
                <div className="mb-3">
                    <label for="amount" className="form-label">Enter tea Amount</label>
                    <input type="text" className="form-control" required id="amount" onChange={(e) => {

                        setTotalStock(e.target.value);
                    }} />
                </div>

                <button type="submit" className="btn btn-primary">Add Stock</button>
            </form>
            {/* <button type="button" className="btn btn-success" onClick={handleSalesSummary}>Confirm Sale</button> */}

        </div>
    );
}