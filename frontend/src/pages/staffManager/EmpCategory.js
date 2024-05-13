import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

function EmpCategory() {

    const navigate = useNavigate();

    const handleAddEmployee = () => {
        navigate(`/staff/EmpCategory/${id}`);
    };

    const handleAddSalesPerson = () => {
        navigate(`/staff/EmpCategory/${id}`);
    };

    const handleAddDriver = () => {
        navigate(`/staff/EmpCategory/${id}`);
    };

    return (
        <div className='absolute mt-48 left-1/3 w-1/2'>
            <Link to="/http://localhost:8070/staff/add/${id}">
                <div>
                    <img src="managers.jpg" alt="managers" />
                    <p>Managers</p>
                </div>
            </Link>

            <Link to="/http://localhost:8070/salesmen/addSalesmen/${id}">
                <div>
                    <img src="salesPersons.jpg" alt="salesPersons" />
                    <p>Sales Persons</p>
                </div>
            </Link>

            <Link to="/http://localhost:8070/driver/add/${id}">
                <div>
                    <img src="drivers.jpg" alt="drivers" />
                    <p>Drivers</p>
                </div>
            </Link>

        </div>
    );

}

export default EmpCategory;
