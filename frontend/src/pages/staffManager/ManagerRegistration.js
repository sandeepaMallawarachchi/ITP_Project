import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

export default function ManagerRegistration() {
    const [empId, setEmpId] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [gender, setGender] = useState("");
    const [department, setDepartment] = useState("");//
    const [designation, setDesignation] = useState("");
    const [address, setAddress] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNo, setPhoneNo] = useState("");
    const [dateOfBirth, setDateOfBirth] = useState("");
    const [phoneError, setPhoneError] = useState("");
    const [empIdError, setEmpIdError] = useState("");
    const [dateOfBirthError, setDateOfBirthError] = useState("");

    const navigate = useNavigate();

    const sendData = async (e) => {
        e.preventDefault();

        const newManager = {
            empId,
            firstName,
            lastName,
            username,
            password,
            confirmPassword,
            gender,
            department,
            designation,
            address,
            email,
            phoneNo,
            dateOfBirth,
        }

        try {
            await axios.post(`https://hendriks-tea-management-system-backend.vercel.app/empLogin/managerRegister`, newManager);
            alert("Success! Manager added");
            clearForm();
        } catch (error) {
            if (error.response && error.response.status === 400) {
                alert("Manager already exists!");
                clearForm();
            }
            else {
                alert("Error! Failed to add manager");
                clearForm();
            }
            console.error("Error:", error);
        }
    }

    const clearForm = () => {
        setEmpId('');
        setFirstName('');
        setLastName('');
        setUsername('');
        setPassword('');
        setConfirmPassword('');
        setGender('');
        setDepartment('');
        setDesignation('');
        setAddress('');
        setEmail('');
        setPhoneNo('');
        setDateOfBirth('');
        setEmpIdError('');
        setPhoneError('');
        setDateOfBirthError('');
    };

    const handleNumericInput = (value, setter) => {
        const regex = /^[0-9\b]+$/;
        if (regex.test(value) || value === "") {
            setter(value);
        }
    };

    // const handlePhoneNoChange = (value) => {
    //     const regex = /^[0-9]{10}$/;
    //     if (!regex.test(value)) {
    //         setPhoneError("Phone number must be 10 digits.");
    //     } else {
    //         setPhoneError("");
    //         setPhoneNo(value);
    //     }
    // };

    const handleEmpIdChange = (value) => {
        const validateEmpId = /^E\d{0,4}$/;
        if (!validateEmpId.test(value)) {
            setEmpIdError("Employee ID should begin with 'E' followed by up to four digits.");
        } else {
            setEmpIdError("");
            setEmpId(value);
        }
    };

    const handleFirstNameChange = (value) => {
        const regex = /^[a-zA-Z\s]+$/;
        if (regex.test(value) || value === "") {
            setFirstName(value);
        }
    };

    const handleLastNameChange = (value) => {
        const regex = /^[a-zA-Z\s]+$/;
        if (regex.test(value) || value === "") {
            setLastName(value);
        }
    };

    const handleDateOfBirthChange = (value) => {
        const currentDate = new Date();
        const selectedDate = new Date(value);
        if (selectedDate >= currentDate) {
            setDateOfBirthError("Date of birth must be a past date.");
        } else {
            setDateOfBirthError("");
            setDateOfBirth(value);
        }
    };

    return (
        <div className='absolute mt-48 left-1/3 w-1/2'>
            <h1 className="text-green-500 font-bold">Manager Registration form</h1>
            <form onSubmit={sendData}>
                <div className="mb-3">
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="empId">Enter Employee ID:</label>
                    <input className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="text" id="empId" required
                        value={empId} onChange={(e) => handleEmpIdChange(e.target.value)} />
                    {empIdError && <div className="text-red-500">{empIdError}</div>}
                </div>

                <div className="mb-3">
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="firstName">Enter First Name:</label>
                    <input className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="text" id="firstName" required
                        value={firstName} onChange={(e) => handleFirstNameChange(e.target.value)} />
                </div>

                <div className="mb-3">
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="lastName">Enter Last Name:</label>
                    <input className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="text" id="lastName" required
                        value={lastName} onChange={(e) => handleLastNameChange(e.target.value)} />
                </div>

                <div className="mb-3">
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="username">Enter Username:</label>
                    <input className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="text" id="username" required
                        value={username} onChange={(e) => setUsername(e.target.value)} />
                </div>

                <div className="mb-3">
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="password">Enter Password:</label>
                    <input className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="password" id="password" required
                        value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>

                <div className="mb-3">
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="confirmPassword">Enter Confirm Password:</label>
                    <input className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="password" id="confirmPassword" required
                        value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                </div>

                <div className="mb-3">
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="gender">Enter Gender:</label>
                    <input className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="text" id="gender" required
                        value={gender} onChange={(e) => setGender(e.target.value)} />
                </div>

                <div className="mb-3">
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="department">Enter Department:</label>
                    <input className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="text" id="department" required
                        value={department} onChange={(e) => setDepartment(e.target.value)} />
                </div>

                <div className="mb-3">
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="designation">Enter Designation:</label>
                    <input className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="text" id="designation" required
                        value={designation} onChange={(e) => setDesignation(e.target.value)} />
                </div>

                <div className="mb-3">
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="address">Enter Address:</label>
                    <input className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="text" id="address" required
                        value={address} onChange={(e) => setAddress(e.target.value)} />
                </div>

                <div className="mb-3">
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="email">Enter Email:</label>
                    <input className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="text" id="email" required
                        value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>

                <div className="mb-3">
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="phoneNo">Enter PhoneNo:</label>
                    <input type="text" maxLength={10} minLength={10} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" id="phoneNo" required
                        value={phoneNo} onChange={(e) => {
                            handleNumericInput(e.target.value, setPhoneNo);
                        }} />
                    {phoneError && <div className="text-red-500">{phoneError}</div>}
                </div>

                <div className="mb-3">
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="dateOfBirth">Enter Date Of Birth:</label>
                    <input type="date" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" id="dateOfBirth" required
                        value={dateOfBirth} onChange={(e) => handleDateOfBirthChange(e.target.value)} />
                    {dateOfBirthError && <div className="text-red-500">{dateOfBirthError}</div>}
                </div>

                <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Register Manager</button>
            </form>
        </div>
    );
}
