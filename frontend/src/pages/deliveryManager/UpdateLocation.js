import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

function UpdateLocation() {
    const { locId, id } = useParams();
    const [locDetails, setLocDetails] = useState({
        name: "",
        cusID: "",
        email: "",
        phone_number: "",
        address: "",
        district: "",
        delivery_code: "",
    });

    useEffect(() => {
        const fetchLocDetails = async () => {
            try {
                const response = await axios.get(`https://hendriks-tea-management-system-backend.vercel.app/tea/get/${locId}`);
                setLocDetails(response.data.tea);
            } catch (error) {
                console.error("Error fetching customer location details", error.message);
            }
        };
        fetchLocDetails();
    }, [id, locId]);

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await axios.put(`https://hendriks-tea-management-system-backend.vercel.app/tea/update/${locId}`, locDetails);
            alert("Details Updated!");
            navigate(`/deliverymanager/alllocations/${id}`);
        } catch (error) {
            console.error("Error updating location details", error.message);
        }
    };

    return (
        <div className="flex justify-center items-center h-screen">
            <div className="bg-white shadow-md rounded px-8 pt-8 pb-8 mt-48 mb-4 w-1/2">
                <h1 className="text-2xl font-bold mb-4">Update Location Details</h1>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="cName" className="block text-sm font-medium text-gray-700">Customer Name</label>
                        <input type="text" className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" id="cName" value={locDetails.name} onChange={(e) => setLocDetails({...locDetails, name: e.target.value})} />
                    </div>
                    <div>
                        <label htmlFor="cusID" className="block text-sm font-medium text-gray-700">Customer's ID</label>
                        <input type="text" className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" id="cusID" value={locDetails.cusID} onChange={(e) => setLocDetails({...locDetails, cusID: e.target.value})} />
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                        <input type="text" className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" id="email" value={locDetails.email} onChange={(e) => setLocDetails({...locDetails, email: e.target.value})} />
                    </div>
                    <div>
                        <label htmlFor="pNumber" className="block text-sm font-medium text-gray-700">Phone Number</label>
                        <input type="text" className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" id="pNumber" value={locDetails.phone_number} onChange={(e) => setLocDetails({...locDetails, phone_number: e.target.value})} />
                    </div>
                    <div>
                        <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address</label>
                        <input type="text" className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" id="address" value={locDetails.address} onChange={(e) => setLocDetails({...locDetails, address: e.target.value})} />
                    </div>
                    <div>
                        <label htmlFor="district" className="block text-sm font-medium text-gray-700">District</label>
                        <input type="text" className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" id="district" value={locDetails.district} onChange={(e) => setLocDetails({...locDetails, district: e.target.value})} />
                    </div>
                    <div>
                        <label htmlFor="dCode" className="block text-sm font-medium text-gray-700">Delivery Code</label>
                        <input type="text" className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" id="dCode" value={locDetails.delivery_code} onChange={(e) => setLocDetails({...locDetails, delivery_code: e.target.value})} />
                    </div>
                    <div>
                        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Update</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default UpdateLocation;
