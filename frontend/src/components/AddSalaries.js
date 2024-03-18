import React, { useState } from 'react';
import axios from 'axios';

function AddSalary() {

    const [empId, setEmpId] = useState("");
    const [designation, setDesignation] = useState("");
    const [month, setMonth] = useState("");
    const [basicSalary, setBasicSalary] = useState("");
    const [bonusType, setBonusType] = useState("");
    const [netBonus, setNetBonus] = useState("");
    const [netSalary, setNetSalary] = useState("");

    function sendData(e) {
        e.preventDefault();
    
        const newSalary = {
            empId,
            designation,
            month,
            basicSalary,
            bonusType,
            netBonus,
            netSalary
        }
    
        try {
            axios.post(`http://localhost:8070/netSalary/add`, newSalary);
            alert("Success! Salary added");
        } catch (error) {
            alert("Error! Failed to add salary");
            console.error("Error:", error);
        }
    }
    
    return (
        <div>
            <form onSubmit={sendData}>
                <div class="mb-3">
                    <label for="empId" class="form-label">Enter Employee ID: </label>
                    <input type="text" class="form-control" id="empId" required onChange={(e) => {
                        setEmpId(e.target.value);
                    }}/>
                </div>

                <div class="mb-3">
                    <label for="designation" class="form-label">Enter Designation: </label>
                    <input type="text" class="form-control" id="designation" required onChange={(e) => {
                        setDesignation(e.target.value);
                    }}/>
                </div>

                <div class="mb-3">
                    <label for="month" class="form-label">Enter Month: </label>
                    <input type="text" class="form-control" id="month" required onChange={(e) => {
                        setMonth(e.target.value);
                    }}/>
                </div>

                <div class="mb-3">
                    <label for="basicSalary" class="form-label">Enter Basic Salary: </label>
                    <input type="text" class="form-control" id="basicSalary" required onChange={(e) => {
                        setBasicSalary(e.target.value);
                    }}/>
                </div>

                <div class="mb-3">
                    <label for="bonusType" class="form-label">Enter Bonus Type: </label>
                    <input type="text" class="form-control" id="bonusType" required onChange={(e) => {
                        setBonusType(e.target.value);
                    }}/>
                </div>

                <div class="mb-3">
                    <label for="netBonus" class="form-label">Enter Net Bonus: </label>
                    <input type="text" class="form-control" id="netBonus" required onChange={(e) => {
                        setNetBonus(e.target.value);
                    }}/>
                </div>

                <div class="mb-3">
                    <label for="netSalary" class="form-label">Enter Net Salary: </label>
                    <input type="text" class="form-control" id="netSalary" required onChange={(e) => {
                        setNetSalary(e.target.value);
                    }}/>
                </div>
              
                <button type="submit" class="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default AddSalary;