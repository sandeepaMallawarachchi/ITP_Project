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
                        <th scope="col">Employee ID</th>
                        <th scope="col">First Name</th>
                        <th scope="col">Last Name</th>
                        <th scope="col">Gender</th>
                        <th scope="col">Department</th>
                        <th scope="col">Designation</th>
                        <th scope="col">Address</th>
                        <th scope="col">Email</th>
                        <th scope="col">Phone No</th>
                        <th scope="col">Action</th>
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
                            <td><button type="submit" class="btn btn-success" onClick={() => handleUpdateEmployees(employee.empId)}>Update</button>
                                <button type="submit" class="btn btn-danger" onClick={() => handleDeleteEmployees(employee._id)}>Delete</button>
                            </td>
                        </tr>
                    ))}

                </tbody>
            </table>

            <button type="submit" class="btn btn-success" onClick={handleAddEmployees}>Add Employee</button>

        </div>
    )
}

export default AllEmployees;