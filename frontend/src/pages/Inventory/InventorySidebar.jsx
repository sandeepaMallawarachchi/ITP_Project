import logo from '../../images/logo.png';
import { MdOutlineAccountCircle } from "react-icons/md";
import { Link } from "react-router-dom";
import { Sidebar } from 'flowbite-react';
import { MdOutlineSpaceDashboard } from "react-icons/md";
import { IoMdAddCircleOutline } from "react-icons/io";
import { MdOutlineCategory } from "react-icons/md";
import { HiOutlineDocumentReport } from "react-icons/hi";
import { IoIosLogOut } from "react-icons/io";
import { IoAddCircleSharp } from "react-icons/io5";

export default function InventorySidebar(){
    return(
        <div>
            <Sidebar aria-label="Sidebar with content separator example " className=' flex flex-col w-60px fixed'>
               
                    
                <div style={{marginTop:"8rem"}}>
                <Sidebar.Items className='pt-5 mt-5'>
                     <Sidebar.ItemGroup className='cursor-pointer'> 
                        <Link to="/inventory/"><Sidebar.Item icon={MdOutlineSpaceDashboard} > Dashboard</Sidebar.Item></Link>
                        <Link to="/inventory/products" ><Sidebar.Item icon={MdOutlineCategory}>Products </Sidebar.Item></Link>
                        <Link to="/inventory/addProduct"><Sidebar.Item icon={IoMdAddCircleOutline} >Add Products </Sidebar.Item></Link>
                        <Link to="/inventory/orders"><Sidebar.Item icon={IoAddCircleSharp}>Orders</Sidebar.Item></Link> 
                        <Link to="/inventory/reports"><Sidebar.Item icon={HiOutlineDocumentReport} >Reports</Sidebar.Item></Link> 
                     </Sidebar.ItemGroup>
                </Sidebar.Items>
                </div>
                <div>
                <Sidebar.Items className='pt-5 mt-5'>
                     <Sidebar.ItemGroup className='cursor-pointer'>
                        <Sidebar.Item  icon={MdOutlineAccountCircle} > My account </Sidebar.Item>
                        <Sidebar.Item  icon={IoIosLogOut} > Log Out </Sidebar.Item>
                     </Sidebar.ItemGroup>
                </Sidebar.Items>
                </div>
            </Sidebar>
        </div>
    )
}