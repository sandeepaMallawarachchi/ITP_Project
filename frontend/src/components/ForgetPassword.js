import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from "react-router-dom";
import { Alert } from "flowbite-react";
import { HiInformationCircle } from "react-icons/hi";

export default function ForgetPassword() {
    const [usernameOrPhone, setUsernameOrPhone] = useState('');
    const [email, setEmail] = useState('');
    const [invalidUsernameOrPhone, setInvalidUsernameOrPhone] = useState(false);
    const [emailSent, setEmailSent] = useState(false);
    const [error, setError] = useState(false);
    const navigate = useNavigate();

    const sendData = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.post(`https://hendriks-tea-management-system-backend.vercel.app/salesmen/forgetPassword`, {
                usernameOrPhone,
                email
            });

            setEmailSent(true);
            setError(false);

            setTimeout(() => {
                setEmailSent(false);
            }, 5000);

        } catch (error) {

            setInvalidUsernameOrPhone(true);
            setError(true);

            setTimeout(() => {
                setInvalidUsernameOrPhone(false);
            }, 5000);
            console.error("Error:", error.message);
        }
    }

    return (
        <div className='absolute w-full h-full'>

            <h1 className='absolute text-center text-5xl mt-20 ml-[38%] text-blue-600 font-bold'>Reset Password</h1>

            <div className='absolute mt-44 left-1/3 w-1/3 bg-[#f9fafb] shadow-md sm:rounded-lg p-8 bg-cover bg-center'>

                <Alert color="info" className={`absolute ${emailSent ? 'w-full text-center -mt-20 left-0' : 'hidden'}`}>
                    <span className="font-medium">Password reset link sent to your email</span>
                </Alert>
                <Alert color="failure" icon={HiInformationCircle} className={`absolute ${invalidUsernameOrPhone ? 'w-full text-center -mt-20 left-0' : 'hidden'}`}>
                    <span className="font-medium">Invalid credentials!</span>
                </Alert>
                <form onSubmit={sendData}>
                    <div className="mb-6">
                        <label htmlFor="usernameOrphone" className="block mb-2 text-lg font-medium text-gray-900 dark:text-white">Enter Username or phone</label>
                        <input
                            type="text"
                            id="usernameOrphone"
                            className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${error ? 'border-red-600 border-2 focus:ring-red-600' : ''}`}
                            placeholder="someone or 071234567"
                            required
                            onChange={(e) => setUsernameOrPhone(e.target.value)}
                        />
                    </div>

                    <div className="mb-6 relative">
                        <label htmlFor="email" className="block mb-2 text-lg font-medium text-gray-900 dark:text-white">Enter Email</label>
                        <input
                            type='email'
                            id="password"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 pr-10 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="someone@gmail.com"
                            required
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div>
                        <Link to={`/`}
                            className='text-sm font-italic hover:underline text-blue-700 text-right'>
                            Back to login
                        </Link>
                    </div>

                    <button
                        type="submit"
                        className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 mt-4 ml-[160px] dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">
                        Reset Password
                    </button>

                </form>
            </div>
        </div >
    );
}