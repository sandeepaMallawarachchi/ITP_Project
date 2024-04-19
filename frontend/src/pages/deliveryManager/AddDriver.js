import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function AddDriver() {
    const [dname, setName] = useState("");
    const [age, setAge] = useState("");
    const [address, setAddress] = useState("");
    const [phone_number, setNumber] = useState("");
    const [email, setEmail] = useState("");
    const [duration_of_job, setDuration_of_job] = useState("");

    function sendData(e) {
        e.preventDefault();

        const newAddDriver = {
            dname,
            age,
            address,
            phone_number,
            email,
            duration_of_job
        }

        axios.post("http://localhost:8070/driver/add", newAddDriver)
            .then(() => {
                alert("Driver Added")

                setName("");
                setAge("");
                setAddress("");
                setNumber("");
                setEmail("");
                setDuration_of_job("");
            })
            .catch((err) => {
                alert(err)
            });
    }

    return (
        <div className="container">
            <form onSubmit={sendData}>
                <div className="mb-3">
                    <label htmlFor="dname" className="form-label">Driver Name</label>
                    <input type="text" className="form-control" id="dname" placeholder="Enter Driver Name"
                        onChange={(e) => setName(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label htmlFor="age" className="form-label">Age</label>
                    <input type="number" className="form-control" id="age" placeholder="Enter the Age"
                        onChange={(e) => setAge(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label htmlFor="address" className="form-label">Address</label>
                    <input type="text" className="form-control" id="address" placeholder="Enter the Address"
                        onChange={(e) => setAddress(parseInt(e.target.value, 10))} /> {/* Parse string to integer */}
                </div>
                <div className="mb-3">
                    <label htmlFor="phone_number" className="form-label">Phone Number</label>
                    <input
                        type="text"
                        className="form-control"
                        id="phone_number"
                        maxLength="10"
                        pattern="[0-9]{10}"
                        placeholder="Enter the Phone Number"
                        onChange={(e) => setNumber(e.target.value)}
                        title="Please enter exactly 10 digits"
                        required  // Add required attribute if the field is mandatory
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input type="email" className="form-control" id="email" placeholder="Enter the Email"
                        onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label htmlFor="duration_of_job" className="form-label">Duration of Job</label>
                    <input type="text" className="form-control" id="duration_of_job" placeholder="Enter duration of job"
                        onChange={(e) => setDuration_of_job(e.target.value)} />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
            <li className="rty">
                <Link to="/allDrivers" className="rty">All Drivers</Link>
            </li>

        </div>
    );
}
