import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

function AllVacations() {

    const [vacations, setVacations] = useState([]);
    const [vacationStatus, setVacationStatus] = useState([]);
    const { id } = useParams();

    useEffect(() => {
        axios.get("http://localhost:8070/staff/vacation/allVacations").then((res) => {
            setVacations(res.data.vacation);
            setDate(res.data.date);
            setEmpName(res.data.empName);
            setTitle(res.data.title);
            setDepartment(res.data.department);
            setDaysEarned(res.data.daysEarned);
            setReqDate(res.data.reqDate);
            setReturningDate(res.data.returningDate);
            setTotDays(res.data.totDays);
            setStatus(res.data.status);
            setStatusDate(res.data.statusDate);
            console.log(res.data);
        }).catch((error) => {
            alert(error.message);
        });
    }, [])

    const [date, setDate] = useState("");
    const [empName, setEmpName] = useState("");
    const [title, setTitle] = useState("");
    const [department, setDepartment] = useState("");
    const [daysEarned, setDaysEarned] = useState("");
    const [reqDate, setReqDate] = useState("");
    const [returningDate, setReturningDate] = useState("");
    const [totDays, setTotDays] = useState("");
    const [status, setStatus] = useState("");
    const [statusDate, setStatusDate] = useState("");

    function sendData(e) {
        e.preventDefault();

        const vacStatus = {
            date,
            empName,
            title,
            department,
            daysEarned,
            reqDate,
            returningDate,
            totDays,
            status,
            statusDate
        }

        try {
            axios.post(`http://localhost:8070/staff/vacationStatus/add`, vacStatus);
            alert("Vacation status updated! ");
        } catch (error) {
            alert("Error! Failed to update status");
            console.error("Error:", error);
        }
    }

    const navigate = useNavigate();

    const handleApprove = () => {
        navigate(`/staff/vacationReport/${id}`);
    }
    const handleReject = () => {
        navigate(`/staff/vacationReport/${id}`);
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
                            <td><button type="submit" class="btn btn-success" onClick={() => handleApprove(vacation.empId) && sendData()}>Approve</button>
                                <button type="submit" class="btn btn-danger" onClick={() => handleReject(vacation._id) && sendData()}>Reject</button>
                            </td>
                        </tr>
                    ))}

                </tbody>
            </table>

        </div>
    )
}

export default AllVacations;