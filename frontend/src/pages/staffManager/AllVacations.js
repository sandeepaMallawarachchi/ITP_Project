import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function AllVacations() {

    const [vacations, setVacations] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:8070/staff/vacation/allVacations").then((res) => {
            setVacations(res.data.vacation);
            console.log(res.data);
        }).catch((error) => {
            alert(error.message);
        });
    }, [])

    const navigate = useNavigate();

    const handleApprove = () => {
        navigate(`/vacationReport`);
    }
    const handleReject = (id) => {
        navigate(`/vacationReport/${id}`);
    }

    return (
        <div className='absolute mt-48 left-1/3 w-1/2 '>
            <table class="table">
                <thead>
                    <tr>
                        <th scope="col">Date</th>
                        <th scope="col">Employee Name</th>
                        <th scope="col">Title</th>
                        <th scope="col">Department</th>
                        <th scope="col">Vacation Days Earned</th>
                        <th scope="col">Requesting Date</th>
                        <th scope="col">Returning Date</th>
                        <th scope="col">Total Days</th>
                    </tr>
                </thead>
                <tbody>
                    {vacations.map((vacation) => (
                        <tr key={(vacation._id)}>
                            <td>{vacation.date}</td>
                            <td>{vacation.empName}</td>
                            <td>{vacation.title}</td>
                            <td>{vacation.department}</td>
                            <td>{vacation.daysEarned}</td>
                            <td>{vacation.reqDate}</td>
                            <td>{vacation.returningDate}</td>
                            <td>{vacation.totDays}</td>
                            <td><button type="submit" class="btn btn-success" onClick={() => handleApprove(vacation.empId)}>Approve</button>
                                <button type="submit" class="btn btn-danger" onClick={() => handleReject(vacation._id)}>Reject</button>
                            </td>
                        </tr>
                    ))}

                </tbody>
            </table>

        </div>
    )
}

export default AllVacations;