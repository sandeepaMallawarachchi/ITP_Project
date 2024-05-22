import React, { useState, useEffect, useRef } from 'react';
import axios from "axios";
import { useReactToPrint } from 'react-to-print';
import { useParams, useNavigate } from 'react-router-dom';
import { HiInformationCircle } from "react-icons/hi";
import logo from '../../images/logo.png';

export default function AllReportData() {
    const { id } = useParams();
    const [report, setReport] = useState([]);
    const [totalCostSum, setTotalCostSum] = useState(0);
    const [showLogoAndTitle, setShowLogoAndTitle] = useState(false);

    useEffect(() => {
        fetchReport();
    }, []);

    const fetchReport = () => {
        axios.get("http://localhost:8070/report/")
            .then(response => {
                const { reports, totalCostSum } = response.data;
                setReport(reports);
                setTotalCostSum(totalCostSum);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    const navigate = useNavigate();

    const handleUpdate = (rId) => {
        navigate(`/deliveryManager/updateReportData/${rId}/${id}`);
    }

    const handleDelete = (rId) => {
        navigate(`/deliveryManager/deleteReportData/${rId}/${id}`);
    }

    const componentRef = useRef();

    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
        onBeforeGetContent: () => setShowLogoAndTitle(true),
        onAfterPrint: () => setShowLogoAndTitle(false),
        pageStyle: `
            @page {
                size: A4;
                margin: 2cm;
            }
            body {
                font-family: Arial, sans-serif;
                font-size: 12px;
            }
            table {
                width: 100%;
                border-collapse: collapse;
                margin-top: 100px;
            }
            th, td {
                border: 1px solid #dddddd;
                text-align: center;
                padding: 8px;
            }
            th {
                background-color: #f2f2f2;
            }
            tr:nth-child(even) {
                background-color: #f2f2f2;
            }
            .logo {
                top: 0;
                left: 0;
                z-index: 9999;
                margin: 10px;
                content: url(${logo});
            }
            .title {
                text-align: center;
                font-size: 2rem;
                font-weight: bold;
                color: green;
                margin-top: 170px
            }
            @media print {
                .no-print {
                    display: none;
                }
            }
        `
    });

    return (
        <div className="container mx-auto px-4 py-8 absolute mt-32 left-1/4 w-1/2">
            <div ref={componentRef} className="relative overflow-x-auto shadow-md sm:rounded-lg mt-5">
                <img className='ml-56 logo' />
                <h1 className="text-2xl font-bold mb-4">Delivery Report</h1>
                <div className="mb-4 text-center font-bold text-lg"style={{ color: 'green' }}>Monthly Delivery Total Cost of All Reports: {totalCostSum} LKR</div>
                <table className="table-auto w-full border-collapse">
                    <thead>
                        <tr>
                            <th className="px-4 py-2 text-black">Vehicle Type</th>
                            <th className="px-4 py-2 text-black">Monthly Distance (km)</th>
                            <th className="px-4 py-2 text-black">Fuel Cost (LKR)</th>
                            <th className="px-4 py-2 text-black">Service Charge (LKR)</th>
                            <th className="px-4 py-2 text-black">Total Cost (LKR)</th>
                            {!showLogoAndTitle && <th className="px-4 py-2 text-black no-print">Actions</th>}
                        </tr>
                    </thead>
                    <tbody>
                        {report.map((reportItem) => (
                            <tr key={reportItem._id}>
                                <td className="border px-4 py-2">{reportItem.vehicleType}</td>
                                <td className="border px-4 py-2">{reportItem.monthlyDistance}</td>
                                <td className="border px-4 py-2">{reportItem.fuelCost}</td>
                                <td className="border px-4 py-2">{reportItem.serviceCharge}</td>
                                <td className="border px-4 py-2">{reportItem.totalCost}</td>
                                {!showLogoAndTitle && (
                                    <td className="border px-4 py-2 no-print">
                                        <div className='flex'>
                                            <button
                                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded mr-2"
                                                onClick={() => handleUpdate(reportItem._id, id)}
                                            >
                                                Update
                                            </button>
                                            <button
                                                className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
                                                onClick={() => handleDelete(reportItem._id, id)}
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </td>
                                )}
                            </tr>
                        ))}
                    </tbody>
                </table>
                <button
                    type="button"
                    onClick={handlePrint}
                    id='title'
                    className="mt-5 focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
                    Download delivery report
                </button>
            </div>
        </div>
    );
}
