import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Home() {
    const navigate = useNavigate();
    const [expenses, setExpenses] = useState([]);
    const [totalSalary, setTotalSalary] = useState(0);

    useEffect(() => {
        axios.get("http://localhost:8070/expenses/display")
            .then((res) => {
                setExpenses(res.data);
            })
            .catch((error) => {
                alert(error.message);
            });

    }, []);

    useEffect(() => {
        axios.get("http://localhost:8070/totalSalary/TotalSalary")
            .then((res) => {
                const totalSalary = res.data.totalSalary;
                setTotalSalary(totalSalary);
            })
            .catch((error) => {
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
        <div className="container mx-auto p-4">
            <h1 className="text-3xl mb-4">January (2024)</h1>
            <table className="table-auto border-collapse border border-gray-400 w-full">
                <thead>
                    <tr>
                        <th className="border border-gray-400 px-4 py-2">Date</th>
                        <th className="border border-gray-400 px-4 py-2">Category</th>
                        <th className="border border-gray-400 px-4 py-2">Description</th>
                        <th className="border border-gray-400 px-4 py-2">Amount</th>
                        <th className="border border-gray-400 px-4 py-2">Action</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className="border border-gray-400 px-4 py-2">2024/3/2</td>
                        <td className="border border-gray-400 px-4 py-2">Salary</td>
                        <td className="border border-gray-400 px-4 py-2">Salary of emp</td>
                        <td className="border border-gray-400 px-4 py-2">{totalSalary}</td>
                        <td className="border border-gray-400 px-4 py-2"></td>
                    </tr>
                    <tr>
                        <td className="border border-gray-400 px-4 py-2">2024/3/2</td>
                        <td className="border border-gray-400 px-4 py-2">Salary</td>
                        <td className="border border-gray-400 px-4 py-2">Salary of emp</td>
                        <td className="border border-gray-400 px-4 py-2">{totalSalary}</td>
                        <td className="border border-gray-400 px-4 py-2"></td>
                    </tr>
                    {expenses.map((expense, index) => (
                        <tr key={expense._id}>
                            <td className="border border-gray-400 px-4 py-2">{expense.date}</td>
                            <td className="border border-gray-400 px-4 py-2">{expense.category}</td>
                            <td className="border border-gray-400 px-4 py-2">{expense.description}</td>
                            <td className="border border-gray-400 px-4 py-2">{expense.amount}</td>
                            <td className="border border-gray-400 px-4 py-2">{expense.action}
                                <button className="bg-blue-500 hover:bg-blue-700 text-black font-bold py-2 px-4 rounded mr-2" onClick={() => updateExpensesBtn(expense._id)}>Update</button>
                                <button className="bg-red-500 hover:bg-red-700 text-black font-bold py-2 px-4 rounded" onClick={() => deleteExpensesBtn(expense._id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-4" onClick={addExpensesBtn}>Add Expenses</button>
        </div>
    );
}
