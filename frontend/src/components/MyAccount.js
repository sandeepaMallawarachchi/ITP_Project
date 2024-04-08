import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import profilePic from '../images/Profile.png';

export default function SalesmenDashboard() {
    const { id } = useParams();
    const [salesmanDetails, setSalesmanDetails] = useState({
        name: "",
        username: "",
        dateOfBirth: "",
        email: "",
        phone: "",
        address: "",
    });
    const navigate = useNavigate();

    useEffect(() => {
        const fetchSalesmanDetails = async () => {
            try {
                const res = await axios.get(`http://localhost:8070/salesmen/salesmenDashboard/${id}`);
                console.log(res.data);

                const salesmanData = res.data.salesman || res.data;
                const { name, username, dateOfBirth, email, phone, address } = salesmanData;
                setSalesmanDetails({ name, username, dateOfBirth, email, phone, address });
                console.log(name)
            } catch (error) {
                console.log("Error fetching details", error.message);
            }
        };
        fetchSalesmanDetails();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await axios.put(`http://localhost:8070/salesmen/updateSalesmen/${id}`, salesmanDetails);
            alert('Details Updated successfully');
            navigate(`/salesmenDashboard/${id}`);
        } catch (error) {
            console.log("Error!", error.message);
        }
    };

    const deleteBtn = (id) => {
        navigate(`/deleteSalesman/${id}`);
    };

    const changePwBtn = () => {
        navigate(`/changeSalesmanPassword/${id}`);
    };
    return (
        <div className='absolute mt-48 left-1/4 w-3/4 '>
            <div id='profDetails' className='absolute w-72'>
                <img src={profilePic} id='profPic' alt="Profile" />
                {/* <p>Name: <span id='span'>{salesman.name}</span></p>
                <p>Username: <span id='span'>{salesman.username}</span></p> */}
            </div>

            <div className='absolute left-[40%] w-[500px]'>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
                        <input
                            type="text"
                            className="form-control bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            id="name"
                            required
                            value={salesmanDetails.name}
                            onChange={(e) => {
                                setSalesmanDetails({
                                    ...salesmanDetails,
                                    name: e.target.value,
                                });
                            }}
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Username</label>
                        <input
                            type="text"
                            className="form-control bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            id="username"
                            required
                            value={salesmanDetails.username}
                            onChange={(e) => {
                                setSalesmanDetails({
                                    ...salesmanDetails,
                                    username: e.target.value,
                                });
                            }}
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="dateOfBirth" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Date of Birth</label>
                        <input
                            type="date"
                            className="form-control bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            id="dateOfBirth"
                            required
                            value={salesmanDetails.dateOfBirth}
                            onChange={(e) => {
                                setSalesmanDetails({
                                    ...salesmanDetails,
                                    dateOfBirth: e.target.value,
                                });
                            }}
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                        <input
                            type="email"
                            className="form-control bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            id="email"
                            required
                            value={salesmanDetails.email}
                            onChange={(e) => {
                                setSalesmanDetails({
                                    ...salesmanDetails,
                                    email: e.target.value,
                                });
                            }}
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Phone number</label>
                        <input
                            type="number"
                            className="form-control bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            id="phone"
                            required
                            value={salesmanDetails.phone}
                            onChange={(e) => {
                                setSalesmanDetails({
                                    ...salesmanDetails,
                                    phone: e.target.value,
                                });
                            }}
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="address" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Address</label>
                        <input
                            type="text"
                            className="form-control bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            id="address"
                            required
                            value={salesmanDetails.address}
                            onChange={(e) => {
                                setSalesmanDetails({
                                    ...salesmanDetails,
                                    address: e.target.value,
                                });
                            }}
                        />
                    </div>

                    <button type="submit" className="btn btn-success bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-white">
                        Update Account
                    </button>
                </form>
            </div>


            <div id='profBtns' className='absolute ml-4 w-64 top-80 flex flex-col items-center'>
                <button type="button"
                    onClick={changePwBtn}
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    Change Password
                </button>
                <button type="button"
                    onClick={deleteBtn}
                    className="focus:outline-none mt-8 text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">
                    Delete Account
                </button>
            </div>

        </div>
    );
}
