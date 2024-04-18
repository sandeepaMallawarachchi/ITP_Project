import React from "react";
import axios from "axios";
import { Link, useParams, useNavigate } from "react-router-dom";

function DeleteLocation() {
    const { id } = useParams();
    const navigate = useNavigate();

    const deleteDriver = async () => {
        try {
            await axios.delete(`http://localhost:8070/tea/delete/${id}`);
            navigate("/alllocations");
        } catch (error) {
            console.error("Error deleting location", error.message);
            alert("Error deleting location. Please try again.");
        }
    };

    return (
        <div>
            <p>Are you sure you want to delete this driver?</p>
            <button className="btn btn-danger" onClick={deleteDriver}>Yes</button>
            <Link to="/alllocations"><button className="btn btn-primary">No</button></Link>
        </div>
    );
}

export default DeleteLocation;
