import React from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";

function DeleteEmployee() {
    const { id, empId } = useParams();
    
    const navigate = useNavigate();
    
    const yesBtn = async () => {
        try {
            await axios.delete(`http://localhost:8070/empLogin/delete/${empId}`);
            alert("Employee deleted!");
            navigate(`/staff/allEmployees/${id}`);
        } catch (error) {
            console.error("Error deleting employee", error.message);
            alert("Error deleting employee. Please try again.");
        }
    };

    return (
        <div className='absolute mt-48 left-1/3 w-1/2 '>
            <p>Are you sure you want to delete this employee?</p>
            <button style={{ margin: "0 30px 0 0" }} className='btn btn-danger' onClick={yesBtn}>Yes</button>
            <Link to={`/staff/allEmployees/${id}`}><button className='btn btn-primary'>No</button></Link>
        </div>
    );
}

export default DeleteEmployee;
