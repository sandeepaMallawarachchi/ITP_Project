import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { useReactToPrint } from "react-to-print";
import { Button } from "flowbite-react";

export default function Home() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [expenses, setExpenses] = useState([]);
    const [totalSalary, setTotalSalary] = useState(0);
    const [totalExpenses, setTotalExpenses] = useState(0);
    const [searchTerm, setSearchTerm] = useState("");

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
        axios.get("http://localhost:8070/totalSalary/totalSalary")
            .then((res) => {
                const totalSalary = res.data.totalSalary;
                setTotalSalary(totalSalary);
            })
            .catch((error) => {
                alert(error.message);
            });
    }, []);

    useEffect(() => {
        axios.get("http://localhost:8070/getTotalExpenses/getTotalExpenses")
            .then((res) => {
                const totalExpenses = res.data.getTotalExpenses;
                setTotalExpenses(totalExpenses);
            })
            .catch((error) => {
                alert(error.message);
            });
    }, [expenses]);

    const componentRef = useRef();

    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
        documentTitle: "Expenses Report",
        pageStyle: `
        @page {
            size: A4;
            margin: 1cm;
        }
        body {
            font-family: Arial, sans-serif;
            font-size: 12px;
        }
        table {
            width: 100%;
            border-collapse: collapse;
        }
        th, td {
            border: 1px solid #dddddd;
            text-align: left;
            padding: 8px;
        }
        th {
            background-color: #f2f2f2;
        }
        tr:nth-child(even) {
            background-color: #f2f2f2;
        }
        .document-title {
            text-align: center;
            margin-bottom: 20px;
            font-size: 18px;
            font-weight: bold;
        }
    `,
    });

    const handleDeleteExpensesBtn = (expenseID) => {
        navigate(`/financial/deleteExpen/${expenseID}/${id}`);
    };

    const handleUpdateExpensesBtn = (expenseID) => {
        navigate(`/financial/updateExpenses/${expenseID}/${id}`);
    };

    const handleAddExpenses = () => {
        navigate(`/financial/add/${id}`);
    };

    const filteredExpenses = expenses.filter((expense) =>
        expense.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="container mx-auto p-4 mr-64">
            
            <Button
                onClick={handlePrint}
                color="blue"
                className="mt-24 ml-64"
            >
                Download Report
            </Button>
            
            <div className="absolute mt-2 left-1/3 w-1/2">
                <input
                    type="text"
                    placeholder="Search by category..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="border border-gray-300 rounded-md px-3 py-1 mb-4"
                />
            </div>
            <div ref={componentRef}>
                <h1 className="text-3xl mb-4">January (2024)</h1>
                <div className="flex justify-center ml-64">
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
                            {filteredExpenses.map((expense) => (
                                <tr key={expense.index}>
                                    <td className="border border-gray-400 px-4 py-2">{expense.date}</td>
                                    <td className="border border-gray-400 px-4 py-2">{expense.category}</td>
                                    <td className="border border-gray-400 px-4 py-2">{expense.description}</td>
                                    <td className="border border-gray-400 px-4 py-2">{expense.amount}</td>
                                    <td className="border border-gray-400 px-4 py-2">{expense.action}
                                        <button
                                            className="mt-5 focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                                            onClick={() => handleUpdateExpensesBtn(expense._id, id)}
                                        >
                                            Update
                                        </button>
                                        <button
                                            className="mt-5 focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
                                            onClick={() => handleDeleteExpensesBtn(expense._id, id)}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <button
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-4 ml-64"
                onClick={handleAddExpenses}
            >
                Add Expenses
            </button>
            <button
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-4 ml-64"
            >
                Total Expenses: {totalExpenses}
            </button>
        </div>
    );
}
