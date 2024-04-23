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
    // const [approvalDate, setApprovalDate] = useState("");

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
            totDays
        }

        try {
            axios.post(`http://localhost:8070/vacation/add`, newVac);
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
            <form onSubmit={sendData}>
                <div class="mb-3">
                    <label for="date" class="form-label">Enter Date: </label>
                    <input type="text" class="form-control" id="date" required onChange={(e) => {
                        setDate(e.target.value);
                    }} />
                </div>

                <div class="mb-3">
                    <label for="empName" class="form-label">Enter Employee Name: </label>
                    <input type="text" class="form-control" id="empName" required onChange={(e) => {
                        setEmpName(e.target.value);
                    }} />
                </div>

                <div class="mb-3">
                    <label for="title" class="form-label">Enter Title: </label>
                    <input type="text" class="form-control" id="title" required onChange={(e) => {
                        setTitle(e.target.value);
                    }} />
                </div>

                <div class="mb-3">
                    <label for="department" class="form-label">Enter Department: </label>
                    <input type="text" class="form-control" id="department" required onChange={(e) => {
                        setDepartment(e.target.value);
                    }} />
                </div>

                <div class="mb-3">
                    <label for="daysEarned" class="form-label">Enter Vacation Days Earned: </label>
                    <input type="text" class="form-control" id="daysEarned" required onChange={(e) => {
                        setDaysEarned(e.target.value);
                    }} />
                </div>

                <div class="mb-3">
                    <label for="reqDate" class="form-label">Enter Requesting Date: </label>
                    <input type="text" class="form-control" id="reqDate" required onChange={(e) => {
                        setReqDate(e.target.value);
                    }} />
                </div>

                <div class="mb-3">
                    <label for="returningDate" class="form-label">Enter Returning Date: </label>
                    <input type="text" class="form-control" id="returningDate" required onChange={(e) => {
                        setReturningDate(e.target.value);
                    }} />
                </div>

                <div class="mb-3">
                    <label for="totDays" class="form-label">Enter Total Days: </label>
                    <input type="text" class="form-control" id="totDays" required onChange={(e) => {
                        setTotDays(e.target.value);
                    }} />
                </div>

                <button type="submit" class="btn btn-primary">Submit</button>
            </form>
            <button type="submit" class="btn btn-success" onClick={handleAllVacations}>All Employees</button>
        </div>
    )
}

export default AddVacation;