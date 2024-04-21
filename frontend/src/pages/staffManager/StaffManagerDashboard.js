import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { MdWavingHand } from "react-icons/md";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import { useParams } from 'react-router-dom';

export default function StaffManagerDashboard() {
    const { id } = useParams();
    const [manager, setManager] = useState({
        firstName: "",
        designation: "",
    });
    const currentDate = new Date();
    const [employees, setEmployees] = useState("");

    useEffect(() => {
        const fetchEmployeeDetails = async () => {
            try {
                const res = await axios.get(`http://localhost:8070/empLogin/getManagers`);
                if (Array.isArray(res.data)) {  // Ensure data is an array
                    setEmployees(res.data);
                } else {
                    console.error("Data is not an array", res.data);
                }
            } catch (error) {
                console.log("error", error.message);
            }
        };

        fetchEmployeeDetails();
    }, []);

    useEffect(() => {
        const fetchManagerDetails = async () => {
            try {
                const res = await axios.get(`http://localhost:8070/empLogin/getManager/${id}`);
                console.log(res.data);
                if (res.data) {
                    const { firstName, designation } = res.data;
                    setManager({ firstName, designation });
                }
            } catch (error) {
                console.log("error", error.message);
            }
        };

        fetchManagerDetails();
    }, [id]);

    const employeeCount = employees.map(employee => ({ name: employee.department, Count: employee.empId }));
    const [selectedDate, setSelectedDate] = useState(currentDate.toISOString().split('T')[0]);

    const handleDateChange = (e) => {
        setSelectedDate(e.target.value);
    };

    return (
        <div className='absolute ml-72  w-3/4 mt-40'>
            <MdWavingHand className='absolute h-6 w-6 mr-2 mt-7 ml-5 text-yellow-300' />
            <div className='ml-14 mt-6 text-2xl'>Hello, <span className='text-green-500 font-bold'>{manager.firstName}</span></div>

            <div className="absolute max-w-sm top-5 left-0 ml-[950px]" >
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
                    data={employeeCount}
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
                    <Bar dataKey="Count" fill="#0e9f6e" />
                </BarChart>
            </div>
        </div>
    );
}