import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

function UpdateEmployee() {
    const { id } = useParams();
    const { empId } = useParams();

    const [empDetails, setEmpDetails] = useState({
        firstName: "",
        lastName: "",
        gender: "",
        department: "",
        designation: "",
        address: "",
        email: "",
        phoneNo: "",
    });

    useEffect(() => {
        const fetchEmpDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:8070/staff/get/${empId}`);
                const empData = response.data.staff || response.data;
                const { firstName, lastName, gender, department, designation, address, email, phoneNo } = empData;
                setEmpDetails({ firstName, lastName, gender, department, designation, address, email, phoneNo });
                console.log("Employee Data:", empData);
            } catch (error) {
                console.error("Error fetching employee details", error.message);
            }
        };
        fetchEmpDetails();
    }, [empId]);    

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await axios.put(`http://localhost:8070/staff/update/${id}`, empDetails);
            navigate(`/allEmployees`);
            alert("Details Updated!");
        } catch (error) {
            console.error("Error updating employee details", error.message);
        }
    };



    return (
        <div className="container" style={{ width: "600px" }}>
            <form onSubmit={handleSubmit}>
                <div>
                    <div className="mb-3">
                        <label htmlFor="empId" className="form-label">Employee ID</label>
                        <input type="text" className="form-control" id="empId" value={empId} onChange={(e) => setEmpDetails({ ...empDetails, empId: e.target.value })} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="firstName" className="form-label">First Name</label>
                        <input type="text" className="form-control" id="firstName" value={empDetails.firstName} onChange={(e) => setEmpDetails({ ...empDetails, firstName: e.target.value })} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="lastName" className="form-label">Last Name</label>
                        <input type="text" className="form-control" id="lastName" value={empDetails.lastName} onChange={(e) => setEmpDetails({ ...empDetails, lastName: e.target.value })} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="gender" className="form-label">Gender</label>
                        <input type="text" className="form-control" id="gender" value={empDetails.gender} onChange={(e) => setEmpDetails({ ...empDetails, gender: e.target.value })} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="department" className="form-label">Department</label>
                        <input type="text" className="form-control" id="department" value={empDetails.department} onChange={(e) => setEmpDetails({ ...empDetails, department: e.target.value })} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="designation" className="form-label">Designation</label>
                        <input type="text" className="form-control" id="designation" value={empDetails.designation} onChange={(e) => setEmpDetails({ ...empDetails, designation: e.target.value })} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="address" className="form-label">Address</label>
                        <input type="text" className="form-control" id="address" value={empDetails.address} onChange={(e) => setEmpDetails({ ...empDetails, address: e.target.value })} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input type="text" className="form-control" id="email" value={empDetails.email} onChange={(e) => setEmpDetails({ ...empDetails, email: e.target.value })} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="phoneNo" className="form-label">Phone Number</label>
                        <input type="text" className="form-control" id="phoneNo" value={empDetails.phoneNo} onChange={(e) => setEmpDetails({ ...empDetails, phoneNo: e.target.value })} />
                    </div>
                </div>
                <button type="submit" className="btn btn-primary">Update</button>
            </form>

        </div>
    );
}

export default UpdateEmployee;