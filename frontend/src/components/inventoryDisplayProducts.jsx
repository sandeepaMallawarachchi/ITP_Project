import React,{useState,useEffect} from "react";
import axios from "axios";
import { Table } from 'flowbite-react';
import { Link } from "react-router-dom";

export default function DisplayProducts(){

    const [products,setProducts] = useState([])

    useEffect(()=>{

        const getProducts = async()=>{
            try{
                const response = await axios.get(`http://localhost:5000/inventory/product/getTeaPack`);
                console.log(response.data)
                setProducts(response.data)
            }catch(err){
                console.log(err)
            }
        };

        getProducts();
    },[])
    
    return (

    <div >
      <div className="flex-1 overflow-auto "  >
      <Table hoverable>
        <Table.Head>
          <Table.HeadCell >Product Name</Table.HeadCell>
          <Table.HeadCell >Tea Type</Table.HeadCell>
          <Table.HeadCell >Stock Level</Table.HeadCell>
          <Table.HeadCell >Unit Price(Rs)</Table.HeadCell>
          <Table.HeadCell >Packet Size(grams)</Table.HeadCell>
          <Table.HeadCell >Man Date</Table.HeadCell>
          <Table.HeadCell >Exp Date</Table.HeadCell>
          <Table.HeadCell >Reorder Level</Table.HeadCell>
          
        </Table.Head>

        <Table.Body className="divide-y ">
          
            {
                products.map((item,index)=>{
                    return(
                   <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800" key={index}>
                    <Table.Cell>{item.productName}</Table.Cell>
                    <Table.Cell>{item.teaType}</Table.Cell>
                    <Table.Cell>{item.stockLevel}</Table.Cell>
                    <Table.Cell>{item.unitPrice}</Table.Cell>
                    <Table.Cell>{item.weight}</Table.Cell>
                    <Table.Cell>{new Date(item.manDate).toLocaleDateString()}</Table.Cell>
                    <Table.Cell>{new Date(item.expDate).toLocaleDateString()}</Table.Cell>
                    <Table.Cell>{item.reorderLevel}</Table.Cell>
                    <Table.Cell className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"><Link to={`/inventory/updateProduct/${item._id}`}> Update</Link></Table.Cell>
                    <Table.Cell className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"><Link to={`/inventory/deleteProduct/${item._id}`}> Delete</Link> </Table.Cell>
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



    

           
            

