import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function TopSellers() {
    const { id } = useParams();
    const [topSellers, setTopSellers] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:8070/staff/topSellerStatus/topSellers`)
            .then(response => {
                setTopSellers(response.data.topSellers);
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
                    <p className='text-center'>{`ID: ${seller._id}`}</p>
                </div>
            ))}
        </div>
    );
}

export default TopSellers;