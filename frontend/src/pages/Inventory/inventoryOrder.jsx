import React,{useState} from "react";
import axios from "axios";
import { Button, Label, TextInput } from "flowbite-react";
import { useNavigate } from "react-router-dom";

export default function Orders(){

    const navigate = useNavigate();

    //initialize state to store order form data
    const [order,setOrder] = useState({
        productName : "",
        teaType : "",
        quantity : 0
    });

    function handleChange(e){
        setOrder((item)=>({
            ...item,
            [e.target.name] : e.target.value
        }))
    }

    async function addOrder(e){

        e.preventDefault();
        //adding order data to db
        await axios.post("http://localhost:8070/inventory/orders/addOrder",{
            productName : order.productName,
            teaType : order.teaType,
            quantity : order.quantity,
            
         })
        .then(()=>{
            alert("Order added successfully")
        }).catch((err)=>{
            console.log(err)
        })

        
        setOrder({
            productName : "",
            teaType : "",
            quantity : 0
        })

        navigate("/inventory");
    }
    return (
        <div style={{marginLeft:"40%",marginTop:"10rem"}}>
        <form onSubmit={addOrder} className="flex w-3/5 flex-col gap-10">
        <div>
          <div className="mb-2 block">
            <Label>Product Name</Label>
          </div>
          <TextInput  type="text" name="productName" value={order.productName} onChange={handleChange} required />
        </div>

        <div>
          <div className="mb-2 block">
          <Label>Tea Type</Label>
          </div>
          <TextInput  type="text" name="teaType" value={order.teaType} onChange={handleChange} required />
        </div>

        <div>
          <div className="mb-2 block">
          <Label>Quantity</Label>
          </div>
          <TextInput  type="number" name="quantity" value={order.quantity} onChange={handleChange} required />
        </div>

        <Button type="submit" style={{width:"15rem",marginTop:"1rem"}} pill >Make an Order</Button>
        </form>
        </div>
    )
 }