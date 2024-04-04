import React, { useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

function ChangeSalesmanPassword() {
    const { id } = useParams();
    const [newPassword, setNewPassword] = useState({
        password: "",
        confirmPassword: "",
    });
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            if (newPassword.password !== newPassword.confirmPassword) {
                alert("Passwords do not match!");
                return;
            }

            await axios.put(`http://localhost:8070/salesmen/changePassword/${id}`, {
                password: newPassword.password,
                confirmPassword: newPassword.confirmPassword
            });

            alert('Password changed successfully');
            navigate(`/salesmenDashboard/${id}`);
        } catch (error) {
            console.log("Error!", error.message);
            alert("Error changing password!");
        }
    };

    const handlePasswordChange = (e) => {
        setNewPassword({
            ...newPassword,
            [e.target.id]: e.target.value
        });
    };

    return (
        <div>
            <div className="container" style={{ textAlign: "left", width: "600px", marginTop: "50px" }}>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">New Password</label>
                        <input
                            type="password"
                            className="form-control"
                            id="password"
                            required
                            value={newPassword.password}
                            onChange={handlePasswordChange}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="confirmPassword" className="form-label">Confirm New Password</label>
                        <input
                            type="password"
                            className="form-control"
                            id="confirmPassword"
                            required
                            value={newPassword.confirmPassword}
                            onChange={handlePasswordChange}
                        />
                    </div>
                    <button type="submit" className="btn btn-success">Change Password</button>
                </form>
            </div>
        </div>
    );
}

export default ChangeSalesmanPassword;
