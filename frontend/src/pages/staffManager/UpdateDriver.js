import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

function UpdateDriver() {
    const { id, dID } = useParams();
    const [driverDetails, setDriverDetails] = useState({
        dname: "",
        age: "",
        address: "",
        phone_number: "",
        email: "",
        duration_of_job: "",
    });
    useEffect(() => {
        const fetchDriverDetails = async () => {
            try {
                const response = await axios.get(`https://hendriks-tea-management-system-backend.vercel.app/empLogin/get/${dID}`);
                setDriverDetails(response.data.driver);
                console.log(response.data.driver)
            } catch (error) {
                console.error("Error fetching driver details", error.message);
            }
        };
        fetchDriverDetails();
    }, [dID]);

    console.log(dID)

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await axios.put(`https://hendriks-tea-management-system-backend.vercel.app/empLogin/update/${dID}`, driverDetails);
            alert("Details Updated!");
            navigate(`/staff/allEmployees/${id}`);
        } catch (error) {
            console.error("Error updating driver details", error.message);
        }
    };

    return (
        <div className='absolute mt-48 left-96 w-1/2 '>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label htmlFor="dname" className="block text-sm font-medium text-gray-700">Driver Name</label>
                    <input type="text" className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" id="dname" value={driverDetails.dname} onChange={(e) => setDriverDetails({ ...driverDetails, dname: e.target.value })} />
                </div>
                <div>
                    <label htmlFor="age" className="block text-sm font-medium text-gray-700">Age</label>
                    <input type="number" className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" id="age" value={driverDetails.age} onChange={(e) => setDriverDetails({ ...driverDetails, age: e.target.value })} />
                </div>
                <div>
                    <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address</label>
                    <input type="text" className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" id="address" value={driverDetails.address} onChange={(e) => setDriverDetails({ ...driverDetails, address: e.target.value })} />
                </div>
                <div>
                    <label htmlFor="phone_number" className="block text-sm font-medium text-gray-700">Phone Number</label>
                    <input type="number" className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" id="phone_number" value={driverDetails.phone_number} onChange={(e) => setDriverDetails({ ...driverDetails, phone_number: e.target.value })} />
                </div>
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                    <input type="email" className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" id="email" value={driverDetails.email} onChange={(e) => setDriverDetails({ ...driverDetails, email: e.target.value })} />
                </div>
                <div>
                    <label htmlFor="duration_of_job" className="block text-sm font-medium text-gray-700">Duration of Job</label>
                    <input type="text" className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" id="duration_of_job" value={driverDetails.duration_of_job} onChange={(e) => setDriverDetails({ ...driverDetails, duration_of_job: e.target.value })} />
                </div>
                <div>
                    <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Update</button>
                </div>
            </form>
        </div>
    );
}

export default UpdateDriver;