import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useReactToPrint } from 'react-to-print';
import { Button } from "flowbite-react";
import logo from "../../images/logo.png"

export default function Reports(){

    const [data, setData] = useState([]);

    useEffect(()=>{
        const fetchData = async () => {
            try {
                const res = await axios.get(`http://localhost:8070/inventory/product/getTeaPack`);
                setData(res.data);
            } catch(err) {
                console.log(err);
            }
        }
        fetchData();
    },[]);

    function formatNumber(number){
        return number.toLocaleString('en-US', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        });
    }

    const componentRef = useRef();

    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
        documentTitle: "Inventory Stockcost Report"
    });

    return (
        <div style={{marginTop:"10rem",marginLeft:"23rem"}}>
            <Button onClick={handlePrint} color="blue" className="my-10" style={{marginLeft: "2rem"}}>Download Report</Button>
            <div ref={componentRef}>
                {handlePrint ? null : (
                    <>
                        <img src={logo} alt="logo" className="logo" />
                        <h1 className="w-[60rem] ml-[2rem] mt-[2.5rem] font-bold text-xl title">Inventory Stock Cost Report</h1>
                    </>
                )}
                <table className="w-[60rem] ml-[2rem] mt-[2.5rem]">
                    <thead className="bg-blue-50 border-b-2 border-gray-200">
                        <tr>
                            <th className="p-3 text-sm font-semibold tracking-wide text-left w-7rem">Product Name</th>
                            <th className="p-3 text-sm font-semibold tracking-wide text-left">Tea Type</th>
                            <th className="p-3 text-sm font-semibold tracking-wide text-left">On hand</th>
                            <th className="p-3 text-sm font-semibold tracking-wide text-left">Unit Cost(Rs.)</th>
                            <th className="p-3 text-sm font-semibold tracking-wide text-left">Total Cost(Rs.)</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {data.map((item, index) => {
                            if (item.stockLevel !== 0) {
                                return (
                                    <tr key={index} className="hover:bg-blue-50">
                                        <td className="p-3 text-sm text-gray-700 w-7rem">{item.productName}</td>
                                        <td className="p-3 text-sm text-gray-700">{item.teaType}</td>
                                        <td className="p-3 text-sm text-gray-700">{item.stockLevel}</td>
                                        <td className="p-3 text-sm text-gray-700">{item.unitPrice}</td>
                                        <td className="p-3 text-sm text-gray-700">{formatNumber(item.unitPrice * item.stockLevel)}</td>
                                    </tr>
                                );
                            }
                            return null;
                        })}
                    </tbody>
                </table> 
            </div>
        </div>
    );
}
