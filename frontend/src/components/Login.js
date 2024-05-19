import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from "react-router-dom";
import { VscEyeClosed, VscEye } from "react-icons/vsc";
import { Alert } from "flowbite-react";
import { HiInformationCircle } from "react-icons/hi";
import background from '../images/loginBg.jpg';
import logo from '../images/logo.png';

export default function Login() {
    const [usernameOrPhone, setUsernameOrPhone] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [invalidUsernameOrPhone, setInvalidUsernameOrPhone] = useState(false);
    const [invalidPassword, setInvalidPassword] = useState(false);
    const [errorUsername, setErrorUsername] = useState(false);
    const [errorPassword, setErrorPassword] = useState(false);
    const navigate = useNavigate();

    const sendData = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.post(`https://hendriks-tea-management-system-backend.vercel.app/empLogin/employeeLogin`, {
                usernameOrPhone,
                password
            });

            if (res.data.role === 'salesperson') {
                const salespersonID = res.data.salespersonID;
                navigate(`/sales/salesmenDashboard/${salespersonID}`);
                return;
            }
            else if (res.data.designation === 'Sales Manager') {
                const empId = res.data.empId;
                navigate(`/salesManager/salesManagerDashboard/${empId}`);
                return;
            }

            else if (res.data.designation === 'Inventory Manager') {
                const empId = res.data.empId;
                navigate(`/inventory/dashboard/${empId}`);
                return;
            }
          
            else if (res.data.designation === 'Staff Manager') {
                const empId = res.data.empId;
                navigate(`/staff/staffManagerDashboard/${empId}`);
                return;
            }

            else if (res.data.designation === 'Supplier Manager') {
                const empId = res.data.empId;
                navigate(`/supplierManager/home/${empId}`);
                return;
            }

            else if (res.data.designation === 'Delivery Manager') {
                const empId = res.data.empId;
                navigate(`/deliveryManager/alllocations/${empId}`);
                return;
            }

            else if (res.data.designation === 'Financial Manager') {
                const empId = res.data.empId;
                navigate(`/financial/HomeIncome/${empId}`);
                return;
            }

            else if (res.data.designation === 'Payment Manager') {
                const empId = res.data.empId;
                navigate(`/payment/paymentadminhome/${empId}`);
                return;
            }

        } catch (error) {
            console.error("Error in salesmen login request:", error.message);
            if (error.response && error.response.status === 401) {
                setInvalidPassword(true);
                setErrorPassword(true);
                setErrorUsername(false);a

                setTimeout(() => {
                    setInvalidPassword(false);
                }, 5000);
                console.error("Error:", error.message);

            } else {
                setInvalidUsernameOrPhone(true);
                setErrorUsername(true);
                setErrorPassword(false);

                setTimeout(() => {
                    setInvalidUsernameOrPhone(false);
                }, 5000);
                console.error("Error:", error.message);
            }
        }
    }

    return (
        <div className='absolute w-full h-full' style={{ backgroundImage: `url(${background})`, backgroundSize: 'cover', backgroundPosition: 'top' }}>

            <div className='absolute mt-8 ml-[42.5%]'>
                <img src={logo} alt="Logo" />
            </div>

            <h1 className='absolute text-center text-5xl mt-48 ml-[45%] text-green-600 font-bold'>Login</h1>

            <div className='absolute mt-72 left-1/3 w-1/3 bg-gray-200 bg-opacity-60 shadow-md sm:rounded-lg p-8 bg-cover bg-center'>

                <Alert color="failure" icon={HiInformationCircle} className={`absolute ${invalidUsernameOrPhone ? 'w-full text-center -mt-20 left-0' : 'hidden'}`}>
                    <span className="font-medium">Invalid username or phone!</span>
                </Alert>
                <Alert color="failure" icon={HiInformationCircle} className={`absolute ${invalidPassword ? 'w-full text-center -mt-20 left-0' : 'hidden'}`}>
                    <span className="font-medium">Invalid password!</span>
                </Alert>

                <form onSubmit={sendData}>
                    <div className="mb-6">
                        <label htmlFor="usernameOrphone" className="block mb-2 text-lg font-medium text-gray-900 dark:text-white">Enter Username or phone</label>
                        <input
                            type="text"
                            id="usernameOrphone"
                            className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${errorUsername ? 'border-red-600 border-2 focus:ring-red-600' : ''}`}
                            placeholder="someone or 071234567"
                            required
                            onChange={(e) => setUsernameOrPhone(e.target.value)}
                        />
                    </div>

                    <div className="mb-6 relative">
                        <label htmlFor="password" className="block mb-2 text-lg font-medium text-gray-900 dark:text-white">Enter password</label>
                        <input
                            type={showPassword ? "text" : "password"}
                            id="password"
                            className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 pr-10 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${errorPassword ? 'border-red-600 border-2 focus:ring-red-600' : ''}`}
                            placeholder="password"
                            required
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <button
                            type="button"
                            className="absolute inset-y-0 right-0 flex items-center pr-3 focus:outline-none mt-9"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? (
                                <VscEye />
                            ) : (
                                <VscEyeClosed />
                            )}
                        </button>
                    </div>

                    <div>
                        <Link to={`/forgetPassword`}
                            className='text-sm font-italic hover:underline text-blue-700'>
                            Forget Password
                        </Link>
                    </div>

                    <button
                        type="submit"
                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center ml-[185px] mt-4 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        Login
                    </button>

                </form>
            </div>
        </div>
    );
}