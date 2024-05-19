import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

function AddEmployee() {
    // const { id } = useParams();
    const [empId, setEmpId] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [gender, setGender] = useState("");
    const [department, setDepartment] = useState("");
    const [designation, setDesignation] = useState("");
    const [address, setAddress] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNo, setPhoneNo] = useState("");

    const navigate = useNavigate();

    const sendData = async (e) => {
        e.preventDefault();

        const newEmp = {
            empId,
            firstName,
            lastName,
            gender,
            department,
            designation,
            address,
            email,
            phoneNo,
        };

        try {
            await axios.post(`https://hendriks-tea-management-system-backend.vercel.app/staff/add`, newEmp);
            alert("Success! Employee added");

            setFirstName("")
            setLastName("")
            setGender("")
            setDesignation("")
            setDepartment("")
            setAddress("")
            setEmail("")
            setPhoneNo("")
        } catch (error) {
            alert("Error! Failed to add employee");
            console.error("Error:", error);
        }
    }

    const handleFirstName = (value) => {
        const regex = /^[a-zA-Z\s]+$/;
        if (regex.test(value) || value === "") {
            setFirstName(value);

        }
    };

    const handleLastName = (value) => {
        const regex = /^[a-zA-Z\s]+$/;
        if (regex.test(value) || value === "") {
            setLastName(value);

        }
    };

    // const handleAllEmployees = () => {
    //     navigate(`/EmpCategory/${}`);
    // };

    return (
        <div className='absolute mt-48 left-1/3 w-1/2'>
            <form onSubmit={sendData}>
                <div className="mb-3">
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="empId"> Enter Employee ID: </label>
                    <input className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="text" id="empId" required onChange={(e) => setEmpId(e.target.value)} />
                </div>

                <div className="mb-3">
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" for="firstName">Enter First Name: </label>
                    <input className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="text" id="firstName" required
                        onChange={(e) =>
                            handleFirstName(e.target.value)} />
                </div>

                <div className="mb-3">
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" for="lastName">Enter Last Name: </label>
                    <input className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="text" id="lastName" required
                        onChange={(e) =>
                            handleLastName(e.target.value)} />
                </div>

                <div className="mb-3">
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="gender">Enter Gender: </label>
                    <input className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="text" id="gender" required onChange={(e) => setGender(e.target.value)} />
                </div>

                <div className="mb-3">
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="department">Enter Department: </label>
                    <input className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="text" id="department" required onChange={(e) => setDepartment(e.target.value)} />
                </div>

                <div className="mb-3">
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="designation">Enter Designation: </label>
                    <input className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="text" id="designation" required onChange={(e) => setDesignation(e.target.value)} />
                </div>

                <div className="mb-3">
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="address">Enter Address: </label>
                    <input className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="text" id="address" required onChange={(e) => setAddress(e.target.value)} />
                </div>

                <div className="mb-3">
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="email">Enter Email: </label>
                    <input className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="text" id="email" required onChange={(e) => setEmail(e.target.value)} />
                </div>

                <div className="mb-3">
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="phoneNo">Enter PhoneNo: </label>
                    <input className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="text" id="phoneNo" required onChange={(e) => setPhoneNo(e.target.value)} />
                </div>

                <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Add Employee</button>
            </form>
        </div>
    );
}

export default AddEmployee;