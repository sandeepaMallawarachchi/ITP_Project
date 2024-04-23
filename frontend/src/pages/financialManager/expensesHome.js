import React, { useState, useEffect,useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useReactToPrint } from 'react-to-print';
import { Button } from "flowbite-react";

export default function Home() {
    const navigate = useNavigate();
    const [expenses, setExpenses] = useState([]);
    const [totalSalary, setTotalSalary] = useState(0);
    const [totalExpenses, setTotalExpenses] = useState(0);




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
        content :()=> componentRef.current,//specifies the content to be print
        documentTitle : "Expenses Report",
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
    `
    })


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
            <Button onClick={handlePrint} color="blue" className="my-10 " style={{marginLeft:"2rem"}}> Download Report</Button>
                <div  ref={componentRef} >
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
                   
                    {expenses.map((expense, index) => {
                        return (
                        <tr key={expense.index}>
                            <td className="border border-gray-400 px-4 py-2">{expense.date}</td>
                            <td className="border border-gray-400 px-4 py-2">{expense.category}</td>
                            <td className="border border-gray-400 px-4 py-2">{expense.description}</td>
                            <td className="border border-gray-400 px-4 py-2">{expense.amount}</td>
                            <td className="border border-gray-400 px-4 py-2">{expense.action}
                                <button className="bg-blue-500 hover:bg-blue-700 text-black font-bold py-2 px-4 rounded mr-2" onClick={() => updateExpensesBtn(expense._id)}>Update</button>
                                <button className="bg-red-500 hover:bg-red-700 text-black font-bold py-2 px-4 rounded" onClick={() => deleteExpensesBtn(expense._id)}>Delete</button>
                            </td>
                        </tr>
                        )
})}
                </tbody>
            </table>
            </div>
            <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-4" onClick={addExpensesBtn}>Add Expenses</button>
            <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-4" >Total Expenses: {totalExpenses}</button>
        </div>
    );
}
