import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function AddReportData() {
    const [vehicleType, setvehicleType] = useState("");
    const [monthlyDistance, setmonthlyDistance] = useState("");
    const [fuelCost, setfuelCost] = useState(""); 
    const [serviceCharge, setserviceCharge] = useState("");
    const [totalCost, settotalCost] = useState("");
   

    function sendData(e) {
        e.preventDefault();

        const newAddReportData = {
            vehicleType,
            monthlyDistance,
            fuelCost,
            serviceCharge,
            totalCost
            
        }

        axios.post("http://localhost:5000/report/add", newAddReportData)
            .then(() => {
                alert("Data Added")

                setvehicleType("");
                setmonthlyDistance("");
                setfuelCost("");
                setserviceCharge("");
                settotalCost("");
                
            })
            .catch((err) => {
                alert(err)
            });
    }

    return (
        <div className="container">
            <form onSubmit={sendData}>
                <div className="mb-3">
                    <label htmlFor="vehicleType" className="form-label">Vehicle Type</label>
                    <input type="text" className="form-control" id="vehicleType" placeholder="Enter vehicle type"
                        onChange={(e) => setvehicleType(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label htmlFor="monthlyDistance" className="form-label">Monthly Distance (km)</label>
                    <input type="number" className="form-control" id="monthlyDistance" placeholder="Enter monthly distance"
                        onChange={(e) => setmonthlyDistance(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label htmlFor="fuelCost" className="form-label">Fuel Cost (LKR)</label>
                    <input type="number" className="form-control" id="fuelCost" placeholder="Enter fuel cost"
                        onChange={(e) => setfuelCost(parseInt(e.target.value, 10))} /> {/* Parse string to integer */}
                </div>
                <div className="mb-3">
                    <label htmlFor="serviceCharge" className="form-label">Service Charge (LKR)</label>
                    <input type="number" className="form-control" id="serviceCharge" placeholder="Enter service charge"
                        onChange={(e) => setserviceCharge(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label htmlFor="settotalCost" className="form-label">Total Cost (LKR)</label>
                    <input type="number" className="form-control" id="settotalCost" placeholder="Enter total cost"
                        onChange={(e) => settotalCost(e.target.value)} />
                </div>
                
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
             <li className="rty">
                <Link to="/allReportData" className="rty">All Report Details</Link>
            </li>
          
        </div>
    );
}
