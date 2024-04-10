import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Home() {
    const navigate = useNavigate();
    const [expenses, setExpenses] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:8070/expenses/display").then((res) => {
            setExpenses(res.data);
        }).catch((error) => {
            alert(error.message);
        });

    }, []);

    const addExpensesBtn = () => {
        navigate(`/add`);
    };

    const deleteExpensesBtn = (id) => {
        navigate(`/deleteExpen/${id}`);
    };

    const updateExpensesBtn = (id) => {
        navigate(`/updateExpenses/${id}`);
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
                    {expenses.map((expense) => (
                        <tr key={expense._id}>
                            <td>{expense.date}</td>
                            <td>{expense.category}</td>
                            <td>{expense.description}</td>
                            <td>{expense.amount}</td>
                            <td><button type="button" class="btn btn-secondary btn-lg" onClick={() => updateExpensesBtn(expense._id)}>Update Expenses</button>
                                <button type="button" class="btn btn-secondary btn-lg" onClick={() => deleteExpensesBtn(expense._id)}>Delete Expenses</button></td>

                        </tr>
                    ))}


                </tbody>
            </table>
            <button type="button" class="btn btn-secondary btn-lg" onClick={addExpensesBtn}>Add Expenses</button>


        </div>
    )
}