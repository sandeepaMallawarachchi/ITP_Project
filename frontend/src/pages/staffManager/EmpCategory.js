import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import managersImg from '../../images/managersImg.jpg'
import salesPersonsImg from '../../images/salesPersonsImg.jpg'
import driversImg from '../../images/driversImg.jpg'

function EmpCategory() {

    const navigate = useNavigate();
    const {id} = useParams();

    const handleAddEmployee = () => {
        navigate(`/staff/addEmployee/${id}`);
    };

    const handleAddSalesPerson = () => {
        navigate(`/staff/addSalesPerson/${id}`);
    };

    const handleAddDriver = () => {
        navigate(`/staff/addDriver/${id}`);
    };

    return (
        <div className='absolute mt-48 left-72 w-3/4 flex justify-center cursor-pointer'>
                <div onClick={handleAddEmployee} className='w-1/3 mr-7 transform transition-transform hover:scale-110'>
                    <img src={managersImg} alt="managers" />
                    <p className='text-center'>Managers</p>
                </div>

                <div className='w-1/3 mr-7 transform transition-transform hover:scale-110' onClick={handleAddSalesPerson}>
                    <img src={salesPersonsImg} alt="salesPersons" />
                    <p className='text-center'>Sales Persons</p>
                </div>

                <div className='w-1/3 transform transition-transform hover:scale-110' onClick={handleAddDriver}>
                    <img src={driversImg} alt="drivers" />
                    <p className='text-center'>Drivers</p>
                </div>

        </div>
    );

}

export default EmpCategory;
