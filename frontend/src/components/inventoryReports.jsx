import axios from "axios";
import ReactToPrint, { useReactToPrint } from 'react-to-print';
import { useState,useEffect,useRef } from "react";


export default function Reports(){

    const [data,setData] = useState([]);

    useEffect(()=>{

        const fetchData = async()=>{
            try{
                const res = await axios.get(`http://localhost:5000/inventory/product/getTeaPack`);
                setData(res.data)

            }catch(err){
                console.log(err);

            }
            
        }

        fetchData();
    },[])

    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        content :()=> componentRef.current,
        documentTitle : "Inventory StockCost Report",
        //onAfterPrint :()=> alert("Report Downloaded")
    })


    return (
        <div>
            <div ref={componentRef}>
                <h2>Item StockCost Report</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Product Name</th>
                            <th>Tea Type</th>
                            <th>On hand</th>
                            <th>Unit Cost(Rs.)</th>
                            <th>Total Cost(Rs.)</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data.map((item,index)=>{
                                {
                                    if(item.stockLevel !==0){
                                        return (
                                    
                                            <tr key={index}>
                                                <td>{item.productName}</td>
                                                <td>{item.teaType}</td>
                                                <td>{item.stockLevel}</td>
                                                <td>{item.unitPrice}</td>
                                                <td>{item.unitPrice * item.stockLevel}</td>
                                            </tr>
                                            )
                                    }
                                }
                                
                                    
                                
                            })
                        }
                    </tbody>
                </table> 
                </div>
                <button onClick={handlePrint}>Download Report</button>
           

        </div>
    )
}