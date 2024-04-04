import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axois from "axios";

export default function AllDriver() {

    const [driver, setDriver] = useState([]);

    useEffect(() => {
        function getDriver() {
            axois.get("http://localhost:5000/driver/").then((res) => {
                setDriver(res.data);
            }).catch((err) => {
                alert(err.message);
            })
        }
        getDriver();
    }, [])

       const navigate = useNavigate();
       const handleUpdate = (id) => {
       navigate(`/updateDrivers/${id}`);
    }

    
    
       const handleDelete = (id) => {
       navigate(`/deleteDrivers/${id}`);
    }

    return (

        <div>
            <h1>All Drivers</h1>
            <table className="table">

                <thead>
                    <tr>
                        <th scope="col">Driver Name</th>
                        <th scope="col">Age</th>
                        <th scope="col">Address</th>
                        <th scope="col">Phone Number</th>
                        <th scope="col">Email</th>
                        <th scope="col">Duration of Job</th>
                        

                    </tr>
                </thead>
                <tbody>
                    {driver.map((driver1) => (
                        <tr key={(driver1._id)}>
                            <td>{driver1.dname}</td>
                            <td>{driver1.age}</td>
                            <td>{driver1.address}</td>
                            <td>{driver1.phone_number}</td>
                            <td>{driver1.email}</td>
                            <td>{driver1.duration_of_job}</td>
                            <td>
                                <button type="update" className="btn btn-primary" onClick={() => handleUpdate(driver1._id)}>Update</button>

                            </td>
                            <td>
                                <button type="delete" className="btn btn-primary" onClick={() => handleDelete(driver1._id)}>Delete</button>

                            </td>


                        </tr>
                    ))}

                </tbody>
            </table>
        </div>

    );

}
