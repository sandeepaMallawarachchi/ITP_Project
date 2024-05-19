import React, { useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

export default function AddReportData() {
    const { id } = useParams();
    const [vehicleType, setVehicleType] = useState("");
    const [date, setDate] = useState("");
    const [monthlyDistance, setMonthlyDistance] = useState("");
    const [fuelCost, setFuelCost] = useState("");
    const [serviceCharge, setServiceCharge] = useState("");
    const [totalCost, setTotalCost] = useState("");
    const [error, setError] = useState("");

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

    const handleDateChange = (e) => {
        const selectedDate = new Date(e.target.value);
        const currentDate = new Date();

        if (selectedDate > currentDate) {
            // If selected date is in the future, set the input value to the current date
            alert("You cannot select a future date.");
            setDate(currentDate.toISOString().split('T')[0]);
        } else {
            // If selected date is valid, update the state with the selected date
            setDate(e.target.value);
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

        axios.post("https://hendriks-tea-management-system-backend.vercel.app/report/add", newAddReportData)
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


    const navigate = useNavigate();

    const handleAllReportDetails = () => {
        navigate(`/deliveryManager/allReportData/${id}`);
    }

    return (
        <div className="flex justify-center items-center h-screen">
            <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mt-48 mb-4 w-1/2">
                <h1 className="text-2xl font-bold mb-4">Add Report Data</h1>
                <form onSubmit={sendData} className="space-y-6">
                    <div className="mb-4">
                        <label htmlFor="vehicleType" className="block text-sm font-medium text-gray-700">Vehicle Type</label>
                        <input
                            type="text"
                            className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                            id="vehicleType"
                            placeholder="NE6565"
                            maxLength={6}
                            value={vehicleType}
                            onChange={(e) => {
                                const value = e.target.value;
                                setVehicleType(value);

                                // Validate vehicleType format
                                const vehicleTypeRegex = /^NE\d{0,4}$/;
                                if (!value.match(vehicleTypeRegex) && value !== "") {
                                    setError("Vehicle Type should be in the format NEXXXX, where X represents a digit");
                                } else {
                                    setError("");
                                }
                            }}
                        />
                        {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
                    </div>
                    <div className="mb-4">
                        <label htmlFor="date" className="block text-sm font-medium text-gray-700">Date</label>
                        <input
                            type="date"
                            className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                            id="date"
                            placeholder="Enter date"
                            value={date}
                            onChange={handleDateChange}
                            max={
                                new Date().toISOString().split('T')[0]
                            }
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="monthlyDistance" className="block text-sm font-medium text-gray-700">Monthly Distance (km)</label>
                        <input
                            type="number"
                            className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                            id="monthlyDistance"
                            placeholder="Enter monthly distance"
                            value={monthlyDistance}
                            onChange={(e) => setMonthlyDistance(e.target.value)}
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="fuelCost" className="block text-sm font-medium text-gray-700">Fuel Cost (LKR)</label>
                        <input
                            type="number"
                            className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                            id="fuelCost"
                            placeholder="Enter fuel cost"
                            value={fuelCost}
                            onChange={handleFuelCostChange}
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="serviceCharge" className="block text-sm font-medium text-gray-700">Service Charge (LKR)</label>
                        <input
                            type="number"
                            className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                            id="serviceCharge"
                            placeholder="Enter service charge"
                            value={serviceCharge}
                            onChange={handleServiceChargeChange}
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="totalCost" className="block text-sm font-medium text-gray-700">Total Cost (LKR)</label>
                        <input
                            type="number"
                            className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                            id="totalCost"
                            placeholder="Enter total cost"
                            value={totalCost}
                            onChange={handleTotalCostChange}
                        />
                    </div>
                    <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Submit</button>
                </form>
                <div className="mt-4">
                    <button onClick={handleAllReportDetails} className="text-blue-500 hover:text-blue-700 text-lg">All Report Details</button>
                </div>
            </div>
        </div>
    );
}
