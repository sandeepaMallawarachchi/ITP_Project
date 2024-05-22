import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Home() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get(`https://hendriks-tea-management-system-backend.vercel.app/supplier/get`)
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <div className='absolute mt-40    left-1/4  w-1/2 '>
      <h1 className="text-2xl font-bold mb-10">Purchasing details</h1>  
      <div className="overflow-x-auto">
        <table className="table-auto w-full">
          <thead>
            <tr>
              <th className="px-4 py-2">Date Of payment</th>
              <th className="px-4 py-2">Payment method</th>
              <th className="px-4 py-2">Quantity</th>
              <th className="px-4 py-2"> Amount  </th>
              <th className="px-4 py-2">Tea Type </th>
              <th className="px-4 py-2"> Supplier </th>
               
              {/* Add more table headers if needed */}
            </tr>
          </thead>
          <tbody>
            {data.map(item => (
              <tr key={item.id}>
                <td className="border px-4 py-2">{item.date}</td>
                <td className="border px-4 py-2">{item.paymentmethod}</td>
                <td className="border px-4 py-2">{item.quantity}</td>
                <td className="border px-4 py-2">{item.amount }</td>
                <td className="border px-4 py-2">{item.teatype}</td>
                <td className="border px-4 py-2">{item.sid }</td>

                {/* Render additional columns if needed */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
