import React, { useEffect, useState } from "react";
import axios from "axios";

export default function BalanceSheet() {

    const [income, setIncome] = useState([]);
    const [totalIncome, setTotalIncome] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:8070/balanceRt/displayBalance").then((res) => {
            setIncome(res.data);
        }).catch((error) => {
            alert(error.message);
        });

    }, []);

    useEffect(() => {
        axios.get("http://localhost:8070/getTotalIncome/getTotalIncome")
            .then((res) => {
                const totalIncome = res.data.getTotalIncome;
                setTotalIncome(totalIncome);
            })
            .catch((error) => {
                alert(error.message);
            });
    }, [income]); 






    return (



        <div>
        <h1 className="text-3xl font-bold mb-4">January (2024)</h1>
        <table className="table-auto w-full border border-black">
            <thead>
                <tr className="bg-gray-200">
                    <th className="px-4 py-2 border border-black">Liabilities</th>
                    <th className="px-4 py-2 border border-black">Description</th>
                    <th className="px-4 py-2 border border-black">Amount</th>
                </tr>
            </thead>
            <tbody>
           
                    <tr>
                        <td className="border border-gray-400 px-4 py-2">BankLoan</td>
                        <td className="border border-gray-400 px-4 py-2">BankLoan</td>
                        <td className="border border-gray-400 px-4 py-2">{totalIncome}</td>
                    </tr>
                {income.map((income) => (
                    <tr key={income._id} className="border-b border-black">
                        <td className="px-4 py-2 border border-black">{income.libilities}</td>
                        <td className="px-4 py-2 border border-black">{income.description}</td>
                        <td className="px-4 py-2 border border-black">{income.amount}</td>
                    </tr>
                ))}
            </tbody>
        </table>
        <table className="table-auto w-full border border-black">
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
                {income.map((income) => (
                    <tr key={income._id} className="border-b border-black">
                        <td className="px-4 py-2 border border-black">{income.libilities}</td>
                        <td className="px-4 py-2 border border-black">{income.description}</td>
                        <td className="px-4 py-2 border border-black">{income.amount}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
    

        
    )
}