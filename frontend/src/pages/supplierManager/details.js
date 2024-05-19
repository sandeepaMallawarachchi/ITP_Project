import axios from 'axios';
import { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

export default function Details() {
  const [items, setItems] = useState([]);
  const { id } = useParams();

  const fetchData = async () => {
    try {
      const response = await axios.get(`https://hendriks-tea-management-system-backend.vercel.app/supplier/item`);
      console.log('Response:', response.data);

      setItems(response.data.Item);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (itemId) => {
    try {
      await axios.delete(`https://hendriks-tea-management-system-backend.vercel.app/supplier/items/${itemId}`);
      fetchData();
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  const navigate = useNavigate();

  const handleUpdate = (itemId, id) => {
    navigate(`/supplierManager/update/${itemId}/${id}`);
  };  


  return (
    <div className='absolute mt-40  left-1/3 w-1/2 '>
      <h1 className='text-2xl'>Data Table</h1>
      <div className="overflow-x-auto">
        <table className="table-auto">
          <thead>
            <tr>
              <th className="px-4 py-2">Type</th>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Price</th>
              <th className="px-4 py-2">Quantity</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map(item => (
              <tr key={item._id}>
                <td className="border px-4 py-2">{item.type}</td>
                <td className="border px-4 py-2">{item.name}</td>
                <td className="border px-4 py-2">{item.price}</td>
                <td className="border px-4 py-2">{item.quantity}</td>
                <td className="border px-4 py-2">
                  <div className="flex">
                    <div className="mr-2">
                      <button onClick={() => handleUpdate(item._id, id)} className="text-blue-500">Update</button>
                    </div>
                    <div>
                      <button onClick={() => handleDelete(item._id, id)} className="text-red-500">Delete</button>
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
