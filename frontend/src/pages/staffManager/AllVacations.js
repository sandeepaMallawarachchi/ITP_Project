import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function AllEmployees() {

    const [employees, setEmployees] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:8070/staff/allEmployees").then((res) => {
            setEmployees(res.data);
        }).catch((error) => {
            alert(error.message);
        });
    }, [])

    const navigate = useNavigate();

    const handleAddEmployees = () => {
        navigate(`/addEmployee`);
    }
    const handleUpdateEmployees = (id) => {
        navigate(`/updateEmployee/${id}`);
    }

    const handleDeleteEmployees = (id) => {
        navigate(`/deleteEmployee/${id}`);
    }

    return (
        <div className='absolute mt-48 left-1/3 w-1/2 '>
            <table class="table">
                <thead>
                    <tr>
                        <th scope="col">Date</th>
                        <th scope="col">Employee Name</th>
                        <th scope="col">Title</th>
                        <th scope="col">Department</th>
                        <th scope="col">Vacation Days Earned</th>
                        <th scope="col">Requesting Date</th>
                        <th scope="col">Returning Date</th>
                        <th scope="col">Total Days</th>
                    </tr>
                </thead>
                <tbody>
                    {employees.map((employee) => (
                        <tr key={(employee._id)}>
                            <td>{employee.date}</td>
                            <td>{employee.empName}</td>
                            <td>{employee.title}</td>
                            <td>{employee.department}</td>
                            <td>{employee.daysEarned}</td>
                            <td>{employee.reqDate}</td>
                            <td>{employee.returningDate}</td>
                            <td>{employee.totDays}</td>
                            <td><button type="submit" class="btn btn-success" onClick={() => handleApprove(employee.empId)}>Approve</button>
                                <button type="submit" class="btn btn-danger" onClick={() => handleReject(employee._id)}>Reject</button>
                            </td>
                        </tr>
                    ))}

                </tbody>
            </table>

        </div>
    )
}

export default AllVacations;