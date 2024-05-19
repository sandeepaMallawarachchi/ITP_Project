import React from 'react';
import axios from 'axios';
import { useParams, useNavigate } from "react-router-dom";

function DeleteSale() {

    const { id, cusID, saleID} = useParams();
    const navigate = useNavigate();

    const handleDelete = async () => {
        try {

            await axios.delete(`https://hendriks-tea-management-system-backend.vercel.app/sales/deleteSale/${saleID}`);
            alert("Sale deleted!");
            navigate(`/sales/currentSale/${id}/${cusID}`);
        } catch (error) {
            console.log("Error!", error.message);
            alert('Error deleting sale, Please try again.');
        }
    };

    const handleCancel = () => {
        navigate(`/sales/currentSale/${id}/${cusID}`);
    };

    return (
        <div className="flex justify-center items-center h-screen">
            <div className=''>
                <p>Are you sure you want to delete this sale?</p>
                <button className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900" onClick={handleDelete}>Yes</button>
                <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={handleCancel}>No</button>
            </div>
        </div>
    );
};

export default DeleteSale;
