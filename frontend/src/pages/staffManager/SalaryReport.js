import React, { useState, useEffect, useRef } from 'react';
import { useParams } from "react-router-dom";
import axios from 'axios';
import { useReactToPrint } from 'react-to-print';
import { Button } from "flowbite-react";

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

    const componentRef = useRef();

    const handlePrint = useReactToPrint({
        content: () => componentRef.current,//specifies the content to be print
        documentTitle: "Salary Report",
        pageStyle: `
        @page {
            size: A4;
            margin: 1cm;
        }
        body {
            font-family: Arial, sans-serif;
            font-size: 12px;
        }
        table {
            width: 100%;
            border-collapse: collapse;
        }
        th, td {
            border: 1px solid #dddddd;
            text-align: left;
            padding: 8px;
        }
        th {
            background-color: #f2f2f2;
        }
        tr:nth-child(even) {
            background-color: #f2f2f2;
        }
        .document-title {
            text-align: center;
            margin-bottom: 20px;
            font-size: 18px;
            font-weight: bold;
        }
    `
    })

    return (
        <div>
            <h2>Salary Details</h2>
            <div style={{ marginTop: "10rem", marginLeft: "23rem" }} >
                <Button onClick={handlePrint} color="blue" className="my-10 " style={{ marginLeft: "2rem" }}> Download Report</Button>
                <div ref={componentRef} >
                    <div className="document-title" style={{ marginLeft: "23rem", marginTop: "-5rem", fontWeight: "bold", fontSize: "1.5rem" }}>Salary Report</div>
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
        </div>
    );
}

export default SalaryReport;