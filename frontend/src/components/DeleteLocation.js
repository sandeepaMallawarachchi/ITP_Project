import React from "react";
import axios from "axios";
import { Link, useParams, useNavigate } from "react-router-dom";

function DeleteLocation() {

    const { id } = useParams();
    const navigate = useNavigate();

    const yesBtn = async () => {
        try {
            await axios.delete(`http://localhost:5000/tea/delete/${id});
            navigate("/alllocations"`);
        } catch (error) {
            console.error("Error deleting location", error.message);
            alert("Error deleting location. Please try again.");
        }
    };
    return (
        <div>

            <p>Are you sure you want to delete this location?</p>

            <button style={{ margin: "0 30px 0 0" }} className='btn btn-danger' onClick={yesBtn}>Yes</button>
            <Link to="/alllocations"><button className='btn btn-primary'>No</button></Link>

        </div>

    );
}

export default DeleteLocation;