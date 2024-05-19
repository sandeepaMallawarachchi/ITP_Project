import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { MdWavingHand } from "react-icons/md";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import { useParams } from 'react-router-dom';

export default function StaffManagerDashboard() {
    const { id } = useParams();
    const [manager, setManager] = useState({ firstName: "", designation: "" });
    const [departmentData, setDepartmentData] = useState([]);

    useEffect(() => {
        const fetchManagerDetails = async () => {
            const res = await axios.get(`https://hendriks-tea-management-system-backend.vercel.app/empLogin/getManager/${id}`);
            const managerData = res.data.manager || res.data;
            setManager({ firstName: managerData.firstName, designation: managerData.designation });
        };

        const fetchDepartmentData = async () => {
            const res = await axios.get('https://hendriks-tea-management-system-backend.vercel.app/empLogin/getManagers');
            const employees = res.data.departmentDetails;
            aggregateDepartmentData(employees);
        };

        fetchManagerDetails();
        fetchDepartmentData();
    }, [id]);

    const aggregateDepartmentData = (employees) => {
        const aggregatedData = employees.reduce((acc, employee) => {
            const existingDept = acc.find(dept => dept.department === employee.department);
            if (existingDept) {
                existingDept.totalEmployees += 1;  // Assuming each empId represents one employee
            } else {
                acc.push({
                    department: employee.department,
                    totalEmployees: 1
                });
            }
            return acc;
        }, []);
        setDepartmentData(aggregatedData);
    };

    return (
        <div className='absolute ml-72 w-3/4 mt-40'>
            <MdWavingHand className='absolute h-6 w-6 mr-2 mt-7 ml-5 text-yellow-300' />
            <div className='ml-14 mt-6 text-2xl'>Hello, <span className='text-green-500 font-bold'>{manager.firstName}</span></div>
            <div className='flex justify-center mt-20 ml-2'>
                <BarChart width={850} height={450} data={departmentData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <XAxis dataKey="department" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="totalEmployees" fill="#0e9f6e" />
                </BarChart>
            </div>
        </div>
    );
}
