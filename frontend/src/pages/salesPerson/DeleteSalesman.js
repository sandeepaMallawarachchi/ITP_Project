import React from 'react';
import axios from 'axios';
import { useParams, useNavigate } from "react-router-dom";

function DeleteSalesman() {
    const { id } = useParams();
    const navigate = useNavigate();

    const handleDelete = async () => {
        try {

            await axios.delete(`https://hendriks-tea-management-system-backend.vercel.app/salesmen/deleteSalesmen/${id}`);
            alert("User deleted!");
            navigate("/");
        } catch (error) {
            console.log("Error!", error.message);
            alert('Error deleting account. Please try again.');
        }
    };

    const handleCancel = () => {
        navigate(`/salesmenDashboard/${id}`);
    };

    return (
        <div>
            <p>Are you sure you want to delete this employee?</p>

            <button style={{ margin: "0 30px 0 0" }} className='btn btn-danger' onClick={handleDelete}>Yes</button>
            <button onClick={handleCancel} className='btn btn-primary'>No</button>
        </div>
    );
};

export default DeleteSalesman;
