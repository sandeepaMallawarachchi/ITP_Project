import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'

function AddSalary() {

    const [empId, setEmpId] = useState("");
    const [name, setName] = useState("");
    const [designation, setDesignation] = useState("");
    const [month, setMonth] = useState("");
    const [basicSalary, setBasicSalary] = useState("");
    const [ETFbonus, setETFbonus] = useState("");
    const [EPFbonus, setEPFbonus] = useState("");
    const [netBonus, setNetBonus] = useState("");
    const [netSalary, setNetSalary] = useState(0);
    const [submitted, setSubmitted] = useState(false);

    const months = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    function sendData(e) {
        e.preventDefault();

        const newSalary = {
            empId,
            name,
            designation,
            month,
            basicSalary,
            ETFbonus,
            EPFbonus,
            netBonus,
            netSalary
        }

        try {
            axios.post(`http://localhost:8070/netSalary/addSalary`, newSalary);
            setSubmitted(true);
            alert("Success! Salary added");
        } catch (error) {
            alert("Error! Failed to add salary");
            console.error("Error:", error);
        }
    }

    const calculateNetBonus = () => {
        const netBonus = Number(ETFbonus) + Number(EPFbonus);
        setNetBonus(netBonus);
    };

    const calculateNetSalary = () => {
        const netSalary = Number(basicSalary) + Number(netBonus);
        setNetSalary(netSalary);
    };

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
                    <label for="name" class="form-label">Enter Employee Name: </label>
                    <input type="text" class="form-control" id="name" required onChange={(e) => {
                        setName(e.target.value);
                    }} />
                </div>

                <div class="mb-3">
                    <label for="designation" class="form-label">Enter Designation: </label>
                    <input type="text" class="form-control" id="designation" required onChange={(e) => {
                        setDesignation(e.target.value);
                    }} />
                </div>

                <div class="mb-3">
                    <label htmlFor="month" className="form-label">Select Month: </label>
                    <select className="form-select" id="month" required onChange={(e) => {
                        setMonth(e.target.value);
                    }}>
                        <option value="">Select Month</option>
                        {months.map((month, index) => (
                            <option key={index} value={month}>{month}</option>
                        ))}
                    </select>

                </div>

                <div class="mb-3">
                    <label for="basicSalary" class="form-label">Enter Basic Salary: </label>
                    <input type="number" class="form-control" id="basicSalary" required onChange={(e) => {
                        setBasicSalary(e.target.value);
                        calculateNetSalary();
                    }} />
                </div>

                <div class="mb-3">

                    <label for="ETFbonus" class="form-label">ETF Bonus Amount: </label>
                    <input type="Number" class="form-control" id="ETFbonus" required onChange={(e) => {
                        setETFbonus(e.target.value);
                        calculateNetBonus();
                        calculateNetSalary();
                    }} />
                    
                    <label for="EPFbonus" class="form-label">EPF Bonus Amount: </label>
                    <input type="Number" class="form-control" id="EPFbonus" required onChange={(e) => {
                        setEPFbonus(e.target.value);
                        calculateNetBonus();
                        calculateNetSalary();
                    }} />

                </div>

                <div class="mb-3">
                    <label for="netBonus" class="form-label">Net Bonus: </label>
                    <input type="number" class="form-control" id="netBonus" required onChange={(e) => {
                        setNetBonus(e.target.value);
                    }} />
                </div>

                <div class="mb-3">
                    <label for="netSalary" class="form-label">Net Salary: </label>
                    <input type="number" class="form-control" id="netSalary" required onChange={(e) => {
                        setNetSalary(e.target.value);
                    }} />
                </div>

                <button type="submit" class="btn btn-primary">Submit</button>
            </form>
            {submitted && (
                <p>Net bonus: LKR{netBonus}</p>
            )}
            {submitted && (
                <p>Net salary: LKR{netSalary}</p>
            )}
        </div>
    )
}

export default AddSalary;