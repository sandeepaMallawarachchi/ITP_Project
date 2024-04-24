import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

function AddSalary() {
    const [empId, setEmpId] = useState("");
    const [name, setName] = useState("");
    const [designation, setDesignation] = useState("");
    const [month, setMonth] = useState("");
    const [year, setYear] = useState("");
    const [basicSalary, setBasicSalary] = useState(0);
    const [ETFbonus, setETFbonus] = useState(0);
    const [EPFbonus, setEPFbonus] = useState(0);
    const [paymentDate, setPaymentDate] = useState("");

    const months = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    useEffect(() => {
        if (empId) {
            fetchEmpDetails();
        }
    }, [empId]);

    const fetchEmpDetails = async () => {
        try {
            const response = await axios.get(`http://localhost:8070/staff/salary/get/${empId}`);
            const { firstName, designation } = response.data.netSalary; // Adjust to your API response structure
            setName(firstName);
            setDesignation(designation);
        } catch (error) {
            console.error("Error fetching employee details", error.message);
        }
    };

    const navigate = useNavigate();

    const sendData = async (e) => {
        e.preventDefault();
        const newSalary = {
            empId,
            name,
            designation,
            month,
            year,
            basicSalary: parseInt(basicSalary),
            ETFbonus: parseInt(ETFbonus),
            EPFbonus: parseInt(EPFbonus),
            paymentDate
        };

        try {
            await axios.post(`http://localhost:8070/staff/salary/addSalary`, newSalary);
            alert("Success! Salary added");
            navigate(`/salary/${empId}/${month}/${year}`);
        } catch (error) {
            alert("Error! Failed to add salary: " + error.response.data.message); // More specific error handling
            console.error("Error:", error);
        }
    };

    return (
        <div className='absolute mt-48 left-1/3 w-1/2 '>
            <form onSubmit={sendData}>
                <div className="mb-3">
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="empId">Enter Employee ID: </label>
                    <input className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="text" id="empId" value={empId} onChange={(e) => setEmpId(e.target.value)} />
                </div>

                <div className="mb-3">
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="name">Employee Name: </label>
                    <input className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                    type="text" id="name" value={name} />
                </div>

                <div className="mb-3">
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="designation">Designation: </label>
                    <input className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="text" id="designation" 
                    value={designation}/>
                </div>

                <div className="mb-3">
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="month">Select Month: </label>
                    <select className="form-control bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" id="month" value={month} onChange={(e) => setMonth(e.target.value)}>
                        <option value="">Select Month</option>
                        {months.map((month, index) => (
                            <option key={index} value={month}>{month}</option>
                        ))}
                    </select>
                </div>

                <div className="mb-3">
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="year">Enter Year: </label>
                    <input className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="text" id="year" value={year} onChange={(e) => setYear(e.target.value)} />
                </div>

                <div className="mb-3">
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="basicSalary">Enter Basic Salary: </label>
                    <input className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="number" id="basicSalary" value={basicSalary} onChange={(e) => setBasicSalary(e.target.value)} />
                </div>

                <div className="mb-3">
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="ETFbonus">ETF Bonus Amount: </label>
                    <input className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="number" id="ETFbonus" value={ETFbonus} onChange={(e) => setETFbonus(e.target.value)} />
                </div>

                <div className="mb-3">
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="EPFbonus">EPF Bonus Amount: </label>
                    <input className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="number" id="EPFbonus" value={EPFbonus} onChange={(e) => setEPFbonus(e.target.value)} />
                </div>

                <div className="mb-3">
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="paymentDate">Payment Date: </label>
                    <input className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="date" id="paymentDate" value={paymentDate} onChange={(e) => setPaymentDate(e.target.value)} />
                </div>

                <button type="submit" className="btn btn-primary">Add Salary</button>
            </form>
        </div>
    );
}

export default AddSalary;