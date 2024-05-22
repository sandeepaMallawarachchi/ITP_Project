import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { MdWavingHand } from "react-icons/md";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, PieChart, Pie, } from 'recharts';
import { useParams } from 'react-router-dom';

export default function SalesManagerDashboard() {

    const { id } = useParams();
    const [manager, setManager] = useState({
        firstName: "",
        designation: "",
    });

    const [sales, setSales] = useState([]);
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1;

    useEffect(() => {
        const fetchSalesDetails = async () => {
            try {
                const res = await axios.get(`https://hendriks-tea-management-system-backend.vercel.app/salesManagement/getTotalSales`);
                const { salesDetails } = res.data;
                setSales(salesDetails);
                console.log(salesDetails)
            } catch (error) {
                console.log("error", error.message);
            }
        };

        fetchSalesDetails();
    }, [currentMonth]);

    useEffect(() => {
        const fetchManagerDetails = async () => {
            try {
                const res = await axios.get(`https://hendriks-tea-management-system-backend.vercel.app/empLogin/getManager/${id}`);
                console.log(res.data);
                const managerData = res.data.manager || res.data;
                const { firstName, designation } = managerData;
                setManager({ firstName, designation });
            } catch (error) {
                console.log("error", error.message);
            }
        };

        fetchManagerDetails();
    }, [id]);

    const saleSummary = sales.map(sale => ({ name: sale.productName, TotalSales: sale.amount }));

    const [selectedDate, setSelectedDate] = useState(currentDate.toISOString().split('T')[0]);

    const handleDateChange = (e) => {
        setSelectedDate(e.target.value);
    };

    return (
        <div className='absolute ml-72  w-3/4 mt-40'>
            <MdWavingHand className='absolute h-6 w-6 mr-2 mt-7 ml-5 text-yellow-300' />
            <div className='ml-14 mt-6 text-2xl'>Hello, <span className='text-green-500 font-bold'>{manager.firstName}</span></div>

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
                    <Bar dataKey="TotalSales" fill="#0e9f6e" />
                </BarChart>
                {/* <PieChart width={400} height={400}>
                    <Pie
                        dataKey="TotalSales"
                        isAnimationActive={false}
                        data={saleSummary}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        fill="#0e9f6e"
                        label
                    />
                    <Tooltip />
                </PieChart> */}
            </div>

        </div>
    );
}