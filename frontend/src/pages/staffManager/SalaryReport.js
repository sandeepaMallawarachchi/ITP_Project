import React, { useState, useEffect, useRef } from 'react';
import { useParams } from "react-router-dom";
import axios from 'axios';
import { useReactToPrint } from 'react-to-print';
import { Button } from "flowbite-react";
import logo from '../../images/logo.png';

function SalaryReport() {
    const { empId } = useParams();
    const { month } = useParams();
    const { year } = useParams();
    const [salaryDetails, setSalaryDetails] = useState([]);
    const [showLogoAndTitle, setShowLogoAndTitle] = useState(false);

    useEffect(() => {
        const fetchSalaryDetails = async () => {
            try {
                const response = await axios.get(`https://hendriks-tea-management-system-backend.vercel.app/staff/salary/salaryDetails/${empId}/${month}/${year}`);
                setSalaryDetails(response.data);
                console.log(response.data);
                setShowLogoAndTitle(true)
            } catch (error) {
                console.error("Error fetching salary details:", error.message);
            }
        };

        fetchSalaryDetails();
    }, [empId, month, year]);

    const componentRef = useRef();

    const handlePrint = useReactToPrint({
        content: () => componentRef.current,//specifies the content to be print
        onBeforeGetContent: () => setShowLogoAndTitle(true),
        onAfterPrint: () => setShowLogoAndTitle(false),
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
        .logo {
            position: absolute;
            top: 0;
            left: 0;
            z-index: 9999;
            margin: 10px;
            content: url(${logo});
        }
        .title {
            text-align: center;
            font-size: 2rem;
            font-weight: bold;
            color: green;
            margin-top: 170px
        }
    `
    })

    return (
        <div>
            <div style={{ position:"absolute", marginTop: "10rem", marginLeft: "23rem" }} >
                <Button onClick={handlePrint} color="blue" className="my-10 " style={{ marginLeft: "2rem" }}> Download Report</Button>
                <div ref={componentRef} >

                    <img className='ml-56 logo' />
                    <h1 className='text-center text-2xl font-bold text-green-500 title'>Salary Details</h1>
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