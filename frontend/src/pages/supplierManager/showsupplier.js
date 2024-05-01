import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Showsupplier() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:8070/supplier/supplierdetails`)
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const handleDelete = async (itemId) => {
    try {
      await axios.delete(`http://localhost:8070/supplier/supp/${itemId}`);
      alert('Supplier deleted!');
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  return (
    <div className='absolute mt-40    left-1/4  w-1/2 '>
      <h1 className="text-2xl font-bold mb-4">Supplier Details</h1>
      <table className="min-w-full border border-gray-300">
        <thead>
          <tr>
            <th className="px-4 py-2 bg-gray-200">Name</th>
            <th className="px-4 py-2 bg-gray-200">Age</th>
            <th className="px-4 py-2 bg-gray-200">Address</th>
            <th className="px-4 py-2 bg-gray-200">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map(item => (
            <tr key={item._id} className="border-b border-gray-300">
              <td className="px-4 py-2">{item.name}</td>
              <td className="px-4 py-2">{item.age}</td>
              <td className="px-4 py-2">{item.address}</td>
              <td className="px-4 py-2">
                <button
                  onClick={() => handleDelete(item._id)}
                  className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded-md focus:outline-none"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
