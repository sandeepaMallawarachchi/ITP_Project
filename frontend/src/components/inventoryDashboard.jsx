import { useEffect,useState } from "react";
import axios from "axios";
import { Table } from "flowbite-react";


export default function Dashboard(){

    const [orders,setOrders] = useState([]);

    useEffect(()=>{

        async function fetchOrders(){
            try{

                const response = await axios.get("http://localhost:5000/inventory/reorder/getReorders");
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
            <h3>Here are the charts</h3>

            <div>
                <strong>Recent Orders</strong>
                <div className="overflow-x-auto">
                  <Table hoverable>
                    <Table.Head>
                       <Table.HeadCell className="w-52">Product Name</Table.HeadCell>
                       <Table.HeadCell className="w-32">Tea type</Table.HeadCell>
                       <Table.HeadCell className="w-32">Stock Level</Table.HeadCell>
                       <Table.HeadCell className="w-32">Reorder Level</Table.HeadCell>
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
                                  <Table.Cell>{item.reorderLevel}</Table.Cell>
                                  <Table.Cell>{new Date(item.date).toLocaleDateString()}</Table.Cell>
                                </Table.Row>
                                )
                            })
                        }
                    
                   </Table.Body>
                 </Table>
                </div>


            </div>
        </div>
    )
}





