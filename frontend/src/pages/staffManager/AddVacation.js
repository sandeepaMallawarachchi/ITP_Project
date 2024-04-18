import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'

function AddEmployee() {

    const [empId, setEmpId] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [gender, setGender] = useState("");
    const [department, setDepartment] = useState("");
    const [designation, setDesignation] = useState("");
    const [address, setAddress] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNo, setPhoneNo] = useState("");

    function sendData(e) {
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
        }

        try {
            axios.post(`http://localhost:8070/staff/add`, newEmp);
            alert("Success! Employee added");
        } catch (error) {
            alert("Error! Failed to add employee");
            console.error("Error:", error);
        }
    }

    const navigate = useNavigate();

    const handleAllEmployees = () => {
        navigate(`/allEmployees`);
    }

    return (
        <div>
            <form onSubmit={sendData}>
                <div class="mb-3">
                    <label for="empId" class="form-label">Enter Employee ID: </label>
                    <input type="text" class="form-control" id="empId" required onChange={(e) => {
                        setEmpId(e.target.value);
                    }} />
                </div>

                <div class="mb-3">
                    <label for="firstName" class="form-label">Enter First Name: </label>
                    <input type="text" class="form-control" id="firstName" required onChange={(e) => {
                        setFirstName(e.target.value);
                    }} />
                </div>

                <div class="mb-3">
                    <label for="lastName" class="form-label">Enter Last Name: </label>
                    <input type="text" class="form-control" id="lastName" required onChange={(e) => {
                        setLastName(e.target.value);
                    }} />
                </div>

                <div class="mb-3">
                    <label for="gender" class="form-label">Enter Gender: </label>
                    <input type="text" class="form-control" id="gender" required onChange={(e) => {
                        setGender(e.target.value);
                    }} />
                </div>

                <div class="mb-3">
                    <label for="department" class="form-label">Enter Department: </label>
                    <input type="text" class="form-control" id="department" required onChange={(e) => {
                        setDepartment(e.target.value);
                    }} />
                </div>

                <div class="mb-3">
                    <label for="designation" class="form-label">Enter Designation: </label>
                    <input type="text" class="form-control" id="designation" required onChange={(e) => {
                        setDesignation(e.target.value);
                    }} />
                </div>

                <div class="mb-3">
                    <label for="address" class="form-label">Enter Address: </label>
                    <input type="text" class="form-control" id="address" required onChange={(e) => {
                        setAddress(e.target.value);
                    }} />
                </div>

                <div class="mb-3">
                    <label for="email" class="form-label">Enter Email: </label>
                    <input type="text" class="form-control" id="email" required onChange={(e) => {
                        setEmail(e.target.value);
                    }} />
                </div>

                <div class="mb-3">
                    <label for="phoneNo" class="form-label">Enter PhoneNo: </label>
                    <input type="text" class="form-control" id="phoneNo" required onChange={(e) => {
                        setPhoneNo(e.target.value);
                    }} />
                </div>

                <button type="submit" class="btn btn-primary">Submit</button>
            </form>
            <button type="submit" class="btn btn-success" onClick={handleAllEmployees}>All Employees</button>
        </div>
    )
}

export default AddEmployee;