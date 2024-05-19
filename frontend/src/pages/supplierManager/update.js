import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

export default function Update() {
  const { id, itemId } = useParams();
  const navigate = useNavigate();

  const [values, setValues] = useState({
    id: itemId,
    name: '',
    price: '',
    type: '',
    quantity: ''
  });

  useEffect(() => {
    axios
      .get(`https://hendriks-tea-management-system-backend.vercel.app/supplier/fetch/${itemId}`)
      .then((res) => {
        setValues({
          ...res.data,
          id: itemId // Ensure id remains unchanged
        });
      })
      .catch((err) => console.log(err));
  }, [itemId]);
  

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(`https://hendriks-tea-management-system-backend.vercel.app/supplier/update/${itemId}`, values)
      .then((res) => {
        alert("Updated successfully");
        navigate(`/supplierManager/details/${id}`);
      })
      .catch((err) => console.log(err));
};

  return (
    <div className="container mx-auto px-4 py-8">
      <form onSubmit={handleSubmit} className="max-w-md mx-auto">
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            name="name"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            placeholder="Enter name"
            value={values.name}
            onChange={(e) => setValues({ ...values, name: e.target.value })}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price</label>
          <input
            type="text"
            name="price"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            placeholder="Enter price"
            value={values.price}
            onChange={(e) => setValues({ ...values, price: e.target.value })}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="type" className="block text-sm font-medium text-gray-700">Type</label>
          <input
            type="text"
            name="type"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            placeholder="Enter type"
            value={values.type}
            readOnly
           />
        </div>
        <div className="mb-4">
          <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">Quantity</label>
          <input
            type="text"
            name="quantity"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            placeholder="Enter quantity"
            value={values.quantity}
            readOnly
           />
        </div>
        <br />
        <button type="submit" className="bg-indigo-500 text-white font-semibold px-4 py-2 rounded-md hover:bg-indigo-600 focus:outline-none focus:ring focus:ring-indigo-200 focus:ring-opacity-50">Update</button>
      </form>
    </div>
  );
}
