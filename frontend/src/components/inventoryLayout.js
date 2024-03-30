import { Outlet } from "react-router-dom"
import { Navbar } from 'flowbite-react';
import { Avatar } from 'flowbite-react';
import { Sidebar } from 'flowbite-react';
import logo from '../images/logo.png';
import { MdOutlineAccountCircle } from "react-icons/md";
import { Link } from "react-router-dom";
import SearchBar from "./searchBar";

export default function InventoryLayout(){

    return(
        <div>
        <Navbar fluid rounded style={{ backgroundColor: "#E5E5E5" }} className="" >
                <Navbar.Brand href="#" onClick="">
                    <img src={logo} id='logo' alt="logo" />
                </Navbar.Brand>

                <SearchBar />

                <div className="flex md:order-2  mr-20 items-start">
                    <Avatar alt="User settings" img="https://flowbite.com/docs/images/people/profile-picture-5.jpg" rounded />
                    <div className="ml-4 flex flex-col">
                        <span className='text-green-500 font-bold'></span>
                        <span className='text-green-400 '></span>
                    </div>
                    <Navbar.Toggle />
                </div>
            </Navbar>

            <Sidebar aria-label="Sidebar with content separator example" className="">

               <Sidebar.Items className='pt-5'>
                  <Sidebar.ItemGroup>
                    <Link to="/inventory/"><Sidebar.Item > Dashboard</Sidebar.Item></Link>
                    <Link to="/inventory/products" ><Sidebar.Item  >Products </Sidebar.Item></Link>
                    <Link to="/inventory/addProduct"><Sidebar.Item >Add Products </Sidebar.Item></Link>
                    <Link to="/inventory/orders"><Sidebar.Item >Orders</Sidebar.Item></Link> 
                    <Link to="/inventory/reports"><Sidebar.Item >Reports</Sidebar.Item></Link> 
                  </Sidebar.ItemGroup>
                  <Sidebar.ItemGroup>
                    <Sidebar.Item href="#" icon={MdOutlineAccountCircle} > My account </Sidebar.Item>
                  </Sidebar.ItemGroup>
              </Sidebar.Items>
            </Sidebar>


          <Outlet />
          </div>
    )
}