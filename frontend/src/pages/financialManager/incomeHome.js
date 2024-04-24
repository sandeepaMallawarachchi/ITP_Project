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
            <Button onClick={handlePrint} color="blue" className="my-10 " style={{ marginLeft: "2rem" }}> Download Report</Button>
            <div ref={componentRef} >
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
                                    <button type="button" class="btn btn-secondary btn-lg" onClick={() => handleUpdateIncomeBtn(incomes._id, id)}>Update Income</button>
                                    <button type="button" class="btn btn-secondary btn-lg" onClick={() => handleDeleteIncomeBtn(incomes._id, id)}>Delete Income</button>
                                </td>
                            </tr>
                        ))}

                    </tbody>
                </table>
            </div>
            <button type="button" class="btn btn-secondary btn-lg ml-64" onClick={handleAddIncome}>Add Income</button>
            <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-4" >Total Income: {totalIncome}</button>


        </div>
    )
}