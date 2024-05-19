import React from "react";
import axios from "axios";
import { Link, useParams, useNavigate } from "react-router-dom";

export default function DeleteIn() {

    const { id , incomeID} = useParams();
    const navigate = useNavigate();


    const yesBtn = async () => {
        axios.delete(`https://hendriks-tea-management-system-backend.vercel.app/incomeRt/delete/${incomeID}`).then(() => {
            alert("Income delete")
            navigate(`/financial/HomeIncome/${id}`)
        }).catch((err) => {
            alert(err)
        })
    }


    return (
        <div className='absolute mt-48 left-1/3 w-1/2 '>

            <p>Are you sure you want to delete this income?</p>

            <button
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-4 ml-64" onClick={yesBtn}>Yes</button>
            <Link to="/HomeIncome"> <button
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-4 ml-50">No</button></Link>
        </div>
    );
}