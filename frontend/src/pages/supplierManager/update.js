import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

export default function Update() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [values, setValues] = useState({
    id: id,
    name: '',
    price: '',
    type: '',
    quantity: ''
  });

  useEffect(() => {
    axios
      .get(`http://localhost:8070/supplier/fetch/${id}`)
      .then((res) => {
        setValues({
          ...res.data,
          id: id // Ensure id remains unchanged
        });
      })
      .catch((err) => console.log(err));
  }, [id]);
  

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(`http://localhost:8070/supplier/update/${id}`, values)
      .then((res) => {
        alert("Updated successfully");
        navigate(`/details/${id}`);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            className="form-control"
            placeholder="Enter name"
            value={values.name}
            onChange={(e) => setValues({ ...values, name: e.target.value })}
          />
        </div>
        <div>
          <label htmlFor="price">Price</label>
          <input
            type="text"
            name="price"
            className="form-control"
            placeholder="Enter price"
            value={values.price}
            onChange={(e) => setValues({ ...values, price: e.target.value })}
          />
        </div>
        <div>
          <label htmlFor="type">Type</label>
          <input
            type="text"
            name="type"
            className="form-control"
            placeholder="Enter type"
            value={values.type}
            readOnly
           />
        </div>
        <div>
          <label htmlFor="quantity">Quantity</label>
          <input
            type="text"
            name="quantity"
            className="form-control"
            placeholder="Enter quantity"
            value={values.quantity}
            readOnly
           />
        </div>
        <br />
        <button type="submit" className="btn btn-info">Update</button>
      </form>
    </div>
  );
}
