import React, { useState } from 'react';
import axios from 'axios';

const Supplierdetails = () => {
  const [supplier, setSupplier] = useState({
    name: '',
    age: '',
    address: '',
    email: ''
  });
  const [emailError, setEmailError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSupplier({ ...supplier, [name]: value });

    // Validate email format as the user types
    if (name === 'email') {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(value)) {
        setEmailError('Invalid email format');
      } else {
        setEmailError('');
      }
    } else if (name !== 'email' && emailError) {
      // If the user is typing in other fields and there's an email error, clear it
      setEmailError('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if there's an email error before submitting
    if (emailError) {
      return;
    }

    try {
      const response = await axios.post(`http://localhost:8070/supplier/addsuppliers`, supplier);
      console.log(response.data);
      // Optionally, you can redirect to another page after successful submission
      // Insert navigation logic here
    } catch (error) {
      console.error('Error adding supplier:', error);
    }
  };

  return (
    <div className='absolute mt-40 left-1/3 w-1/2'>
      <h2 className="text-2xl font-bold mb-4">Add New Supplier</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block">Name:</label>
          <input type="text" id="name" name="name" value={supplier.name} onChange={handleChange} required
            className="border border-gray-300 px-3 py-2 rounded-md w-full focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>
        <div>
          <label htmlFor="age" className="block">Age:</label>
          <input type="number" id="age" name="age" value={supplier.age} onChange={handleChange} required
            className="border border-gray-300 px-3 py-2 rounded-md w-full focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>
        <div>
          <label htmlFor="address" className="block">Address:</label>
          <input type="text" id="address" name="address" value={supplier.address} onChange={handleChange} required
            className="border border-gray-300 px-3 py-2 rounded-md w-full focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>
        <div>
          <label htmlFor="email" className="block">Email:</label>
          <input type="text" id="email" name="email" value={supplier.email} onChange={handleChange} required
            className="border border-gray-300 px-3 py-2 rounded-md w-full focus:outline-none focus:ring focus:border-blue-300"
          />
          {emailError && <p className="text-red-500">{emailError}</p>}
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Supplierdetails;
