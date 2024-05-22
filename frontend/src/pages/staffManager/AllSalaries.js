import React, { useState, useEffect } from 'react';
import axios from 'axios';
// import { useParams, useNavigate } from 'react-router-dom';

function AllSalaries() {

    const [salaries, setSalaries] = useState([]);

    useEffect(() => {
        axios.get(`https://hendriks-tea-management-system-backend.vercel.app/staff/salary/allSalaries`).then((res) => {
            setSalaries(res.data);
        }).catch((error) => {
            alert(error.message);
        });
    }, [])

    return (
        <div className='absolute mt-36 left-80 w-3/4 '>

            <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-14">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">Employee ID</th>
                            <th scope="col" className="px-6 py-3">Employee Name</th>
                            <th scope="col" className="px-6 py-3">Designation</th>
                            <th scope="col" className="px-6 py-3">Month</th>
                            <th scope="col" className="px-6 py-3">Year</th>
                            <th scope="col" className="px-6 py-3">Basic Salary</th>
                            <th scope="col" className="px-6 py-3">ETF Bonus Amount</th>
                            <th scope="col" className="px-6 py-3">EPF Bonus Amount</th>
                            <th scope="col" className="px-6 py-3">Net Bonus</th>
                            <th scope="col" className="px-6 py-3">Net Salary</th>
                        </tr>
                    </thead>
                    <tbody>
                        {salaries.map((salaries) => (
                            <tr key={(salaries._id)} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 text-black">
                                <td className="px-6 py-4">{salaries.empId}</td>
                                <td className="px-6 py-4">{salaries.name}</td>
                                <td className="px-6 py-4">{salaries.designation}</td>
                                <td className="px-6 py-4">{salaries.month}</td>
                                <td className="px-6 py-4">{salaries.year}</td>
                                <td className="px-6 py-4">{salaries.basicSalary}</td>
                                <td className="px-6 py-4">{salaries.ETFbonus}</td>
                                <td className="px-6 py-4">{salaries.EPFbonus}</td>
                                <td className="px-6 py-4">{salaries.netBonus}</td>
                                <td className="px-6 py-4">{salaries.netSalary}</td>
                            </tr>
                        ))}

                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default AllSalaries;