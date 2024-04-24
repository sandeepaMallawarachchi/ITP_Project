import React from "react";
import axios from "axios";
import { Link, useParams, useNavigate } from "react-router-dom";

export default function DeleteEx() {

    const { id, expenseID } = useParams();
    const navigate = useNavigate();


    const yesBtn = async () => {
        axios.delete(`http://localhost:8070/expenses/delete/${expenseID}`).then(() => {
            alert("Expenses delete")
            navigate(`/financial/HomeExpenses/${id}`)
        }).catch((err) => {
            alert(err)
        })
    }

    return (
        <div className='absolute mt-48 left-1/3 w-1/2 '>

            <p>Are you sure you want to delete this employee?</p>

            <button style={{ margin: "0 30px 0 0" }} className='btn btn-danger' onClick={yesBtn}>Yes</button>
            <Link to="/HomeExpenses"><button className='btn btn-primary'>No</button></Link>
        </div>
    );
}