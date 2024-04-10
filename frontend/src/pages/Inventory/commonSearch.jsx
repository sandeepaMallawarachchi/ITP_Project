import React,{useEffect, useState}from "react";
import axios from "axios";
import {useLocation} from "react-router-dom"

export default function SearchResult(){

    //initialize state to store search results 
    const [result,setResult] = useState([]);
    
    //returns an object that represents current URL location in the app
    const location = useLocation();

    //contains the query string part of the URL
    const queryParams = new URLSearchParams(location.search);

    //get the value in the query parameter q
    const value = queryParams.get("q");

    //console.log(value)


    useEffect(()=>{
        const fetchData = async()=>{
            try{
                //get the searched data from db
                const res = await axios.get(`http://localhost:8070/inventory/product/searchTeapack?q=${value}`)
                //console.log(res.data);
                setResult(res.data)
               
            }catch(err){
                console.log(err);
            }
        }
        fetchData();

    },[value])
    
    return (
            
             <div style={{marginTop:"90px",marginLeft:"110px" }}>
            
             { 
             result.length === 0 ?
             (<span> There is no such product in inventory</span>) :
             
             (<table>
                <thead>
                    <tr>
                        <th>Product name</th>
                        <th>Tea type</th>
                        <th>Stock Level</th>
                        <th>Unit Price</th>
                        <th>Weight</th>
                        <th>manDate</th>
                        <th>expDate</th>
                        <th>Reorder Level</th>
                        
                    </tr>
                </thead>
                <tbody>
                    {
                        result.map((item,index)=>{
                            return(
                            <tr key={index}>
                                <td>{item.productName}</td>
                                <td>{item.teaType}</td>
                                <td>{item.stockLevel}</td>
                                <td>{item.unitPrice}</td>
                                <td>{item.weight}</td>
                                <td>{new Date(item.manDate).toLocaleDateString()}</td>
                                <td>{new Date(item.expDate).toLocaleDateString()}</td>
                                <td>{item.reorderLevel}</td>
                            </tr>)
                        })
                        
                    }
                    
                </tbody>
            </table>)}

            
        </div>
    )

    
}