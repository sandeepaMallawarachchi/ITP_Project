import React, { useState, useEffect } from 'react';
import axios from 'axios';

function AddSalary() {
    const [id, setId] = useState("");
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

    useEffect(() => {
        if (id) {
            fetchEmpDetails();
        }
    }, [id]);

    const fetchEmpDetails = async () => {
        try {
            const response = await axios.get(`http://localhost:8070/staff/get/${id}`);
            const empData = response.data.staff[0]; // Access the first element of the staff array
            const { firstName } = empData;
            setName(firstName); // Set the name state with the first name
            setDesignation(empData.designation); // Set the designation state
        } catch (error) {
            console.error("Error fetching employee details", error.message);
        }
    };
    

    function sendData(e) {
        e.preventDefault();

        const newSalary = {
            empId: id,
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
            axios.post(`http://localhost:8070/netSalary/addSalary/${id}`, newSalary);
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

    console.log(name)
    console.log(designation)

    return (
        <div>
            <form onSubmit={sendData}>
                <div className="mb-3">
                    <label htmlFor="empId" className="form-label">Enter Employee ID: </label>
                    <input type="text" className="form-control" id="empId" value={id} onChange={(e) => setId(e.target.value)} />
                </div>

                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Employee Name: </label>
                    <input type="text" className="form-control" id="name" value={name} readOnly />
                </div>

                <div className="mb-3">
                    <label htmlFor="designation" className="form-label">Designation: </label>
                    <input type="text" className="form-control" id="designation" value={designation} readOnly />
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
                        calculateNetSalary();
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
                    <input type="number" className="form-control" id="netBonus" value={netBonus} readOnly />
                </div>

                <div className="mb-3">
                    <label htmlFor="netSalary" className="form-label">Net Salary: </label>
                    <input type="number" className="form-control" id="netSalary" value={netSalary} readOnly />
                </div>

                <button type="submit" className="btn btn-primary">Add Salary</button>
            </form>
        </div>
    )
}

export default AddSalary;