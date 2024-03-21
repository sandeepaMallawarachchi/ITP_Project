import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function AddSalary() {

    const [empId, setEmpId] = useState("");
    const [name, setName] = useState("");
    const [designation, setDesignation] = useState("");
    const [month, setMonth] = useState("");
    const [basicSalary, setBasicSalary] = useState("");
    const [ETFbonus, setETFbonus] = useState("");
    const [EPFbonus, setEPFbonus] = useState("");
    const [netBonus, setNetBonus] = useState(0);
    const [netSalary, setNetSalary] = useState(0);

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
            alert("Success! Salary added");
        } catch (error) {
            alert("Error! Failed to add salary");
            console.error("Error:", error);
        }
    }

    const calculateNetBonus = () => {
        const calculatedNetBonus = Number(ETFbonus) + Number(EPFbonus);
        setNetBonus(calculatedNetBonus);
        return calculatedNetBonus;
    };

    const calculateNetSalary = () => {
        const calculatedNetSalary = Number(basicSalary) + calculateNetBonus();
        setNetSalary(calculatedNetSalary);
        return calculatedNetSalary;
    };

    return (
        <div>
            <form onSubmit={sendData}>
                <div className="mb-3">
                    <label htmlFor="empId" className="form-label">Enter Employee ID: </label>
                    <input type="text" className="form-control" id="empId" required onChange={(e) => {
                        setEmpId(e.target.value);
                    }} />
                </div>

                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Enter Employee Name: </label>
                    <input type="text" className="form-control" id="name" required onChange={(e) => {
                        setName(e.target.value);
                    }} />
                </div>

                <div className="mb-3">
                    <label htmlFor="designation" className="form-label">Enter Designation: </label>
                    <input type="text" className="form-control" id="designation" required onChange={(e) => {
                        setDesignation(e.target.value);
                    }} />
                </div>

                <div className="mb-3">
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

                <div className="mb-3">
                    <label htmlFor="basicSalary" className="form-label">Enter Basic Salary: </label>
                    <input type="number" className="form-control" id="basicSalary" required onChange={(e) => {
                        setBasicSalary(e.target.value);
                    }} />
                </div>

                <div className="mb-3">
                    <label htmlFor="ETFbonus" className="form-label">ETF Bonus Amount: </label>
                    <input type="number" className="form-control" id="ETFbonus" onChange={(e) => {
                        setETFbonus(e.target.value);
                        calculateNetBonus();
                    }} />

                    <label htmlFor="EPFbonus" className="form-label">EPF Bonus Amount: </label>
                    <input type="number" className="form-control" id="EPFbonus" onChange={(e) => {
                        setEPFbonus(e.target.value);
                        calculateNetBonus();
                    }} />
                </div>

                <div className="mb-3">
                    <label htmlFor="netBonus" className="form-label">Net Bonus: </label>
                    <input type="number" className="form-control" id="netBonus" value={Number(ETFbonus) + Number(EPFbonus)} required readOnly />
                </div>

                <div className="mb-3">
                    <label htmlFor="netSalary" className="form-label">Net Salary: </label>
                    <input type="number" className="form-control" id="netSalary" value={Number(basicSalary) + Number(ETFbonus) + Number(EPFbonus)} required readOnly />
                </div>

                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default AddSalary;