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
        axios.get("https://hendriks-tea-management-system-backend.vercel.app/staff/allEmployees").then((res) => {
            setEmployees(res.data);
        }).catch((error) => {
            alert(error.message);
        });
    }, []);

    useEffect(() => {
        axios.get("https://hendriks-tea-management-system-backend.vercel.app/staff/allSalesmen").then((res) => {
            setSalesPersons(res.data);
        }).catch((error) => {
            alert(error.message);
        });
    }, []);

    useEffect(() => {
        axios.get("https://hendriks-tea-management-system-backend.vercel.app/staff/allDrivers").then((res) => {
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

    const handleUpdateSalesperson = (salesPersonId) => {
        navigate(`/staff/updateSalesperson/${salesPersonId}/${id}`);
    };

    const handleDeleteSalesperson = (salespersonID) => {
        navigate(`/staff/deleteSalesperson/${salespersonID}/${id}`);
    };

    const handleUpdateDriver = (dID) => {
        navigate(`/staff/updateDriver/${dID}/${id}`);
    };
    const handleDeleteDriver = (dID) => {
        navigate(`/staff/deleteDriver/${dID}/${id}`);
    };

    return (
        <div className='absolute mt-48 left-80 w-1/2 '>
            <input
                type="text"
                placeholder="Search by First Name"
                onChange={(e) => setSearchTerm(e.target.value)}
                className="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-e-lg rounded-lg border-s-gray-50 border-s-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-s-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500"
            />

            <h1 className="text-green-500 font-bold">All Managers</h1>

            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3">Employee ID</th>
                        <th scope="col" className="px-6 py-3">First Name</th>
                        <th scope="col" className="px-6 py-3">Last Name</th>
                        <th scope="col" className="px-6 py-3">Gender</th>
                        <th scope="col" className="px-6 py-3">Department</th>
                        <th scope="col" className="px-6 py-3">Designation</th>
                        <th scope="col" className="px-6 py-3">Address</th>
                        <th scope="col" className="px-6 py-3">Email</th>
                        <th scope="col" className="px-6 py-3">Phone No</th>
                        <th scope="col" className="px-6 py-3">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {employees.filter(employee => employee.firstName?.toLowerCase().includes(searchTerm.toLowerCase())).map((employee) => (
                        <tr key={employee._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 text-black">
                            <td className="px-6 py-4">{employee.empId}</td>
                            <td className="px-6 py-4">{employee.firstName}</td>
                            <td className="px-6 py-4">{employee.lastName}</td>
                            <td className="px-6 py-4">{employee.gender}</td>
                            <td className="px-6 py-4">{employee.department}</td>
                            <td className="px-6 py-4">{employee.designation}</td>
                            <td className="px-6 py-4">{employee.address}</td>
                            <td className="px-6 py-4">{employee.email}</td>
                            <td className="px-6 py-4">{employee.phoneNo}</td>
                            <td>
                                <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={() => handleUpdateEmployees(employee.empId)}>Update</button>
                                <button className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800" onClick={() => handleDeleteEmployees(employee.empId)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <h1 className="text-green-500 font-bold">All Salespersons</h1>
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3">Salesperson ID</th>
                        <th scope="col" className="px-6 py-3">Salesperson Name</th>
                        <th scope="col" className="px-6 py-3">Date of Birth</th>
                        <th scope="col" className="px-6 py-3">Gender</th>
                        <th scope="col" className="px-6 py-3">Email</th>
                        <th scope="col" className="px-6 py-3">Phone No</th>
                        <th scope="col" className="px-6 py-3">Address</th>
                    </tr>
                </thead>
                <tbody>
                    {salespersons.filter(salesperson => salesperson.name?.toLowerCase().includes(searchTerm.toLowerCase())).map((salesperson) => (
                        <tr key={salesperson._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 text-black">
                            <td className="px-6 py-4">{salesperson.salespersonID}</td>
                            <td className="px-6 py-4">{salesperson.name}</td>
                            <td className="px-6 py-4">{salesperson.dateOfBirth}</td>
                            <td className="px-6 py-4">{salesperson.gender}</td>
                            <td className="px-6 py-4">{salesperson.email}</td>
                            <td className="px-6 py-4">{salesperson.phone}</td>
                            <td className="px-6 py-4">{salesperson.address}</td>
                            <td>
                                <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={() => handleUpdateSalesperson(salesperson.salespersonID)}>Update</button>
                                <button className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800" onClick={() => handleDeleteSalesperson(salesperson.salespersonID)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <h1 className="text-green-500 font-bold">All Drivers</h1>
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th className="px-6 py-3">Driver Name</th>
                        <th className="px-6 py-3">Driver ID</th>
                        <th className="px-6 py-3">Age</th>
                        <th className="px-6 py-3">Address</th>
                        <th className="px-6 py-3">Phone Number</th>
                        <th className="px-6 py-3">Email</th>
                        <th className="px-6 py-3">Duration of Job</th>
                        <th className="px-6 py-3">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {drivers.filter(driver => driver.dname?.toLowerCase().includes(searchTerm.toLowerCase())).map((driver) => (
                        <tr key={driver._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 text-black">
                            <td className="px-6 py-4">{driver.dname}</td>
                            <td className="px-6 py-4">{driver.dID}</td>
                            <td className="px-6 py-4">{driver.age}</td>
                            <td className="px-6 py-4">{driver.address}</td>
                            <td className="px-6 py-4">{driver.phone_number}</td>
                            <td className="px-6 py-4">{driver.email}</td>
                            <td className="px-6 py-4">{driver.duration_of_job}</td>
                            <td>

                                <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={() => handleUpdateDriver(driver.dID)}>Update</button>
                                <button className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800" onClick={() => handleDeleteDriver(driver.dID)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default AllEmployees;
