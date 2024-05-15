import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'

function AddVacation() {

    const [date, setDate] = useState("");
    const [empName, setEmpName] = useState("");
    const [title, setTitle] = useState("");
    const [department, setDepartment] = useState("");
    const [daysEarned, setDaysEarned] = useState("");
    const [reqDate, setReqDate] = useState("");
    const [returningDate, setReturningDate] = useState("");
    const [totDays, setTotDays] = useState("");

    const titles = [
        "Personal Leave", "Funeral/Bereavement", "Jury Duty", "Family Reasons", "Medical Leave", "To Vote",
        "Other"
    ];

    function sendData(e) {
        e.preventDefault();

        const newVac = {
            date,
            empName,
            title,
            department,
            daysEarned,
            reqDate,
            returningDate,
            totDays,
        }

        try {
            axios.post(`http://localhost:8070/staff/vacation/add`, newVac);
            alert("Vacation Request Success! ");
        } catch (error) {
            alert("Error! Failed to request a vacation");
            console.error("Error:", error);
        }
    }

    const navigate = useNavigate();

    const handleAllVacations = () => {
        navigate(`/allVacations`);
    }

    return (
        <div className='absolute mt-48 left-1/3 w-1/2 '>
            <h1 className="text-green-500 font-bold">Employee Vacation Request form</h1>
            <form onSubmit={sendData}>
                <div class="mb-3">
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" for="date">Enter Date: </label>
                    <input className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="date" id="date" required onChange={(e) => {
                        setDate(e.target.value);
                    }} />
                </div>

                <div class="mb-3">
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" for="empName">Enter Employee Name: </label>
                    <input className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="text" id="empName" required onChange={(e) => {
                        setEmpName(e.target.value);
                    }} />
                </div>

                <div className="mb-3">
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="month">Select Reason for Request: </label>
                    <select className="form-control bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" id="month"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}>
                        {titles.map((title, index) => (
                            <option key={index} value={title}>{title}</option>
                        ))}
                    </select>
                </div>

                <div class="mb-3">
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" for="department">Enter Department: </label>
                    <input className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="text" id="department" required onChange={(e) => {
                        setDepartment(e.target.value);
                    }} />
                </div>

                <div class="mb-3">
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" for="daysEarned">Enter Vacation Days Earned: </label>
                    <input className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="text" id="daysEarned" required onChange={(e) => {
                        setDaysEarned(e.target.value);
                    }} />
                </div>

                <div class="mb-3">
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" for="reqDate">Enter Requesting Date: </label>
                    <input className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="date" id="reqDate" required onChange={(e) => {
                        setReqDate(e.target.value);
                    }} />
                </div>

                <div class="mb-3">
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" for="returningDate">Enter Returning Date: </label>
                    <input className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="date" id="returningDate" required onChange={(e) => {
                        setReturningDate(e.target.value);
                    }} />
                </div>

                <div class="mb-3">
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" for="totDays">Enter Total Days: </label>
                    <input className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="text" id="totDays" required onChange={(e) => {
                        setTotDays(e.target.value);
                    }} />
                </div>

                <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="submit">Request for Vacation</button>
            </form>

        </div>
    )
}

export default AddVacation;