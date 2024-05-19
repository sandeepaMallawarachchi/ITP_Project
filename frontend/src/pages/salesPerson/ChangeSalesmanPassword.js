import React, { useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { Alert } from "flowbite-react";
import { HiInformationCircle } from "react-icons/hi";

function ChangeSalesmanPassword() {
    const { id } = useParams();
    const [newPassword, setNewPassword] = useState({
        password: "",
        confirmPassword: "",
    });
    const[successAlert, setSuccessAlert] = useState(false);
    const [errorsAlert, setErrorAlert] = useState(false);
    const [passwordNotMatchError, setPasswordNotMatchError] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            if (newPassword.password !== newPassword.confirmPassword) {
                setPasswordNotMatchError(true);

                setTimeout(() => {
                    setPasswordNotMatchError(false);
                }, 5000);

                return;
            }

            await axios.put(`https://hendriks-tea-management-system-backend.vercel.app/salesmen/changePassword/${id}`, {
                password: newPassword.password,
                confirmPassword: newPassword.confirmPassword
            });

            setSuccessAlert(true);

            setTimeout(() => {
                setSuccessAlert(false);
            }, 5000);

            navigate(`/`);
        } catch (error) {
            console.log("Error!", error.message);
            setErrorAlert(true);

            setTimeout(() => {
                setErrorAlert(false);
            }, 5000);
        }
    };

    const handlePasswordChange = (e) => {
        setNewPassword({
            ...newPassword,
            [e.target.id]: e.target.value
        });
    };

    return (
        <div className='absolute mt-64 left-1/3 w-1/2'>
            <Alert color="info" className={`absolute ${successAlert ? 'w-full text-center -mt-20 left-0' : 'hidden'}`}>
                <span className="font-medium">Password changed successfully</span>
            </Alert>
            <Alert color="failure" icon={HiInformationCircle} className={`absolute ${errorsAlert ? 'w-full text-center -mt-20 left-0' : 'hidden'}`}>
                <span className="font-medium">Error changing password!</span>
            </Alert>
            <Alert color="failure" icon={HiInformationCircle} className={`absolute ${passwordNotMatchError ? 'w-full text-center -mt-20 left-0' : 'hidden'}`}>
                <span className="font-medium">Passwords not matching!</span>
            </Alert>

            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">New Password</label>
                    <input
                        type="password"
                        className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        id="password"
                        required
                        value={newPassword.password}
                        onChange={handlePasswordChange}
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Confirm New Password</label>
                    <input
                        type="password"
                        className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        id="confirmPassword"
                        required
                        value={newPassword.confirmPassword}
                        onChange={handlePasswordChange}
                    />
                </div>
                <button
                    type="submit"
                    className="mt-5 focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                >
                    Change Password
                </button>
            </form>
        </div>

    );
}

export default ChangeSalesmanPassword;
