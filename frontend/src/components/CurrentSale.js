import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import '../css/sales.css'

function CurrentSale() {

    const { id, cusID } = useParams();
    const [salesSummary, setSalesSummary] = useState({
        cusID: "",
        subTotal: "",
        date: "",
        salesDetails: [],
    });
    const [saleID, setSaleID] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        const fetchSaleDetails = async () => {
            try {

                const res = await axios.get(`http://localhost:5000/sales/getSalesSummary/${cusID}`);
                console.log(res.data);

                const saleData = res.data.sale || res.data;
                const { subTotal, date, salesDetails } = saleData;
                setSalesSummary({ subTotal, date, salesDetails });
            } catch (error) {
                console.log("Error fetching details", error.message);
            }
        };
        fetchSaleDetails();
    }, [cusID]);

    // const handleSubmit = async (e) => {
    //     e.preventDefault();

    //     try {
    //         await axios.put(`http://localhost:5000/salesmen/updateSalesmen/${id}`, salesmanDetails);
    //         alert('Details Updated successfully');
    //         navigate(`/salesmenDashboard/${id}`);
    //     } catch (error) {
    //         console.log("Error!", error.message);
    //     }
    // };

    const handleAddMoreSale = () => {
        navigate(`/AddNewSale/${id}`);
    };

    const deleteBtn = (saleID) => {
        navigate(`/deleteSale/${id}/${cusID}/${saleID}`);
    };

    return (
        <div id="currentSale">
            <div className="container" style={{ textAlign: "left", width: "600px", marginTop: "50px" }}>
                <form >
                    <div class="mb-3">
                        <label for="cusID" class="form-label" >Customer ID</label>
                        <input type="text" class="form-control" id="cusID" required value={cusID} readOnly />
                    </div>

                    <div class="mb-3">
                        <label for="subTotal" class="form-label" >Total price</label>
                        <input type="text" class="form-control" id="subTotal" required value={salesSummary.subTotal} readOnly />
                    </div>

                    <div class="mb-3">
                        <label for="date" class="form-label" >Date</label>
                        <input type="text" class="form-control" id="date" required value={salesSummary.date} readOnly />
                    </div>

                    <table class="table">
                        <thead>
                            <tr>
                                <th scope="col">Tea Type</th>
                                <th scope="col">Amount</th>
                                <th scope="col">Selling Price</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {salesSummary.salesDetails.map((detail, index) => (
                                <tr key={index}>
                                    <td>{detail.teaType}</td>
                                    <td>{detail.amount}</td>
                                    <td>{detail.sellingPrice}</td>
                                    <td><button type="button" className="btn btn-danger" onClick={() => deleteBtn(detail._id)}>Delete</button></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <button type="submit" class="btn btn-success">Confirm</button>
                </form>

                <button type="submit" class="btn btn-primary" onClick={handleAddMoreSale}>Update</button>
            </div>
        </div>
    )
};

export default CurrentSale;