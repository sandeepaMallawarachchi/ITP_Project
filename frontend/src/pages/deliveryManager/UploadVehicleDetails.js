import React, { useState } from "react";
import axios from "axios";
import { Alert, Spinner } from "flowbite-react";
import { HiInformationCircle } from "react-icons/hi";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import app from '../../firebase';

export default function UploadVehicleDetails() {
    const [licenseDownloadURL, setLicenseDownloadURL] = useState('');
    const [emissionDownloadURL, setEmissionDownloadURL] = useState('');
    const [uploadingLicense, setUploadingLicense] = useState(false);
    const [uploadingEmission, setUploadingEmission] = useState(false);
    const [successAlert, setSuccessAlert] = useState(false);
    const [errorsAlert, setErrorAlert] = useState(false);
    const [licenseFile, setLicenseFile] = useState(null);
    const [emissionFile, setEmissionFile] = useState(null);

    const handleLicenseFileChange = (e) => {
        setLicenseFile(e.target.files[0]);
    };

    const handleEmissionFileChange = (e) => {
        setEmissionFile(e.target.files[0]);
    };

    const handleLicenseUpload = async () => {
        if (!licenseFile) {
            return alert("Please select a license file!");
        }

        const storage = getStorage(app);
        const fileName = new Date().getTime() + licenseFile.name;
        const storageRef = ref(storage, 'vehicleLicense/' + fileName);
        const uploadTask = uploadBytesResumable(storageRef, licenseFile);

        setUploadingLicense(true);

        try {
            await uploadTask;

            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            setLicenseDownloadURL(downloadURL);
            setUploadingLicense(false);
        } catch (error) {
            setUploadingLicense(false);
            setErrorAlert(true);
            console.error("License upload error:", error);
            alert("Failed to upload license file. Please try again later.");
        }
    };

    const handleEmissionUpload = async () => {
        if (!emissionFile) {
            return alert("Please select an emission file!");
        }

        const storage = getStorage(app);
        const fileName = new Date().getTime() + emissionFile.name;
        const storageRef = ref(storage, 'vehicleEmission/' + fileName);
        const uploadTask = uploadBytesResumable(storageRef, emissionFile);

        setUploadingEmission(true);

        try {
            await uploadTask;

            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            setEmissionDownloadURL(downloadURL);
            setUploadingEmission(false);
        } catch (error) {
            setUploadingEmission(false);
            setErrorAlert(true);
            console.error("Emission upload error:", error);
            alert("Failed to upload emission file. Please try again later.");
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            if (!licenseDownloadURL || !emissionDownloadURL) {
                return alert("Please wait for the uploads to complete!");
            }

            await Promise.all([
                axios.post(`https://hendriks-tea-management-system-backend.vercel.app/driver/uploadVehicleLicense`, { downloadURL: licenseDownloadURL }),
                axios.post(`https://hendriks-tea-management-system-backend.vercel.app/driver/uploadVehicleEmssion`, { downloadURL: emissionDownloadURL })
            ]);

            setLicenseDownloadURL('');
            setEmissionDownloadURL('');
            setLicenseFile(null);
            setEmissionFile(null);
            document.getElementById('license').value = '';
            document.getElementById('emission').value = '';

            setSuccessAlert(true);
            setTimeout(() => {
                setSuccessAlert(false);
            }, 5000);
            alert('success')
        } catch (error) {
            setErrorAlert(true);
            setTimeout(() => {
                setErrorAlert(false);
            }, 5000);
            console.error("Submit error:", error);
            alert('error')
        }
    };

    return (
        <div className="absolute mt-36 ml-80">
            <h1 className="text-2xl font-bold mb-4">Checking Vehicle Conditions</h1>
            <form onSubmit={handleSubmit} className="mt-10">
                <div className="mb-6">
                    <label htmlFor="license" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Add Driver's License</label>
                    <input
                        type="file"
                        id="license"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-5/6 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        required
                        accept='license/'
                        onChange={handleLicenseFileChange}
                    />
                </div>
                <button
                    type="button"
                    onClick={handleLicenseUpload}
                    className="absolute -mt-[75px] ml-[680px] focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                >
                    Confirm License
                </button>
                <div className="mb-6">
                    <label htmlFor="emission" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Add Vehicle Emission Test</label>
                    <input
                        type="file"
                        id="emission"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-5/6 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        required
                        accept='emission/'
                        onChange={handleEmissionFileChange}
                    />
                </div>
                <button
                    type="button"
                    onClick={handleEmissionUpload}
                    className="absolute -mt-[75px] ml-[680px] focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                >
                    Confirm Emission
                </button>
                <button
                    type="submit"
                    className={`text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 ${uploadingLicense || uploadingEmission ? 'opacity-50 cursor-not-allowed' : ''}`}
                    disabled={uploadingLicense || uploadingEmission}
                >
                    {uploadingLicense || uploadingEmission ? "Confirming..." : "Upload reports"}
                </button>
            </form>
        </div>
    );
}
