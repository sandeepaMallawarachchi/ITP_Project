import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

function UpdateEmployee() {
    const { id } = useParams();
    const [empDetails, setEmpDetails] = useState({
        empId: "",
        firstName: "",
        lastName: "",
        gender: "",
        department: "",
        designation: "",
        address: "",
        email: "",
        phoneNo: ""
    });
    //const navigate = useNavigate();

    useEffect(() => {
        const fetchEmpDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:8070/staff/get/${id}`);
                    console.log("Response data:", response.data);

                const empData = response.data.employee || response.data;
                const { empId, firstName, lastName, gender, department, designation, address, email, phoneNo } = empData;
                setEmpDetails({ empId, firstName, lastName, gender, department, designation, address, email, phoneNo });
            } catch (error) {
                console.error("Error fetching employee details", error.message);
            }
        };
        fetchEmpDetails();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await axios.put(`http://localhost:8070/staff/update/${id}`,empDetails);
                alert("Details Updated!");
                //navigate("/dashboard");
        } catch (error) {
            console.error("Error updating employee details", error.message);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div class="mb-3">
                <label for="empId" class="form-label">Employee ID</label>
                <input type="text" class="form-control" id="empId" value={empDetails.empId} onChange={(e)=>{
                    setEmpDetails({
                        ...empDetails,
                        empId: e.target.value,
                    });
                }}/>
            </div>
            
            <div class="mb-3">
                <label for="firstName" class="form-label">Employee First Name</label>
                <input type="text" class="form-control" id="firstName" value={empDetails.firstName} onChange={(e)=>{
                    setEmpDetails({
                        ...empDetails,
                        firstName: e.target.value,
                    });
                }}/>
            </div>

            <div class="mb-3">
                <label for="lastName" class="form-label">Employee Last Name</label>
                <input type="text" class="form-control" id="lastName" value={empDetails.lastName} onChange={(e)=>{
                    setEmpDetails({
                        ...empDetails,
                        lastName: e.target.value,
                    });
                }}/>
            </div>

            <div class="mb-3">
                <label for="gender" class="form-label">Employee Gender</label>
                <input type="text" class="form-control" id="gender" value={empDetails.gender} onChange={(e)=>{
                    setEmpDetails({
                        ...empDetails,
                        gender: e.target.value,
                    });
                }}/>
            </div>

            <div class="mb-3">
                <label for="department" class="form-label">Employee Department</label>
                <input type="text" class="form-control" id="department" value={empDetails.department} onChange={(e)=>{
                    setEmpDetails({
                        ...empDetails,
                        department: e.target.value,
                    });
                }}/>
            </div>

            <div class="mb-3">
                <label for="designation" class="form-label">Employee Designation</label>
                <input type="text" class="form-control" id="designation" value={empDetails.designation} onChange={(e)=>{
                    setEmpDetails({
                        ...empDetails,
                        designation: e.target.value,
                    });
                }}/>
            </div>

            <div class="mb-3">
                <label for="address" class="form-label">Employee Address</label>
                <input type="text" class="form-control" id="address" value={empDetails.address} onChange={(e)=>{
                    setEmpDetails({
                        ...empDetails,
                        address: e.target.value,
                    });
                }}/>
            </div>

            <div class="mb-3">
                <label for="email" class="form-label">Employee Email</label>
                <input type="text" class="form-control" id="email" value={empDetails.email} onChange={(e)=>{
                    setEmpDetails({
                        ...empDetails,
                        email: e.target.value,
                    });
                }}/>
            </div>

            <div class="mb-3">
                <label for="phoneNo" class="form-label">Employee Phone No</label>
                <input type="text" class="form-control" id="phoneNo" value={empDetails.phoneNo} onChange={(e)=>{
                    setEmpDetails({
                        ...empDetails,
                        phoneNo: e.target.value,
                    });
                }}/>
            </div>

            <button type="submit" class="btn btn-primary">Update</button>
        </form>
    );

}

export default UpdateEmployee;