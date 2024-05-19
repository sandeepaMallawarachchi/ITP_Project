import React from "react";
import axios from "axios";
import { Link, useParams, useNavigate } from "react-router-dom";

function DeleteLocation() {
    const { locId,id} = useParams();
    const navigate = useNavigate();

    const yesBtn = async () => {
        try {
            await axios.delete(`https://hendriks-tea-management-system-backend.vercel.app/tea/delete/${locId}`);
             navigate(`/deliverymanager/alllocations/${id}`);
        } catch (error) {
            console.error("Error deleting location", error.message);
            alert("Error deleting location. Please try again.");
        }
    };

    const noBtn = async () => {
        
    };

    return (
        <div className="absolute mt-48 left-1/3 w-1/2">
            <p>Are you sure you want to delete this customer?</p>
            <button className='focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900' onClick={yesBtn}>Yes</button>
             <button className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800' onClick={noBtn}>No</button>
        </div>
    );
}

export default DeleteLocation;
