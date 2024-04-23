import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function CustomerLocations() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone_number, setNumber] = useState(""); 
    const [address, setAddress] = useState("");
    const [district, setDistrict] = useState("");
    const [delivery_code, setDelivery_code] = useState("");

    function sendData(e) {
        e.preventDefault();

        const newCustomerLocation = {
            name,
            email,
            phone_number,
            address,
            district,
            delivery_code
        }

        axios.post("http://localhost:8070/tea/add", newCustomerLocation)
            .then(() => {
                alert("customer location Added")

                setName("");
                setEmail("");
                setNumber("");
                setAddress("");
                setDistrict("");
                setDelivery_code("");
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
                        <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">Customer's Name</label>
                        <input type="text" className="form-input" id="name" placeholder="Enter Customer Name"
                            onChange={(e) => setName(e.target.value)} />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">Email</label>
                        <input type="text" className="form-input" id="email" placeholder="Enter the Email"
                            onChange={(e) => setEmail(e.target.value)} />
                    </div>
                   
                    <div className="mb-4">
                        <label htmlFor="number" className="block text-gray-700 text-sm font-bold mb-2">Phone Number</label>
                        <input
                            type="text"
                            className="form-input"
                            id="phone_number"
                            maxLength="10"
                            pattern="[0-9]{10}"
                            placeholder="Enter the Phone Number"
                            onChange={(e) => setNumber(e.target.value)}
                            title="Please enter exactly 10 digits"
                            required  // Add required attribute if the field is mandatory
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="address" className="block text-gray-700 text-sm font-bold mb-2">Address</label>
                        <input type="text" className="form-input" id="address" placeholder="Enter the Address"
                            onChange={(e) => setAddress(e.target.value)} />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="district" className="block text-gray-700 text-sm font-bold mb-2">District</label>
                        <input type="text" className="form-input" id="district" placeholder="Enter District"
                            onChange={(e) => setDistrict(e.target.value)} />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="delivery_code" className="block text-gray-700 text-sm font-bold mb-2">Delivery Code</label>
                        <input type="text" className="form-input" id="delivery_code" placeholder="Enter Delivery Code"
                            onChange={(e) => setDelivery_code(e.target.value)} />
                    </div>
                    <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Submit</button>
                </form>
                <div className="mt-4">
                    <Link to="/alllocations" className="text-blue-500 hover:text-blue-700 text-lg">All Customer Locations</Link>
                </div>
            </div>
        </div>
    );
}
