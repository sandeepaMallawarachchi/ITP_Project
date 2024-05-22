import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { Sidebar } from 'flowbite-react';
import { BiBuoy } from 'react-icons/bi';
import logo from '../../images/logo.png';
import { MdOutlineSpaceDashboard } from "react-icons/md";
import { MdOutlineAddCircleOutline } from "react-icons/md";
import { MdOutlineAccountCircle } from "react-icons/md";
import { Navbar } from 'flowbite-react';
import { Avatar } from 'flowbite-react';
import { Alert } from "flowbite-react";
import { HiInformationCircle } from "react-icons/hi";
import notFoundError from '../../images/notFound.jpeg';
import { HiMiniUserGroup } from "react-icons/hi2";
import { GiTakeMyMoney } from "react-icons/gi";
import { FaUmbrellaBeach } from "react-icons/fa";
import { GiTrophyCup } from "react-icons/gi";

export default function SalesManagerNavigations() {
    const { id } = useParams();
    const [manager, setManager] = useState({
        firstName: "",
        designation: "",
    });

    const [firstName, setFirstName] = useState("");
    const [employeeDetails, setEmployeeDetails] = useState([]);
    const [filteredEmployeeDetails, setFilteredEmployeeDetails] = useState([]);
    const [searchClicked, setSearchClicked] = useState(false);
    const [showTable, setShowTable] = useState(false);
    const [error, setError] = useState(false);
    const [errorGif, setErrorGif] = useState(false);
    const [errorsAlert, setErrorAlert] = useState(false);
    const [profilePicture, setProfilePicture] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
        const fetchManagerDetails = async () => {
            try {
                const res = await axios.get(`https://hendriks-tea-management-system-backend.vercel.app/empLogin/getManager/${id}`);
                console.log(res.data);
                const managerData = res.data.manager || res.data;
                const { firstName, designation } = managerData;
                setManager({ firstName, designation });
            } catch (error) {
                console.log("error", error.message);
            }
        };

        fetchManagerDetails();
    }, [id]);

    useEffect(() => {
        filterEmployeeDetails();
    }, [id]);

    const fetchEmployeeDetails = async () => {
        try {
            const res = await axios.get(`https://hendriks-tea-management-system-backend.vercel.app/empLogin/getManager/${id}`);

            if (res.data.error) {
                setError(true);
                setErrorGif(true);
            } else {
                setEmployeeDetails(res.data);
                setShowTable(true);
                setError(false);
                setErrorGif(false);
            }
        } catch (error) {

            setError(true);
            setErrorGif(true);
            setErrorAlert(true);

            setTimeout(() => {
                setErrorGif(false);
                setErrorAlert(false);
            }, 5000);

            console.log("Error fetching details", error.message);
        }
    };

    const filterEmployeeDetails = () => {
        if (firstName.trim() === "") {
            setFilteredEmployeeDetails(employeeDetails);
        } else {
            const filteredData = employeeDetails.filter(employee =>
                employee.firstName.toLowerCase().includes(firstName.toLowerCase())
            );
            setFilteredEmployeeDetails(filteredData);
        }
    };

    useEffect(() => {
        const fetchProfilePicture = async () => {
            try {
                const res = await axios.get(`https://hendriks-tea-management-system-backend.vercel.app/empLogin/changeProfilePicture/${id}`);
                console.log(res.data);

                const { imageURL } = res.data.image;
                setProfilePicture(imageURL);
            } catch (error) {
                console.log("Error fetching image", error.message);
            }
        };
        fetchProfilePicture();
    }, [id]);

    const handleDashboard = () => {
        navigate(`/staff/staffManagerDashboard/${id}`);
    };

    const handleMyAccount = () => {
        navigate(`/staff/managerAccount/${id}`);
    };

    const handleEmployees = () => {
        navigate(`/staff/allEmployees/${id}`);
    };

    const handleAddEmployee = () => {
        navigate(`/staff/managerRegistration/${id}`);
    };

    const handleSalaries = () => {
        navigate(`/staff/allSalaries/${id}`);
    };

    const handleAddSalary = () => {
        navigate(`/staff/addSalary/${id}`);
    };

    const handleVacations = () => {
        navigate(`/staff/allVacations/${id}`);
    };

    const handleAddVacation = () => {
        navigate(`/staff/addVacation/${id}`);
    };

    const handleAllEmployees = () => {
        navigate(`/staff/empCategory/${id}`);
    };

    const handleTopSellers = () => {
        navigate(`/staff/topSellers/${id}`);
    };

    const handleSearchClick = async () => {
        setSearchClicked(true);
        await fetchEmployeeDetails();
        filterEmployeeDetails();

    };

    const handleTableClose = () => {
        setShowTable(false);
    };

    return (
        <div>
            {/* header */}
            <div className="fixed top-0 left-0 w-full z-50">
                <Navbar fluid rounded style={{ backgroundColor: "#E5E5E5" }}>
                    <Navbar.Brand onClick={handleDashboard} className='cursor-pointer w-32 ml-8'>
                        <img src={logo} id='logo' alt="logo" />
                    </Navbar.Brand>
                    {/* <div className="relative w-1/3">
                        <input type="search"
                            id="location-search"
                            className={`block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-e-lg rounded-lg border-s-gray-50 border-s-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-s-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500 ${error ? 'border-red-600 border-2 focus:ring-red-600' : ''}`}
                            placeholder="Search for Employee"
                            required
                            onChange={(e) => {
                                setFirstName(e.target.value);
                            }} />
                        <button type="submit" className="absolute top-0 end-0 h-full p-2.5 text-sm font-medium text-white bg-blue-700 rounded-e-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                            onClick={handleSearchClick}>
                            <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                            </svg>
                            <span className="sr-only">Search</span>
                        </button>
                    </div> */}
                    <div className="flex md:order-2  mr-20 items-start">
                        <Avatar alt="User settings" img={profilePicture} rounded />
                        <div className="ml-4 flex flex-col">
                            <span className='text-green-500 font-bold'>{manager.firstName}</span>
                            <span className='text-green-400 '>{manager.designation}</span>
                        </div>
                        <Navbar.Toggle />
                    </div>
                </Navbar>
            </div>

            {/* sidebar */}
            <div>
                <Sidebar aria-label="Sidebar with content separator example" className="fixed left-0 z-50 mt-[111px]">
                    <Sidebar.Items className='pt-5'>
                        <Sidebar.ItemGroup className='cursor-pointer'>

                            <Sidebar.Item icon={MdOutlineSpaceDashboard} onClick={handleDashboard}>
                                Dashboard
                            </Sidebar.Item>
                            <Sidebar.Collapse icon={HiMiniUserGroup} label="Employees">
                                <Sidebar.Item icon={HiMiniUserGroup} onClick={handleEmployees}>All Employees</Sidebar.Item>
                                <Sidebar.Item icon={MdOutlineAddCircleOutline} onClick={handleAllEmployees}>Add Employee</Sidebar.Item>
                            </Sidebar.Collapse>
                            <Sidebar.Collapse icon={GiTakeMyMoney} label="Salaries">
                                <Sidebar.Item icon={GiTakeMyMoney} onClick={handleSalaries}>All Salaries</Sidebar.Item>
                                <Sidebar.Item icon={MdOutlineAddCircleOutline} onClick={handleAddSalary}>Add Salary</Sidebar.Item>
                            </Sidebar.Collapse>
                            <Sidebar.Collapse icon={FaUmbrellaBeach} label="Vacations">
                                <Sidebar.Item icon={FaUmbrellaBeach} onClick={handleVacations}>All Vacations</Sidebar.Item>
                                <Sidebar.Item icon={MdOutlineAddCircleOutline} onClick={handleAddVacation}>Add Vacation</Sidebar.Item>
                            </Sidebar.Collapse>
                            <Sidebar.Item icon={GiTrophyCup} onClick={handleTopSellers}>Top Sellers</Sidebar.Item>
                        </Sidebar.ItemGroup>
                        <Sidebar.ItemGroup className='cursor-pointer'>
                            <Sidebar.Item icon={MdOutlineAccountCircle} onClick={handleMyAccount}>
                                My account
                            </Sidebar.Item>
                            <Sidebar.Item icon={BiBuoy}>
                                Help
                            </Sidebar.Item>
                        </Sidebar.ItemGroup>
                    </Sidebar.Items>
                </Sidebar>
            </div>

            {/* search details */}
            {searchClicked && (
                <div className={`fixed top-[133px] left-72 w-[76%] pt-10 ${showTable ? 'z-50 bg-white h-full' : 'hidden'}`}>
                    <button onClick={handleTableClose} className="absolute ml-[1070px] focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">close</button>
                    {searchClicked && filteredEmployeeDetails.length === 0 && <span className="ml-64 px-6 py-4">No data found!</span>}
                    {searchClicked && filteredEmployeeDetails.length !== 0 && (
                        <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-14">
                            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                    <tr>

                                        <th scope="col" className="px-6 py-3">Employee ID</th>
                                        <th scope="col" className="px-6 py-3">First Name</th>
                                        <th scope="col" className="px-6 py-3">Last Name</th>
                                        <th scope="col" className="px-6 py-3">Gender</th>
                                        <th scope="col" className="px-6 py-3">Department</th>
                                        <th scope="col" className="px-6 py-3">Designation</th>
                                        <th scope="col" className="px-6 py-3">Address</th>
                                        <th scope="col" className="px-6 py-3">Email</th>
                                        <th scope="col" className="px-6 py-3">Phone No</th>
                                        <th scope="col" className="px-6 py-3">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredEmployeeDetails.map((detail, index) => (
                                        <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 text-black">
                                            <td className="px-6 py-4">{detail.employeeId}</td>
                                            <td className="px-6 py-4">{detail.firstName}</td>
                                            <td className="px-6 py-4">{detail.lastName}</td>
                                            <td className="px-6 py-4">{detail.gender}</td>
                                            <td className="px-6 py-4">{detail.department}</td>
                                            <td className="px-6 py-4">{detail.designation}</td>
                                            <td className="px-6 py-4">{detail.address}</td>
                                            <td className="px-6 py-4">{detail.email}</td>
                                            <td className="px-6 py-4">{detail.phoneNo}</td>
                                            <td className="px-6 py-4">{detail.action}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            )}

            {/* error gif */}
            <div className={`fixed top-[111px] left-64 bg-[#fbfbfb] w-[85%] h-full ${errorGif ? 'z-50' : 'hidden'}`}>
                <Alert color="failure" icon={HiInformationCircle} className={`absolute ${errorsAlert ? 'w-full text-center mt-2' : 'hidden'}`}>
                    <span className="font-medium">Invalid product name!</span>
                </Alert>
                <img className='w-1/2 mt-20 ml-64' src={notFoundError} />
            </div>
        </div>
    );
}
