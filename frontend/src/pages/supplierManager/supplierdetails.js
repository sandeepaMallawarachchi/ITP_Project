import React, { useState } from 'react';
import axios from 'axios';

const  Supplierdetails = () => {
  const [supplier, setSupplier] = useState({
    name: '',
    age: '',
    address: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSupplier({ ...supplier, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post( `http://localhost:8070/supplier/addsuppliers`,supplier);  
      console.log(response.data);
      // Optionally, you can redirect to another page after successful submission
      // Insert navigation logic here
    } catch (error) {
      console.error('Error adding supplier:', error);
    }
  };

  return (
    <div>
      <h2>Add New Supplier</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" name="name" value={supplier.name} onChange={handleChange} required />
        </div>
        <div>
          <label htmlFor="age">Age:</label>
          <input type="number" id="age" name="age" value={supplier.age} onChange={handleChange} required />
        </div>
        <div>
          <label htmlFor="address">Address:</label>
          <input type="text" id="address" name="address" value={supplier.address} onChange={handleChange} required />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Supplierdetails;
