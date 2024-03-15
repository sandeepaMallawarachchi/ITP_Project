import React, { useState, useEffect } from "react";
import axios from "axios";
// import { useParams, useNavigate } from "react-router-dom";
import '../css/sales.css';

function SalesSummary() {
    const [cusID, setCusID] = useState("");
    const [salesSummary, setSalesSummary] = useState({
        subTotal: "",
        date: "",
        salesDetails: [],
    });

    // const navigate = useNavigate();

    useEffect(() => {
        const fetchSaleDetails = async () => {
            try {
                const res = await axios.get(`http://localhost:5000/sales/getSalesSummary/${cusID}`);
                const saleData = res.data.sale || res.data;
                const { subTotal, date, salesDetails } = saleData;
                setSalesSummary({ subTotal, date, salesDetails });
            } catch (error) {
                console.log("Error fetching details", error.message);
            }
        };
        fetchSaleDetails();
    }, [cusID]);

    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     // Do something when confirming sales details
    // };

    return (
        <div id="salesSummary">
            <div className="container" style={{ textAlign: "left", width: "600px", marginTop: "50px" }}>
                <div className="mb-3">
                    <label htmlFor="cusID" className="form-label">Enter Customer ID</label>
                    <input type="text" className="form-control" id="cusID" required onChange={(e) => setCusID(e.target.value)} />
                </div>

                <form>

                    <div className="mb-3">
                        <label htmlFor="subTotal" className="form-label">Total price</label>
                        <input type="text" className="form-control" id="subTotal" required value={salesSummary.subTotal} readOnly />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="date" className="form-label">Date</label>
                        <input type="text" className="form-control" id="date" required value={salesSummary.date} readOnly />
                    </div>

                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">Tea Type</th>
                                <th scope="col">Selling Price</th>
                                <th scope="col">Amount</th>
                                <th scope="col">Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {salesSummary.salesDetails.map((detail, index) => (
                                <tr key={index}>
                                    <td>{detail.teaType}</td>
                                    <td>{detail.sellingPrice}</td>
                                    <td>{detail.amount}</td>
                                    <td>{detail.totalPrice}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </form>
                
                <button type="button" className="btn btn-success">Change</button>
                <button type="button" className="btn btn-danger">Delete</button>
            </div>
        </div>
    )
}

export default SalesSummary;
