import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

function AllVacations() {

    const [vacations, setVacations] = useState([]);
    const { id } = useParams();

    useEffect(() => {
        axios.get("https://hendriks-tea-management-system-backend.vercel.app/staff/vacation/allVacations").then((res) => {
            setVacations(res.data.vacation);
            console.log(res.data);
        }).catch((error) => {
            alert(error.message);
        });
    }, [])

    const navigate = useNavigate();

    const handleApprOrRej = (vacID) => {
        navigate(`/staff/vacationReport/${vacID}/${id}`);
    }

    return (
        <div className='absolute mt-36 left-80 w-3/4 '>
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3">Date</th>
                        <th scope="col" className="px-6 py-3">Employee Name</th>
                        <th scope="col" className="px-6 py-3">Title</th>
                        <th scope="col" className="px-6 py-3">Department</th>
                        <th scope="col" className="px-6 py-3">Vacation Days Earned</th>
                        <th scope="col" className="px-6 py-3">Requesting Date</th>
                        <th scope="col" className="px-6 py-3">Returning Date</th>
                        <th scope="col" className="px-6 py-3">Total Days</th>
                    </tr>
                </thead>
                <tbody>
                    {vacations.map((vacation) => (
                        <tr key={(vacation._id)} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 text-black">
                            <td className="px-6 py-4">{vacation.date}</td>
                            <td className="px-6 py-4">{vacation.empName}</td>
                            <td className="px-6 py-4">{vacation.title}</td>
                            <td className="px-6 py-4">{vacation.department}</td>
                            <td className="px-6 py-4">{vacation.daysEarned}</td>
                            <td className="px-6 py-4">{vacation.reqDate}</td>
                            <td className="px-6 py-4">{vacation.returningDate}</td>
                            <td className="px-6 py-4">{vacation.totDays}</td>
                            <td><button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={() => handleApprOrRej(vacation._id, id)}>Approve or Reject</button>
                            </td>
                        </tr>
                    ))}

                </tbody>
            </table>

        </div>
    )
}

export default AllVacations;