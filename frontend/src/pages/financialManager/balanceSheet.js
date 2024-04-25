import React, { useEffect, useState ,useRef } from "react";
import axios from "axios";
import { Link,useParams,useNavigate } from "react-router-dom";
import { useReactToPrint } from 'react-to-print';
import { Button } from "flowbite-react";

export default function BalanceSheet() {

    const {id}=useParams();
    const navigate = useNavigate();
    const [income, setIncome] = useState([]);
    const [totalIncome, setTotalIncome] = useState([]);
    const [totalLiabilities, setTotalLiabilities] = useState(0);
    const [totalBalance, setTotalBalance] = useState(0);
   
    useEffect(() => {
        axios.get("http://localhost:8070/totalLiabilities/totalLiabilities").then((res) => {
            setTotalLiabilities(res.data.totalLiabilities); // Ensure to access the correct property
        }).catch((error) => {
            alert(error.message);
        });

    }, []);

    useEffect(() => {
        axios.get("http://localhost:8070/balanceRt/balances").then((res) => {
            setIncome(res.data);
        }).catch((error) => {
            alert(error.message);
        });

    }, []);

    useEffect(() => {
        axios.get("http://localhost:8070/getTotalBalance/totalBalance")
            .then((res) => {
                const totalBalance = res.data.totalBalance;
                setTotalBalance(totalBalance);
            })
            .catch((error) => {
                alert(error.message);
            });
    }, [income]); 



 
   

    useEffect(() => {
        axios.get("http://localhost:8070/getTotalIncome/getTotalSales")
            .then((res) => {
                const totalIncome = res.data.totalSales;
                setTotalIncome(totalIncome);
            })
            .catch((error) => {
                alert(error.message);
            });
    }, [income]); 

    const addBtn = () => {
        navigate('/addLiabilities'); // Correct the path string
    };

    const handleAddLiabilities= () => {
        navigate(`/financial/addLiabilities/${id}`);
    }


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


    return (
        <div className='absolute mt-40 left-1/3 w-1/2 '>
            <Button onClick={handlePrint} color="blue" className="my-10 " style={{marginLeft:"2rem"}}> Download Report</Button>
                <div  ref={componentRef} >
            <h1 className="text-3xl font-bold mb-4">January (2024)</h1>
            <div className="flex justify-center">
                <table className="table-auto w-75%   border border-black mr-10 mt-18">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="px-4 py-2 border border-black">Liabilities</th>
                            <th className="px-4 py-2 border border-black">Description</th>
                            <th className="px-4 py-2 border border-black">Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        {income.map((income) => (
                            <tr key={income._id} className="border-b border-black">
                                <td className="px-4 py-2 border border-black">{income.liabilities}</td>
                                <td className="px-4 py-2 border border-black">{income.description}</td>
                                <td className="px-4 py-2 border border-black">{income.amount}</td>
                            </tr>
                        ))}
                        <p >Total Liabilities: {totalLiabilities}</p>
                    </tbody>
                
                </table>
                <br></br>
                
                
            </div>
            <button
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-4 ml-64" onClick={handleAddLiabilities}>Add liabilities</button>
           
            <div className="flex justify-center">
                <table className="table-auto w-75%   border border-black mr-10 mt-20">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="px-4 py-2 border border-black">Assets</th>
                            <th className="px-4 py-2 border border-black">Description</th>
                            <th className="px-4 py-2 border border-black">Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="border border-gray-400 px-4 py-2">Income</td>
                            <td className="border border-gray-400 px-4 py-2">Income</td>
                            <td className="border border-gray-400 px-4 py-2">{totalIncome}</td>
                        </tr>
                        
                        <p >Total Assets: {totalIncome}</p>
                    </tbody>
                </table>
                <div className="flex justify-center">
   
</div>

            </div>
            <p className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-4 ml-60 mr-60" >
        {totalBalance < 0 ? 'Loss' : 'Profit' }: {Math.abs(totalBalance)}
    </p>
        </div>
        </div>
    );
}