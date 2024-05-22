import React, { useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";

export default function AddLocation() {
    const { id } = useParams();
    const [name, setName] = useState("");
    const [cusID, setCusID] = useState("");
    const [email, setEmail] = useState("");
    const [phone_number, setNumber] = useState("");
    const [address, setAddress] = useState("");
    const [district, setDistrict] = useState("");
    const [delivery_code, setDelivery_code] = useState("");
    const [error, setError] = useState("");

    function sendData(e) {
        e.preventDefault();

        // Check if cusID is empty
        if (!cusID) {
            setError("Customer ID is required");
            return;
        }

        // Validate cusID format
        const cusIDRegex = /^CID\d{4}$/;
        if (!cusID.match(cusIDRegex)) {
            setError("Customer ID should be in the format CIDXXXX, where X represents a digit");
            return;
        }

        // Validate delivery_code format
        const deliveryCodeRegex = /^D\d{3}$/;
        if (!delivery_code.match(deliveryCodeRegex)) {
            setError("Delivery Code should be in the format DXXX, where X represents a digit");
            return;
        }

        // Check if name contains special characters
        const specialCharsRegex = /[!@#$%^&*(),.?":{}|<>]/;
        if (specialCharsRegex.test(name)) {
            setError("Customer name cannot contain special characters");
            return;
        }

        const newCustomerLocation = {
            name,
            cusID,
            email,
            phone_number,
            address,
            district,
            delivery_code
        };

        axios.post("https://hendriks-tea-management-system-backend.vercel.app/tea/add", newCustomerLocation)
            .then(() => {
                alert("Customer location Added");

                setName("");
                setCusID("");
                setEmail("");
                setNumber("");
                setAddress("");
                setDistrict("");
                setDelivery_code("");
                setError(""); // Clear error message after successful submission
            })
            .catch((err) => {
                if (err.response && err.response.status === 400) {
                    alert('Customer ID already exists!');
                } else {
                    alert(err.message);
                }
            });
    }

    const handleNameChange = (value) => {
        const regex = /^[a-zA-Z\s]+$/;
        if (regex.test(value) || value === "") {
            setName(value);
        }
        
    };

    const navigate = useNavigate();

    const handleAllLocations = () => {
        navigate(`/deliveryManager/alllocations/${id}`);
    };

    return (
        <div className="flex justify-center items-center h-screen">
            <div className="bg-white shadow-md rounded px-8 pt-80 pb-8 mb-4 w-1/2">
                <h1 className="text-2xl font-bold mb-4">Customer Registration</h1>
                <form onSubmit={sendData} className="space-y-6">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Customer's Name</label>
                        <input type="text" className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" id="name" placeholder="Enter Customer Name" value={name} onChange={(e) => handleNameChange(e.target.value)} />
                    </div>

                    <div>
                        <label htmlFor="cusID" className="block text-sm font-medium text-gray-700">Customer's ID</label>
                        <input type="text" className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" id="cusID" placeholder="Enter Customer ID" value={cusID} onChange={(e) => setCusID(e.target.value)} />
                    </div>

                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                        <input type="text" className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" id="email" placeholder="Enter the Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>

                    <div>
                        <label htmlFor="phone_number" className="block text-sm font-medium text-gray-700">Phone Number</label>
                        <input type="text" className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" id="phone_number" maxLength="10" pattern="[0-9]{10}" placeholder="Enter the Phone Number" value={phone_number} onChange={(e) => setNumber(e.target.value)} title="Please enter exactly 10 digits" required />
                    </div>

                    <div>
                        <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address</label>
                        <input type="text" className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" id="address" placeholder="Enter the Address" value={address} onChange={(e) => setAddress(e.target.value)} />
                    </div>

                    <div>
                        <label htmlFor="district" className="block text-sm font-medium text-gray-700">District</label>
                        <input type="text" className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" id="district" placeholder="Enter District" value={district} onChange={(e) => setDistrict(e.target.value)} />
                    </div>

                    <div>
                        <label htmlFor="delivery_code" className="block text-sm font-medium text-gray-700">Delivery Code</label>
                        <input type="text" className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" id="delivery_code" placeholder="Enter Delivery Code" value={delivery_code} onChange={(e) => setDelivery_code(e.target.value)} />
                    </div>

                    <div>
                        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Submit</button>
                    </div>
                </form>
                <div className="mt-4">
                    <button onClick={handleAllLocations} className="text-blue-500 hover:text-blue-700 text-lg">All Customer Locations</button>
                </div>
                {error && <p className="text-red-500">{error}</p>}
            </div>
        </div>
    );
 }
