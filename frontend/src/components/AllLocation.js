import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axois from "axios";

export default function AllLocation() {

    const [tea, setTea] = useState([]);

    useEffect(() => {
        function getTea() {
            axois.get("http://localhost:5000/tea/").then((res) => {
                setTea(res.data);
            }).catch((err) => {
                alert(err.message);
            })
        }
        getTea();
    }, [])

    const navigate = useNavigate();
    const handleUpdate = (id) => {
        navigate(`/updatelocations/${id}`);
    }

    return (

        <div>
            <h1>All Customer Locations</h1>
            <table className="table">

                <thead>
                    <tr>
                        <th scope="col">Customer Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Phone Number</th>
                        <th scope="col">Address</th>
                        <th scope="col">District</th>
                        <th scope="col">Delivery_code</th>
                        <th scope="col">Action</th>

                    </tr>
                </thead>
                <tbody>
                    {tea.map((tea1) => (
                        <tr key={(tea1._id)}>
                            <td>{tea1.name}</td>
                            <td>{tea1.email}</td>
                            <td>{tea1.phone_number}</td>
                            <td>{tea1.address}</td>
                            <td>{tea1.district}</td>
                            <td>{tea1.delivery_code}</td>
                            <td>
                                <button type="update" className="btn btn-primary" onClick={() => handleUpdate(tea1._id)}>Update</button>

                            </td>
                            

                        </tr>
                    ))}

                </tbody>
            </table>
        </div>

    );

}
