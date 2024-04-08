import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import axios from 'axios';

function SalaryReport() {
    const { empId } = useParams();
    const { month } = useParams();
    const { year } = useParams();
    const [salaryDetails, setSalaryDetails] = useState([]);

    useEffect(() => {
        const fetchSalaryDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:8070/staff/salary/salaryDetails/${empId}/${month}/${year}`);
                setSalaryDetails(response.data);
                console.log(response.data);
            } catch (error) {
                console.error("Error fetching salary details:", error.message);
            }
        };

        fetchSalaryDetails();
    }, [empId, month, year]);

    return (
        <div>
            <h2>Salary Details</h2>
            <div>
                {salaryDetails.map((detail, index) => (
                    <div key={index}>
                        <p>Employee ID: {detail.empId}</p>
                        <p>Name: {detail.name}</p>
                        <p>Designation: {detail.designation}</p>
                        <p>Month: {detail.month}</p>
                        <p>Year: {detail.year}</p>
                        <p>Basic Salary: {detail.basicSalary}</p>
                        <p>ETF Bonus: {detail.ETFbonus}</p>
                        <p>EPF Bonus: {detail.EPFbonus}</p>
                        <p>Net Bonus: {detail.netBonus}</p>
                        <p>Net Salary: {detail.netSalary}</p>
                        <hr />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default SalaryReport;