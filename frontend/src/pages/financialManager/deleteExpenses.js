import React from "react";
import axios from "axios";
import { Link, useParams, useNavigate } from "react-router-dom";

export default function DeleteEx() {

    const { id } = useParams();
    const navigate = useNavigate();


    const yesBtn = async () => {
        axios.delete(`http://localhost:8070/expenses/delete/${id}`).then(() => {
            alert("Expenses delete")
            navigate("/HomeExpenses")
        }).catch((err) => {
            alert(err)
        })
    }

    return (
        <div>

            <p>Are you sure you want to delete this employee?</p>

            <button style={{ margin: "0 30px 0 0" }} className='btn btn-danger' onClick={yesBtn}>Yes</button>
            <Link to="/HomeExpenses"><button className='btn btn-primary'>No</button></Link>
        </div>
    );
}