import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function TopSellers() {
    const { id } = useParams();
    const [topSellers, setTopSellers] = useState([]);
    const [names, setNames] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:8070/staff/topSellerStatus/topSellers`)
            .then(response => {
                setTopSellers(response.data.topSellers);
                setNames(response.data.names); // Set names from response
            })
            .catch(error => {
                console.error('Error fetching top sellers:', error);
            });
    }, []);

    return (
        <div className='absolute mt-48 left-72 w-3/4 flex justify-center'>
            {topSellers.map((seller, index) => (
                <div key={index} className='w-1/3 mr-7'>
                    <img src={`seller${index + 1}Img.jpg`} alt={`seller${index + 1}`} />
                    <p className='text-center'>{`Top Seller ${index + 1}`}</p>
                    <p className='text-center'>{`Seller ID: ${seller._id}`}</p>
                    <p className='text-center'>{`Seller name: ${names[index]}`}</p> {/* Render seller name */}
                    <p className='text-center'>{`Total sales price: ${seller.totalSales}`}</p>
                </div>
            ))}
        </div>
    );
}

export default TopSellers;