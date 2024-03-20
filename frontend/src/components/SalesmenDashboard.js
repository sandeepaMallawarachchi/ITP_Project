import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { MdWavingHand } from "react-icons/md";

export default function SalesmenDashboard() {
    const { id } = useParams();
    const [sales, setSales] = useState([]);
    const [totalSales, setTotalSales] = useState(0);
    const [totalAmount, setTotalAmount] = useState(0);
    const [salesman, setSalesman] = useState({
        name: "",
        username: "",
    });

    useEffect(() => {
        const fetchSalesmanDetails = async () => {
            try {
                const res = await axios.get(`http://localhost:5000/salesmen/salesmenDashboard/${id}`);
                console.log(res.data);
                const salesmanData = res.data.salesman || res.data;
                const { name, username } = salesmanData;
                setSalesman({ name, username });
            } catch (error) {
                console.log("error", error.message);
            }
        };

        fetchSalesmanDetails();
    }, [id]);

    useEffect(() => {
        const fetchSalesDetails = async () => {
            try {
                const res = await axios.get(`http://localhost:5000/sales/getDailySales/${id}`);
                const { salesDetails, totalSales, totalAmount } = res.data;
                setSales(salesDetails);
                setTotalSales(totalSales);
                setTotalAmount(totalAmount);
            } catch (error) {
                console.log("error", error.message);
            }
        };

        fetchSalesDetails();
    }, [id]);

    const saleSummary = sales.map(sale => ({ name: sale.teaType, value: sale.amount }));

    return (
        <div className='relative ml-64  w-3/4' style={{ marginTop: "-430px", border: "1px solid" }}>
            <MdWavingHand className='absolute h-6 w-6 mr-2 mt-7 ml-5 text-yellow-300' />
            <div className='ml-14 mt-6 text-2xl'>Hello, <span className='text-green-500 font-bold'>{salesman.name}</span></div>
            <div className='flex justify-center mt-14'>
                <BarChart
                    width={700}
                    height={400}
                    data={saleSummary}
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
                    <Bar dataKey="value" fill="rgb(14 159 110 )" />
                </BarChart>
            </div>
            <div className='w-full h-36 flex pl-44 border border-gray-500 space-x-10 mt-10'>
                <div className='w-1/4 border rounded-lg flex justify-center items-center shadow-md h-full bg-green-500'>
                    <div className='flex flex-col justify-center items-center text-2xl font-bold'>Today sales <span className="ml-2 mt-5 text-white ">{totalSales}</span></div>
                </div>
                <div className='w-1/4 border rounded-lg flex justify-center items-center shadow-md h-full bg-green-500'>
                    <div className='flex flex-col justify-center items-center text-2xl font-bold'>Sold Amount <span className="ml-2 mt-5 text-white ">{totalAmount}</span></div>
                </div>
                <div className='w-1/4 border rounded-lg flex justify-center items-center shadow-md h-full bg-green-500'>
                    <div className='flex flex-col justify-center items-center text-2xl font-bold'>Total Customers <span className="ml-2 mt-5 text-white">{totalSales}</span></div>
                </div>
            </div>
        </div>
    );
}