import React from "react";
import axios from "axios";
import { Link, useParams, useNavigate } from "react-router-dom";

export default function DeleteIn() {

    const { id } = useParams();
    const navigate = useNavigate();


    const yesBtn = async () => {
        axios.delete(`http://localhost:3013/incomeRt/delete/${id}`).then(() => {
            alert("Income delete")
            navigate("/HomeIncome")
                }).catch((err) => {
                    alert(err)
                })
            }
    

    return (
        <div>

            <p>Are you sure you want to delete this employee?</p>

            <button style={{ margin: "0 30px 0 0" }} className='btn btn-danger' onClick={yesBtn}>Yes</button>
            <Link to="/HomeIncome"><button className='btn btn-primary'>No</button></Link>
        </div>
    );
}

