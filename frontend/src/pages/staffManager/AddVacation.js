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
    const [title1, setTitle1] = useState("");
    const [title2, setTitle2] = useState("");
    const [title3, setTitle3] = useState("");
    const [title4, setTitle4] = useState("");
    const [title5, setTitle5] = useState("");
    const [title6, setTitle6] = useState("");
    const [title7, setTitle7] = useState("");
    const [title8, setTitle8] = useState("");

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
            title1,
            title2,
            title3,
            title4,
            title5,
            title6,
            title7,
            title8

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
                    <input type="date" class="form-control" id="date" required onChange={(e) => {
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
                    <label for="title" class="form-label">Reason for Request: </label>
                </div>

                <div class="mb-3">
                    <input type="checkbox" class="form-control" id="title1" onChange={(e) => {
                        setTitle1(e.target.value);
                    }} />
                    <label for="title1" class="form-label">Vacation</label>
                </div>

                <div class="mb-3">
                    <input type="checkbox" class="form-control" id="title2" onChange={(e) => {
                        setTitle2(e.target.value);
                    }} />
                    <label for="title2" class="form-label">Personal Leave</label>
                </div>

                <div class="mb-3">
                    <input type="checkbox" class="form-control" id="title3" onChange={(e) => {
                        setTitle3(e.target.value);
                    }} />
                    <label for="title3" class="form-label">Funeral/Bereavement</label>
                </div>

                <div class="mb-3">
                    <input type="checkbox" class="form-control" id="title4" onChange={(e) => {
                        setTitle4(e.target.value);
                    }} />
                    <label for="title4" class="form-label">Jury Duty</label>
                </div>

                <div class="mb-3">
                    <input type="checkbox" class="form-control" id="title5" onChange={(e) => {
                        setTitle5(e.target.value);
                    }} />
                    <label for="title5" class="form-label">Family Reasons</label>
                </div>

                <div class="mb-3">
                    <input type="checkbox" class="form-control" id="title6" onChange={(e) => {
                        setTitle6(e.target.value);
                    }} />
                    <label for="title6" class="form-label">Medical Leave</label>
                </div>

                <div class="mb-3">
                    <input type="checkbox" class="form-control" id="title7" onChange={(e) => {
                        setTitle7(e.target.value);
                    }} />
                    <label for="title7" class="form-label">To Vote</label>
                </div>

                <div class="mb-3">
                    <input type="checkbox" class="form-control" id="title8" onChange={(e) => {
                        setTitle8(e.target.value);
                    }} />
                    <label for="title8" class="form-label">Other</label>
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
                    <input type="date" class="form-control" id="reqDate" required onChange={(e) => {
                        setReqDate(e.target.value);
                    }} />
                </div>

                <div class="mb-3">
                    <label for="returningDate" class="form-label">Enter Returning Date: </label>
                    <input type="date" class="form-control" id="returningDate" required onChange={(e) => {
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

        </div>
    )
}

export default AddVacation;