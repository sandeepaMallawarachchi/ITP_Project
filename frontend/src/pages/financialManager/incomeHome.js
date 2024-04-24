import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useReactToPrint } from 'react-to-print';
import { Button } from "flowbite-react";

export default function HomeIn() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [income, setIncome] = useState([]);
    const [totalIncome, setTotalIncome] = useState([]);


    useEffect(() => {
        axios.get("http://localhost:8070/incomeRt/displayIncome").then((res) => {
            setIncome(res.data);
        }).catch((error) => {
            alert(error.message);
        });

    }, []);

    useEffect(() => {
        axios.get("http://localhost:8070/incomeRt/getTotalIncome")
            .then((res) => {
                const totalIncome = res.data.getTotalIncome;
                setTotalIncome(totalIncome);
            })
            .catch((error) => {
                alert(error.message);
            });
    }, [income]);


    const componentRef = useRef();

    const handlePrint = useReactToPrint({
        content: () => componentRef.current,//specifies the content to be print
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
    `
    })




    const handleDeleteIncomeBtn = (incomeID) => {
        navigate(`/financial/deleteIncome/${incomeID}/${id}`);
    };

    const handleUpdateIncomeBtn = (incomeID) => {
        navigate(`/financial/updateIncome/${incomeID}/${id}`);
    };


    const handleAddIncome = () => {
        navigate(`/financial/addIncome/${id}`);
    }

    return (



        <div className='absolute mt-48 left-1/3 w-1/2 '>
            <Button
                onClick={handlePrint}
                color="blue"
                className="mt-24 ml-64" > Download Report</Button>
            <div ref={componentRef} >
                <h1 className="text-3xl mb-4">January ( 2024 )</h1>
                <div className="flex justify-center ml-64"></div>
                <table className="table-auto border-collapse border border-gray-400 w-full">
                    <thead>
                        <tr>
                            <th className="border border-gray-400 px-4 py-2">Date</th>
                            <th className="border border-gray-400 px-4 py-2">Category</th>
                            <th className="border border-gray-400 px-4 py-2">Description</th>
                            <th className="border border-gray-400 px-4 py-2">Amount</th>
                            <th className="border border-gray-400 px-20 py-2">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {income.map((incomes) => (
                            <tr key={incomes._id}>
                                <td className="border border-gray-400 px-4 py-2">{incomes.date}</td>
                                <td className="border border-gray-400 px-4 py-2">{incomes.category}</td>
                                <td className="border border-gray-400 px-4 py-2">{incomes.description}</td>
                                <td className="border border-gray-400 px-4 py-2">{incomes.amount}</td>
                                <td>
                                    <button className="mt-5 focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                                        onClick={() => handleUpdateIncomeBtn(incomes._id, id)}>Update Income
                                    </button>
                                    <button className="mt-5 focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800" onClick={() => handleDeleteIncomeBtn(incomes._id, id)}>Delete Income</button>
                                </td>
                            </tr>
                        ))}

                    </tbody>
                </table>
            </div>
            <button
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-4 ml-64" onClick={handleAddIncome}>Add Income</button>
            <button
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-4 ml-64" >Total Income: {totalIncome}</button>


        </div>
    )
}