import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import axios from 'axios';

function VacationReport() {
    const { vacID } = useParams();
    const [vacationDetails, setVacationDetails] = useState(null);
    const [error, setError] = useState('');
    const [approved, setApproved] = useState(false);
    const [rejected, setRejected] = useState(false);

    useEffect(() => {
        const fetchVacationDetails = async () => {
            try {
                const response = await axios.get(`https://hendriks-tea-management-system-backend.vercel.app/staff/vacation/vacationDetails/${vacID}`);
                setVacationDetails(response.data.vacation);
            } catch (error) {
                console.error("Error fetching vacation details:", error.message);
                setError('Failed to fetch vacation details.');
            }
        };

        fetchVacationDetails();
    }, [vacID]);

    const handleApprove = () => {
        setApproved(true);
        setRejected(false); // Ensure we clear the rejected status if previously set
    };

    const handleReject = () => {
        setRejected(true);
        setApproved(false); // Ensure we clear the approved status if previously set
    };

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className='absolute mt-48 left-1/3 w-1/2'>
            <h2>Vacation Details</h2>
            {vacationDetails ? (
                <div>
                    <p>Date: {vacationDetails.date}</p>
                    <p>Employee Name: {vacationDetails.empName}</p>
                    <p>Title: {vacationDetails.title}</p>
                    <p>Department: {vacationDetails.department}</p>
                    <p>Vacation Days Earned: {vacationDetails.daysEarned}</p>
                    <p>Requested Date: {vacationDetails.reqDate}</p>
                    <p>Returning Date: {vacationDetails.returningDate}</p>
                    <p>Total Number of Days Requested: {vacationDetails.totDays}</p>
                    <hr />
                    {approved &&
                        <h1 className='text-2xl text-green-600 font-bold'>Approved</h1>
                    }
                    {rejected &&
                        <h1 className='text-2xl text-red-600 font-bold'>Rejected</h1>
                    }
                </div>
            ) : (
                <div>Loading vacation details...</div>
            )}

            <div className='mt-20'>
                <button type='button' className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800" onClick={handleApprove}>Approve</button>
                <button type='button' className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800" onClick={handleReject}>Reject</button>
            </div>
        </div>
    );
}

export default VacationReport;