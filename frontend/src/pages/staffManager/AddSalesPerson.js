import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

function AddSalesPerson() {
    const { id } = useParams();
    const [salespersonID, setSalespersonID] = useState("");
    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [dateOfBirth, setDateOfBirth] = useState("");
    const [gender, setGender] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [salespersonIDError, setSalespersonIDError] = useState("");
    const [dateOfBirthError, setDateOfBirthError] = useState("");
    const [phoneError, setPhoneError] = useState("");

    const navigate = useNavigate();

    const sendData = async (e) => {
        e.preventDefault();

        const newSalesPerson = {
            salespersonID,
            name,
            username,
            password,
            confirmPassword,
            dateOfBirth,
            gender,
            email,
            phone,
            address
        };

        try {
            await axios.post(`https://hendriks-tea-management-system-backend.vercel.app/salesmen/salesmenRegister`, newSalesPerson);
            alert("Success! Sales person added");
            setSalespersonID('')
            setName('')
            setUsername('')
            setPassword('')
            setConfirmPassword('')
            setDateOfBirth('')
            setGender('')
            setEmail('')
            setPhone('')
            setAddress('')
            setPhoneError('')

        } catch (error) {
            alert("Error! Failed to add sales person");
            console.error("Error:", error);
        }
    }


    // const handleAllEmployees = () => {
    //     navigate(`/EmpCategory/${}`);
    // };

    const handleSalespersonIDChange = (value) => {
        const validateSalespersonID = /^s\d{0,4}$/;
        if (!validateSalespersonID.test(value)) {
            setSalespersonIDError("Salesperson ID should begin with 's' followed by up to four digits.");
        } else {
            setSalespersonIDError("");
            setSalespersonID(value);
        }
    };

    const handleNameChange = (value) => {
        const regex = /^[a-zA-Z\s]+$/;
        if (regex.test(value) || value === "") {
            setName(value);
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

    const handleNumericInput = (value, setter) => {
        const regex = /^[0-9\b]+$/;
        if (regex.test(value) || value === "") {
            setter(value);
        }
    };

    const handlePhoneChange = (value) => {
        const regex = /^[0-9]{10}$/;
        if (!regex.test(value)) {
            setPhoneError("Phone number must be 10 digits.");
        } else {
            setPhoneError("");
            setPhone(value);
        }
    };

    return (
        <div className='absolute mt-48 left-1/3 w-1/2'>
            <h1 className="text-green-500 font-bold">Salesperson Registration form</h1>
            <form onSubmit={sendData}>
                <div className="mb-3">
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="salespersonID"> Enter Sales Person ID: </label>
                    <input className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="text" id="salespersonID" value={salespersonID} required onChange={(e) => handleSalespersonIDChange(e.target.value)} />
                    {salespersonIDError && <div className="text-red-500">{salespersonIDError}</div>}
                </div>

                <div className="mb-3">
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" for="name">Enter Name: </label>
                    <input className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="text" id="name" value={name} required onChange={(e) => handleNameChange(e.target.value)} />
                </div>

                <div className="mb-3">
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" for="username">Enter Username: </label>
                    <input className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="text" id="username" value={username} required onChange={(e) => setUsername(e.target.value)} />
                </div>

                <div className="mb-3">
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="password">Enter Password: </label>
                    <input className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="password" id="password" value={password} required onChange={(e) => setPassword(e.target.value)} />
                </div>

                <div className="mb-3">
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="confirmPassword">Enter Confirm Password: </label>
                    <input className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="password" id="confirmPassword" value={confirmPassword} required onChange={(e) => setConfirmPassword(e.target.value)} />
                </div>

                <div className="mb-3">
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="dateOfBirth">Enter Date Of Birth: </label>
                    <input className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="date" id="dateOfBirth" value={dateOfBirth} required onChange={(e) => handleDateOfBirthChange(e.target.value)} />
                    {dateOfBirthError && <div className="text-red-500">{dateOfBirthError}</div>}
                </div>

                <div className="mb-3">
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="gender">Enter Gender: </label>
                    <input className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="text" id="gender" value={gender} required onChange={(e) => setGender(e.target.value)} />
                </div>

                <div className="mb-3">
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="email">Enter Email: </label>
                    <input className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="text" id="email" value={email} required onChange={(e) => setEmail(e.target.value)} />
                </div>

                <div className="mb-3">
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="phone">Enter Phone: </label>
                    <input className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="text" maxLength={10} minLength={10} id="phone" value={phone} required onChange={(e) => handleNumericInput(e.target.value, setPhone)} />
                    {phoneError && <div className="text-red-500">{phoneError}</div>}
                </div>

                <div className="mb-3">
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="address">Enter Address: </label>
                    <input className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="text" id="address" value={address} required onChange={(e) => setAddress(e.target.value)} />
                </div>

                <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Add Salesperson</button>
            </form>
        </div>
    );
}

export default AddSalesPerson;
