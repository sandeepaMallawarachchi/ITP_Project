import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from "react-router-dom";

function AddSalary() {
    const [empId, setEmpId] = useState("");
    const [name, setName] = useState("");
    const [designation, setDesignation] = useState("");
    const [month, setMonth] = useState("");
    const [year, setYear] = useState(new Date().getFullYear().toString());
    const [basicSalary, setBasicSalary] = useState(0);
    const [ETFbonus, setETFbonus] = useState(0);
    const [EPFbonus, setEPFbonus] = useState(0);
    const [paymentDate, setPaymentDate] = useState(new Date().toISOString().split('T')[0]);
    const [empIdError, setEmpIdError] = useState("");

    const { id } = useParams();

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
            const response = await axios.get(`https://hendriks-tea-management-system-backend.vercel.app/staff/salary/get/${empId}`);
            const { firstName, designation } = response.data.netSalary; // Adjust to your API response structure
            setName(firstName);
            setDesignation(designation);
        } catch (error) {
            console.error("Error fetching employee details", error.message);
        }
    };

    const navigate = useNavigate();

    useEffect(() => {
        // Recalculate EPF bonus when basicSalary changes
        const epf = 0.2 * basicSalary;
        setEPFbonus(epf);
        
        // Recalculate ETF bonus when basicSalary changes
        const etf = calculateETF(basicSalary);
        setETFbonus(etf);
    }, [basicSalary]);

    // Function to calculate ETF bonus
    const calculateETF = (salary) => {
        // Define your ETF calculation logic here
        return 0.03 * salary;
    };

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
            await axios.post(`https://hendriks-tea-management-system-backend.vercel.app/staff/salary/addSalary`, newSalary);
            alert("Success! Salary added");
            navigate(`/staff/salary/${empId}/${month}/${year}/${id}`);
        } catch (error) {
            alert("Error! Failed to add salary: " + error.response.data.message); // More specific error handling
            console.error("Error:", error);
        }
    };

    const handleEmpIdChange = (value) => {
        const validateEmpId = /^E\d{0,4}$/;
        if (!validateEmpId.test(value)) {
            setEmpIdError("Employee ID should begin with 'E' followed by up to four digits.");
        } else {
            setEmpIdError("");
            setEmpId(value);
        }
    };

    const handleNumericInput = (value, setter) => {
        const regex = /^[0-9\b]+$/;
        if (regex.test(value) || value === "") {
            setter(value);
        }
    };

    return (
        <div className='absolute mt-48 left-1/3 w-1/2 '>
            <form onSubmit={sendData}>
                <div className="mb-3">
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="empId">Enter Employee ID: </label>
                    <input className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="text" id="empId" value={empId} onChange={(e) => handleEmpIdChange(e.target.value)} />
                    {empIdError && <div className="text-red-500">{empIdError}</div>}
                </div>

                <div className="mb-3">
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="name">Employee Name: </label>
                    <input className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        type="text" id="name" value={name} />
                </div>

                <div className="mb-3">
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="designation">Designation: </label>
                    <input className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="text" id="designation"
                        value={designation} />
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
                    <input className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="text" id="year" value={year} readOnly />
                </div>

                <div className="mb-3">
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="basicSalary">Enter Basic Salary: </label>
                    <input className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="text" id="basicSalary" value={basicSalary} onChange={(e) => handleNumericInput(e.target.value, setBasicSalary)} />
                </div>

                <div className="mb-3">
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="ETFbonus">ETF Bonus Amount: </label>
                    <input className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="text" id="ETFbonus" value={ETFbonus} onChange={(e) => handleNumericInput(e.target.value, setETFbonus)} />
                </div>

                <div className="mb-3">
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="EPFbonus">EPF Bonus Amount: </label>
                    <input className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="text" id="EPFbonus" value={EPFbonus} />
                </div>

                <div className="mb-3">
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="paymentDate">Payment Date: </label>
                    <input className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="date" id="paymentDate" value={paymentDate} onChange={(e) => setPaymentDate(e.target.value)} />
                </div>

                <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Add Salary</button>
            </form>
        </div>
    );
}

export default AddSalary;
