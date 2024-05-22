import React, { useState } from 'react';
import axios from 'axios';

const Teadetails = () => {
  const [teadetails, setteadetails] = useState({
    name: '',
    type: '',
    price: '',
    quantity: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setteadetails({ ...teadetails, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`https://hendriks-tea-management-system-backend.vercel.app/supplier/addteadetails`,teadetails);       
      console.log(response.data);
      // Optionally, you can redirect to another page after successful submission
      // Insert navigation logic here
    } catch (error) {
      console.error('Error adding supplier:', error);
    }
  };

  return (
    <div className="absolute max-w-lg mx-auto mt-28      ml-[500px]">             
      <h2 className="text-2xl font-bold mb-4">Add New tea details</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block font-medium text-gray-700">Name:</label>
          <input type="text" id="name" name="name" value={teadetails.name} onChange={handleChange} required className="w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" />
        </div>
        <div>
          <label htmlFor="type" className="block font-medium text-gray-700">Type:</label>
          <input type="text" id="type" name="type" value={teadetails.type} onChange={handleChange} required className="w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" />
        </div>
        <div>
          <label htmlFor="price" className="block font-medium text-gray-700">Price:</label>
          <input type="text" id="price" name="price" value={teadetails.price} onChange={handleChange} required className="w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" />
        </div>
        <div>
          <label htmlFor="quantity" className="block font-medium text-gray-700">Quantity:</label>
          <input type="text" id="quantity" name="quantity" value={teadetails.quantity} onChange={handleChange} required className="w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" />
        </div>
        <button type="submit" className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100">Submit</button>
      </form>
    </div>
  );
};

export default Teadetails;
