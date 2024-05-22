import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import profilePic from '../images/Profile.png';
import { Alert } from "flowbite-react";
import { HiInformationCircle } from "react-icons/hi";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import app from '../firebase';

export default function ManagerAccount() {
    const { id } = useParams();
    const [managerDetails, setManagerDetails] = useState({
        firstName: "",
        lastName: "",
        dateOfBirth: "",
        email: "",
        phoneNo: "",
        address: "",
    });
    const [successAlert, setSuccessAlert] = useState(false);
    const [errorsAlert, setErrorAlert] = useState(false);
    const [image, setImage] = useState(undefined);
    const [imageURL, setImageURL] = useState('');
    const [uploading, setUploading] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const [profilePicture, setProfilePicture] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
        const fetchManagerDetails = async () => {
            try {
                const res = await axios.get(`https://hendriks-tea-management-system-backend.vercel.app/empLogin/getManager/${id}`);
                console.log(res.data);
                const managerData = res.data.manager || res.data;
                const { firstName, lastName, dateOfBirth, email, phoneNo, address } = managerData;
                setManagerDetails({ firstName, lastName, dateOfBirth, email, phoneNo, address });
            } catch (error) {
                console.log("error", error.message);
            }
        };

        fetchManagerDetails();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await axios.put(`https://hendriks-tea-management-system-backend.vercel.app/empLogin/updateManagerAccount/${id}`, managerDetails);

            setSuccessAlert(true);

            setTimeout(() => {
                setSuccessAlert(false);
            }, 5000);

        } catch (error) {
            console.log("Error!", error.message);

            setErrorAlert(true);

            setTimeout(() => {
                setErrorAlert(false);
            }, 5000);
        }
    };

    const handleLogout = async () => {
        try {
            await axios.get(`https://hendriks-tea-management-system-backend.vercel.app/empLogin/logout`);
            navigate('/');
        } catch (error) {
            console.log("Error logging out:", error.message);
        }
    };

    const handleFileChange = (e) => {
        setImage(e.target.files[0]);
    };

    const handleUpload = () => {
        if (!image) {
            return alert("Please select a file!");
        }

        const storage = getStorage(app);
        const fileName = new Date().getTime() + image.name;
        const storageRef = ref(storage, 'profilePicture/' + fileName);
        const uploadTask = uploadBytesResumable(storageRef, image);

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
                    setImageURL(url);
                    setUploading(false);
                });
            }
        );
    };

    const handleProfilePicture = async (e) => {
        e.preventDefault();

        try {
            if (!imageURL) {
                return alert("Please wait for the upload to complete!");
            }

            await axios.post(`https://hendriks-tea-management-system-backend.vercel.app/empLogin/uploadProfilePicture`, { imageURL, empId: id });

            setImageURL('');
            setImage(null);

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

    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };

    //retrieving the profile picture
    useEffect(() => {
        const fetchProfilePicture = async () => {
            try {
                const res = await axios.get(`https://hendriks-tea-management-system-backend.vercel.app/empLogin/changeProfilePicture/${id}`);
                console.log(res.data);

                const { imageURL } = res.data.image;
                setProfilePicture(imageURL);
            } catch (error) {
                console.log("Error fetching image", error.message);
            }
        };
        fetchProfilePicture();
    }, [id]);

    return (
        <div className='absolute mt-44 left-1/4 w-3/4 '>

            <Alert color="info" className={`absolute ${successAlert ? 'w-5/6 text-center -mt-14 left-0' : 'hidden'}`}>
                <span className="font-medium">Manager updated successfully</span>
            </Alert>
            <Alert color="failure" icon={HiInformationCircle} className={`absolute ${errorsAlert ? 'w-5/6 text-center -mt-14 left-0' : 'hidden'}`}>
                <span className="font-medium">Error updating!</span>
            </Alert>

            <div id='profDetails' className='absolute w-72 h-72 cursor-pointer rounded-full overflow-hidden'>
                <img src={profilePicture || profilePic} id='profPic' alt="Profile"
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave} />

                {isHovered && (
                    <div className="-mt-48 ml-10 w-3/4">
                        <input
                            type="file"
                            id="report"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            required
                            accept='profilePicture/'
                            onChange={handleFileChange}
                            onMouseEnter={handleMouseEnter}
                        />
                        <button
                            type="button"
                            onClick={handleUpload}
                            onMouseEnter={handleMouseEnter}
                            className="absolute mt-5 ml-[60px] focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                        >
                            Confirm
                        </button>

                        <button
                            type="submit"
                            onClick={handleProfilePicture}
                            onMouseEnter={handleMouseEnter}
                            className={`absolute mt-20 ml-6 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 ${uploading ? 'opacity-50 cursor-not-allowed' : ''}`}
                            disabled={uploading}
                        >
                            {uploading ? "Confirming..." : "Edit Profile picture"}
                        </button>
                    </div>
                )}
            </div>

            <div className='absolute left-[40%] w-[500px]'>

                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="firtName" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">First Name</label>
                        <input
                            type="text"
                            className="form-control bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            id="firtName"
                            required
                            value={managerDetails.firstName}
                            onChange={(e) => {
                                setManagerDetails({
                                    ...managerDetails,
                                    firstName: e.target.value,
                                });
                            }}
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="lastName" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Last Name</label>
                        <input
                            type="text"
                            className="form-control bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            id="lastName"
                            required
                            value={managerDetails.lastName}
                            onChange={(e) => {
                                setManagerDetails({
                                    ...managerDetails,
                                    lastName: e.target.value,
                                });
                            }}
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="dateOfBirth" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Date of Birth</label>
                        <input
                            type="date"
                            className="form-control bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            id="dateOfBirth"
                            required
                            value={managerDetails.dateOfBirth}
                            onChange={(e) => {
                                setManagerDetails({
                                    ...managerDetails,
                                    dateOfBirth: e.target.value,
                                });
                            }}
                        />
                    </div>


                    <div className="mb-3">
                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email Address</label>
                        <input
                            type="email"
                            className="form-control bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            id="email"
                            required
                            value={managerDetails.email}
                            onChange={(e) => {
                                setManagerDetails({
                                    ...managerDetails,
                                    email: e.target.value,
                                });
                            }}
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Phone number</label>
                        <input
                            type="number"
                            className="form-control bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            id="phone"
                            required
                            value={managerDetails.phoneNo}
                            onChange={(e) => {
                                setManagerDetails({
                                    ...managerDetails,
                                    phoneNo: e.target.value,
                                });
                            }}
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="address" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Address</label>
                        <input
                            type="text"
                            className="form-control bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            id="address"
                            required
                            value={managerDetails.address}
                            onChange={(e) => {
                                setManagerDetails({
                                    ...managerDetails,
                                    address: e.target.value,
                                });
                            }}
                        />
                    </div>

                    <button type="submit" className="btn btn-success bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-white">
                        Update Account
                    </button>
                </form>
            </div>


            <div id='profBtns' className='absolute ml-4 w-64 top-80 flex flex-col items-center'>

                <button type="button"
                    onClick={handleLogout}
                    className="focus:outline-none mt-8 text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">
                    Logout
                </button>
            </div>

        </div>
    );
}
