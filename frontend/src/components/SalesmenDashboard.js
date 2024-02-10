import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import '../css/salesmenDashboard.css';
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
                <img src={profilePic} id='profPic' />
                <p>Name: <span id='span'>{salesman.name}</span></p>
                <p>Username: <span id='span'>{salesman.username}</span></p>
            </div>

            <div id='profBtns'>
                <button type="button" class="btn btn-primary" onClick={() => changePwBtn(id)}>Change Password</button><br />
                <button type="button" class="btn btn-success" onClick={() => updateBtn(id)}>Update Account</button><br />
                <button type="button" class="btn btn-danger" onClick={() => deleteBtn(id)}>Delete Account</button><br />
            </div>

            <div id='gmap'>
                <p>Where am I?</p>
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d63371.81536311016!2d79.81500561820582!3d6.9218368778345845!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae253d10f7a7003%3A0x320b2e4d32d3838d!2sColombo!5e0!3m2!1sen!2slk!4v1707219695211!5m2!1sen!2slk"></iframe>
            </div>

            <div id='calander'>
                <p>Calander</p>
                <iframe src="https://calendar.google.com/calendar/embed?height=300&wkst=2&bgcolor=%2333B679&ctz=Asia%2FColombo&showTitle=0&showPrint=0&showTabs=0&showTz=0&showCalendars=0&src=ZW4ubGsjaG9saWRheUBncm91cC52LmNhbGVuZGFyLmdvb2dsZS5jb20&color=%230B8043"></iframe>
            </div>
        </div>
    );

}
