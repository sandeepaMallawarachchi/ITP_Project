import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axois from "axios";

export default function AllReportData() {

    const [report, setReport] = useState([]);

    useEffect(() => {
        function getReport() {
            axois.get("http://localhost:5000/report/").then((res) => {
                setReport(res.data);
            }).catch((err) => {
                alert(err.message);
            })
        }
        getReport();
    }, [])

       const navigate = useNavigate();
       const handleUpdate = (id) => {
       navigate(`/updateReportData/${id}`);
    }

    
    
       const handleDelete = (id) => {
       navigate(`/deleteReportData/${id}`);
    }

    return (

        <div>
            <h1>All Report Details</h1>
            <table className="table">

                <thead>
                    <tr>
                        <th scope="col">Vehicle Type</th>
                        <th scope="col">Monthly Distance (km)</th>
                        <th scope="col">Fuel Cost (LKR)</th>
                        <th scope="col">Service Charge (LKR)</th>
                        <th scope="col">Total Cost (LKR)</th>
                      
                        

                    </tr>
                </thead>
                <tbody>
                    {report.map((report1) => (
                        <tr key={(report1._id)}>
                            <td>{report1.vehicleType}</td>
                            <td>{report1.monthlyDistance}</td>
                            <td>{report1.fuelCost}</td>
                            <td>{report1.serviceCharge}</td>
                            <td>{report1.totalCost}</td>
                           
                            <td>
                                <button type="update" className="btn btn-primary" onClick={() => handleUpdate(report1._id)}>Update</button>

                            </td>
                            <td>
                                <button type="delete" className="btn btn-primary" onClick={() => handleDelete(report1._id)}>Delete</button>

                            </td>


                        </tr>
                    ))}

                </tbody>
            </table>
        </div>

    );

}
