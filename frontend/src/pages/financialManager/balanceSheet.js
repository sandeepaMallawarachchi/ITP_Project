import React, { useEffect, useState } from "react";
import axios from "axios";

export default function BalanceSheet() {

    const [income, setIncome] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:8070/balanceRt/displayBalance").then((res) => {
            setIncome(res.data);
        }).catch((error) => {
            alert(error.message);
        });

    }, []);






    return (



        <div>
            <h1>January ( 2024 )</h1>
            <table class="table">
                <thead>
                    <tr>

                        <th scope="col">Libilities</th>
                        <th scope="col">Description</th>
                        <th scope="col">Amount</th>
                     
                    </tr>
                    
                </thead>
                <tbody>
                    {income.map((incomes) => (
                        <tr key={incomes._id}>
                            <td>{incomes.libilities}</td>
                            <td>{incomes.description}</td>
                            <td>{incomes.amount}</td>

                        </tr>
                    ))}

                </tbody>
 
            </table>


        </div>

        
    )
}