import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link, useParams } from 'react-router-dom';

function EmpCategory() {

    const navigate = useNavigate();
    const {id} = useParams();

    const handleAddEmployee = () => {
        navigate(`/staff/addEmployee/${id}`);
    };

    // const handleAddSalesPerson = () => {
    //     navigate(`/staff/EmpCategory/${id}`);
    // };

    const handleAddDriver = () => {
        navigate(`/deliveryManager/addDrivers/${id}`);
    };

    return (
        <div className='absolute mt-48 left-1/3 w-1/2'>
                <div>
                    <img src="managers.jpg" alt="managers" />
                    <button>Managers</button>
                </div>

                <div>
                    <img src="salesPersons.jpg" alt="salesPersons" />
                    <button>Sales Persons</button>
                </div>

                <div>
                    <img src="drivers.jpg" alt="drivers" />
                    <button>Drivers</button>
                </div>

        </div>
    );

}

export default EmpCategory;
