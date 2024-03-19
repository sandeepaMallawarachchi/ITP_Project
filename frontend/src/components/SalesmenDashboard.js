import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

export default function SalesmenDashboard() {
    const { id } = useParams();
    const [sales, setSales] = useState([]);
    const [totalSales, setTotalSales] = useState(0);

    useEffect(() => {
        const fetchSalesDetails = async () => {
            try {
                const res = await axios.get(`http://localhost:5000/sales/getDailySales/${id}`);
                const { salesDetails, totalSales } = res.data;
                setSales(salesDetails);
                setTotalSales(totalSales);
            } catch (error) {
                console.log("error", error.message);
            }
        };

        fetchSalesDetails();
    }, [id]);

    const saleSummary = sales.map(sale => ({ name: sale.teaType, value: sale.amount }));

    return (
        <div className='relative ml-24 h-screen' style={{marginTop:"-350px"}}>
            <div>You have done <span className='text-green-500 text-2xl'>{totalSales}</span> Sales today</div>
            <div className='flex justify-center'>
                <BarChart
                    width={500}
                    height={300}
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
                    <CartesianGrid strokeDasharray="3 3" />
                    <Bar dataKey="value" fill="#07b307" />
                </BarChart>
            </div>
        </div>

    );
}
