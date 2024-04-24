import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import axios from 'axios';

function VacationReport() {
    const { empId } = useParams();
    const { month } = useParams();
    const { year } = useParams();
    const [vacationDetails, setVacationDetails] = useState([]);

    useEffect(() => {
        const fetchVacationDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:8070/staff/vacation/vacationDetails/${empId}/${month}/${year}`);
                setVacationDetails(response.data);
                console.log(response.data);
            } catch (error) {
                console.error("Error fetching vacation details:", error.message);
            }
        };

        fetchVacationDetails();
    }, [empId, month, year]);

    return (
        <div className='absolute mt-48 left-1/3 w-1/2 '>
            <h2>Vacation Details</h2>
            <div>
                {vacationDetails.map((detail, index) => (
                    <div key={index}>
                        <p>Date: {detail.empId}</p>
                        <p>Employee Name: {detail.name}</p>
                        <p>Title: {detail.designation}</p>
                        <p>Department: {detail.month}</p>
                        <p>Vacation Days Earned: {detail.year}</p>
                        <p>Requested Date: {detail.basicSalary}</p>
                        <p>Returning Date: {detail.ETFbonus}</p>
                        <p>Total Number of Days Requested: {detail.EPFbonus}</p>
                        <p>Employer's Descision: {detail.netBonus}</p>
                        <p>Approval/Rejected Date: {detail.netSalary}</p>
                        <hr />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default VacationReport;