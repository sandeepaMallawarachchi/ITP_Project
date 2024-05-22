import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Alert, Spinner } from "flowbite-react";
import { HiInformationCircle } from "react-icons/hi";
import { FaDownload } from "react-icons/fa6";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import app from '../../firebase';

export default function MonthlyReport() {

    const [report, setReport] = useState(undefined);
    const [downloadURL, setDownloadURL] = useState('');
    const [year, setYear] = useState('');
    const [month, setMonth] = useState('');

    const months = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    const [reportDetails, setReportDetails] = useState([]);
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

            await axios.post(`https://hendriks-tea-management-system-backend.vercel.app/salesManagement/uploadReport`, { downloadURL, year, month });

            setYear('');
            setMonth('');
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

    useEffect(() => {
        const fetchReport = async () => {
            try {
                const res = await axios.get(`https://hendriks-tea-management-system-backend.vercel.app/salesManagement/downloadReport`);
                setReportDetails(res.data.report);
            } catch (error) {
                console.log("Error fetching details", error.message);
            }
        };
        fetchReport();
    }, []);

    const handleDownload = (downloadURL) => {

        window.open(downloadURL);
    };

    return (
        <div className='absolute mt-40 left-1/3 w-1/2 '>
            <Alert color="info" className={`absolute ${successAlert ? 'w-full text-center -mt-12 left-0' : 'hidden'}`}>
                <span className="font-medium">Report uploaded successfully</span>
            </Alert>
            <Alert color="failure" icon={HiInformationCircle} className={`absolute ${errorsAlert ? 'w-full text-center -mt-12 left-0' : 'hidden'}`}>
                <span className="font-medium">Error uploading report!</span>
            </Alert>
            <Spinner aria-label="Default status example" className={` ${uploading ? 'absolute mt-[280px] ml-40' : 'hidden'}`} />
            <form onSubmit={handleSubmit}>

                <div className="mb-6">
                    <label htmlFor="year" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Enter Year</label>
                    <input
                        type="text"
                        id="year"
                        placeholder="2024"
                        className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                        required
                        value={year}
                        onChange={(e) => setYear(e.target.value)}
                    />
                </div>

                <div className="mb-6">
                    <label htmlFor="months" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select Month</label>
                    <select
                        className='form-control bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                        value={month}
                        onChange={(e) => setMonth(e.target.value)}
                        required
                    >
                        <option value="">Select Month</option>
                        {months.map((month, index) => (
                            <option key={index} value={month}>{month}</option>
                        ))}
                    </select>
                </div>

                <div className="mb-6">
                    <label htmlFor="report" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Add monthly sales report</label>
                    <input
                        type="file"
                        id="report"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-5/6 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        required
                        accept='report/'
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

            <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-14">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Year
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Month
                            </th>

                            <th scope="col" className="px-6 py-3">
                                Report
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {reportDetails.map((detail, index) => (
                            <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 text-black">
                                <td className="px-6 py-4">{detail.year}</td>
                                <td className="px-6 py-4">{detail.month}</td>
                                <td className="px-6 py-4"><FaDownload className='cursor-pointer' onClick={() => handleDownload(detail.downloadURL)} /></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {reportDetails.length === 0 && <span className="ml-64 px-6 py-4">No data found!</span>}
        </div>
    )
}