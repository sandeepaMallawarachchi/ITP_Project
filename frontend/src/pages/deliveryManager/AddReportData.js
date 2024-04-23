import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function AddReportData() {
    const [vehicleType, setVehicleType] = useState("");
    const [monthlyDistance, setMonthlyDistance] = useState("");
    const [fuelCost, setFuelCost] = useState(""); 
    const [serviceCharge, setServiceCharge] = useState("");
    const [totalCost, setTotalCost] = useState("");

    function sendData(e) {
        e.preventDefault();

        const newAddReportData = {
            vehicleType,
            monthlyDistance,
            fuelCost,
            serviceCharge,
            totalCost
        }

        axios.post("http://localhost:8070/report/add", newAddReportData)
            .then(() => {
                alert("Data Added")

                setVehicleType("");
                setMonthlyDistance("");
                setFuelCost("");
                setServiceCharge("");
                setTotalCost("");
            })
            .catch((err) => {
                alert(err)
            });
    }

    return (
        <div className="flex justify-center items-center h-screen">
            <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <form onSubmit={sendData}>
                    <div className="mb-4">
                        <label htmlFor="vehicleType" className="block text-gray-700 text-sm font-bold mb-2">Vehicle Type</label>
                        <input type="text" className="form-input" id="vehicleType" placeholder="Enter vehicle type"
                            onChange={(e) => setVehicleType(e.target.value)} />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="monthlyDistance" className="block text-gray-700 text-sm font-bold mb-2">Monthly Distance (km)</label>
                        <input type="number" className="form-input" id="monthlyDistance" placeholder="Enter monthly distance"
                            onChange={(e) => setMonthlyDistance(e.target.value)} />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="fuelCost" className="block text-gray-700 text-sm font-bold mb-2">Fuel Cost (LKR)</label>
                        <input type="number" className="form-input" id="fuelCost" placeholder="Enter fuel cost"
                            onChange={(e) => setFuelCost(parseInt(e.target.value, 10))} /> {/* Parse string to integer */}
                    </div>
                    <div className="mb-4">
                        <label htmlFor="serviceCharge" className="block text-gray-700 text-sm font-bold mb-2">Service Charge (LKR)</label>
                        <input type="number" className="form-input" id="serviceCharge" placeholder="Enter service charge"
                            onChange={(e) => setServiceCharge(e.target.value)} />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="totalCost" className="block text-gray-700 text-sm font-bold mb-2">Total Cost (LKR)</label>
                        <input type="number" className="form-input" id="totalCost" placeholder="Enter total cost"
                            onChange={(e) => setTotalCost(e.target.value)} />
                    </div>
                    <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Submit</button>
                </form>
                <div className="mt-4">
                    <Link to="/allReportData" className="text-blue-500 hover:text-blue-700 text-lg">All Report Details</Link>
                </div>
            </div>
        </div>
    );
}
