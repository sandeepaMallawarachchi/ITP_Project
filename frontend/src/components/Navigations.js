import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { Sidebar } from 'flowbite-react';
import { BiBuoy } from 'react-icons/bi';
import logo from '../images/logo.png';
import { MdOutlineSpaceDashboard } from "react-icons/md";
import { MdOutlineAddCircleOutline } from "react-icons/md";
import { MdFormatListBulleted } from "react-icons/md";
import { MdOutlinePayment } from "react-icons/md";
import { IoSearchSharp } from "react-icons/io5";
import { FiMapPin } from "react-icons/fi";
import { MdOutlineAccountCircle } from "react-icons/md";
import { Navbar } from 'flowbite-react';
import { Avatar } from 'flowbite-react';


export default function Navigations() {
    const { id } = useParams();
    const [salesman, setSalesman] = useState({
        name: "",
        username: "",
    });
    const navigate = useNavigate();

    useEffect(() => {
        const fetchSalesmanDetails = async () => {
            try {
                const res = await axios.get(`http://localhost:5000/salesmen/salesmenDashboard/${id}`);
                console.log(res.data);
                const salesmanData = res.data.salesman || res.data;
                const { name, username } = salesmanData;
                setSalesman({ name, username });
            } catch (error) {
                console.log("error", error.message);
            }
        };

        fetchSalesmanDetails();
    }, [id]);

    const handleDashboard = () => {

        navigate(`/salesmenDashboard/${id}`);
    };

    const handleMyAccount = () => {

        navigate(`/myAccount/${id}`);
    };

    const handleAddSale = () => {

        navigate(`/AddNewSale/${id}`);
    };

    const handleSalesSummary = () => {

        navigate(`/SalesSummary/${id}`);
    };

    return (
        <div>
            {/* header section */}
            <div className="fixed top-0 left-0 w-full z-50">
                <Navbar fluid rounded style={{ backgroundColor: "#E5E5E5" }}>
                    <Navbar.Brand href="#" onClick={handleDashboard}>
                        <img src={logo} id='logo' alt="logo" />
                    </Navbar.Brand>

                    <div class="relative w-1/3">
                        <input type="search" id="location-search" class="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-e-lg rounded-lg border-s-gray-50 border-s-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-s-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500" placeholder="Search for Remaining stock" required />
                        <button type="submit" class="absolute top-0 end-0 h-full p-2.5 text-sm font-medium text-white bg-blue-700 rounded-e-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                            <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                            </svg>
                            <span class="sr-only">Search</span>
                        </button>
                    </div>

                    <div className="flex md:order-2  mr-20 items-start">
                        <Avatar alt="User settings" img="https://flowbite.com/docs/images/people/profile-picture-5.jpg" rounded />
                        <div className="ml-4 flex flex-col">
                            <span className='text-green-500 font-bold'>{salesman.name}</span>
                            <span className='text-green-400 '>{salesman.username}</span>
                        </div>
                        <Navbar.Toggle />
                    </div>
                </Navbar>
            </div>

            {/* side bar */}
            <div>
                <Sidebar aria-label="Sidebar with content separator example" className="fixed left-0 z-50" style={{marginTop:"133px"}}>

                    <Sidebar.Items className='pt-5'>
                        <Sidebar.ItemGroup>
                            <Sidebar.Item href="#" icon={MdOutlineSpaceDashboard} onClick={handleDashboard}>
                                Dashboard
                            </Sidebar.Item>
                            <Sidebar.Item href="#" icon={MdOutlineAddCircleOutline} onClick={handleAddSale}>
                                New sale
                            </Sidebar.Item>
                            <Sidebar.Item href="#" icon={MdOutlinePayment}>
                                Payment
                            </Sidebar.Item>
                            <Sidebar.Item href="#" icon={MdFormatListBulleted} onClick={handleSalesSummary}>
                                Sales Summary
                            </Sidebar.Item>
                            <Sidebar.Item href="#" icon={IoSearchSharp}>
                                Remaining Stock
                            </Sidebar.Item>
                            <Sidebar.Item href="#" icon={FiMapPin}>
                                Locations
                            </Sidebar.Item>

                        </Sidebar.ItemGroup>
                        <Sidebar.ItemGroup>
                            <Sidebar.Item href="#" icon={MdOutlineAccountCircle} onClick={handleMyAccount}>
                                My account
                            </Sidebar.Item>
                            <Sidebar.Item href="#" icon={BiBuoy}>
                                Help
                            </Sidebar.Item>
                        </Sidebar.ItemGroup>
                    </Sidebar.Items>
                </Sidebar>
            </div>
        </div>
    );
}