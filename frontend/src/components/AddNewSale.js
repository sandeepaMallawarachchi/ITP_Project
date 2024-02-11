import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import '../css/sales.css';

export default function AddNewSale() {

    const { id } = useParams();
    const [teaType, setTeaType] = useState("");
    const [amount, setAmount] = useState("");
    const [sellingPrice, setSellingPrice] = useState("");
    const [standardPrice, setStandardPrice] = useState("");
    const [cusID, setCusID] = useState("");
    const [teaTypes, setTeaTypes] = useState([]);

    useEffect(() => {
        const fetchTeaType = async () => {
            try {
                const res = await axios.get("http://localhost:5000/sales/stocks");
                const teaTypes = res.data.map(item => item.teaType);
                console.log(teaTypes);
                setTeaTypes(teaTypes);
            } catch (error) {
                console.log("error", error.message);
            }
        }

        fetchTeaType();
    }, []);

    const handleChangeTeaType = (selectedTeaType) => {
        setTeaType(selectedTeaType);

        const fetchStandardPrice = async () => {
            try {
                const res = axios.get(`http://localhost:5000/sales/getStandardPrice/${selectedTeaType}`);
                console.log((await res).data.standardPrice);
                setStandardPrice((await res).data.standardPrice);
            } catch (error) {
                console.log("error", error.message);
            }
        };
        fetchStandardPrice();
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = axios.post(`http://localhost:5000/sales/addSale/${id}`, {
                teaType,
                amount,
                sellingPrice,
                standardPrice,
                cusID,
            });
            alert("Sale added");
            console.log(res.data);

            setTeaType("");
            setAmount("");
            setSellingPrice("");
            setCusID("");
            setStandardPrice("");
        } catch (error) {
            alert("Error adding a sale!");
        }
    };

    return (
        <div id='addSale'>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label for="cusId" className="form-label">Enter customer ID</label>
                    <input type="text" className="form-control" required id="cusId" onChange={(e) => {

                        setCusID(e.target.value);
                    }} />
                </div>
                <div className="mb-3">
                    <label for="teaType" className="form-label">Enter tea type</label>
                    <select className="form-control" value={teaType} onChange={(e) => handleChangeTeaType(e.target.value)} required>

                        <option value="">Select Tea Type</option>
                        {teaTypes.map((type, index) => (
                            <option key={index} value={type}>{type}</option>
                        ))}
                    </select>
                </div>
                <div className="mb-3">
                    <label for="amount" className="form-label">Enter tea Amount</label>
                    <input type="text" className="form-control" required id="amount" onChange={(e) => {

                        setAmount(e.target.value);
                    }} />
                </div>
                <div className="mb-3">
                    <label for="standardPrice" className="form-label">Standard price</label>
                    <input type="text" className="form-control" required id="standardPrice" value={standardPrice} readOnly />
                </div>
                <div className="mb-3">
                    <label for="sellingPrice" className="form-label">Enter tea selling price</label>
                    <input type="text" className="form-control" required id="sellingPrice" onChange={(e) => {

                        setSellingPrice(e.target.value);
                    }} />
                </div>

                <button type="submit" className="btn btn-primary">Add sale</button>
            </form>
        </div>
    );
}