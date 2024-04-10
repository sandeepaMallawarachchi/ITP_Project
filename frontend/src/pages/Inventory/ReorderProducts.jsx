import { useEffect , useState} from "react";
import axios from "axios";
import { Table } from "flowbite-react";

export default function ReorderProducts(){

    const [orders,setOrders] = useState([]);

    useEffect(()=>{
        async function fetchOrders(){
            try{
                //get details of productsthat has reached reorder level
                const response = await axios.get("http://localhost:8070/inventory/reorder/getReorders");
                setOrders(response.data)
                //alert("order successfully fetched")

            }catch(err){
                console.log(err)
            }
        }

        fetchOrders();
    },[])

    return (
        <div className="ml-96">
            
            <strong>Recent Orders</strong>
            <div className="overflow-x-auto">
                <Table hoverable>
                    <Table.Head>
                       <Table.HeadCell className="w-52">Product Name</Table.HeadCell>
                       <Table.HeadCell className="w-32">Tea type</Table.HeadCell>
                       <Table.HeadCell className="w-32">Stock Level</Table.HeadCell>
                       <Table.HeadCell className="w-32">Time</Table.HeadCell>
                       <Table.HeadCell className="w-32">Date</Table.HeadCell>
                    </Table.Head>
                    <Table.Body className="divide-y">
                        {
                            orders.map((item,index)=>{
                                return(
                                    <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800" key={index}>
                                        <Table.Cell >{item.productName}</Table.Cell>
                                        <Table.Cell>{item.teaType}</Table.Cell>
                                        <Table.Cell>{item.stockLevel}</Table.Cell>
                                        <Table.Cell>{new Date(item.createdAt).toLocaleTimeString()}</Table.Cell>
                                        <Table.Cell>{new Date(item.createdAt).toLocaleDateString()}</Table.Cell>
                                    </Table.Row>
                                )
                            })
                        }
                    
                   </Table.Body>
                 </Table>
            </div>
        </div>
           
        
    )
}