import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Home() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get( `http://localhost:8087/supplier/get`  )   
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);


  
    return (
        <div>
          <h1> Purchasing details </h1>
          <table>
            <thead>
              <tr>
                <th>Date Of payment </th>
                <th>Payment method </th>
                <th>Quantity</th>
                {/* Add more table headers if needed */}
              </tr>
            </thead>
            <tbody>
              {data.map(item => (
                <tr key={item.id }>
                  <td>{item.date }</td>
                  <td>{item.paymentmethod }</td>      
                  <td>{item.quantity}</td>
                  {/* Render additional columns if needed */}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ); 
              }