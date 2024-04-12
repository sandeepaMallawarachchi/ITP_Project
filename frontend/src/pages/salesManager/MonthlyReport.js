import React, { useState } from 'react';
import axios from 'axios';
import { Alert, Spinner } from "flowbite-react";
import { HiInformationCircle } from "react-icons/hi";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import app from '../../firebase';

export default function MonthlyReport() {

    const [report, setReport] = useState(undefined);
    const [downloadURL, setDownloadURL] = useState('');
    const [uploading, setUploading] = useState(false);
    const [successAlert, setSuccessAlert] = useState(false);
    const [errorsAlert, setErrorAlert] = useState(false);

    const handleFileChange = (e) => {
        setReport(e.target.files[0]);
    };

    const handleUpload = () => {
        if (!report) {
            return alert("Please select a file!");
        }

        const storage = getStorage(app);
        const fileName = new Date().getTime() + report.name;
        const storageRef = ref(storage, 'report/' + fileName);
        const uploadTask = uploadBytesResumable(storageRef, report);

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

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            if (!downloadURL) {
                return alert("Please wait for the upload to complete!");
            }

            await axios.post(`http://localhost:8070/salesManagement/uploadReport`, { downloadURL });

            setDownloadURL('');
            setReport(null);
            document.getElementById('report').value = '';

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

    return (
        <div className='absolute mt-48 left-1/3 w-1/2 '>
            <Alert color="info" className={`absolute ${successAlert ? 'w-full text-center -mt-20 left-0' : 'hidden'}`}>
                <span className="font-medium">Report uploaded successfully</span>
            </Alert>
            <Alert color="failure" icon={HiInformationCircle} className={`absolute ${errorsAlert ? 'w-full text-center -mt-20 left-0' : 'hidden'}`}>
                <span className="font-medium">Error uploading report!</span>
            </Alert>
            <Spinner aria-label="Default status example" className={` ${uploading ? 'absolute mt-[125px] ml-36' : 'hidden'}`} />
            <form onSubmit={handleSubmit}>
                <div className="mb-6">
                    <label htmlFor="report" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Add monthly sales report</label>
                    <input
                        type="file"
                        id="report"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        required
                        accept='report/'
                        onChange={handleFileChange}
                    />
                </div>
                <button
                    type="button"
                    onClick={handleUpload}
                    className="absolute -mt-[75px] ml-[780px] focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                >
                    Confirm
                </button>
                <button
                    type="submit"
                    className={`text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 ${uploading ? 'opacity-50 cursor-not-allowed' : ''}`}
                    disabled={uploading}
                >
                    {uploading ? "Uploading..." : "Upload report"}
                </button>
            </form>
        </div>
    )
}
