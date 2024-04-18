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
    const [approvalDate, setApprovalDate] = useState("");

    function sendData(e) {
        e.preventDefault();

        const newEmp = {
            date,
            empName,
            title,
            department,
            daysEarned,
            reqDate,
            returningDate,
            totDays,
            approvalDate,
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
                        setDate(e.target.value);
                    }} />
                </div>

                <div class="mb-3">
                    <label for="firstName" class="form-label">Enter First Name: </label>
                    <input type="text" class="form-control" id="firstName" required onChange={(e) => {
                        setEmpName(e.target.value);
                    }} />
                </div>

                <div class="mb-3">
                    <label for="lastName" class="form-label">Enter Last Name: </label>
                    <input type="text" class="form-control" id="lastName" required onChange={(e) => {
                        setTitle(e.target.value);
                    }} />
                </div>

                <div class="mb-3">
                    <label for="gender" class="form-label">Enter Gender: </label>
                    <input type="text" class="form-control" id="gender" required onChange={(e) => {
                        setDepartment(e.target.value);
                    }} />
                </div>

                <div class="mb-3">
                    <label for="department" class="form-label">Enter Department: </label>
                    <input type="text" class="form-control" id="department" required onChange={(e) => {
                        setDaysEarned(e.target.value);
                    }} />
                </div>

                <div class="mb-3">
                    <label for="designation" class="form-label">Enter Designation: </label>
                    <input type="text" class="form-control" id="designation" required onChange={(e) => {
                        setReqDate(e.target.value);
                    }} />
                </div>

                <div class="mb-3">
                    <label for="address" class="form-label">Enter Address: </label>
                    <input type="text" class="form-control" id="address" required onChange={(e) => {
                        setReturningDate(e.target.value);
                    }} />
                </div>

                <div class="mb-3">
                    <label for="email" class="form-label">Enter Email: </label>
                    <input type="text" class="form-control" id="email" required onChange={(e) => {
                        setTotDays(e.target.value);
                    }} />
                </div>

                <div class="mb-3">
                    <label for="phoneNo" class="form-label">Enter PhoneNo: </label>
                    <input type="text" class="form-control" id="phoneNo" required onChange={(e) => {
                        setApprovalDate(e.target.value);
                    }} />
                </div>

                <button type="submit" class="btn btn-primary">Submit</button>
            </form>
            <button type="submit" class="btn btn-success" onClick={handleAllEmployees}>All Employees</button>
        </div>
    )
}

export default AddVacation;