import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import '../css/salesmenDashboard.css';
import profilePic from '../images/Profile.png';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

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

    const saleSummary = [
        { name: "Type 1", value: 150000 },
        { name: "Type 2", value: 42000 },
        { name: "Type 3", value: 500000 },
    ];

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

            <div id='gmap'>
                <BarChart
                    width={500}
                    height={300}
                    data={saleSummary}
                    margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                    }}
                    barSize={20}
                >
                    <XAxis dataKey="name" scale="point" padding={{ left: 10, right: 10 }} />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <CartesianGrid strokeDasharray="3 3" />
                    <Bar dataKey="value" fill="#07b307" background={{ fill: '#eee' }} />
                </BarChart>
            </div>

            <div id='calander'>
                <p>Calendar</p>
                <iframe title="Calendar" src="https://calendar.google.com/calendar/embed?height=300&wkst=2&bgcolor=%2333B679&ctz=Asia%2FColombo&showTitle=0&showPrint=0&showTabs=0&showTz=0&showCalendars=0&src=ZW4ubGsjaG9saWRheUBncm91cC52LmNhbGVuZGFyLmdvb2dsZS5jb20&color=%230B8043"></iframe>
            </div>
        </div>
    );
}
