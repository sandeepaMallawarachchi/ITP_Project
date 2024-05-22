import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

function UpdateReportData() {
    const { id, rId } = useParams();
    const [reportDetails, setReportDetails] = useState({
        vehicleType: "",
        monthlyDistance: "",
        fuelCost: "",
        serviceCharge: "",
        totalCost: ""
    });

    useEffect(() => {
        const fetchReportDetails = async () => {
            try {
                const response = await axios.get(`https://hendriks-tea-management-system-backend.vercel.app/report/get/${rId}`);
                setReportDetails(response.data.report);
            } catch (error) {
                console.error("Error fetching report details", error.message);
            }
        };
        fetchReportDetails();
    }, [rId]);

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await axios.put(`https://hendriks-tea-management-system-backend.vercel.app/report/update/${rId}`, reportDetails);
            alert("Details Updated!");
            navigate(`/deliverymanager/allReportData/${id}`);
        } catch (error) {
            console.error("Error updating report details", error.message);
        }
    };

    return (
        <div className="flex justify-center items-center h-screen">
            <div className="bg-white shadow-md rounded px-8 pt-8 pb-8 mt-48 mb-4 w-1/2">
                <h1 className="text-2xl font-bold mb-4">Update Report Data</h1>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="vehicleType" className="block text-sm font-medium text-gray-700">Vehicle Type</label>
                        <input type="text" className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" id="vehicleType" value={reportDetails.vehicleType} onChange={(e) => setReportDetails({ ...reportDetails, vehicleType: e.target.value })} />
                    </div>
                    <div>
                        <label htmlFor="monthlyDistance" className="block text-sm font-medium text-gray-700">Monthly Distance (km)</label>
                        <input type="number" className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" id="monthlyDistance" value={reportDetails.monthlyDistance} onChange={(e) => setReportDetails({ ...reportDetails, monthlyDistance: e.target.value })} />
                    </div>
                    <div>
                        <label htmlFor="fuelCost" className="block text-sm font-medium text-gray-700">Fuel Cost (LKR)</label>
                        <input type="number" className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" id="fuelCost" value={reportDetails.fuelCost} onChange={(e) => setReportDetails({ ...reportDetails, fuelCost: e.target.value })} />
                    </div>
                    <div>
                        <label htmlFor="serviceCharge" className="block text-sm font-medium text-gray-700">Service Charge (LKR)</label>
                        <input type="number" className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" id="serviceCharge" value={reportDetails.serviceCharge} onChange={(e) => setReportDetails({ ...reportDetails, serviceCharge: e.target.value })} />
                    </div>
                    <div>
                        <label htmlFor="totalCost" className="block text-sm font-medium text-gray-700">Total Cost (LKR)</label>
                        <input type="number" className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" id="totalCost" value={reportDetails.totalCost} onChange={(e) => setReportDetails({ ...reportDetails, totalCost: e.target.value })} />
                    </div>
                    <div>
                        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Update</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default UpdateReportData;
