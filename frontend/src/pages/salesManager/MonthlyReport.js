import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { Alert } from "flowbite-react";
import { HiInformationCircle } from "react-icons/hi";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import app from '../../firebase';

export default function MonthlyReport() {

    const [report, setReport] = useState(undefined);
    const [downloadURL, setDownloadURL] = useState('');
    const [uploading, setUploading] = useState(false);

    useEffect(() => {
        report && uploadFile(report);
    }, [report]);

    const uploadFile = (file) => {
        const storage = getStorage(app);
        const fileName = new Date().getTime() + file.name;
        const storageRef = ref(storage, 'report/' + fileName);
        const uploadTask = uploadBytesResumable(storageRef, file);

        setUploading(true);

        uploadTask.on('state_changed',
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + progress + '% done');
                switch (snapshot.state) {
                    case 'paused':
                        console.log('Upload is paused');
                        break;
                    case 'running':
                        console.log('Upload is running');
                        break;
                }
            },
            (error) => {
                switch (error.code) {
                    case 'storage/unauthorized':
                        break;
                    case 'storage/canceled':
                        break;
                    case 'storage/unknown':
                        break;
                }
                setUploading(false);
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                    console.log('File available at', url);
                    setDownloadURL(url);
                    setUploading(false);
                });
            }
        );
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            if (!report) {
                return alert("Please select a file!");
            }

            if (!uploading) {
                uploadFile(report);
            } else {
                console.log("Upload is already in progress.");
            }

            if (!downloadURL) {
                return alert("Please wait for the upload to complete!");
            }

            await axios.post(`http://localhost:8070/salesManagement/uploadReport`, { downloadURL });

            setDownloadURL('');
            alert("Report uploaded successfully");
        } catch (error) {
            console.log(error);
            alert("Error uploading file!");
        }
    };

    return (
        <div className='absolute mt-48 left-1/3 w-1/2 '>

            <form onSubmit={handleSubmit}>

                <div className="mb-6">
                    <label htmlFor="report" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Add monthly sales report</label>
                    <input
                        type="file"
                        id="report"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        required
                        accept='report/'
                        onChange={(e) => setReport(e.target.files[0])}
                    />
                </div>
                <button type="submit"
                    className={`text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 ${uploading ? 'opacity-50 cursor-not-allowed' : ''}`}
                    disabled={uploading}
                >
                    {uploading ? "Uploading..." : "Upload report"}
                </button>
            </form>
        </div>
    )
}
