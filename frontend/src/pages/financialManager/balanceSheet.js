import React, { useEffect, useState ,useRef } from "react";
import axios from "axios";
import { Link,useParams,useNavigate } from "react-router-dom";
import { useReactToPrint } from 'react-to-print';
import { Button } from "flowbite-react";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import logo from "../../images/logo.png";

pdfMake.vfs = pdfFonts.pdfMake.vfs;


export default function BalanceSheet() {

    const {id}=useParams();
    const navigate = useNavigate();
    const [income, setIncome] = useState([]);
    const [totalIncome, setTotalIncome] = useState([]);
    const [totalLiabilities, setTotalLiabilities] = useState(0);
    const [totalBalance, setTotalBalance] = useState(0);
   
    useEffect(() => {
        axios.get("https://hendriks-tea-management-system-backend.vercel.app/totalLiabilities/totalLiabilities").then((res) => {
            setTotalLiabilities(res.data.totalLiabilities); 
        }).catch((error) => {
            alert(error.message);
        });

    }, []);

    useEffect(() => {
        axios.get("https://hendriks-tea-management-system-backend.vercel.app/balanceRt/balances").then((res) => {
            setIncome(res.data);
        }).catch((error) => {
            alert(error.message);
        });

    }, []);

    useEffect(() => {
        axios.get("https://hendriks-tea-management-system-backend.vercel.app/getTotalBalance/totalBalance")
            .then((res) => {
                const totalBalance = res.data.totalBalance;
                setTotalBalance(totalBalance);
            })
            .catch((error) => {
                alert(error.message);
            });
    }, [income]); 



 
   

    useEffect(() => {
        axios.get("https://hendriks-tea-management-system-backend.vercel.app/getTotalIncome/getTotalSales")
            .then((res) => {
                const totalIncome = res.data.totalSales;
                setTotalIncome(totalIncome);
            })
            .catch((error) => {
                alert(error.message);
            });
    }, [income]); 

    const addBtn = () => {
        navigate('/addLiabilities'); 
    };

    const handleAddLiabilities= () => {
        navigate(`/financial/addLiabilities/${id}`);
    }


    const componentRef = useRef();
    
    const handlePrint = async () => {
        const fetchImage = async () => {
            const response = await fetch(logo);
            const blob = await response.blob();
            return new Promise((resolve) => {
                const reader = new FileReader();
                reader.readAsDataURL(blob);
                reader.onloadend = () => resolve(reader.result);
            });
        };
        const imageBase64 = await fetchImage();

        const exportData = income.map((item) => ({
            "Liabilities": item.liabilities,
            "Description": item.description,
            "Amount": item.amount,
        }));

        const headerRow = ["Liabilities", "Description", "Amount"];

        const tableRows = [
            headerRow.map((header) => ({
                text: header,
                fontSize: 12,
                bold: true,
                fillColor: "#04AA6D",
                color: "white",
            })),
            ...exportData.map((item, index) => {
                const backgroundColor = index % 2 === 0 ? "white" : "#f2f2f2";
                return Object.values(item).map((value) => ({
                    text: value,
                    fontSize: 10,
                    fillColor: backgroundColor,
                }));
            }),
        ];

        const docDefinition = {
            content: [
                {
                    image: imageBase64,
                    width: 120,
                    height: 100,
                    alignment: "center",
                    margin: [0, 20, 0, 10],
                },
                { text: "Balance Sheet", style: "header", margin: [0, 10, 0, 20] },
                {
                    table: {
                        headerRows: 1,
                        widths: ["*", "*", "*"],
                        body: tableRows,
                    },
                    layout: {
                        fillColor: (rowIndex) => {
                            return rowIndex === 0 ? '#CCCCCC' : null;
                        }
                    },
                    alignment: "center",
                    margin: [0, 10, 10, 0],
                },
                { text: `Total Liabilities: ${totalLiabilities}`, style: "total" },
                { text: `Total Assets: ${totalIncome}`, style: "total" },
                { text: `${totalBalance < 0 ? 'Loss' : 'Profit'}: ${Math.abs(totalBalance)}`, style: "total" },
            ],
            styles: {
                header: {
                    fontSize: 18,
                    bold: true,
                    alignment: "center",
                    margin: [0, 0, 0, 20],
                },
                total: {
                    fontSize: 12,
                    bold: true,
                    alignment: "center",
                    margin: [0, 10, 0, 10],
                },
            },
        };

        pdfMake.createPdf(docDefinition).download("BalanceSheet.pdf");
    };

    return (
        <div className='absolute mt-40 left-1/3 w-1/2 '>
            <Button onClick={handlePrint} color="blue" className="my-10 " style={{marginLeft:"2rem"}}> Download Report</Button>
                <div  ref={componentRef} >
            <h1 className="text-3xl font-bold mb-4">January (2024)</h1>
            <div className="flex justify-center">
                <table className="table-auto w-75%   border border-black mr-10 mt-18">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="px-4 py-2 border border-black">Liabilities</th>
                            <th className="px-4 py-2 border border-black">Description</th>
                            <th className="px-4 py-2 border border-black">Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        {income.map((income) => (
                            <tr key={income._id} className="border-b border-black">
                                <td className="px-4 py-2 border border-black">{income.liabilities}</td>
                                <td className="px-4 py-2 border border-black">{income.description}</td>
                                <td className="px-4 py-2 border border-black">{income.amount}</td>
                            </tr>
                        ))}
                        <p >Total Liabilities: {totalLiabilities}</p>
                    </tbody>
                
                </table>
                <br></br>
                
                
            </div>
            <button
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-4 ml-64" onClick={handleAddLiabilities}>Add liabilities</button>
           
            <div className="flex justify-center">
                <table className="table-auto w-75%   border border-black mr-10 mt-20">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="px-4 py-2 border border-black">Assets</th>
                            <th className="px-4 py-2 border border-black">Description</th>
                            <th className="px-4 py-2 border border-black">Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="border border-gray-400 px-4 py-2">Income</td>
                            <td className="border border-gray-400 px-4 py-2">Income</td>
                            <td className="border border-gray-400 px-4 py-2">{totalIncome}</td>
                        </tr>
                        
                        <p >Total Assets: {totalIncome}</p>
                    </tbody>
                </table>
                <div className="flex justify-center">
   
</div>

            </div>
            <p className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-4 ml-60 mr-60" >
        {totalBalance < 0 ? 'Loss' : 'Profit' }: {Math.abs(totalBalance)}
    </p>
        </div>
        </div>
    );
}