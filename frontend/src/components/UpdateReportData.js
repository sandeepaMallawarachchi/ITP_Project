import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function UpdateReportData() {
    const { id } = useParams();
    const [reportDetails, setreportDetails] = useState({
        vehicleType: "",
        monthlyDistance: "",
        amountOfFuel: "",
        serviceCharge: "",
        totalCost: ""
          
    });

    useEffect(() => {
        const fetchreportDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/report/get/${id}`);
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
            await axios.put(`http://localhost:5000/report/update/${id}`, reportDetails);
            alert("Details Updated!");
        } catch (error) {
            console.error("Error updating report details", error.message);
        }
    };

    return (
        <div className="container" style={{ width: "600px" }}>
            <form onSubmit={handleSubmit}>
                <div>
                    <div className="mb-3">
                        <label htmlFor="vehicleType" className="form-label">Driver Name</label>
                        <input type="text" className="form-control" id="vehicleType" value={reportDetails.vehicleType} onChange={(e) => setreportDetails({...reportDetails, vehicleType: e.target.value})} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="monthlyDistance" className="form-label">Age</label>
                        <input type="number" className="form-control" id="monthlyDistance" value={reportDetails.monthlyDistance} onChange={(e) => setreportDetails({...reportDetails, monthlyDistance: e.target.value})} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="amountOfFuel" className="form-label">Address</label>
                        <input type="number" className="form-control" id="amountOfFuel" value={reportDetails.amountOfFuel} onChange={(e) => setreportDetails({...reportDetails, amountOfFuel: e.target.value})} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="serviceCharge" className="form-label">Phone Number</label>
                        <input type="number" className="form-control" id="serviceCharge" value={reportDetails.serviceCharge} onChange={(e) => setreportDetails({...reportDetails, serviceCharge: e.target.value})} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="totalCost" className="form-label">Email</label>
                        <input type="number" className="form-control" id="totalCost" value={reportDetails.totalCost} onChange={(e) => setreportDetails({...reportDetails, totalCost: e.target.value})} />
                    </div>
                </div>
                <button type="submit" className="btn btn-primary">Update</button>
            </form>
        </div>
    );
}

export default UpdateReportData;
