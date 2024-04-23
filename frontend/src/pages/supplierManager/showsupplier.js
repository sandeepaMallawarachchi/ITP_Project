import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function  Showsupplier() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get( `http://localhost:8087/supplier/supplierdetails`)          
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);
  const handleDelete = async (itemId) => {
    try {
      await axios.delete(`http://localhost:8087/supplier/supp/${itemId}`);  
      // After successful deletion, fetch items again to update the list
       
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  
    return (
        <div>
          <h1> Purchasing details </h1>
          <table>
            <thead>
              <tr>
                <th>Name</th>   
                <th>Age</th>   
                <th>Address</th>   
                {/* Add more table headers if needed */}
              </tr>
            </thead>
            <tbody>
              {data.map(item => (
                <tr key={item.id }>
                  <td>{item.name }</td>  
                  <td>{item.age }</td>         
                  <td>{item.address }</td>
                  {/* Render additional columns if needed */}
                  <td>
                 
                <button onClick={() => handleDelete(item._id)}>Delete</button>
              </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ); 
              }