import { useState,useEffect } from "react";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import logo from "../../images/logo.png";
import axios from "axios"
import { Button } from "flowbite-react";

pdfMake.vfs = pdfFonts.pdfMake.vfs;

export default function GenerateReport(){

    const [data,setData] = useState([])

    useEffect(()=>{
    async function fetchData(){
        try{
            const res = await axios.get(`https://hendriks-tea-management-system-backend.vercel.app/inventory/product/getTeaPack`)
            
            
            setData(res.data)
            console.log(res.data)

        }catch(err){
            console.log(err)
        }
    }
    fetchData()

},[])

function formatNumber(number){
    return number.toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });
}

const handleExport = async () => {
    const exportData = data.map((item) => ({

    
      "Product Name ": item.productName,
      "Tea Type": item.teaType,
      "On hand": item.stockLevel,
      "Unit Cost": item.unitPrice,
      "Total Cost" : item.unitPrice * item.stockLevel,
      
    }))

    const headerRow = [
        "Product Name",
        "Tea Type",
        "On hand",
        "Unit Cost (Rs.)",
        "Total Cost (Rs.)",
    ]

    const tableRows = [
        headerRow.map((header) => ({
          text: header,
          fontSize: 12,
          bold: true,
          fillColor: "#04AA6D",
          color: "white",
        })),
        
        ...exportData.map((item,index)=>{
            const backgroundColor = index % 2 === 0 ? "white" : "#f2f2f2";
            return Object.values(item).map((value)=>({
                text: value,
                fontSize: 8,
                fillColor:backgroundColor,
            }));
        }),
    ];

    const columnWidths = [120,70, 90, 100, 100];

    try{
        const response = await fetch(logo);
        const blob = await response.blob();
        const reader = new FileReader();
        reader.readAsDataURL(blob);
        reader.onloadend = ()=>{
            const base64data = reader.result;
            const docDefinition = {
                content: [
                    // {
                    //     text:"Hendricks Tea",
                    //     style: "additionalHeader",
                    //     alignment: "center",
                    //     margin: [0, 20, 0, 0],
                    // },
                    {
                        image: base64data,
                        width: 120,
                        height: 100,
                        alignment: "center",
                        margin: [0,20,0,10]
                    },
                    {text:"Inventory Stockcost Report",style: "header",margin:[0,10,0,20]},
                    {
                        table:{
                            headerRows : 1,
                            widths: columnWidths,
                            body : tableRows,
                        },
                        margin:[0,10,0,0]
                    },
                ],
                styles : {
                    header: {
                        fontSize: 18,
                        bold: true,
                        alignment: "center",
                        margin: [0, 0, 0, 20],
                    },
                    additionalHeader: {
                        fontSize: 16,
                        bold: true,
                    },
                },
            };

            const pdfDoc = pdfMake.createPdf(docDefinition)
            pdfDoc.download("Inventory Report.pdf")
        }

    }catch(err){
        console.error("Error fetching image", err)
    }

};

return(
    <div style={{marginTop:"10rem",marginLeft:"23rem"}}>
            <Button onClick={handleExport} color="blue" className="my-10" style={{marginLeft: "2rem"}}>Download Report</Button>
            <h1 style={{marginLeft:"23rem",marginTop:"-5rem",fontWeight:"bold",fontSize:"1.5rem"}}>Inventory StockCost Report</h1>
            <div>
                
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
)
}



// import React, { useEffect, useRef, useState } from "react";
// import axios from "axios";
// import { useReactToPrint } from 'react-to-print';
// import { Button } from "flowbite-react";
// import logo from "../../images/logo.png"

// export default function Reports(){

//     const [data, setData] = useState([]);
//     const [printMode,setPrintMode] = useState(false)

//     useEffect(()=>{
//         const fetchData = async () => {
//             try {
//                 const res = await axios.get(`https://hendriks-tea-management-system-backend.vercel.app/inventory/product/getTeaPack`);
//                 setData(res.data);
//             } catch(err) {
//                 console.log(err);
//             }
//         }
//         fetchData();
//     },[]);

//     function formatNumber(number){
//         return number.toLocaleString('en-US', {
//             minimumFractionDigits: 2,
//             maximumFractionDigits: 2
//         });
//     }

//     const componentRef = useRef();

//     const handlePrint = useReactToPrint({
//         content: () => componentRef.current,
//         documentTitle: "Inventory Stockcost Report",
//         onAfterPrint:()=> setPrintMode(false) ,
//         pageStyle: `
//         @page {
//             size: A4;
//             margin: 1cm;
//         }
//         body {
//             font-family: Arial, sans-serif;
//             font-size: 12px;
//         }
        
//         .logo{
//             display: block;
//             margin: 0 auto;

//         }
        
//         .title {
            
//             text-align: center;
//             font-size: 2rem;
//             font-weight: bold;
//             color: green;
          
//         }
//         table {
//             width: 100%;
//             border-collapse: collapse;
//             margin-top: 32px;
//         }
//         th, td {
//             border: 1px solid #dddddd;
//             text-align: left;
//             padding: 8px;
//         }
//         th {
//             background-color: #f2f2f2;
//         }
//         tr:nth-child(even) {
//             background-color: #f2f2f2;
//         }`
//     });

//     function handleClick(){

//         setPrintMode(true)
//         handlePrint()

//     }

//     return (
//         <div style={{marginTop:"10rem",marginLeft:"23rem"}}>
//             <Button onClick={handleClick} color="blue" className="my-10" style={{marginLeft: "2rem"}}>Download Report</Button>
//             <h1 style={{marginLeft:"23rem",marginTop:"-5rem",fontWeight:"bold",fontSize:"1.5rem"}}>Inventory StockCost Report</h1>
//             <div ref={componentRef}>
//                 {
//                     printMode && 
//                     <>
//                         <img src={logo} alt="logo" className="logo"/>
//                         <h2 className="title">Inventory Stockcost Report</h2>
//                     </>
//                 }
//                 <table className="w-[60rem] ml-[2rem] mt-[2.5rem]">
//                     <thead className="bg-blue-50 border-b-2 border-gray-200">
//                         <tr>
//                             <th className="p-3 text-sm font-semibold tracking-wide text-left w-7rem">Product Name</th>
//                             <th className="p-3 text-sm font-semibold tracking-wide text-left">Tea Type</th>
//                             <th className="p-3 text-sm font-semibold tracking-wide text-left">On hand</th>
//                             <th className="p-3 text-sm font-semibold tracking-wide text-left">Unit Cost(Rs.)</th>
//                             <th className="p-3 text-sm font-semibold tracking-wide text-left">Total Cost(Rs.)</th>
//                         </tr>
//                     </thead>
//                     <tbody className="divide-y divide-gray-100">
//                         {data.map((item, index) => {
//                             if (item.stockLevel !== 0) {
//                                 return (
//                                     <tr key={index} className="hover:bg-blue-50">
//                                         <td className="p-3 text-sm text-gray-700 w-7rem">{item.productName}</td>
//                                         <td className="p-3 text-sm text-gray-700">{item.teaType}</td>
//                                         <td className="p-3 text-sm text-gray-700">{item.stockLevel}</td>
//                                         <td className="p-3 text-sm text-gray-700">{item.unitPrice}</td>
//                                         <td className="p-3 text-sm text-gray-700">{formatNumber(item.unitPrice * item.stockLevel)}</td>
//                                     </tr>
//                                 );
//                             }
//                             return null;
//                         })}
//                     </tbody>
//                 </table> 
//             </div>
//         </div>
//     );
// }
