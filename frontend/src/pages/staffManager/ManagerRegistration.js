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
    const [department, setDepartment] = useState("");
    const [designation, setDesignation] = useState("");
    const [address, setAddress] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNo, setPhoneNo] = useState("");
    const [dateOfBirth, setDateOfBirth] = useState("");
    const [phoneError, setPhoneError] = useState("");

    const navigate = useNavigate();

    const sendData = (e) => {
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
            axios.post(`http://localhost:8070/empLogin/managerRegister`, newManager);
            alert("Success! Manager added");
            navigate("/"); // Navigate to a different route upon success
        } catch (error) {
            alert("Error! Failed to add manager");
            console.error("Error:", error);
        }
    }

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
                    <label htmlFor="empId" className="form-label">Enter Employee ID:</label>
                    <input type="text" className="form-control" id="empId" required
                        value={empId} onChange={(e) => setEmpId(e.target.value)} />
                </div>

                <div className="mb-3">
                    <label htmlFor="firstName" className="form-label">Enter First Name:</label>
                    <input type="text" className="form-control" id="firstName" required
                        value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                </div>

                <div className="mb-3">
                    <label htmlFor="lastName" className="form-label">Enter Last Name:</label>
                    <input type="text" className="form-control" id="lastName" required
                        value={lastName} onChange={(e) => setLastName(e.target.value)} />
                </div>

                <div className="mb-3">
                    <label htmlFor="username" className="form-label">Enter Username:</label>
                    <input type="text" className="form-control" id="username" required
                        value={username} onChange={(e) => setUsername(e.target.value)} />
                </div>

                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Enter Password:</label>
                    <input type="password" className="form-control" id="password" required
                        value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>

                <div className="mb-3">
                    <label htmlFor="confirmPassword" className="form-label">Enter Confirm Password:</label>
                    <input type="password" className="form-control" id="confirmPassword" required
                        value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                </div>

                <div className="mb-3">
                    <label htmlFor="gender" className="form-label">Enter Gender:</label>
                    <input type="text" className="form-control" id="gender" required
                        value={gender} onChange={(e) => setGender(e.target.value)} />
                </div>

                <div className="mb-3">
                    <label htmlFor="department" className="form-label">Enter Department:</label>
                    <input type="text" className="form-control" id="department" required
                        value={department} onChange={(e) => setDepartment(e.target.value)} />
                </div>

                <div className="mb-3">
                    <label htmlFor="designation" className="form-label">Enter Designation:</label>
                    <input type="text" className="form-control" id="designation" required
                        value={designation} onChange={(e) => setDesignation(e.target.value)} />
                </div>

                <div className="mb-3">
                    <label htmlFor="address" className="form-label">Enter Address:</label>
                    <input type="text" className="form-control" id="address" required
                        value={address} onChange={(e) => setAddress(e.target.value)} />
                </div>

                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Enter Email:</label>
                    <input type="text" className="form-control" id="email" required
                        value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>

                <div className="mb-3">
                    <label htmlFor="phoneNo" className="form-label">Enter PhoneNo:</label>
                    <input type="text" maxLength={10} minLength={10} className="form-control" id="phoneNo" required
                        value={phoneNo} onChange={(e) => {
                            handleNumericInput(e.target.value,setPhoneNo);
                        }} />
                    {phoneError && <div className="text-red-500">{phoneError}</div>}
                </div>

                <div className="mb-3">
                    <label htmlFor="dateOfBirth" className="form-label">Enter Date Of Birth:</label>
                    <input type="date" className="form-control" id="dateOfBirth" required
                        value={dateOfBirth} onChange={(e) => setDateOfBirth(e.target.value)} />
                </div>

                <button type="submit" className="btn btn-primary">Register Employee</button>
            </form>
        </div>
    );
}
