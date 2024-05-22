import React, { useState } from 'react';
import axios from 'axios';

const UploadImage = () => {
    const [file1, setFile1] = useState(null);
    const [file2, setFile2] = useState(null);
    const [uploadStatus, setUploadStatus] = useState('');

    const handleFile1Change = (event) => {
        setFile1(event.target.files[0]);
    };

    const handleFile2Change = (event) => {
        setFile2(event.target.files[0]);
    };

    const handleUpload = async () => {
        if (!file1 || !file2) {
            alert('Please select both files');
            return;
        }

        const formData1 = new FormData();
        formData1.append('image', file1);

        const formData2 = new FormData();
        formData2.append('image', file2);

        try {
            const response1 = await axios.post('https://hendriks-tea-management-system-backend.vercel.app/License/upload', formData1, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log('Response 1:', response1.data);

            const response2 = await axios.post('https://hendriks-tea-management-system-backend.vercel.app/License/upload', formData2, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log('Response 2:', response2.data);

            setUploadStatus('Upload successful');
        } catch (error) {
            console.error('Error uploading images:', error);
            setUploadStatus('Upload failed');
        }
    };

    return (
        <div>
            <h2>Upload Images</h2>
            <div>
                <label>Image 1:</label>
                <input type="file" onChange={handleFile1Change} />
            </div>
            <div>
                <label>Image 2:</label>
                <input type="file" onChange={handleFile2Change} />
            </div>
            <button onClick={handleUpload}>Upload</button>
            {uploadStatus && <p>{uploadStatus}</p>}
        </div>
    );
};

export default UploadImage;
