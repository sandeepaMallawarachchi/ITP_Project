import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import { MdWavingHand } from "react-icons/md";
import helloMsg from '../../images/dashboardIntro.gif';

export default function SalesmenDashboard() {
    const { id } = useParams();
    const [sales, setSales] = useState([]);
    const [totalSales, setTotalSales] = useState(0);
    const [totalAmount, setTotalAmount] = useState(0);
    const [totalCustomers, setTotalCustomers] = useState(0);
    const currentDate = new Date().toISOString().split("T")[0];
    const [salesman, setSalesman] = useState({
        name: "",
        username: "",
    });
    const [helloGifVisible, setHelloGifVisible] = useState(false);
    const [helloGifSrc, setHelloGifSrc] = useState(helloMsg);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchSalesmanDetails = async () => {
            try {
                const token = localStorage.getItem('token');
                console.log("token", token);

                if (!token) {
                    navigate('/');
                }
                else {
                    const res = await axios.get(`https://hendriks-tea-management-system-backend.vercel.app/salesmen/salesmenDashboard/${id}`, {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    });

                    console.log(res.data);
                    const salesmanData = res.data.salesman || res.data;
                    const { name, username } = salesmanData;
                    setSalesman({ name, username });
                }
            } catch (error) {
                console.log("error", error.message);
            }
        };

        fetchSalesmanDetails();
    }, [id]);

    useEffect(() => {
        const fetchSalesDetails = async () => {
            try {
                const res = await axios.get(`https://hendriks-tea-management-system-backend.vercel.app/sales/getDailySales/${id}`);

                if (res.data.error) {
                    setHelloGifVisible(true);
                }

                const { salesDetails, totalSales, totalAmount, customers } = res.data;
                setSales(salesDetails);
                setTotalSales(totalSales);
                setTotalAmount(totalAmount);
                setTotalCustomers(customers);
            } catch (error) {
                setHelloGifVisible(true);
                console.log("error", error.message);
            }
        };

        fetchSalesDetails();
    }, [id]);

    const saleSummary = sales.map(sale => ({ name: sale.productName, TotalSales: sale.amount }));

    const [selectedDate, setSelectedDate] = useState(currentDate);

    const handleDateChange = (e) => {
        setSelectedDate(e.target.value);
    };

    return (
        <div className='absolute ml-72  w-3/4 mt-40'>
            <MdWavingHand className='absolute h-6 w-6 mr-2 mt-7 ml-5 text-yellow-300' />
            <div className='ml-14 mt-6 text-2xl'>Hello, <span className='text-green-500 font-bold'>{salesman.name}</span></div>

            <div className="absolute max-w-sm top-5 left-0 ml-[950px]" >
                <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                    <svg
                        className="w-4 h-4 text-gray-500 dark:text-gray-400"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                    >
                        <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
                    </svg>
                </div>
                <input
                    type="date"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Select date"
                    value={selectedDate}
                    onChange={handleDateChange}
                />
            </div>

            <div className='flex justify-center mt-20 ml-2'>
                <BarChart
                    width={850}
                    height={450}
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
                    <Bar dataKey="TotalSales" fill="rgb(14 159 110 )" />
                </BarChart>

                {/* hello gif */}
                <div className={`absolute pl-48 h-80 bg-white w-1/2 ${helloGifVisible ? 'z-50' : 'hidden'}`}>
                    <img className='w-1/2' src={helloGifSrc} />
                    <h1 className=' absolute text-5xl text-green-500 font-bold left-16'>Let's Sell Something</h1>
                </div>
            </div>
            <div className='w-full h-36 flex pl-44 space-x-10 mt-10 ml-3'>
                <div className='w-1/4 border rounded-lg flex justify-center items-center shadow-lg h-full bg-green-500'>
                    <div className='flex flex-col justify-center items-center text-2xl font-bold'>Today sales <span className="ml-2 mt-5 text-white ">{totalSales}</span></div>
                </div>
                <div className='w-1/4 border rounded-lg flex justify-center items-center shadow-md h-full bg-green-500'>
                    <div className='flex flex-col justify-center items-center text-2xl font-bold'>Sold Amount <span className="ml-2 mt-5 text-white ">{totalAmount}</span></div>
                </div>
                <div className='w-1/4 border rounded-lg flex justify-center items-center shadow-md h-full bg-green-500'>
                    <div className='flex flex-col justify-center items-center text-2xl font-bold'>Total Customers <span className="ml-2 mt-5 text-white">{totalCustomers}</span></div>
                </div>
            </div>
        </div>
    );
}
