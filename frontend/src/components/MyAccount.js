import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import '../css/myAccount.css';
import profilePic from '../images/Profile.png';

export default function SalesmenDashboard() {
    const { id } = useParams();
    const [salesman, setSalesman] = useState({
        name: "",
        username: "",
    });
    const navigate = useNavigate();

    useEffect(() => {
        const fetchSalesmanDetails = async () => {
            try {
                const res = await axios.get(`http://localhost:5000/salesmen/salesmenDashboard/${id}`);
                const salesmanData = res.data.salesman || res.data;
                const { name, username } = salesmanData;
                setSalesman({ name, username });
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
            <div id='profDetails'>
                <img src={profilePic} id='profPic' alt="Profile" />
                <p>Name: <span id='span'>{salesman.name}</span></p>
                <p>Username: <span id='span'>{salesman.username}</span></p>
            </div>

            <div id='profBtns'>
                <button type="button" className="btn btn-primary" onClick={() => changePwBtn(id)}>Change Password</button><br />
                <button type="button" className="btn btn-success" onClick={() => updateBtn(id)}>Update Account</button><br />
                <button type="button" className="btn btn-danger" onClick={() => deleteBtn(id)}>Delete Account</button><br />
            </div>

        </div>
    );
}
