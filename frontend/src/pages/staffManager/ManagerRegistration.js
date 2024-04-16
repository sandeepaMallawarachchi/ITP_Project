import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

export default function ManagerRegistration() {

    const [empId, setEmpId] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [gender, setGender] = useState("");
    const [department, setDepartment] = useState("");
    const [designation, setDesignation] = useState("");
    const [address, setAddress] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNo, setPhoneNo] = useState("");
    const [dateOfBirth, setDateOfBirth] = useState("");

    const sendData = (e) => {

        e.preventDefault();

        const newManager = {
            empId,
            firstName,
            lastName,
            password,
            confirmPassword,
            gender,
            department,
            designation,
            address,
            email,
            phoneNo,
            dateOfBirth,
        }

        try {
            axios.post(`http://localhost:8070/empLogin/managerRegister`, newManager);
            alert("Success! Manager added");
        } catch (error) {
            alert("Error! Failed to add manger");
            console.error("Error:", error);
        }
    }

    return (
        <div>
            <form onSubmit={sendData}>
                <div class="mb-3">
                    <label for="empId" class="form-label">Enter Employee ID: </label>
                    <input type="text" class="form-control" id="empId" required onChange={(e) => {
                        setEmpId(e.target.value);
                    }} />
                </div>

                <div class="mb-3">
                    <label for="firstName" class="form-label">Enter First Name: </label>
                    <input type="text" class="form-control" id="firstName" required onChange={(e) => {
                        setFirstName(e.target.value);
                    }} />
                </div>

                <div class="mb-3">
                    <label for="lastName" class="form-label">Enter Last Name: </label>
                    <input type="text" class="form-control" id="lastName" required onChange={(e) => {
                        setLastName(e.target.value);
                    }} />
                </div>

                <div class="mb-3">
                    <label for="password" class="form-label">Enter Password: </label>
                    <input type="password" class="form-control" id="password" required onChange={(e) => {
                        setPassword(e.target.value);
                    }} />
                </div>

                <div class="mb-3">
                    <label for="confirmPassword" class="form-label">Enter Confirm Password: </label>
                    <input type="password" class="form-control" id="confirmPassword" required onChange={(e) => {
                        setConfirmPassword(e.target.value);
                    }} />
                </div>

                <div class="mb-3">
                    <label for="gender" class="form-label">Enter Gender: </label>
                    <input type="text" class="form-control" id="gender" required onChange={(e) => {
                        setGender(e.target.value);
                    }} />
                </div>

                <div class="mb-3">
                    <label for="department" class="form-label">Enter Department: </label>
                    <input type="text" class="form-control" id="department" required onChange={(e) => {
                        setDepartment(e.target.value);
                    }} />
                </div>

                <div class="mb-3">
                    <label for="designation" class="form-label">Enter Designation: </label>
                    <input type="text" class="form-control" id="designation" required onChange={(e) => {
                        setDesignation(e.target.value);
                    }} />
                </div>

                <div class="mb-3">
                    <label for="address" class="form-label">Enter Address: </label>
                    <input type="text" class="form-control" id="address" required onChange={(e) => {
                        setAddress(e.target.value);
                    }} />
                </div>

                <div class="mb-3">
                    <label for="email" class="form-label">Enter Email: </label>
                    <input type="text" class="form-control" id="email" required onChange={(e) => {
                        setEmail(e.target.value);
                    }} />
                </div>

                <div class="mb-3">
                    <label for="phoneNo" class="form-label">Enter PhoneNo: </label>
                    <input type="text" class="form-control" id="phoneNo" required onChange={(e) => {
                        setPhoneNo(e.target.value);
                    }} />
                </div>

                <div class="mb-3">
                    <label for="dateOfBirth" class="form-label">Enter Date Of Birth: </label>
                    <input type="date" class="form-control" id="dateOfBirth" required onChange={(e) => {
                        setDateOfBirth(e.target.value);
                    }} />
                </div>

                <button type="submit" class="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}