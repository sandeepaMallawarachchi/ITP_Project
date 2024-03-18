import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { Sidebar } from 'flowbite-react';
import { BiBuoy } from 'react-icons/bi';
import { HiArrowSmRight, HiChartPie, HiInbox, HiShoppingBag, HiTable, HiUser, HiViewBoards } from 'react-icons/hi';
import logo from '../images/logo.png';
import { MdOutlineSpaceDashboard } from "react-icons/md";
import { MdOutlineAddCircleOutline } from "react-icons/md";
import { MdFormatListBulleted } from "react-icons/md";
import { MdOutlinePayment } from "react-icons/md";
import { IoSearchSharp } from "react-icons/io5";
import { FiMapPin } from "react-icons/fi";
import { MdOutlineAccountCircle } from "react-icons/md";


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

            <Sidebar aria-label="Sidebar with content separator example">
                
                <Sidebar.Items>

                    
                    <Sidebar.ItemGroup>
                        <Sidebar.Item href="#" icon={MdOutlineSpaceDashboard} onClick={handleDashboard}>
                            Dashboard
                        </Sidebar.Item>
                        <Sidebar.Item href="#" icon={MdOutlineAddCircleOutline} onClick={handleAddSale}>
                            New sale
                        </Sidebar.Item>
                        <Sidebar.Item href="#" icon={MdFormatListBulleted} onClick={handleSalesSummary}>
                            Sales Summary
                        </Sidebar.Item>
                        <Sidebar.Item href="#" icon={MdOutlinePayment}>
                            Payment
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
    );
}