import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { Alert } from "flowbite-react";
import { HiInformationCircle } from "react-icons/hi";

export default function UpdateSalesPerson() {
    const { id, salesPersonId } = useParams();
    const [salesmanDetails, setSalesmanDetails] = useState({
        name: "",
        username: "",
        dateOfBirth: "",
        email: "",
        phone: "",
        address: "",
    });
    const [successAlert, setSuccessAlert] = useState(false);
    const [errorsAlert, setErrorAlert] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchSalesmanDetails = async () => {
            try {
                const res = await axios.get(`https://hendriks-tea-management-system-backend.vercel.app/salesmen/salesmenDashboard/${salesPersonId}`);
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
    }, [salesPersonId]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await axios.put(`https://hendriks-tea-management-system-backend.vercel.app/salesmen/updateSalesmen/${salesPersonId}`, salesmanDetails);

            setSuccessAlert(true);

            setTimeout(() => {
                setSuccessAlert(false);
            }, 5000);

            navigate(`/staff/allEmployees/${id}`)

        } catch (error) {
            console.log("Error!", error.message);

            setErrorAlert(true);

            setTimeout(() => {
                setErrorAlert(false);
            }, 5000);
        }
    };

    return (
        <div className='absolute mt-44 left-1/4 w-3/4 '>

            <Alert color="info" className={`absolute ${successAlert ? 'w-5/6 text-center -mt-14 left-0' : 'hidden'}`}>
                <span className="font-medium">Salesman updated successfully</span>
            </Alert>
            <Alert color="failure" icon={HiInformationCircle} className={`absolute ${errorsAlert ? 'w-5/6 text-center -mt-14 left-0' : 'hidden'}`}>
                <span className="font-medium">Error updating!</span>
            </Alert>

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
    );
}
