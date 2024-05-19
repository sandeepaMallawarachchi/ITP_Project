import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { MdWavingHand } from "react-icons/md";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import { useParams } from 'react-router-dom';

export default function FinancialManagerDashBoard() {
    const { id } = useParams();
    const [manager, setManager] = useState({
        firstName: "",
        designation: "",
    });

    const [totalIncome, setTotalIncome] = useState(0); // Initialize totalIncome as 0
    const [totalExpenses, setTotalExpenses] = useState(0); // Initialize totalExpenses as 0
    

    useEffect(() => {
        axios.get("https://hendriks-tea-management-system-backend.vercel.app/incomeRt/getTotalIncome")
            .then((res) => {
                const totalIncomeData = res.data.getTotalIncome;
                console.log("Total Income data:", totalIncomeData);
                setTotalIncome(totalIncomeData);
            })
            .catch((error) => {
                alert(error.message);
                setTotalIncome(0); // Set totalIncome to 0 on error
            });
    }, []);

    useEffect(() => {
        axios.get("https://hendriks-tea-management-system-backend.vercel.app/getTotalExpenses/getTotalExpenses")
        .then((res) => {
            const totalExpensesData = res.data.getTotalExpenses;
            console.log("Total Expenses data:", totalExpensesData);
            setTotalExpenses(totalExpensesData);
        })
        .catch((error) => {
            alert(error.message);
            setTotalExpenses(0); // Set totalExpenses to 0 on error
        });
}, []);



    useEffect(() => {
        const fetchManagerDetails = async () => {
            try {
                const res = await axios.get(`https://hendriks-tea-management-system-backend.vercel.app/empLogin/getManager/${id}`);
                console.log("Manager data:", res.data);
                const managerData = res.data.manager || res.data;
                const { firstName, designation } = managerData;
                setManager({ firstName, designation });
            } catch (error) {
                console.log("Error fetching manager details:", error.message);
            }
        };

        fetchManagerDetails();
    }, [id]);

    const data = [
        { name: 'Income', value: totalIncome },
        { name: 'Expenses', value: totalExpenses },
    ];
    

    return (
        <div className='absolute ml-72 w-3/4 mt-40'>
            <MdWavingHand className='absolute h-6 w-6 mr-2 mt-7 ml-5 text-yellow-300' />
            <div className='ml-14 mt-6 text-2xl'>Hello, <span className='text-green-500 font-bold'>{manager.firstName}</span></div>

            <div className='flex justify-center mt-20 ml-2'>
                <BarChart
                    width={850}
                    height={450}
                    data={data}
                    margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                    }}
                >
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="value" fill="#0e9f6e" />
                </BarChart>
            </div>
        </div>
    );
}