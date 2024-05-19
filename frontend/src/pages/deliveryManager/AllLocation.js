import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from "axios";

export default function AllLocation() {
    const { id } = useParams();
    const [searchValue, setSearchValue] = useState("");
    const [tea, setTea] = useState([]);
    const [filteredTea, setFilteredTea] = useState([]);

    useEffect(() => {
        fetchTea();
    }, []);

    const fetchTea = () => {
        axios.get("https://hendriks-tea-management-system-backend.vercel.app/tea/")
            .then(response => {
                setTea(response.data);
                setFilteredTea(response.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    useEffect(() => {
        filterTea();
    }, [searchValue]);

    const filterTea = () => {
        const trimmedSearchValue = searchValue.trim().toLowerCase();
        if (trimmedSearchValue === "") {
            setFilteredTea(tea);
        } else {
            const filteredData = tea.filter(tea1 =>
                tea1.name && tea1.name.toLowerCase().includes(trimmedSearchValue)
            );
            setFilteredTea(filteredData);
        }
    }

    const navigate = useNavigate();

    const handleUpdate = (locID) => {
        navigate(`/deliveryManager/updatelocations/${locID}/${id}`);
    }

    const handleDelete = (locID) => {
        navigate(`/deliveryManager/deletelocations/${locID}/${id}`);
    }

    return (
        <div className="flex justify-center items-center h-screen absolute mt-64 left-1/3 w-1/2">
            <div>
                <h1 className="text-3xl font-bold mb-8">All Customers</h1>
                <div className="relative mb-4">
                    <input className="w-full py-2 px-4 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500" placeholder="Search" onChange={(e) => setSearchValue(e.target.value)} />
                </div>
                {filteredTea.length > 0 ? (
                    <table className="w-full">
                        <thead>
                            <tr>
                                <th className="px-4 py-2">Customer Name</th>
                                <th className="px-4 py-2">Customer ID</th>
                                <th className="px-4 py-2">Email</th>
                                <th className="px-4 py-2">Phone Number</th>
                                <th className="px-4 py-2">Address</th>
                                <th className="px-4 py-2">District</th>
                                <th className="px-4 py-2">Delivery Code</th>
                                <th className="px-4 py-2">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredTea.map((tea1) => (
                                <tr key={tea1._id}>
                                    <td className="border px-4 py-2">{tea1.name}</td>
                                    <td className="border px-4 py-2">{tea1.cusID}</td>
                                    <td className="border px-4 py-2">{tea1.email}</td>
                                    <td className="border px-4 py-2">{tea1.phone_number}</td>
                                    <td className="border px-4 py-2">{tea1.address}</td>
                                    <td className="border px-4 py-2">{tea1.district}</td>
                                    <td className="border px-4 py-2">{tea1.delivery_code}</td>
                                    <td className="border px-4 py-2">
                                        <div className='flex'>
                                            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2" onClick={() => handleUpdate(tea1._id, id)}>Update</button>
                                            <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={() => handleDelete(tea1._id, id)}>Delete</button>
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
