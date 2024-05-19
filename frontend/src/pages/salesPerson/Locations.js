import React, { useState, useEffect } from "react";
import axios from "axios";

function Locations() {

    const [locations, setLocations] = useState([])

    useEffect(() => {
        const fetchSaleDetails = async () => {
            try {

                const res = await axios.get(`https://hendriks-tea-management-system-backend.vercel.app/tea/`);
                console.log(res.data);

                setLocations(res.data);
            } catch (error) {
                console.log("Error fetching locations", error.message);
            }
        };
        fetchSaleDetails();
    }, []);

    return (
        <div className='absolute mt-40 left-80 w-3/4 '>

            <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-14">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Customer name
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Customer ID
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Phone
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Address
                            </th>
                            <th scope="col" className="px-6 py-3">
                                District
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {locations.map((detail, index) => (
                            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 text-black" key={index}>
                                <td className="px-6 py-4">{detail.name}</td>
                                <td className="px-6 py-4">{detail.cusID}</td>
                                <td className="px-6 py-4">{detail.phone_number}</td>
                                <td className="px-6 py-4">{detail.address}</td>
                                <td className="px-6 py-4">{detail.district}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
};

export default Locations;