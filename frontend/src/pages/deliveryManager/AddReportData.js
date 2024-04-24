import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function AddReportData() {
    const [vehicleType, setVehicleType] = useState("");
    const [date, setDate] = useState("");
    const [monthlyDistance, setMonthlyDistance] = useState("");
    const [fuelCost, setFuelCost] = useState("");
    const [serviceCharge, setServiceCharge] = useState("");
    const [totalCost, setTotalCost] = useState("");

    const handleFuelCostChange = (e) => {
        const input = e.target.value;
        if (!isNaN(input) && input >= 0) {
            setFuelCost(input);
        }
    };

    const handleServiceChargeChange = (e) => {
        const input = e.target.value;
        if (!isNaN(input) && input >= 0) {
            setServiceCharge(input);
        }
    };

    const handleTotalCostChange = (e) => {
        const input = e.target.value;
        if (!isNaN(input) && input >= 0) {
            setTotalCost(input);
        }
    };

    function sendData(e) {
        e.preventDefault();

        const newAddReportData = {
            vehicleType,
            date,
            monthlyDistance,
            fuelCost,
            serviceCharge,
            totalCost
        }

        axios.post("http://localhost:8070/report/add", newAddReportData)
            .then(() => {
                alert("Data Added")

                setVehicleType("");
                setDate("");
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
                            value={vehicleType} onChange={(e) => setVehicleType(e.target.value)} />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="date" className="block text-gray-700 text-sm font-bold mb-2">Date</label>
                        <input type="date" className="form-input" id="date" placeholder="Enter date"
                            value={date} onChange={(e) => setDate(e.target.value)} />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="monthlyDistance" className="block text-gray-700 text-sm font-bold mb-2">Monthly Distance (km)</label>
                        <input type="number" className="form-input" id="monthlyDistance" placeholder="Enter monthly distance"
                            value={monthlyDistance} onChange={(e) => setMonthlyDistance(e.target.value)} />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="fuelCost" className="block text-gray-700 text-sm font-bold mb-2">Fuel Cost (LKR)</label>
                        <input type="number" className="form-input" id="fuelCost" placeholder="Enter fuel cost"
                            value={fuelCost} onChange={handleFuelCostChange} />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="serviceCharge" className="block text-gray-700 text-sm font-bold mb-2">Service Charge (LKR)</label>
                        <input type="number" className="form-input" id="serviceCharge" placeholder="Enter service charge"
                            value={serviceCharge} onChange={handleServiceChargeChange} />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="totalCost" className="block text-gray-700 text-sm font-bold mb-2">Total Cost (LKR)</label>
                        <input type="number" className="form-input" id="totalCost" placeholder="Enter total cost"
                            value={totalCost} onChange={handleTotalCostChange} />
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
