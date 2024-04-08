import React, { useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

function ChangeSalesmanPassword() {
    const { salespersonID } = useParams();
    const [newPassword, setNewPassword] = useState({
        password: "",
        confirmPassword: "",
    });
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            if (newPassword.password !== newPassword.confirmPassword) {
                alert("Passwords do not match!");
                return;
            }

            await axios.put(`http://localhost:8070/salesmen/changePassword/${salespersonID}`, {
                password: newPassword.password,
                confirmPassword: newPassword.confirmPassword
            });

            alert('Password changed successfully');
            navigate(`/salesmenDashboard/${salespersonID}`);
        } catch (error) {
            console.log("Error!", error.message);
            alert("Error changing password!");
        }
    };

    const handlePasswordChange = (e) => {
        setNewPassword({
            ...newPassword,
            [e.target.salespersonID]: e.target.value
        });
    };

    return (
        <div className='absolute mt-64 left-1/3 w-1/2'>
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
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
                Change Password
            </button>
        </form>
    </div>
    
    );
}

export default ChangeSalesmanPassword;
