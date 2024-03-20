import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

export default function AddNewSale() {

    const { id } = useParams();
    const [teaType, setTeaType] = useState("");
    const [amount, setAmount] = useState("");
    const [sellingPrice, setSellingPrice] = useState("");
    const [standardPrice, setStandardPrice] = useState("");
    const [cusID, setCusID] = useState("");
    const [teaTypes, setTeaTypes] = useState([]);
    // const [totalPrice, setTotalPrice] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchTeaType = async () => {
            try {
                const res = await axios.get("http://localhost:5000/sales/stocks");
                const teaTypes = res.data.map(item => item.teaType);
                console.log(teaTypes);
                setTeaTypes(teaTypes);
            } catch (error) {
                console.log("error", error.message);
            }
        }

        fetchTeaType();
    }, []);

    const handleChangeTeaType = (selectedTeaType) => {
        setTeaType(selectedTeaType);

        const fetchStandardPrice = async () => {
            try {
                const res = axios.get(`http://localhost:5000/sales/getStandardPrice/${selectedTeaType}`);
                console.log((await res).data.standardPrice);
                setStandardPrice((await res).data.standardPrice);
            } catch (error) {
                console.log("error", error.message);
            }
        };
        fetchStandardPrice();
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = axios.post(`http://localhost:5000/sales/addSale/${id}`, {
                teaType,
                amount,
                sellingPrice,
                standardPrice,
                cusID,
            });
            alert("Sale added");
            console.log(res.data);

            setTeaType("");
            setAmount("");
            setSellingPrice("");
            setStandardPrice("");
        } catch (error) {
            alert("Error adding a sale!");
        }
    };

    const handleSalesSummary = () => {
        navigate(`/currentSale/${id}/${cusID}`);
    };

    return (
        <div className='absolute mt-48 left-1/3 w-1/2 '>
            <form onSubmit={handleSubmit}>
                <div class="mb-6">
                    <label for="cusID" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Enter Customer ID</label>
                    <input
                        type="password"
                        id="cusID"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="c123"
                        required
                        onChange={(e) => {

                            setCusID(e.target.value);
                        }}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="teaType" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Enter product name</label>
                    <select
                        className="form-control bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        value={teaType}
                        onChange={(e) => handleChangeTeaType(e.target.value)}
                        required
                    >
                        <option value="">Select Tea Type</option>
                        {teaTypes.map((type, index) => (
                            <option key={index} value={type}>{type}</option>
                        ))}
                    </select>
                </div>
                <div className="mb-3">
                    <label htmlFor="amount" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Enter tea amount</label>
                    <input
                        type="text"
                        className="form-control bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        required
                        placeholder='100 KG'
                        id="amount"
                        onChange={(e) => setAmount(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="standardPrice" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Standard price</label>
                    <input
                        type="text"
                        className="form-control bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        required
                        placeholder='LKR 1000'
                        id="standardPrice"
                        value={standardPrice}
                        readOnly
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="sellingPrice" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Enter tea selling price</label>
                    <input
                        type="text"
                        className="form-control bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        required
                        placeholder='LKR 1000'
                        id="sellingPrice"
                        onChange={(e) => setSellingPrice(e.target.value)}
                    />
                </div>

                <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Add sale</button>
            </form>
            <button type="button" className="mt-5 focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800" onClick={handleSalesSummary}>Confirm Sale</button>
        </div >
    );
}