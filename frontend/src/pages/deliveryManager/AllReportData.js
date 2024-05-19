import React, { useState, useEffect } from 'react';
import axios from "axios";
import { useParams,useNavigate } from 'react-router-dom';

export default function AllReportData() {
    const {id} = useParams();
    const [report, setReport] = useState([]);
    const [totalCostSum, setTotalCostSum] = useState(0);

    useEffect(() => {
        fetchReport();
    }, []);

    const fetchReport = () => {
        axios.get("https://hendriks-tea-management-system-backend.vercel.app/report/")
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

    return (
        <div className="container mx-auto px-4 py-8 absolute mt-48 left-1/4 w-1/2">
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
                            <th className="px-4 py-2 text-black">Actions</th>
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
                                <td className="border px-4 py-2">
                                    <div className = 'flex'>
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
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
       
    );
}
