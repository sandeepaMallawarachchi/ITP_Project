import logo from '../../images/logo.png';
import { MdOutlineAccountCircle } from "react-icons/md";
import { Link } from "react-router-dom";
import { Sidebar } from 'flowbite-react';

export default function InventorySidebar(){
    return(
        <div >
            <Sidebar aria-label="Sidebar with content separator example" className="h-full fixed left-0 z-50" style={{ marginTop: "133px" }}>
                <div>
                <img src={logo} id='logo' alt="logo" />
                <Sidebar.Items className='pt-5'>
                     <Sidebar.ItemGroup> 
                        <Link to="/inventory/"><Sidebar.Item > Dashboard</Sidebar.Item></Link>
                        <Link to="/inventory/products" ><Sidebar.Item  >Products </Sidebar.Item></Link>
                        <Link to="/inventory/addProduct"><Sidebar.Item >Add Products </Sidebar.Item></Link>
                        <Link to="/inventory/orders"><Sidebar.Item >Orders</Sidebar.Item></Link> 
                        <Link to="/inventory/reports"><Sidebar.Item >Reports</Sidebar.Item></Link> 
                     </Sidebar.ItemGroup>
                </Sidebar.Items>
                </div>
                <div>
                <Sidebar.Items className='pt-5'>
                     <Sidebar.ItemGroup>
                        <Sidebar.Item  icon={MdOutlineAccountCircle} > My account </Sidebar.Item>
                        <Sidebar.Item  icon={MdOutlineAccountCircle} > Log Out </Sidebar.Item>
                     </Sidebar.ItemGroup>
                </Sidebar.Items>
                </div>
            </Sidebar>
        </div>
    )
}