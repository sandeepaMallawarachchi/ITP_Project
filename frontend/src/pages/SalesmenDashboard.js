import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import profilePic from '../images/Profile.png';

export default function SalesmenDashboard() {
    const { id } = useParams();
    const [salesman, setSalesman] = useState({
        name: "",
        username: "",
        dateOfBirth: "",
        email: "",
        phone: "",
        address: "",
    });
    const navigate = useNavigate();

    useEffect(() => {
        const fetchSalesmanDetails = async () => {
            try {
                const res = await axios.get(`http://localhost:5000/salesmen/salesmenDashboard/${id}`);
                console.log(res.data);
                const salesmanData = res.data.salesman || res.data;
                const { name, username, dateOfBirth, email, phone, address } = salesmanData;
                setSalesman({ name, username, dateOfBirth, email, phone, address });
            } catch (error) {
                console.log("error", error.message);
            }
        };

        fetchSalesmanDetails();
    }, [id]);

    const updateBtn = (id) => {

        navigate(`/updateSalesman/${id}`);
    };

    const deleteBtn = (id) => {

        navigate(`/deleteSalesman/${id}`);
    };

    const changePwBtn = (id) => {

        navigate(`/changeSalesmanPassword/${id}`);
    };

    return (
        <div>
            <div>
                <p style={{ margin: "100px 0 0 1050px", fontWeight: "600" }}>Hello, <span style={{ color: "green" }}>{salesman.name}</span></p>
            </div>
            <div class="row" style={{ maxWidth: "550px", margin: "0 0 0 50px", textAlign: "left" }}>
                <div class="col-4">
                    <div class="list-group" id="list-tab" role="tablist">
                        <a class="list-group-item list-group-item-action active" id="list-myacc-list" data-bs-toggle="list" href="#" role="tab" aria-controls="list-myacc">My Account</a>
                        <a class="list-group-item list-group-item-action" id="list-newSale-list" data-bs-toggle="list" href="#list-newSale" role="tab" aria-controls="list-newSale">New Sale</a>
                        <a class="list-group-item list-group-item-action" id="list-stocks-list" data-bs-toggle="list" href="#list-stocks" role="tab" aria-controls="list-stocks">Stocks</a>
                        <a class="list-group-item list-group-item-action" id="list-salesHistory-list" data-bs-toggle="list" href="#list-salesHistory" role="tab" aria-controls="list-salesHistory">Sales History</a>
                        <a class="list-group-item list-group-item-action" id="list-payment-list" data-bs-toggle="list" href="#list-payment" role="tab" aria-controls="list-payment">Payment</a>
                        <a class="list-group-item list-group-item-action" id="list-Locations-list" data-bs-toggle="list" href="#list-Locations" role="tab" aria-controls="list-Locations">Locations</a>

                    </div>
                </div>
            </div>
            <div style={{ position: "absolute", padding: "20px", margin: "-280px 0 0 400px", textAlign: "left", fontWeight: "600" }}>
                <img src={profilePic} style={{ maxHeight: "150px" }} />
                <p>Name: <span style={{ color: "green" }}>{salesman.name}</span></p>
                <p>Username: <span style={{ color: "green" }}>{salesman.username}</span></p>
                <p>Date of Birth: <span style={{ color: "green" }}>{salesman.dateOfBirth}</span></p>
                <p>Phone Number: <span style={{ color: "green" }}>{salesman.phone}</span></p>
                <p>Address: <span style={{ color: "green" }}>{salesman.address}</span></p>
            </div>

            <div>
                <button type="button" class="btn btn-primary" onClick={() => changePwBtn(id)}>Change Password</button><br />
                <button type="button" class="btn btn-success" onClick={() => updateBtn(id)}>Update Account</button><br />
                <button type="button" class="btn btn-danger" onClick={() => deleteBtn(id)}>Delete Account</button><br />
            </div>
        </div>
    );

}
