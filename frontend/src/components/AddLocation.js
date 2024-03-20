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

        axios.post("http://localhost:5000/tea/add", newCustomerLocation)
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
        <div className="container">
            <form onSubmit={sendData}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Customer's Name</label>
                    <input type="text" className="form-control" id="name" placeholder="Enter Customer Name"
                        onChange={(e) => setName(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input type="text" className="form-control" id="email" placeholder="Enter the Email"
                        onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label htmlFor="number" className="form-label">Phone Number</label>
                    <input type="text" className="form-control" id="number" placeholder="Enter the Phone Number"
                        onChange={(e) => setNumber(parseInt(e.target.value, 10))} /> {/* Parse string to integer */}
                </div>
                <div className="mb-3">
                    <label htmlFor="address" className="form-label">Address</label>
                    <input type="text" className="form-control" id="address" placeholder="Enter the Address"
                        onChange={(e) => setAddress(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label htmlFor="district" className="form-label">District</label>
                    <input type="text" className="form-control" id="district" placeholder="Enter District"
                        onChange={(e) => setDistrict(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label htmlFor="delivery_code" className="form-label">Delivery Code</label>
                    <input type="text" className="form-control" id="delivery_code" placeholder="Enter Delivery Code"
                        onChange={(e) => setDelivery_code(e.target.value)} />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
            <li className="rty">
                <Link to="/alllocations" className="rty">All Customer Locations</Link>
            </li>
        </div>
    );
}
