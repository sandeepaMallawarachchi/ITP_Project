import React from 'react';
import axios from 'axios';
import { useParams, useNavigate } from "react-router-dom";

function DeleteSale() {

    const { id, cusID, saleID} = useParams();
    const navigate = useNavigate();

    const handleDelete = async () => {
        try {

            await axios.delete(`http://localhost:5000/sales/deleteSale/${saleID}`);
            alert("Sale deleted!");
            navigate(`/currentSale/${id}/${cusID}`);
        } catch (error) {
            console.log("Error!", error.message);
            alert('Error deleting sale, Please try again.');
        }
    };

    const handleCancel = () => {
        navigate(`/currentSale/${id}/${cusID}`);
    };

    return (
        <div>
            <p>Are you sure you want to delete this sale?</p>

            <button style={{ margin: "0 30px 0 0" }} className='btn btn-danger' onClick={handleDelete}>Yes</button>
            <button  className='btn btn-primary' onClick={handleCancel}>No</button>
        </div>
    );
};

export default DeleteSale;
