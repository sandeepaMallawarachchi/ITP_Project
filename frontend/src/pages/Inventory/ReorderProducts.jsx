import { useEffect , useState} from "react";
import axios from "axios";

export default function ReorderProducts(){

    const [orders,setOrders] = useState([]);

    useEffect(()=>{
        async function fetchOrders(){
            try{
                //get details of productsthat has reached reorder level
                const response = await axios.get("https://hendriks-tea-management-system-backend.vercel.app/inventory/reorder/getReorders");
                setOrders(response.data)
                //alert("order successfully fetched")

            }catch(err){
                console.log(err)
            }
        }

        fetchOrders();
    },[])

    return (
        <div >
            
            <h2 style={{fontWeight:"bold",fontSize:"1.2rem",backgroundColor:"#ADD8E6",width:"22rem"}}>Products that reached Reorder Level</h2>
            <div>
                <table  style={{width:"60rem",marginTop:"2rem"}}>
                    <thead className="bg-blue-50 border-b-2 border-gray-200 ">
                        <tr>
                            <th className="p-3 text-sm font-semibold tracking-wide text-left w-52">Product Name</th>
                            <th className="p-3 text-sm font-semibold tracking-wide text-left">Tea Type</th>
                            <th className="p-3 text-sm font-semibold tracking-wide text-left">Stock Level</th>
                            <th className="p-3 text-sm font-semibold tracking-wide text-left">Time</th>
                            <th className="p-3 text-sm font-semibold tracking-wide text-left">Date</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                       {
                        orders.map((item,index)=>{
                            return(
                                <tr  className="hover:bg-gray-50" key={index}>
                                    <td className="p-3 text-sm text-gray-700 w-52">{item.productName}</td>
                                    <td className="p-3 text-sm text-gray-700">{item.teaType}</td>
                                    <td className="p-3 text-sm text-gray-700">{item.stockLevel}</td>
                                    <td className="p-3 text-sm text-gray-700">{new Date(item.createdAt).toLocaleTimeString()}</td>
                                    <td className="p-3 text-sm text-gray-700">{new Date(item.createdAt).toLocaleDateString()}</td>
                                </tr>
                            )
                        })
                       }
                    </tbody>
                </table>
            </div>
           
        </div>
           
        
    )
}