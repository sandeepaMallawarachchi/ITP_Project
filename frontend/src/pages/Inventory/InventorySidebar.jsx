import { MdOutlineAccountCircle } from "react-icons/md";
import { Link } from "react-router-dom";
import { Sidebar } from 'flowbite-react';
import { MdOutlineSpaceDashboard } from "react-icons/md";
import { IoMdAddCircleOutline } from "react-icons/io";
import { MdOutlineCategory } from "react-icons/md";
import { HiOutlineDocumentReport } from "react-icons/hi";
import { IoIosLogOut } from "react-icons/io";
import { IoAddCircleSharp } from "react-icons/io5";

export default function InventorySidebar() {
    return (
        <div>
            <Sidebar aria-label="Sidebar with content separator example " className='fixed flex flex-col w-60px'>


                <div style={{ marginTop: "7.5rem" }}>
                    <Sidebar.Items className='pt-5'>
                        <Sidebar.ItemGroup className='cursor-pointer'>
                            <Link to="/inventory/dashboard/:id"><Sidebar.Item icon={MdOutlineSpaceDashboard} > Dashboard</Sidebar.Item></Link>
                            <Link to="/inventory/products/:id" ><Sidebar.Item icon={MdOutlineCategory}>Products </Sidebar.Item></Link>
                            <Link to="/inventory/addProduct/:id"><Sidebar.Item icon={IoMdAddCircleOutline} >Add Products </Sidebar.Item></Link>
                            <Link to="/inventory/orders/:id"><Sidebar.Item icon={IoAddCircleSharp}>Orders</Sidebar.Item></Link>
                            <Link to="/inventory/reports/:id"><Sidebar.Item icon={HiOutlineDocumentReport} >Reports</Sidebar.Item></Link>
                        </Sidebar.ItemGroup>
                    </Sidebar.Items>
                </div>
                <div>
                    <Sidebar.Items className='pt-5'>
                        <Sidebar.ItemGroup className='cursor-pointer'>
                            <Link to="/inventory/managerAccount/:id"><Sidebar.Item icon={MdOutlineAccountCircle} > My account </Sidebar.Item></Link>
                            <Sidebar.Item icon={IoIosLogOut} > Log Out </Sidebar.Item>
                        </Sidebar.ItemGroup>
                    </Sidebar.Items>
                </div>
            </Sidebar>
        </div>
    )
}