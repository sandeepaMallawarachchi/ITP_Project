import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function AllEmployees() {

    const [employees, setEmployees] = useState([]);
    const [salespersons, setSalesPersons] = useState([]);
    const [drivers, setDrivers] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:8070/staff/allEmployees").then((res) => {
            setEmployees(res.data);
        }).catch((error) => {
            alert(error.message);
        });
    }, [])

    useEffect(() => {
        axios.get("http://localhost:8070/staff/allSalesmen").then((res) => {
            setSalesPersons(res.data);
        }).catch((error) => {
            alert(error.message);
        });
    }, [])

    useEffect(() => {
        axios.get("http://localhost:8070/staff/allDrivers").then((res) => {
            setDrivers(res.data);
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
            
            <h1>All Managers</h1>
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

            {/* <button type="submit" class="btn btn-success" onClick={handleAddEmployees}>Add Employee</button> */}

            <h1>All Salespersons</h1>
            <table class="table">
                <thead>
                    <tr>
                        <th scope="col">Salesperson ID</th>
                        <th scope="col">Salesperson Name</th>
                        <th scope="col">Date of Birth</th>
                        <th scope="col">Gender</th>
                        <th scope="col">Email</th>
                        <th scope="col">Phone No</th>
                        <th scope="col">Address</th>
                    </tr>
                </thead>
                <tbody>
                    {salespersons.map((salesperson) => (
                        <tr key={(salesperson._id)}>
                            <td>{salesperson.salespersonID}</td>
                            <td>{salesperson.name}</td>
                            <td>{salesperson.gender}</td>
                            <td>{salesperson.dateOfBirth}</td>
                            <td>{salesperson.address}</td>
                            <td>{salesperson.email}</td>
                            <td>{salesperson.phone}</td>
                            <td><button type="submit" class="btn btn-success" onClick={() => handleUpdateEmployees(salesperson.empId)}>Update</button>
                                <button type="submit" class="btn btn-danger" onClick={() => handleDeleteEmployees(salesperson._id)}>Delete</button>
                            </td>
                        </tr>
                    ))}

                </tbody>
            </table>

            <h1>All Drivers</h1>
            <table class="table">
                <thead>
                    <tr>
                        <th scope="col">Driver Name</th>
                        <th scope="col">Age</th>
                        <th scope="col">Address</th>
                        <th scope="col">Phone Number</th>
                        <th scope="col">Email</th>
                        <th scope="col">Duration of Job</th>
                    </tr>
                </thead>
                <tbody>
                    {drivers.map((driver) => (
                        <tr key={(driver._id)}>
                            <td>{driver.dname}</td>
                            <td>{driver.age}</td>
                            <td>{driver.address}</td>
                            <td>{driver.phone_number}</td>
                            <td>{driver.email}</td>
                            <td>{driver.duration_of_job}</td>
                            <td><button type="submit" class="btn btn-success" onClick={() => handleUpdateEmployees(driver.empId)}>Update</button>
                                <button type="submit" class="btn btn-danger" onClick={() => handleDeleteEmployees(driver._id)}>Delete</button>
                            </td>
                        </tr>
                    ))}

                </tbody>
            </table>

        </div>
    )
}

export default AllEmployees;