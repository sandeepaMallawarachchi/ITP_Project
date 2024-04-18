import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function UpdateDriver() {
    const { id } = useParams();
    const [driverDetails, setdriverDetails] = useState({
        dname: "",
        age: "",
        address: "",
        phone_number: "",
        email: "",
        duration_of_job: "",
       
    });

    useEffect(() => {
        const fetchdriverDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:8070/driver/get/${id}`);
                setdriverDetails(response.data.driver);
            } catch (error) {
                console.error("Error fetching driver details", error.message);
            }
        };
        fetchdriverDetails();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await axios.put(`http://localhost:8070/driver/update/${id}`, driverDetails);
            alert("Details Updated!");
        } catch (error) {
            console.error("Error updating driver details", error.message);
        }
    };

    return (
        <div className="container" style={{ width: "600px" }}>
            <form onSubmit={handleSubmit}>
                <div>
                    <div className="mb-3">
                        <label htmlFor="dname" className="form-label">Driver Name</label>
                        <input type="text" className="form-control" id="dname" value={driverDetails.dname} onChange={(e) => setdriverDetails({...driverDetails, dname: e.target.value})} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="age" className="form-label">Age</label>
                        <input type="number" className="form-control" id="age" value={driverDetails.age} onChange={(e) => setdriverDetails({...driverDetails, age: e.target.value})} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="address" className="form-label">Address</label>
                        <input type="text" className="form-control" id="address" value={driverDetails.address} onChange={(e) => setdriverDetails({...driverDetails, address: e.target.value})} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="phone_number" className="form-label">Phone Number</label>
                        <input type="number" className="form-control" id="phone_number" value={driverDetails.phone_number} onChange={(e) => setdriverDetails({...driverDetails, phone_number: e.target.value})} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input type="email" className="form-control" id="email" value={driverDetails.email} onChange={(e) => setdriverDetails({...driverDetails, email: e.target.value})} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="duration_of_job" className="form-label">Duration of Job</label>
                        <input type="text" className="form-control" id="duration_of_job" value={driverDetails.duration_of_job} onChange={(e) => setdriverDetails({...driverDetails, duration_of_job: e.target.value})} />
                    </div>
                </div>
                <button type="submit" className="btn btn-primary">Update</button>
            </form>
        </div>
    );
}

export default UpdateDriver;
