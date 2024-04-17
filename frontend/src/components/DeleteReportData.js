import React from "react";
import axios from "axios";
import { Link, useParams, useNavigate } from "react-router-dom";

function DeleteReportData() {
    const { id } = useParams();
    const navigate = useNavigate();

    const yesBtn = async () => {
        try {
            await axios.delete(`http://localhost:5000/report/delete/${id}`);
            navigate("/allReportData");
        } catch (error) {
            console.error("Error deleting data", error.message);
            alert("Error deleting data. Please try again.");
        }
    };

    return (
        <div>
            <p>Are you sure you want to delete this details?</p>
            <button style={{ margin: "0 30px 0 0" }} className='btn btn-danger' onClick={yesBtn}>Yes</button>
            <Link to="/allReportData"><button className='btn btn-primary'>No</button></Link>
        </div>
    );
}

export default DeleteReportData;