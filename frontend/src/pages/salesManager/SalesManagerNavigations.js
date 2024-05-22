import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { Sidebar } from 'flowbite-react';
import { BiBuoy } from 'react-icons/bi';
import logo from '../../images/logo.png';
import { MdOutlineSpaceDashboard } from "react-icons/md";
import { MdOutlineAddCircleOutline } from "react-icons/md";
import { MdFormatListBulleted } from "react-icons/md";
import { HiOutlineDocumentReport } from "react-icons/hi";
import { IoSearchSharp } from "react-icons/io5";
import { MdOutlineAccountCircle } from "react-icons/md";
import { Navbar } from 'flowbite-react';
import { Avatar } from 'flowbite-react';
import { Alert } from "flowbite-react";
import { HiInformationCircle } from "react-icons/hi";
import notFoundError from '../../images/notFound.jpeg';

export default function SalesManagerNavigations() {
    const { id } = useParams();
    const [manager, setManager] = useState({
        firstName: "",
        designation: "",
    });

    const [productName, setProductName] = useState("");
    const [stockDetails, setStockDetails] = useState([]);
    const [filteredStockDetails, setFilteredStockDetails] = useState([]);
    const [searchClicked, setSearchClicked] = useState(false);
    const [showTable, setShowTable] = useState(false);
    const [error, setError] = useState(false);
    const [errorGif, setErrorGif] = useState(false);
    const [errorsAlert, seErrorAlert] = useState(false);
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
        filterStockDetails();
    }, [productName, stockDetails]);

    const fetchStockDetails = async () => {
        try {
            const res = await axios.get(`https://hendriks-tea-management-system-backend.vercel.app/sales/searchStock/${id}/${productName}`);

            if (res.data.error) {
                setError(true);
                setErrorGif(true);
            } else {
                setStockDetails(res.data);
                setShowTable(true);
                setError(false);
                setErrorGif(false);
            }
        } catch (error) {

            setError(true);
            setErrorGif(true);
            seErrorAlert(true);

            setTimeout(() => {
                setErrorGif(false);
                seErrorAlert(false);
            }, 5000);

            console.log("Error fetching details", error.message);
        }
    };

    const filterStockDetails = () => {
        if (productName.trim() === "") {
            setFilteredStockDetails(stockDetails);
        } else {
            const filteredData = stockDetails.filter(stock =>
                stock.productName.toLowerCase().includes(productName.toLowerCase())
            );
            setFilteredStockDetails(filteredData);
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
        navigate(`/salesManager/salesManagerDashboard/${id}`);
    };

    const handleMyAccount = () => {
        navigate(`/salesManager/managerAccount/${id}`);
    };

    const handleStock = () => {
        navigate(`/salesManager/addStock/${id}`);
    };

    const handleSalesPersonDetails = () => {
        navigate(`/salesManager/salesPersonDetails/${id}`);
    };

    const handleRemainingInventoryStock = () => {
        navigate(`/salesManager/remainingInventoryStock/${id}`);
    };

    const handleMonthlyReport = () => {
        navigate(`/salesManager/monthlyReport/${id}`);
    };

    const handleSearchClick = async () => {
        setSearchClicked(true);
        await fetchStockDetails();
        filterStockDetails();

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
                    <div className="relative w-1/3">
                        <input type="search"
                            id="location-search"
                            className={`block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-e-lg rounded-lg border-s-gray-50 border-s-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-s-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500 ${error ? 'border-red-600 border-2 focus:ring-red-600' : ''}`}
                            placeholder="Search for Remaining stock"
                            required
                            onChange={(e) => {
                                setProductName(e.target.value);
                            }} />
                        <button type="submit" className="absolute top-0 end-0 h-full p-2.5 text-sm font-medium text-white bg-blue-700 rounded-e-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                            onClick={handleSearchClick}>
                            <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                            </svg>
                            <span className="sr-only">Search</span>
                        </button>
                    </div>
                    <div className="flex md:order-2  mr-20 items-start" onClick={handleMyAccount}>
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
                            <Sidebar.Item icon={MdOutlineAddCircleOutline} onClick={handleStock}>
                                Add Daily Stock
                            </Sidebar.Item>
                            <Sidebar.Item icon={IoSearchSharp} onClick={handleRemainingInventoryStock}>
                                Remaining Stock
                            </Sidebar.Item>
                            <Sidebar.Item icon={MdFormatListBulleted} onClick={handleSalesPersonDetails}>
                                Salesperson Details
                            </Sidebar.Item>
                            <Sidebar.Item icon={HiOutlineDocumentReport} onClick={handleMonthlyReport}>
                                Reports
                            </Sidebar.Item>
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
                    {searchClicked && filteredStockDetails.length === 0 && <span className="ml-64 px-6 py-4">No data found!</span>}
                    {searchClicked && filteredStockDetails.length !== 0 && (
                        <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-14">
                            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                    <tr>
                                        <th scope="col" className="px-6 py-3">
                                            Product name
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Remaining Amount
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Status
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredStockDetails.map((detail, index) => (
                                        <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 text-black">
                                            <td className="px-6 py-4">{detail.productName}</td>
                                            <td className="px-6 py-4">{detail.totalStock}</td>
                                            {detail.totalStock === 0 ? (
                                                <td className="px-6 py-4 text-red-600 font-bold">Out of stock</td>
                                            ) : detail.totalStock < 50 ? (
                                                <td className="px-6 py-4 text-yellow-400 font-bold">Low stock</td>
                                            ) : (
                                                <td className="px-6 py-4 text-green-500 font-bold">Available</td>
                                            )}
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
