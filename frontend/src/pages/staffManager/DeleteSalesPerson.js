import React from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";

function DeleteSalesPerson() {
    const { id, salespersonID } = useParams();
    
    const navigate = useNavigate();
    
    const yesBtn = async () => {
        try {
            await axios.delete(`https://hendriks-tea-management-system-backend.vercel.app/salesmen/deleteSalesmen/${salespersonID}`);
            alert("Salesperson deleted!");
            navigate(`/staff/allEmployees/${id}`);
        } catch (error) {
            console.error("Error deleting salesperson", error.message);
            alert("Error deleting salesperson. Please try again.");
        }
    };

    return (
        <div className="flex justify-center items-center h-screen">
            <p>Are you sure you want to delete this salesperson?</p>
            <button style={{ margin: "0 30px 0 0" }} className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900" onClick={yesBtn}>Yes</button>
            <Link to={`/staff/allEmployees/${id}`}><button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">No</button></Link>
        </div>
    );
}

export default DeleteSalesPerson;
