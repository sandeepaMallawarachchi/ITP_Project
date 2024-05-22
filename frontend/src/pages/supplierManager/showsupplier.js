import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Showsupplier() {
  const [data, setData] = useState([]);
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [name, setName] = useState('');
  const [email , setemail ] = useState('');
  const [address, setAddress] = useState('');

  useEffect(() => {
    axios.get(`https://hendriks-tea-management-system-backend.vercel.app/supplier/supplierdetails`)
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const handleDelete = async (itemId) => {
    try {
      await axios.delete(`https://hendriks-tea-management-system-backend.vercel.app/supplier/supp/${itemId}`);
      alert('Supplier deleted!');
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`https://hendriks-tea-management-system-backend.vercel.app/supplier/updating/${selectedItemId}`, { name,email  , address });
      alert('Supplier details updated!');
    } catch (error) {
      console.error('Error updating item:', error);
    }
  };

  return (
    <div className='absolute mt-40 left-1/4 w-1/2 '>
      <h1 className="text-2xl font-bold mb-4">Supplier Details</h1>
      <table className="min-w-full border border-gray-300">
        <thead>
          <tr>
            <th className="px-4 py-2 bg-gray-200">Name</th>
            <th className="px-4 py-2 bg-gray-200">Email </th>
            <th className="px-4 py-2 bg-gray-200">Address</th>
            <th className="px-4 py-2 bg-gray-200">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map(item => (
            <tr key={item._id} className="border-b border-gray-300">
              <td className="px-4 py-2">{item.name}</td>
              <td className="px-4 py-2">{item.email }</td>
              <td className="px-4 py-2">{item.address}</td>
              <td className="px-4 py-2">
                <button
                  onClick={() => handleDelete(item._id)}
                  className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded-md focus:outline-none mr-2"
                >
                  Delete
                </button>
                <button
                  onClick={() => setSelectedItemId(item._id)}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded-md focus:outline-none"
                >
                  Update
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedItemId && (
        <div className="mt-4 border border-gray-300 p-4">
          <h2 className="text-lg font-bold mb-2">Update Supplier</h2>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
            className="border border-gray-300 px-2 py-1 mb-2"
          />
          <input
            type="text"
            value={email }
            onChange={(e) => setemail (e.target.value)}
            placeholder="Email "
            className="border border-gray-300 px-2 py-1 mb-2"
          />
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Address"
            className="border border-gray-300 px-2 py-1 mb-2"
          />
          <button
            onClick={handleUpdate}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md focus:outline-none"
          >
            Save Changes
          </button>
        </div>
      )}
    </div>
  );
}
