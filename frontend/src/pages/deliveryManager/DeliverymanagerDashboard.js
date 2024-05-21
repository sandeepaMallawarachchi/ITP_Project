import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { MdWavingHand } from "react-icons/md";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import { useParams } from 'react-router-dom';

export default function DeliverymanagerDashboard() {
    const { id } = useParams();
    const [manager, setManager] = useState({
        firstName: "",
        designation: "",
    });

    const [monthlyCosts, setMonthlyCosts] = useState([]);
    const currentDate = new Date();

    useEffect(() => {
        const fetchMonthlyCosts = async () => {
            try {
                const monthlyCostsData = [];
                for (let i = 1; i <= 12; i++) {
                    const res = await axios.get(`http://localhost:8070/report/`, {
                        params: { month: i }
                    });
                    const reports = res.data.reports || [];
                    const totalCost = reports.reduce((acc, curr) => acc + curr.totalCost, 0);
                    monthlyCostsData.push({ month: i, totalCost });
                }
                setMonthlyCosts(monthlyCostsData);
            } catch (error) {
                console.log("Error fetching monthly costs:", error.message);
            }
        };

        fetchMonthlyCosts();
    }, []);

    useEffect(() => {
        const fetchManagerDetails = async () => {
            try {
                const res = await axios.get(`http://localhost:8070/empLogin/getManager/${id}`);
                console.log('Manager details:', res.data);
                const managerData = res.data.manager || res.data;
                const { firstName, designation } = managerData;
                setManager({ firstName, designation });
            } catch (error) {
                console.log("Error fetching manager details:", error.message);
            }
        };

        fetchManagerDetails();
    }, [id]);

    return (
        <div className='absolute ml-72 w-3/4 mt-40'>
            <MdWavingHand className='absolute h-6 w-6 mr-2 mt-7 ml-5 text-yellow-300' />
            <div className='ml-14 mt-6 text-2xl'>Hello, <span className='text-green-500 font-bold'>{manager.firstName}</span></div>

            <div className='flex justify-center mt-20'>
                <BarChart
                    width={850}
                    height={450}
                    data={monthlyCosts}
                    margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                    }}
                >
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="totalCost" fill="#0e9f6e" />
                </BarChart>
            </div>
        </div>
    );
}
