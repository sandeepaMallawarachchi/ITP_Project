import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function UpdateReportData() {
    const { id } = useParams();
    const [reportDetails, setreportDetails] = useState({
        vehicleType: "",
        date: "",
        monthlyDistance: "",
        fuelCost: "",
        serviceCharge: "",
        totalCost: ""
          
    });

    useEffect(() => {
        const fetchreportDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:8070/report/get/${id}`);
                setreportDetails(response.data.report);
            } catch (error) {
                console.error("Error fetching report details", error.message);
            }
        };
        fetchreportDetails();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await axios.put(`http://localhost:8070/report/update/${id}`, reportDetails);
            alert("Details Updated!");
        } catch (error) {
            console.error("Error updating report details", error.message);
        }
    };

    return (
        <div className="absolute mt-48 left-1/3 w-1/2" style={{ width: "600px" }}>
            <form onSubmit={handleSubmit}>
                <div>
                    <div className="mb-3">
                        <label htmlFor="vehicleType" className="form-label">Vehicle Type</label>
                        <input type="text" className="form-control" id="vehicleType" value={reportDetails.vehicleType} onChange={(e) => setreportDetails({...reportDetails, vehicleType: e.target.value})} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="date" className="form-label">Date</label>
                        <input type="date" className="form-control" id="date" value={reportDetails.date} onChange={(e) => setreportDetails({...reportDetails, date: e.target.value})} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="monthlyDistance" className="form-label">Monthly Distance (km)</label>
                        <input type="number" className="form-control" id="monthlyDistance" value={reportDetails.monthlyDistance} onChange={(e) => setreportDetails({...reportDetails, monthlyDistance: e.target.value})} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="fuelCost" className="form-label">Fuel Cost (LKR)</label>
                        <input type="number" className="form-control" id="fuelCost" value={reportDetails.fuelCost} onChange={(e) => setreportDetails({...reportDetails, fuelCost: e.target.value})} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="serviceCharge" className="form-label">Service Charge (LKR)</label>
                        <input type="number" className="form-control" id="serviceCharge" value={reportDetails.serviceCharge} onChange={(e) => setreportDetails({...reportDetails, serviceCharge: e.target.value})} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="totalCost" className="form-label">Total Cost (LKR)</label>
                        <input type="number" className="form-control" id="totalCost" value={reportDetails.totalCost} onChange={(e) => setreportDetails({...reportDetails, totalCost: e.target.value})} />
                    </div>
                </div>
                <button type="submit" className="btn btn-primary">Update</button>
            </form>
        </div>
    );
}

export default UpdateReportData;
