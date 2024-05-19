import React,{useState,useEffect} from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Button } from "flowbite-react";
import { useParams } from "react-router-dom";

export default function DisplayProducts(){

  //initialize state to store product details
    const [products,setProducts] = useState([])

    const {id} = useParams()

    useEffect(()=>{

        const getProducts = async()=>{
            try{
              //getting product data from db and setting into products 
                const response = await axios.get(`https://hendriks-tea-management-system-backend.vercel.app/inventory/product/getTeaPack`);
                //console.log(response.data)
                setProducts(response.data)
            }catch(err){
                console.log(err)
            }
        };

        getProducts();
    },[])
    
    return (
       <div style={{marginTop:"9.5rem",marginLeft:"18rem"}} >
            <table>
              <thead className="bg-gray-50 border-b-2 border-gray-200 ">
                <tr>
                  <th className="p-3 text-sm font-semibold tracking-wide text-left w-52">Product Name</th>
                  <th className="p-3 text-sm font-semibold tracking-wide text-left">Tea Type</th>
                  <th className="p-3 text-sm font-semibold tracking-wide text-left">Stock Level</th>
                  <th className="p-3 text-sm font-semibold tracking-wide text-left">Unit Price(Rs.)</th>
                  <th className="p-3 text-sm font-semibold tracking-wide text-left">Weight(Gram)</th>
                  <th className="p-3 text-sm font-semibold tracking-wide text-left">Man Date</th>
                  <th className="p-3 text-sm font-semibold tracking-wide text-left">Exp Date</th>
                  <th className="p-3 text-sm font-semibold tracking-wide text-left">Reorder Level</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {
                  products.map((item,index)=>{
                      var toColor = false
                      if(item.stockLevel <= item.reorderLevel){
                          toColor = true;
                        
                      }
                    if(item.stockLevel !== 0){
                    
                    return(
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="p-3 text-sm text-gray-500 w-52" >{item.productName.toUpperCase()}</td>
                      <td className="p-3 text-sm text-gray-500">{item.teaType.toUpperCase()}</td>
                      <td className="p-3 text-sm text-gray-500" style={{color : toColor ? "red" : "green"}}>{item.stockLevel}</td>
                      <td className="p-3 text-sm text-gray-500">{item.unitPrice}</td>
                      <td className="p-3 text-sm text-gray-500">{item.weight}</td>
                      <td className="p-3 text-sm text-gray-500">{new Date(item.manDate).toLocaleDateString()}</td>
                      <td className="p-3 text-sm text-gray-500">{new Date(item.expDate).toLocaleDateString()}</td>
                      <td className="p-3 text-sm text-gray-500" >{item.reorderLevel }</td>
                      <div className="flex gap-2">
                      <Button color="success" className="my-2 mx-3"><Link to={`/inventory/updateProduct/${item._id}/${id}`}> Update</Link></Button>
                      <Button color="failure" className="my-2 mx-3"><Link to={`/inventory/deleteProduct/${item._id}/${id}`}> Delete</Link> </Button>
                      </div>
                    </tr>
                    )}
                  })
                }

              </tbody>
            </table>
     
        </div>

       
    )
 }      



    

           
            


