import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Alert, Spinner } from "flowbite-react";
import { HiInformationCircle } from "react-icons/hi";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import app from '../../firebase';

export default function AddDriver() {
    const { id } = useParams();
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
    const [alertMessage, setAlertMessage] = useState("");
    const [error, setError] = useState("");

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

    const checkDriverExists = async () => {
        try {
            const response = await axios.get(`https://hendriks-tea-management-system-backend.vercel.app/driver/${dID}`);
            return response.data.exists;
        } catch (error) {
            console.error("Error checking driver existence:", error);
            return false;
        }
    };

    const sendData = async (e) => {
        e.preventDefault();

        const exists = await checkDriverExists();
        if (exists) {
            setAlertMessage("Already customer exist");
            return;
        }

        const newAddDriver = {
            dname,
            dID,
            age,
            address,
            phone_number,
            email,
            duration_of_job
        };

        axios.post("https://hendriks-tea-management-system-backend.vercel.app/driver/add", newAddDriver)
        .then(() => {
            alert("Driver Added");

            setName("");
            setdID("");
            setAge("");
            setAddress("");
            setNumber("");
            setEmail("");
            setDuration_of_job("");
            setError(""); // Clear error message after successful submission
        })
        .catch((err) => {
            if (err.response && err.response.status === 400) {
                alert('Driver ID already exists!');
            } else {
                alert(err.message);
            }
        });
}

       

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            if (!downloadURL) {
                return alert("Please wait for the upload to complete!");
            }

            await axios.post(`https://hendriks-tea-management-system-backend.vercel.app/driver/uploadLicense`, { downloadURL });

            setDownloadURL('');
            setLicense(null);
            document.getElementById('license').value = '';

            setSuccessAlert(true);
            setTimeout(() => {
                setSuccessAlert(false);
            }, 5000);
        } catch (err) {

            if (err.response && err.response.status === 400) {
                alert('Diver ID already exists!');
            } else {
                alert(err.message);
            }
        }
    };

    const navigate = useNavigate();

    const handleAllDrivers = () => {
        navigate(`/deliveryManager/allDrivers/${id}`);
    };

    const handleDriverNameChange = (value) => {
        const regex = /^[a-zA-Z\s]+$/;
        if (regex.test(value) || value === "") {
            setName(value);
        }
    };

    return (

        <div className="absolute mt-48 left-1/3 w-1/2">
            <h1 className="text-2xl font-bold mb-4">Driver Registration form</h1>
            <form onSubmit={sendData}>
                <div>
                    <label htmlFor="dname" className="block text-sm font-medium text-gray-700">Driver Name</label>
                    <input type="text" className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" id="dname" placeholder="Enter driver Name" value={dname} onChange={(e) => handleDriverNameChange(e.target.value)} />
                </div>
                <div>
                    <label htmlFor="dID" className="block text-sm font-medium text-gray-700">Driver ID</label>
                    <input
                        type="text"
                        maxLength={6}
                        className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        id="dID"
                        placeholder="DID123"
                        value={dID}
                        onChange={(e) => {
                            const value = e.target.value;
                            setdID(value);

                            // Validate Driver ID format
                            const driverIDRegex = /^DID\d{0,4}$/;
                            if (!value.match(driverIDRegex) && value !== "") {
                                setError("Driver ID should be in the format DIDXXXX, where X represents a digit");
                            } else {
                                setError("");
                            }
                        }}
                    />
                    {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
                </div>

                <div>
                    <label htmlFor="age" className="block text-sm font-medium text-gray-700">Age</label>
                    <input type="number" className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" id="age" placeholder="Enter the Age" value={age} onChange={(e) => setAge(e.target.value)} />
                </div>
                <div>
                    <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address</label>
                    <input type="text" className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" id="address" placeholder="Enter the Address" value={address} onChange={(e) => setAddress(e.target.value)} />
                </div>
                <div>
                    <label htmlFor="phone_number" className="block text-sm font-medium text-gray-700">Phone Number</label>
                    <input type="text" className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" id="phone_number" maxLength="10" pattern="[0-9]{10}" placeholder="Enter the Phone Number" value={phone_number} onChange={(e) => setNumber(e.target.value)} title="Please enter exactly 10 digits" required />
                </div>
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                    <input type="email" className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" id="email" placeholder="Enter the Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div>
                    <label htmlFor="duration_of_job" className="block text-sm font-medium text-gray-700">Duration of Job</label>
                    <input type="text" className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" id="duration_of_job" placeholder="1 year" value={duration_of_job} onChange={(e) => setDuration_of_job(e.target.value)} />
                </div>
                <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Submit</button>
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

            {alertMessage && (
                <Alert type="error" className="mt-4">
                    <HiInformationCircle className="text-xl" />
                    <p className="ml-2">{alertMessage}</p>
                </Alert>
            )}
        </div>
    );
}


