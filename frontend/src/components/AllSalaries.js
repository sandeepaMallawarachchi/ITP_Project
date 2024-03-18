import React, { useState, useEffect } from 'react';
import axios from 'axios';
// import { useParams, useNavigate } from 'react-router-dom';

function AllSalaries() {

    const [salaries, setSalaries] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:8070/netSalary/allSalaries").then((res) => {
            setSalaries(res.data);
        }).catch((error) => {
            alert(error.message);
        });
    }, [])

    return (
        <div>
            <table class="table">
                <thead>
                    <tr>
                        <th scope="col">Employee ID</th>
                        <th scope="col">Designation</th>
                        <th scope="col">Month</th>
                        <th scope="col">Basic Salary</th>
                        <th scope="col">Bonus Type</th>
                        <th scope="col">Net Bonus</th>
                        <th scope="col">Net Salary</th>
                    </tr>
                </thead>
                <tbody>
                    {salaries.map((salary) => (
                    <tr key={(employee._id)}>
                        <td>{employee.empId}</td>
                        <td>{employee.designation}</td>
                        <td>{employee.month}</td>
                        <td>{employee.basicSalary}</td>
                        <td>{employee.bonusType}</td>
                        <td>{employee.netBonus}</td>
                        <td>{employee.netSalary}</td>
                    </tr>
                    ))}
                    
                </tbody>
            </table>
        </div>
    )
}

export default AllSalaries;