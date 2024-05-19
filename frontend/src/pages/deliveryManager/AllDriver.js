import React, { useState, useEffect } from 'react';
import { useParams,useNavigate } from 'react-router-dom';
import axios from "axios";

export default function AllDriver() {
    const {id} = useParams();
    const [searchValue, setSearchValue] = useState("");
    const [driver, setDriver] = useState([]);
    const [filteredDriver, setFilteredDriver] = useState([]);

    useEffect(() => {
        fetchDriver();
    }, []);

    useEffect(() => {
        filterDriver();
    }, [searchValue, driver]);

    const fetchDriver = () => {
        axios.get("https://hendriks-tea-management-system-backend.vercel.app/driver/")
            .then(response => {
                setDriver(response.data);
                setFilteredDriver(response.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    const filterDriver = () => {
        if (searchValue.trim() === "") {
            setFilteredDriver(driver);
        } else {
            const filteredData = driver.filter(driver1 =>
                driver1.dname && driver1.dname.toLowerCase().includes(searchValue.toLowerCase())
            );
            setFilteredDriver(filteredData);
        }
    }

    const navigate = useNavigate();

    const handleUpdate = (driverId) => {
        navigate(`/deliveryManager/updateDrivers/${driverId}/${id}`);
    }

    const handleDelete = (driverId) => {
        navigate(`/deliveryManager/deleteDrivers/${driverId}/${id}`);
    }

    
    return (
        <div className="flex justify-center items-center h-screen absolute pt-10 mt-48 left-1/4 ml-20 w-1/2">
            <div>
                <h1 className="text-3xl font-bold mb-8">All Drivers</h1>
                <div className="relative mb-4 ">
                    <input className="w-full py-2 px-4 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500" placeholder="Search" onChange={(e) => setSearchValue(e.target.value)} />
                </div>
                {filteredDriver.length > 0 ? (
                    <table className="w-full">
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
                            {filteredDriver.map((driver1) => (
                                <tr key={driver1._id}>
                                    <td className="border px-4 py-2">{driver1.dname}</td>
                                    <td className="border px-4 py-2">{driver1.dID}</td>
                                    <td className="border px-4 py-2">{driver1.age}</td>
                                    <td className="border px-4 py-2">{driver1.address}</td>
                                    <td className="border px-4 py-2">{driver1.phone_number}</td>
                                    <td className="border px-4 py-2">{driver1.email}</td>
                                    <td className="border px-4 py-2">{driver1.duration_of_job}</td>
                                    <td className="border px-4 py-2">
                                        <div className='flex'>
                                        <button  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2" onClick={() => handleUpdate(driver1._id,id)}>Update</button>
                                        <button  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={() => handleDelete(driver1._id,id)}>Delete</button>

                                       </div>
                                        
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <div>No results found</div>
                )}
            </div>
        </div>
    );
}
