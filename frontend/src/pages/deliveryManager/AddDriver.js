import React, { useState } from "react";
import { Link,useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Alert, Spinner } from "flowbite-react";
import { HiInformationCircle } from "react-icons/hi";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import app from '../../firebase';

export default function AddDriver() {
    const {id} = useParams();
    const [dname, setName] = useState("");
    const [dID, setdID] = useState("");
    const [age, setAge] = useState("");
    const [address, setAddress] = useState("");
    const [phone_number, setNumber] = useState("");
    const [email, setEmail] = useState("");
    const [duration_of_job, setDuration_of_job] = useState("");
    const [license, setLicense] = useState(undefined);
    const [downloadURL, setDownloadURL] = useState('');
    const [uploading, setUploading] = useState(false);
    const [successAlert, setSuccessAlert] = useState(false);
    const [errorsAlert, setErrorAlert] = useState(false);

    const handleFileChange = (e) => {
        setLicense(e.target.files[0]);
    };

    const handleUpload = () => {
        if (!license) {
            return alert("Please select a file!");
        }

        const storage = getStorage(app);
        const fileName = new Date().getTime() + license.name;
        const storageRef = ref(storage, 'license/' + fileName);
        const uploadTask = uploadBytesResumable(storageRef, license);

        setUploading(true);

        uploadTask.on('state_changed',
            (snapshot) => { },
            (error) => {
                setUploading(false);
                setErrorAlert(true);
                console.log(error);
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                    setDownloadURL(url);
                    setUploading(false);
                });
            }
        );
    };

    const sendData = async (e) => {
        e.preventDefault();

        const newAddDriver = {
            dname,
            dID,
            age,
            address,
            phone_number,
            email,
            duration_of_job
        }

        try {
            await axios.post("http://localhost:8070/driver/add", newAddDriver);
            alert("Driver Added");

            setName("");
            setdID("");
            setAge("");
            setAddress("");
            setNumber("");
            setEmail("");
            setDuration_of_job("");
        } catch (err) {
            alert(err.message);
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            if (!downloadURL) {
                return alert("Please wait for the upload to complete!");
            }

            await axios.post(`http://localhost:8070/driver/uploadLicense`, { downloadURL });

            setDownloadURL('');
            setLicense(null);
            document.getElementById('license').value = '';

            setSuccessAlert(true);
            setTimeout(() => {
                setSuccessAlert(false);
            }, 5000);
        } catch (error) {
            setErrorAlert(true);
            setTimeout(() => {
                setErrorAlert(false);
            }, 5000);
            console.log(error);
        }
    };

    const navigate = useNavigate();

    const handleAllDrivers = () => {
        navigate(`/deliveryManager/allDrivers/${id}`);
    }

    return (
        <div className="container absolute mt-36 ml-80">
            <form onSubmit={sendData}>
                <div className="mb-3">
                    <label htmlFor="dname" className="form-label">Driver Name</label>
                    <input type="text" className="form-control" id="dname" placeholder="Enter Driver Name"
                        onChange={(e) => setName(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label htmlFor="dID" className="form-label">Driver ID</label>
                    <input type="text" className="form-control" id="dID" placeholder="Enter the Driver ID"
                        onChange={(e) => setdID(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label htmlFor="age" className="form-label">Age</label>
                    <input type="number" className="form-control" id="age" placeholder="Enter the Age"
                        onChange={(e) => setAge(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label htmlFor="address" className="form-label">Address</label>
                    <input type="text" className="form-control" id="address" placeholder="Enter the Address"
                        onChange={(e) => setAddress(e.target.value, 10)} /> {/* Parse string to integer */}
                </div>
                <div className="mb-3">
                    <label htmlFor="phone_number" className="form-label">Phone Number</label>
                    <input
                        type="text"
                        className="form-control"
                        id="phone_number"
                        maxLength="10"
                        pattern="[0-9]{10}"
                        placeholder="Enter the Phone Number"
                        onChange={(e) => setNumber(e.target.value)}
                        title="Please enter exactly 10 digits"
                        required  // Add required attribute if the field is mandatory
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input type="email" className="form-control" id="email" placeholder="Enter the Email"
                        onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label htmlFor="duration_of_job" className="form-label">Duration of Job</label>
                    <input type="text" className="form-control" id="duration_of_job" placeholder="Enter duration of job"
                        onChange={(e) => setDuration_of_job(e.target.value)} />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
            <div className="mt-4">
                    <button onClick={handleAllDrivers} className="text-blue-500 hover:text-blue-700 text-lg">All Drivers</button>
                </div>

            <form onSubmit={handleSubmit} className="mt-10">

                <div className="mb-6">
                    <label htmlFor="report" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Add Driver's license</label>
                    <input
                        type="file"
                        id="license"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-5/6 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        required
                        accept='license/'
                        onChange={handleFileChange}
                    />
                </div>
                <button
                    type="button"
                    onClick={handleUpload}
                    className="absolute -mt-[75px] ml-[680px] focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                >
                    Confirm
                </button>
                <button
                    type="submit"
                    className={`text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 ${uploading ? 'opacity-50 cursor-not-allowed' : ''}`}
                    disabled={uploading}
                >
                    {uploading ? "Confirming..." : "Upload report"}
                </button>
            </form>
        </div>
    );
}