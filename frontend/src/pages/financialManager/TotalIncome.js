import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function TotalIncome() {
    const [totalIncome, setTotalIncome] = useState(null);

    useEffect(() => {
        getTotalIncome();
    }, []);

    const getTotalIncome = async () => {
        try {
            const response = await axios.get(`http://localhost:3013/totalIncome/getMonthlyIncome`);
            setTotalIncome(response.data.totalIncome); // Use totalIncome instead of totalExpenses
        } catch (error) {
            console.error("Error fetching total income:", error);
        }
    };
   

    return (
        <div>
            <p>Total income:{totalIncome}</p>

            
            <Link to="/HomeIncome"><button className='btn btn-primary'>No</button></Link>
        </div>
    );
}
