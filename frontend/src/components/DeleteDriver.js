import React from "react";
import axios from "axios";
import { Link, useParams, useNavigate } from "react-router-dom";

function DeleteDriver() {
    const { id } = useParams();
    const navigate = useNavigate();

    const yesBtn = async () => {
        try {
            await axios.delete(`http://localhost:5000/driver/deleteDriver/${id}`);
            navigate("/allDrivers");
        } catch (error) {
            console.error("Error deleting driver", error.message);
            alert("Error deleting driver. Please try again.");
        }
    };

    return (
        <div>
            <p>Are you sure you want to delete this driver?</p>
            <button style={{ margin: "0 30px 0 0" }} className='btn btn-danger' onClick={yesBtn}>Yes</button>
            <Link to="/allDrivers"><button className='btn btn-primary'>No</button></Link>
        </div>
    );
}

export default DeleteDriver;