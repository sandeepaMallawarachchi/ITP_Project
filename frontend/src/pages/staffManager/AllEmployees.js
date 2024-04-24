import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

function AllEmployees() {
    const [employees, setEmployees] = useState([]);
    const [salespersons, setSalesPersons] = useState([]);
    const [drivers, setDrivers] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const { id } = useParams();

    useEffect(() => {
        axios.get("http://localhost:8070/staff/allEmployees").then((res) => {
            setEmployees(res.data);
        }).catch((error) => {
            alert(error.message);
        });
    }, []);

    useEffect(() => {
        axios.get("http://localhost:8070/staff/allSalesmen").then((res) => {
            setSalesPersons(res.data);
        }).catch((error) => {
            alert(error.message);
        });
    }, []);

    useEffect(() => {
        axios.get("http://localhost:8070/staff/allDrivers").then((res) => {
            setDrivers(res.data);
        }).catch((error) => {
            alert(error.message);
        });
    }, []);

    const navigate = useNavigate();

    const handleUpdateEmployees = (empId) => {
        navigate(`/staff/updateEmployee/${empId}/${id}`);
    };

    const handleDeleteEmployees = (empId) => {
        navigate(`/staff/deleteEmployee/${empId}/${id}`);
    };

    return (
        <div className='absolute mt-48 left-1/3 w-1/2 '>
            <input
                type="text"
                placeholder="Search by First Name"
                onChange={(e) => setSearchTerm(e.target.value)}
                className="form-control mb-3"
            />

            <h1>All Managers</h1>
            <table className="table">
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
                    {employees.filter(employee => employee.firstName?.toLowerCase().includes(searchTerm.toLowerCase())).map((employee) => (
                        <tr key={employee._id}>
                            <td>{employee.empId}</td>
                            <td>{employee.firstName}</td>
                            <td>{employee.lastName}</td>
                            <td>{employee.gender}</td>
                            <td>{employee.department}</td>
                            <td>{employee.designation}</td>
                            <td>{employee.address}</td>
                            <td>{employee.email}</td>
                            <td>{employee.phoneNo}</td>
                            <td>
                                <button className="btn btn-success" onClick={() => handleUpdateEmployees(employee.empId)}>Update</button>
                                <button className="btn btn-danger" onClick={() => handleDeleteEmployees(employee.empId)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <h1>All Salespersons</h1>
            <table className="table">
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
                    {salespersons.filter(salesperson => salesperson.name?.toLowerCase().includes(searchTerm.toLowerCase())).map((salesperson) => (
                        <tr key={salesperson._id}>
                            <td>{salesperson.salespersonID}</td>
                            <td>{salesperson.name}</td>
                            <td>{salesperson.dateOfBirth}</td>
                            <td>{salesperson.gender}</td>
                            <td>{salesperson.email}</td>
                            <td>{salesperson.phone}</td>
                            <td>{salesperson.address}</td>
                            <td>
                                <button className="btn btn-success" onClick={() => handleUpdateEmployees(salesperson.salespersonID)}>Update</button>
                                <button className="btn btn-danger" onClick={() => handleDeleteEmployees(salesperson.salespersonID)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <h1>All Drivers</h1>
            <table className="table">
                <thead>
                    <tr>
                        <th className="px-4 py-2">Driver Name</th>
                        <th className="px-4 py-2">Driver ID</th>
                        <th className="px-4 py-2">Age</th>
                        <th className="px-4 py-2">Address</th>
                        <th className="px-4 py-2">Phone Number</th>
                        <th className="px-4 py-2">Email</th>
                        <th className="px-4 py-2">Duration of Job</th>
                        <th className="px-4 py-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {drivers.filter(driver => driver.dname?.toLowerCase().includes(searchTerm.toLowerCase())).map((driver) => (
                        <tr key={driver._id}>
                            <td className="border px-4 py-2">{driver.dname}</td>
                            <td className="border px-4 py-2">{driver.dID}</td>
                            <td className="border px-4 py-2">{driver.age}</td>
                            <td className="border px-4 py-2">{driver.address}</td>
                            <td className="border px-4 py-2">{driver.phone_number}</td>
                            <td className="border px-4 py-2">{driver.email}</td>
                            <td className="border px-4 py-2">{driver.duration_of_job}</td>
                            <td className="border px-4 py-2">

                                <button className="btn btn-success" onClick={() => handleUpdateEmployees(driver.driverID)}>Update</button>
                                <button className="btn btn-danger" onClick={() => handleDeleteEmployees(driver.driverID)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default AllEmployees;
