import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

function UpdateEmployee() {
    const { empId, id } = useParams();
    const [empDetails, setEmpDetails] = useState({
        firstName: "",
        lastName: "",
        gender: "",
        department: "",
        designation: "",
        address: "",
        email: "",
        phoneNo: "",
    });

    useEffect(() => {
        const fetchEmpDetails = async () => {
            try {
                const response = await axios.get(`https://hendriks-tea-management-system-backend.vercel.app/empLogin/getManager/${empId}`);
                // Accessing nested manager data correctly
                const empData = response.data.manager;
                const { firstName, lastName, gender, department, designation, address, email, phoneNo } = empData;
                setEmpDetails({ firstName, lastName, gender, department, designation, address, email, phoneNo });
                console.log("Employee Data:", empData);
            } catch (error) {
                console.error("Error fetching employee details", error);
            }
        };
        fetchEmpDetails();
    }, [empId]);

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await axios.put(`https://hendriks-tea-management-system-backend.vercel.app/empLogin/updateManager/${empId}`, empDetails);
            alert("Details Updated!");
            navigate(`/staff/allEmployees/${id}`);
        } catch (error) {
            console.error("Error updating employee details", error);
        }
    };

    return (
        <div className='absolute mt-48 left-1/3 w-1/2'>
            <form onSubmit={handleSubmit}>
                <div>
                    <div className="mb-3">
                        <label htmlFor="firstName" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">First Name</label>
                        <input type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" id="firstName" value={empDetails.firstName} onChange={(e) => setEmpDetails({ ...empDetails, firstName: e.target.value })} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="lastName" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Last Name</label>
                        <input type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" id="lastName" value={empDetails.lastName} onChange={(e) => setEmpDetails({ ...empDetails, lastName: e.target.value })} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="gender" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Gender</label>
                        <input type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" id="gender" value={empDetails.gender} onChange={(e) => setEmpDetails({ ...empDetails, gender: e.target.value })} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="department" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Department</label>
                        <input type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" id="department" value={empDetails.department} onChange={(e) => setEmpDetails({ ...empDetails, department: e.target.value })} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="designation" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Designation</label>
                        <input type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" id="designation" value={empDetails.designation} onChange={(e) => setEmpDetails({ ...empDetails, designation: e.target.value })} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="address" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Address</label>
                        <input type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" id="address" value={empDetails.address} onChange={(e) => setEmpDetails({ ...empDetails, address: e.target.value })} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                        <input type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" id="email" value={empDetails.email} onChange={(e) => setEmpDetails({ ...empDetails, email: e.target.value })} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="phoneNo" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Phone Number</label>
                        <input type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" id="phoneNo" value={empDetails.phoneNo} onChange={(e) => setEmpDetails({ ...empDetails, phoneNo: e.target.value })} />
                    </div>
                </div>
                <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Update Employee</button>
            </form>
        </div>
    );
}

export default UpdateEmployee;