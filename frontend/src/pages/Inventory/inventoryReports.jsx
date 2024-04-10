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
        documentTitle : "Inventory StockCost Report",
        //onAfterPrint :()=> alert("Report Downloaded")
    })


    return (
        <div className="ml-60">
            <div className=" " >
                <h2>Item StockCost Report</h2>
                <Button onClick={handlePrint} color="blue" className="my-10 ml-20"> Download Report</Button>
                <table className="shadow" ref={componentRef} >
                    <thead className="bg-gray-50 border-b-2 border-gray-200 ">
                        <tr>
                            <th className="p-3 text-sm font-semibold tracking-wide text-left w-7rem">Product Name</th>
                            <th className="p-3 text-sm font-semibold tracking-wide text-left">Tea Type</th>
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
                                    
                                            <tr key={index} className="hover:bg-gray-50">
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
    )
}