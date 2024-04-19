import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function TotalEx() {
    const [totalExpenses, setTotalExpenses] = useState(null);

    useEffect(() => {
        getTotalExpenses();
    }, []);

    const getTotalExpenses = async () => {
        try {
            const response = await axios.get("/getMonthlyExpenses");
            setTotalExpenses(response.data.totalExpenses);
        } catch (error) {
            console.error("Error fetching total expenses:", error);
        }
    };

    const yesBtn = () => {
        // Handle deletion logic here
    };

    return (
        <div>
            <p>Total Expenses: {totalExpenses}</p>

            <p>Are you sure you want to delete this employee?</p>

            <button style={{ margin: "0 30px 0 0" }} className='btn btn-danger' onClick={yesBtn}>Yes</button>
            <Link to="/HomeExpenses"><button className='btn btn-primary'>No</button></Link>
        </div>
    );
}
