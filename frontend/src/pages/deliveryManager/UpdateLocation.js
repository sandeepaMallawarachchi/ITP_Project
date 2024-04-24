import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function UpdateLocation() {
    const { locId,id} = useParams();
    const [locDetails, setlocDetails] = useState({
        name: "",
        cusID: "",
        email: "",
        phone_number: "",
        address: "",
        district: "",
        delivery_code: "",
       
    });

    useEffect(() => {
        const fetchlocDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:8070/tea/get/${locId}`);
                setlocDetails(response.data.tea);
            } catch (error) {
                console.error("Error fetching customer location details", error.message);
            }
        };
        fetchlocDetails();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await axios.put(`http://localhost:8070/tea/update/${locId}`, locDetails);
            alert("Details Updated!");
        } catch (error) {
            console.error("Error updating location details", error.message);
        }
    };

    return (
        <div className="container" style={{ width: "600px" }}>
            <form onSubmit={handleSubmit} style={{marginLeft:"20rem"}}>
                <div>
                    <div className="mb-3">
                        <label htmlFor="cName" className="form-label">Customer Name</label>
                        <input type="text" className="form-control" id="cName" value={locDetails.name} onChange={(e) => setlocDetails({...locDetails, name: e.target.value})} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="cusID" className="form-label">Customer's ID</label>
                        <input type="text" className="form-control" id="cusID" value={locDetails.cusID} onChange={(e) => setlocDetails({...locDetails, cusID: e.target.value})} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input type="text" className="form-control" id="email" value={locDetails.email} onChange={(e) => setlocDetails({...locDetails, email: e.target.value})} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="pNumber" className="form-label">Phone Number</label>
                        <input type="text" className="form-control" id="pNumber" value={locDetails.phone_number} onChange={(e) => setlocDetails({...locDetails, phone_number: e.target.value})} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="address" className="form-label">Address</label>
                        <input type="text" className="form-control" id="address" value={locDetails.address} onChange={(e) => setlocDetails({...locDetails, address: e.target.value})} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="district" className="form-label">District</label>
                        <input type="text" className="form-control" id="district" value={locDetails.district} onChange={(e) => setlocDetails({...locDetails, district: e.target.value})} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="dCode" className="form-label">Delivery Code</label>
                        <input type="text" className="form-control" id="dCode" value={locDetails.delivery_code} onChange={(e) => setlocDetails({...locDetails, delivery_code: e.target.value})} />
                    </div>
                </div>
                <button type="submit" className="btn btn-primary">Update</button>
            </form>
        </div>
    );
}

export default UpdateLocation;