import { MdOutlineAccountCircle } from "react-icons/md";
import { Link } from "react-router-dom";
import { Sidebar } from 'flowbite-react';
import { MdOutlineSpaceDashboard } from "react-icons/md";
import { IoMdAddCircleOutline } from "react-icons/io";
import { MdOutlineCategory } from "react-icons/md";
import { HiOutlineDocumentReport } from "react-icons/hi";
import { IoReorderFour } from "react-icons/io5";
import { useParams } from "react-router-dom";

export default function InventorySidebar(){
    
    const {id} = useParams();


    return(
        <div>
            <Sidebar aria-label="Sidebar with content separator example " className='fixed flex flex-col w-50px'>
               <div style={{marginTop:"7.5rem"}}>
                <Sidebar.Items className='py-5'>
                     <Sidebar.ItemGroup className='cursor-pointer'> 
                        <Link to={`/inventory/dashboard/${id}`}><Sidebar.Item icon={MdOutlineSpaceDashboard} > Dashboard</Sidebar.Item></Link>
                        <Link to={`/inventory/products/${id}` }><Sidebar.Item icon={MdOutlineCategory}>Products </Sidebar.Item></Link>
                        <Link to={`/inventory/addProduct/${id}`}><Sidebar.Item icon={IoMdAddCircleOutline} >Add Products </Sidebar.Item></Link>
                        <Link to={`/inventory/orders/${id}`} ><Sidebar.Item icon={IoReorderFour}>Orders</Sidebar.Item>
                        </Link> 
                        <Link to={`/inventory/reports/${id}`}><Sidebar.Item icon={HiOutlineDocumentReport} >Reports</Sidebar.Item></Link> 
                     </Sidebar.ItemGroup>
                </Sidebar.Items>
                </div>
                <div>
                <Sidebar.Items className='pt-5'>
                    <Sidebar.ItemGroup className='cursor-pointer'>
                    <Link to={`/inventory/account/${id}`}><Sidebar.Item  icon={MdOutlineAccountCircle} > My account </Sidebar.Item></Link>
                        
                     </Sidebar.ItemGroup>
                </Sidebar.Items>
                </div>
            </Sidebar>
        </div>
    )
}

