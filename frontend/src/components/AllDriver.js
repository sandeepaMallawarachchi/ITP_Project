import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";

export default function AllDriver() {
    const [searchValue, setSearchValue] = useState("");
    const [driver, setDriver] = useState([]);
    const [filteredDriver, setFilteredDriver] = useState([]);

    useEffect(() => {
        fetchDriver();
    }, []);

    useEffect(() => {
        filterDriver();
    }, [searchValue, driver]);

    const fetchDriver = () => {
        axios.get("http://localhost:5000/driver/")
            .then(response => {
                setDriver(response.data);
                setFilteredDriver(response.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    const filterDriver = () => {
        if (searchValue.trim() === "") {
            setFilteredDriver(driver);
        } else {
            const filteredData = driver.filter(driver1 =>
                driver1.dname && driver1.dname.toLowerCase().includes(searchValue.toLowerCase())
            );
            setFilteredDriver(filteredData);
        }
    }

    const navigate = useNavigate();

    const handleUpdate = (id) => {
        navigate(`/updateDrivers/${id}`);
    }

    const handleDelete = (id) => {
        navigate(`/deleteDrivers/${id}`);
    }

    return (
        <div>
            <div style={{ marginLeft: 480 }}>
                <br />
                <div style={{ position: 'relative' }}>
                    <input style={{ paddingLeft: '30px' }} placeholder='Search' onChange={(e) => {
                        setSearchValue(e.target.value);
                    }}></input>
                    {/* SVG icon */}
                </div>
            </div>

            {filteredDriver.length > 0 ? (
                <div>
                    <h1>All Drivers</h1>
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">Driver Name</th>
                                <th scope="col">Age</th>
                                <th scope="col">Address</th>
                                <th scope="col">Phone Number</th>
                                <th scope="col">Email</th>
                                <th scope="col">Duration of Job</th>
                                <th scope="col">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredDriver.map((driver1) => (
                                <tr key={driver1._id}>
                                    <td>{driver1.dname}</td>
                                    <td>{driver1.age}</td>
                                    <td>{driver1.address}</td>
                                    <td>{driver1.phone_number}</td>
                                    <td>{driver1.email}</td>
                                    <td>{driver1.duration_of_job}</td>
                                    <td>
                                        <button type="button" className="btn btn-primary" onClick={() => handleUpdate(driver1._id)}>Update</button>
                                        <button type="button" className="btn btn-danger" onClick={() => handleDelete(driver1._id)}>Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <div>No results found</div>
            )}
        </div>
    );
}
