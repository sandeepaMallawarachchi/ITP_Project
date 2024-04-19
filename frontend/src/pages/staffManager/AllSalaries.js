import React, { useState, useEffect } from 'react';
import axios from 'axios';
// import { useParams, useNavigate } from 'react-router-dom';

function AllSalaries() {

    const [salaries, setSalaries] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:8070/netSalary/allSalaries`).then((res) => {
            setSalaries(res.data);
        }).catch((error) => {
            alert(error.message);
        });
    }, [])

    return (
        <div className='absolute mt-48 left-1/3 w-1/2 '>
            <table class="table">
                <thead>
                    <tr>
                        <th scope="col">Employee ID</th>
                        <th scope="col">Employee Name</th>
                        <th scope="col">Designation</th>
                        <th scope="col">Month</th>
                        <th scope="col">Year</th>
                        <th scope="col">Basic Salary</th>
                        <th scope="col">ETF Bonus Amount</th>
                        <th scope="col">EPF Bonus Amount</th>
                        <th scope="col">Net Bonus</th>
                        <th scope="col">Net Salary</th>
                    </tr>
                </thead>
                <tbody>
                    {salaries.map((salaries) => (
                    <tr key={(salaries._id)}>
                        <td>{salaries.empId}</td>
                        <td>{salaries.name}</td>
                        <td>{salaries.designation}</td>
                        <td>{salaries.month}</td>
                        <td>{salaries.year}</td>
                        <td>{salaries.basicSalary}</td>
                        <td>{salaries.ETFbonus}</td>
                        <td>{salaries.EPFbonus}</td>
                        <td>{salaries.netBonus}</td>
                        <td>{salaries.netSalary}</td>
                    </tr>
                    ))}
                    
                </tbody>
            </table>
        </div>
    )
}

export default AllSalaries;