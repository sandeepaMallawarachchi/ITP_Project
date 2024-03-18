import React from "react";
import axios from "axios";
import { Link, useParams, useNavigate } from "react-router-dom";

function DeleteEmployee() {

    const { id } = useParams();
    const navigate = useNavigate();

    const yesBtn = async () => {
        try {
            await axios.delete(`http://localhost:8070/staff/delete/${id}`);
            navigate("/allEmployees");
        } catch (error) {
            console.error("Error deleting employee", error.message);
            alert("Error deleting employee. Please try again.");
        }
    };
    return (
        <div>

            <p>Are you sure you want to delete this employee?</p>

            <button style={{ margin: "0 30px 0 0" }} className='btn btn-danger' onClick={yesBtn}>Yes</button>
            <Link to="/allEmployees"><button className='btn btn-primary'>No</button></Link>

        </div>

    );
}

export default DeleteEmployee;