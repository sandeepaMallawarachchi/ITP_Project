import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { VscEyeClosed, VscEye } from "react-icons/vsc";
import { Alert } from "flowbite-react";
import { HiInformationCircle } from "react-icons/hi";

export default function Login() {
    const [usernameOrPhone, setUsernameOrPhone] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [invalidUsernameOrPhone, setInvalidUsernameOrPhone] = useState(false);
    const [invalidPassword, setInvalidPassword] = useState(false);
    const navigate = useNavigate();

    const sendData = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.post(`http://localhost:8070/salesmen/login`, {
                usernameOrPhone,
                password
            });

            const token = res.data.token;
            const salespersonID = res.data.salespersonID;
            const role = res.data.role;

            if (res.data.error === 401) {
                setInvalidPassword(true);

                setTimeout(() => {
                    setInvalidPassword(false);
                }, 5000);
            } else {
                if (role === 'salesperson') {
                    navigate(`/salesmenDashboard/${salespersonID}`);
                }
            }

        } catch (error) {
            if (error.res === 401) {
                setInvalidPassword(true);

                setTimeout(() => {
                    setInvalidPassword(false);
                }, 5000);

            } else {
                setInvalidUsernameOrPhone(true);

                setTimeout(() => {
                    setInvalidUsernameOrPhone(false);
                }, 5000);
                console.error("Error:", error.message);
            }
        }
    }

    return (
        <div className='absolute mt-48 left-1/3 w-1/3 bg-[#f9fafb] shadow-md sm:rounded-lg p-8'>
            <Alert color="failure" icon={HiInformationCircle} className={`absolute ${invalidUsernameOrPhone ? 'w-full text-center -mt-20' : 'hidden'}`}>
                <span className="font-medium">Invalid credentials!</span>
            </Alert>
            <Alert color="failure" icon={HiInformationCircle} className={`absolute ${invalidPassword ? 'w-full text-center -mt-20' : 'hidden'}`}>
                <span className="font-medium">Invalid password!</span>
            </Alert>
            <form onSubmit={sendData}>
                <div className="mb-6">
                    <label htmlFor="usernameOrphone" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Enter Username or phone</label>
                    <input
                        type="text"
                        id="usernameOrphone"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="someone or 071234567"
                        required
                        onChange={(e) => setUsernameOrPhone(e.target.value)}
                    />
                </div>

                <div className="mb-6 relative">
                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Enter password</label>
                    <input
                        type={showPassword ? "text" : "password"}
                        id="password"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 pr-10 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="password"
                        required
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button
                        type="button"
                        className="absolute inset-y-0 right-0 flex items-center pr-3 focus:outline-none mt-7"
                        onClick={() => setShowPassword(!showPassword)}
                    >
                        {showPassword ? (
                            <VscEye />
                        ) : (
                            <VscEyeClosed />
                        )}
                    </button>
                </div>

                <button
                    type="submit"
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                    Login
                </button>
            </form>
        </div>
    );
}