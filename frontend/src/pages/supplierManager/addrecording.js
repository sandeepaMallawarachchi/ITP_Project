import React, { useState } from 'react';
import axios from 'axios';

const Reporting = () => {
  const [details, setDetails] = useState({
    paymentmethod: '',
    date: '',
    quantity: '',
    teatype: '',
    sid:'',
    amount:''
  });

  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDetails({ ...details, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`https://hendriks-tea-management-system-backend.vercel.app/supplier/addrecords`, details);
      setIsSuccess(true);
      // Optionally, you can redirect to another page after successful submission
      // Insert navigation logic here
    } catch (error) {
      console.error('Error adding supplier:', error);
    }
  };

  return (
    <div className="absolute max-w-lg mx-auto mt-28 ml-[500px] ">
      <h2 className="text-2xl font-bold mb-4 text-green-500">Add New Purchasing details</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="paymentmethod" className="block font-medium text-gray-700">Payment method:</label>
          <input type="text" id="paymentmethod" name="paymentmethod" value={details.paymentmethod} onChange={handleChange} required className="w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" />
        </div>
        <div>
  <label htmlFor="date" className="block font-medium text-gray-700">Date:</label>
  <input type="date" id="date" name="date" value={details.date} onChange={handleChange} required className="w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" step="1" />
</div>
        <div>
          <label htmlFor="quantity" className="block font-medium text-gray-700">Quantity:</label>
          <input type="text" id="quantity" name="quantity" value={details.quantity} onChange={handleChange} required className="w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" />
        </div>
        <div>
          <label htmlFor="teatype" className="block font-medium text-gray-700">Tea type:</label>
          <input type="text" id="teatype" name="teatype" value={details.teatype} onChange={handleChange} required className="w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" />
        </div>
        <div>
          <label htmlFor="sid" className="block font-medium text-gray-700">Supplier :</label>
          <input type="text" id="sid"  name="sid"  value={details.sid} onChange={handleChange} required className="w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" />
        </div>
        <div>
          <label htmlFor="amount"   className="block font-medium text-gray-700"> Amount :</label>
          <input type="text" id="amount"  name="amount"  value={details.amount} onChange={handleChange} required className="w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" />
        </div>
        <button type="submit" className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100">Submit</button>
      </form>
      {isSuccess && (
        <div className="mt-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">Success!</strong>
          <span className="block sm:inline">Purchasing details added successfully.</span>
          <span className="absolute top-0 bottom-0 right-0 px-4 py-3" onClick={() => setIsSuccess(false)}>
            <svg className="fill-current h-6 w-6 text-green-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
              <title>Close</title>
              <path d="M14.348 14.849a1 1 0 01-1.415 0L10 11.414l-2.93 2.93a1 1 0 11-1.414-1.415l2.93-2.929-2.93-2.93a1 1 0 111.414-1.414l2.93 2.93 2.929-2.93a1 1 0 111.415 1.414l-2.93 2.93 2.93 2.929z" />
            </svg>
          </span>
        </div>
      )}
    </div>
  );
};

export default Reporting;
