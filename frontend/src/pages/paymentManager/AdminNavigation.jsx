import React from 'react'
import { Avatar } from 'flowbite-react';
import { Navbar } from 'flowbite-react';
import logo from '../../images/logo.png';
import { Sidebar } from 'flowbite-react';
import { BiBuoy } from 'react-icons/bi';
import { GrUpdate } from "react-icons/gr";
import { MdOutlineAddCircleOutline } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { MdOutlinePayment } from "react-icons/md";
import { IoSearchSharp } from "react-icons/io5";
import { FiMapPin } from "react-icons/fi";
import { MdOutlineAccountCircle } from "react-icons/md";
import { TbBrandCashapp } from "react-icons/tb";
import { MdOutlineSpaceDashboard } from "react-icons/md";
import { FaBan } from "react-icons/fa";
import { Link, useParams } from 'react-router-dom';

function AdminNavigation() {

    const { id } = useParams();
    return (
        <div>
            <div className="fixed top-0 left-0 w-full z-50">
                <Navbar fluid rounded style={{ backgroundColor: "#E5E5E5" }} className='cursor-pointer'>
                    <Navbar.Brand >
                        <img src={logo} id='logo' alt="logo" />
                    </Navbar.Brand>

                    <div className="flex md:order-2  mr-20 items-start">
                        <Avatar alt="User settings" img="https://flowbite.com/docs/images/people/profile-picture-5.jpg" rounded />
                        <div className="ml-4 flex flex-col">
                            <span className='text-green-500 font-bold'></span>
                            <span className='text-green-400 '></span>
                        </div>
                        <Navbar.Toggle />
                    </div>
                </Navbar>

                {/* sidebar */}
                <div>
                    <Sidebar aria-label="Sidebar with content separator example" className="fixed left-0 z-50" style={{ marginTop: "0px" }}>
                        <Sidebar.Items className='pt-5'>
                            <Sidebar.ItemGroup className='cursor-pointer'>
                                <Sidebar.Item icon={MdOutlineAddCircleOutline} >
                                    Sale
                                </Sidebar.Item>
                                <Link to={`/payment/paymentadminhome/${id}`}>
                                    <Sidebar.Item icon={MdOutlineSpaceDashboard}>
                                        Dashboard
                                    </Sidebar.Item>
                                </Link>
                                <Link to={`/payment/creditlimitexeedcustomers/${id}`}>
                                    <Sidebar.Item icon={FaBan}>
                                        Ban a Customer
                                    </Sidebar.Item>
                                </Link>
                            </Sidebar.ItemGroup>
                            <Sidebar.ItemGroup className='cursor-pointer'>
                                <Link to={`/payment/managerAccount/${id}`}>
                                    <Sidebar.Item icon={MdOutlineAccountCircle}>
                                        My Account
                                    </Sidebar.Item>
                                </Link>
                                <Sidebar.Item icon={BiBuoy}>
                                    Help
                                </Sidebar.Item>
                            </Sidebar.ItemGroup>
                        </Sidebar.Items>
                    </Sidebar>
                </div>

            </div>
        </div>
    )
}

export default AdminNavigation
