import React,{ useState,useEffect } from "react";
import axios from "axios";
import { Button } from "flowbite-react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function Order(){

    const [orders,setOrders] = useState([])
    const {id} = useParams()
    const navigate = useNavigate()

    useEffect(()=>{
        async function getOrders(){
            try{
                const res = await axios.get(`https://hendriks-tea-management-system-backend.vercel.app/inventory/orders/getAllOrders`)
                setOrders(res.data)
                console.log(res.data)
            }catch(err){
                console.log(err)
            }
        }

        getOrders()
    },[])

    function handleClick(e){
        navigate(`/inventory/addOrders/${id}`)

    }
    
    async function handleDelete(id){
        try{
           const res = await axios.delete(`https://hendriks-tea-management-system-backend.vercel.app/inventory/orders/deleteOrder/${id}`)
           if(res){
            alert("order deleted")
            navigate(`/inventory/dashboard/${id}`)
            
           }

        }catch(err){
            console.log(err)
        }
    }

    return(
        <div >
            <Button className="mt-[10rem] ml-[25rem]" color="blue" onClick={handleClick}>Add an Order</Button>
            <div className="mt-[3.5rem] ml-[25rem] mb-[2rem]" >
                <table className="w-[60rem]">
                    <thead className="bg-blue-50 border-b-2 border-gray-200 ">
                        <tr>
                            <th className="p-3 text-sm font-semibold tracking-wide text-left w-7rem">Product Name</th>
                            <th className="p-3 text-sm font-semibold tracking-wide text-left ">Tea Type</th>
                            <th className="p-3 text-sm font-semibold tracking-wide text-left">Quantity</th>
                            <th className="p-3 text-sm font-semibold tracking-wide text-left"> Ordered Date</th>
                            <th className="p-3 text-sm font-semibold tracking-wide text-left">Order status</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {
                            orders.map((item,index)=>{
                                return (
                                    <tr key = {index}className="hover:bg-blue-50">
                                        <td className="p-3 text-sm text-gray-700 w-7rem">{item.productName}</td>
                                        <td className="p-3 text-sm text-gray-700">{item.teaType}</td>
                                        <td className="p-3 text-sm text-gray-700">{item.quantity}</td>
                                        <td className="p-3 text-sm text-gray-700">{new Date(item.createdAt).toLocaleDateString()}</td>
                                        <td className="p-3 text-sm text-gray-700 font-semibold">{item.status}</td>
                                        <Button color="failure" className="my-2 ml-3" onClick={()=> handleDelete(item._id)}>Delete</Button>
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