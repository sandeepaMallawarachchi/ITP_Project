import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import '../css/myAccount.css';

export default function Navigations() {
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
                console.log(res.data);
                const salesmanData = res.data.salesman || res.data;
                const { name, username } = salesmanData;
                setSalesman({ name, username });
            } catch (error) {
                console.log("error", error.message);
            }
        };

        fetchSalesmanDetails();
    }, [id]);

    const handleDashboard = () => {

        navigate(`/salesmenDashboard/${id}`);
    };

    const handleMyAccount = () => {

        navigate(`/myAccount/${id}`);
    };

    const handleAddSale = () => {

        navigate(`/AddNewSale/${id}`);
    };

    const handleSalesSummary = () => {

        navigate(`/SalesSummary/${id}`);
    };

    return (
        <div>
            <div id='navigation'>
                <p>LOGO</p>
                <p>Hello, <span id='span'>{salesman.name}</span></p>
                
                <button onClick={handleDashboard}>Dashboard</button>
                <button onClick={handleAddSale}>New sale</button>
                <button onClick={handleSalesSummary}>Sales summary</button>
                <button>Payment</button>
                <button>Remaining Stock</button>
                <button>Locations</button>
                <button onClick={handleMyAccount}> My account</button>
            </div>

        </div>
    );
}