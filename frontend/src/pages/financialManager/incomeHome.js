import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function HomeIn() {

    const navigate = useNavigate();
    const [income, setIncome] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:8070/incomeRt/displayIncome").then((res) => {
            setIncome(res.data);
        }).catch((error) => {
            alert(error.message);
        });

    }, []);

    const addIncomeBtn = () => {
        navigate(`/addIncome`);
    };

    const deleteIncomeBtn = (id) => {
        navigate(`/deleteIncome/${id}`);
    };

    const updateIncomeBtn = (id) => {
        navigate(`/updateIncome/${id}`);
    };




    return (



        <div>
            <h1>January ( 2024 )</h1>
            <table class="table">
                <thead>
                    <tr>

                        <th scope="col">Date</th>
                        <th scope="col">Category</th>
                        <th scope="col">Description</th>
                        <th scope="col">Amount</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {income.map((incomes) => (
                        <tr key={incomes._id}>
                            <td>{incomes.date}</td>
                            <td>{incomes.category}</td>
                            <td>{incomes.description}</td>
                            <td>{incomes.amount}</td>
                            <td>
                                <button type="button" class="btn btn-secondary btn-lg" onClick={() => updateIncomeBtn(incomes._id)}>Update Income</button>
                                <button type="button" class="btn btn-secondary btn-lg" onClick={() => deleteIncomeBtn(incomes._id)}>Delete Income</button>
                            </td>
                        </tr>
                    ))}

                </tbody>
            </table>
            <button type="button" class="btn btn-secondary btn-lg" onClick={addIncomeBtn}>Add Income</button>


        </div>
    )
}