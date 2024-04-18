import axios from 'axios';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Details() {
  const [items, setItems] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get(`http://localhost:8087/supplier/item`);
      console.log('Response:', response.data);

      setItems(response.data.Item); // Accessing the "Item" array from the response
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (itemId) => {
    try {
      await axios.delete(`http://localhost:8087/supplier/items/${itemId}`);
      // After successful deletion, fetch items again to update the list
      fetchData();
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  return (
    <div>
      <h1>Data Table</h1>

      <table>
        <thead>
          <tr>
            <th>Type</th>
            <th>Name</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.map(item => (
            <tr key={item._id}>
              <td>{item.type}</td>
              <td>{item.name}</td>
              <td>{item.price}</td>
              <td>{item.quantity}</td>
              <td>
                <Link to={`/update/${item._id}`}>Update</Link>
                <button onClick={() => handleDelete(item._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
