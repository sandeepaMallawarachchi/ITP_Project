import React, { useState } from 'react';
import axios from 'axios';

const   Teadetails = () => {
  const [ teadetails, setteadetails  ] = useState({
    name: '',
     type: '',
     price: '',
     quantity :''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setteadetails ({ ...teadetails , [name]: value });  
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post( `http://localhost:8087/supplier/addteadetails`,teadetails );   
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
          <input type="text" id="name" name="name" value={teadetails .name} onChange={handleChange} required />
        </div>
        <div>
          <label htmlFor="type ">Type :</label>
          <input type="text"   id="type " name="type"    value={teadetails.type } onChange={handleChange} required />
        </div>
        <div>
          <label htmlFor="price"> Price:</label>    
          <input type="text" id="price " name="price"   value={teadetails.price } onChange={handleChange} required />
        </div>
        <div>
          <label htmlFor="quantity ">Quantity  :</label>    
          <input type="text" id="quantity"   name="quantity"     value={teadetails.quantity } onChange={handleChange} required />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default  Teadetails;