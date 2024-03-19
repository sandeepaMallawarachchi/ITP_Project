import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { MdWavingHand } from "react-icons/md";

export default function SalesmenDashboard() {
    const { id } = useParams();
    const [sales, setSales] = useState([]);
    const [totalSales, setTotalSales] = useState(0);
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
        <div className='relative ml-64  w-3/4' style={{ marginTop: "-430px", border:"1px solid" }}>
            <MdWavingHand className='absolute h-6 w-6 mr-2 mt-7 ml-5 text-yellow-300'/>
            <div className='ml-14 mt-6 text-2xl'>Hello, <span className='text-green-500'>{salesman.name}</span></div>
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
