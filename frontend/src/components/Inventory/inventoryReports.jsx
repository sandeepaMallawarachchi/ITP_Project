import React from "react";
import axios from "axios";
import { useReactToPrint } from 'react-to-print';
import { useState,useEffect,useRef } from "react";
import { Button } from "flowbite-react";


export default function Reports(){

    const [data,setData] = useState([]);

    useEffect(()=>{

        const fetchData = async()=>{
            try{
                //get data from db
                const res = await axios.get(`http://localhost:8070/inventory/product/getTeaPack`);
                setData(res.data)

            }catch(err){
                console.log(err);

            }
            
        }

        fetchData();
    },[])

    const componentRef = useRef();
    
    const handlePrint = useReactToPrint({
        content :()=> componentRef.current,//specifies the content to be print
        documentTitle : "Inventory Stockcost Report",
        pageStyle: `
        @page {
            size: A4;
            margin: 1cm;
        }
        body {
            font-family: Arial, sans-serif;
            font-size: 12px;
        }
        table {
            width: 100%;
            border-collapse: collapse;
        }
        th, td {
            border: 1px solid #dddddd;
            text-align: left;
            padding: 8px;
        }
        th {
            background-color: #f2f2f2;
        }
        tr:nth-child(even) {
            background-color: #f2f2f2;
        }
        .document-title {
            text-align: center;
            margin-bottom: 20px;
            font-size: 18px;
            font-weight: bold;
        }
    `
    })


    return (
        <div >
            <div style={{marginTop:"10rem",marginLeft:"23rem"}} >
                <Button onClick={handlePrint} color="blue" className="my-10 " style={{marginLeft:"2rem"}}> Download Report</Button>
                <div  ref={componentRef} >
                <div className="document-title" style={{marginLeft:"23rem",marginTop:"-5rem",fontWeight:"bold",fontSize:"1.5rem"}}>Inventory StockCost Report</div>
                <table style={{width:"60rem",marginLeft:"2rem",marginTop:"2.5rem"}} >
                    <thead className="bg-blue-50 border-b-2 border-gray-200 ">
                        <tr>
                            <th className="p-3 text-sm font-semibold tracking-wide text-left w-7rem">Product Name</th>
                            <th className="p-3 text-sm font-semibold tracking-wide text-left ">Tea Type</th>
                            <th className="p-3 text-sm font-semibold tracking-wide text-left">On hand</th>
                            <th className="p-3 text-sm font-semibold tracking-wide text-left">Unit Cost(Rs.)</th>
                            <th className="p-3 text-sm font-semibold tracking-wide text-left">Total Cost(Rs.)</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {
                            data.map((item,index)=>{
                                {
                                    if(item.stockLevel !==0){
                                        return (
                                    
                                            <tr key={index} className="hover:bg-blue-50">
                                                <td className="p-3 text-sm text-gray-700 w-7rem">{item.productName}</td>
                                                <td className="p-3 text-sm text-gray-700">{item.teaType}</td>
                                                <td className="p-3 text-sm text-gray-700">{item.stockLevel}</td>
                                                <td className="p-3 text-sm text-gray-700">{item.unitPrice}</td>
                                                <td className="p-3 text-sm text-gray-700">{item.unitPrice * item.stockLevel}</td>
                                            </tr>
                                            )
                                    }
                                }
                                
                                    
                                
                            })
                        }
                    </tbody>
                </table> 
                </div>
                </div>
             
           

        </div>
    )
}