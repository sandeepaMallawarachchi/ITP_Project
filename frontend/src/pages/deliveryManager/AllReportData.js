import React, { useState, useEffect } from 'react';
import axios from "axios";
import { useNavigate, useParams } from 'react-router-dom';

export default function AllReportData() {
    const [report, setReport] = useState([]);
    const [totalCostSum, setTotalCostSum] = useState(0);

    useEffect(() => {
        fetchReport();
    }, []);

    const fetchReport = () => {
        axios.get("http://localhost:8070/report/")
            .then(response => {
                const { reports, totalCostSum } = response.data;
                setReport(reports);
                setTotalCostSum(totalCostSum);
            })
            .catch((err) => {
                console.log(err);
            });
    }    

    const calculateTotalCostSum = (reports) => {
        const sum = reports.reduce((total, report) => total + report.totalCost, 0);
        setTotalCostSum(sum);
    }

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
            <div>Total Cost of All Reports: {totalCostSum} LKR</div>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">Vehicle Type</th>
                        <th scope="col">Monthly Distance (km)</th>
                        <th scope="col">Fuel Cost (LKR)</th>
                        <th scope="col">Service Charge (LKR)</th>
                        <th scope="col">Total Cost (LKR)</th>
                        <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {report.map((report1) => (
                        <tr key={report1._id}>
                            <td>{report1.vehicleType}</td>
                            <td>{report1.monthlyDistance}</td>
                            <td>{report1.fuelCost}</td>
                            <td>{report1.serviceCharge}</td>
                            <td>{report1.totalCost}</td>
                            <td>
                                <button type="button" className="btn btn-primary" onClick={() => handleUpdate(report1._id)}>Update</button>
                                <button type="button" className="btn btn-danger" onClick={() => handleDelete(report1._id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
