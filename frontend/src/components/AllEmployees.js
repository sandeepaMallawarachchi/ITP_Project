import React, { useState, useEffect } from 'react';
import axios from 'axios';
// import { useParams, useNavigate } from 'react-router-dom';

function AllEmployees() {

    const [employees, setEmployees] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:8070/staff/allEmployees").then((res) => {
            setEmployees(res.data);
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
                        <th scope="col">First Name</th>
                        <th scope="col">Last Name</th>
                        <th scope="col">Gender</th>
                        <th scope="col">Department</th>
                        <th scope="col">Designation</th>
                        <th scope="col">Address</th>
                        <th scope="col">Email</th>
                        <th scope="col">Phone No</th>
                    </tr>
                </thead>
                <tbody>
                    {employees.map((employee) => (
                    <tr key={(employee._id)}>
                        <td>{employee.empId}</td>
                        <td>{employee.firstName}</td>
                        <td>{employee.lastName}</td>
                        <td>{employee.gender}</td>
                        <td>{employee.department}</td>
                        <td>{employee.designation}</td>
                        <td>{employee.address}</td>
                        <td>{employee.email}</td>
                        <td>{employee.phoneNo}</td>
                    </tr>
                    ))}
                    
                </tbody>
            </table>
        </div>
    )
}

export default AllEmployees;