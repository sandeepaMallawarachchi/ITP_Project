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
        <div className='absolute mt-48 left-1/3 w-1/2 '>
            <form onSubmit={sendData}>
                <div className="mb-6">
                    <label htmlFor="dname" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Driver Name</label>
                    <input type="text"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        id="dname" placeholder="Enter Driver Name"
                        onChange={(e) => setName(e.target.value)} />
                </div>
                <div className="mb-4">
                    <label htmlFor="age" className="block text-gray-700 text-sm font-bold mb-2">Age</label>
                    <input type="number" className="form-input" id="age" placeholder="Enter the Age"
                        onChange={(e) => setAge(e.target.value)} />
                </div>
                <div className="mb-4">
                    <label htmlFor="address" className="block text-gray-700 text-sm font-bold mb-2">Address</label>
                    <input type="text" className="form-input" id="address" placeholder="Enter the Address"
                        onChange={(e) => setAddress(parseInt(e.target.value, 10))} /> {/* Parse string to integer */}
                </div>
                <div className="mb-4">
                    <label htmlFor="phone_number" className="block text-gray-700 text-sm font-bold mb-2">Phone Number</label>
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
                    <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">Email</label>
                    <input type="email" className="form-input" id="email" placeholder="Enter the Email"
                        onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="mb-4">
                    <label htmlFor="duration_of_job" className="block text-gray-700 text-sm font-bold mb-2">Duration of Job</label>
                    <input type="text" className="form-input" id="duration_of_job" placeholder="Enter duration of job"
                        onChange={(e) => setDuration_of_job(e.target.value)} />
                </div>
                <button type="submit" className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">Submit</button>
            </form>
            <div className="mt-4">
                <Link to="/allDrivers" className="text-blue-500 hover:text-blue-700 text-lg">All Drivers</Link>
            </div>
        </div>
    );
}
