import React, { useState } from 'react';
import axios from 'axios';

const  Recording = () => {
  const [supplier, setSupplier] = useState({
    name: '',
     quantity:'',
     date:''
  });
  const [emailError, setEmailError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSupplier({ ...supplier, [name]: value });

    // Validate email format as the user types
    // if (name === 'email') {
    //   const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    //   if (!emailPattern.test(value)) {
    //     setEmailError('Invalid email format');
    //   } else {
    //     setEmailError('');
    //   }
    // }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // if (!emailPattern.test(supplier.email)) {
    //   setEmailError('Invalid email format');
    //   return;
    // } else {
    //   setEmailError('');
    // }

    try {
      const response = await axios.post(`https://hendriks-tea-management-system-backend.vercel.app/supplier/addrecording`  , supplier);
      console.log(response.data);
      // Optionally, you can redirect to another page after successful submission
      // Insert navigation logic here
    } catch (error) {
      console.error('Error adding supplier:', error);
    }
  };

  return (
    <div className='absolute mt-40  left-1/3 w-1/2 '>       
      <h2 className="text-2xl font-bold mb-4">Add New Supplier</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block">Payment Method :</label>
          <input type="text" id="name" name="name" value={supplier.name} onChange={handleChange} required
            className="border border-gray-300 px-3 py-2 rounded-md w-full focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>
        <div>
          <label htmlFor="age" className="block">Quantity :</label>
          <input type="number" id="quantity"   name="quantity" value={supplier.quantity} onChange={handleChange} required
            className="border border-gray-300 px-3 py-2 rounded-md w-full focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>
        <div>
          <label htmlFor="address" className="block"> Date:</label>
          <input type="date"   id="date" name="date" value={supplier.date} onChange={handleChange} required
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

export default Recording;
