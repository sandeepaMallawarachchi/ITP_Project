import React, { useState, useEffect } from "react";
import { Timeline, Alert } from "flowbite-react";
import axios from "axios";
import { HiArrowNarrowRight, HiCalendar, HiInformationCircle } from "react-icons/hi";

export default function DeliveryStatus() {

    const [cusID, setCusID] = useState("");
    const [salesSummary, setSalesSummary] = useState({
        date: "",
    });
    const [location, setLocation] = useState({
        address: "",
    });
    const [error, setError] = useState(false);
    const [errorsAlert, setErrorAlert] = useState(false);

    useEffect(() => {
        const fetchLocation = async () => {
            try {
                const res = await axios.get(`https://hendriks-tea-management-system-backend.vercel.app/tea/getCustomerLocation`, { cusID: cusID });

                if (res.data.error) {
                    setError(true);
                    setLocation({ address: "" });
                } else {
                    const locationData = res.data.location;
                    setLocation({ address: locationData.address }); // Set the address directly
                    setError(false);
                }
            } catch (error) {
                setError(true);
                setErrorAlert(true);
                console.log("Error fetching details", error.message);
            }
        };

        if (cusID.trim() !== "") {
            fetchLocation();
        } else {
            setError(false);
            setErrorAlert(false);
            setLocation({ address: "" });
        }
    }, [cusID]);


    useEffect(() => {
        const fetchSalesDetails = async () => {
            try {
                const res = await axios.get(`https://hendriks-tea-management-system-backend.vercel.app/sales/getSalesSummary/${cusID}`);

                if (res.data.error) {
                    setError(true);
                    setSalesSummary({
                        date: "",
                    });
                } else {
                    const saleData = res.data.sale || res.data;
                    const { date } = saleData;
                    setSalesSummary({ date });
                    setError(false);
                }
            } catch (error) {
                setError(true);
                setErrorAlert(true);

                // setTimeout(() => {
                //     setErrorAlert(false);
                // }, 3000);

                console.log("Error fetching details", error.message);
            }
        };

        if (cusID.trim() !== "") {
            fetchSalesDetails();
        } else {
            setError(false);
            setErrorAlert(false);
            setSalesSummary({
                date: "",
            });
        }
    }, [cusID]);

    const handleChangeCusID = (e) => {
        const inputCusID = e.target.value.trim();
        setCusID(inputCusID);
        if (error && inputCusID !== "") {
            setError(false);
            setErrorAlert(false);
        }
    };

    return (
        <div className="flex justify-center items-center h-screen">
            <div className="w-1/2 p-10 ml-60"> {/* Increase left border by 60px */}
            <h1 className="text-2xl mb-4">Customer Details</h1>
                <Alert color="failure" icon={HiInformationCircle} className={`absolute ${errorsAlert ? 'w-full text-center -mt-14' : 'hidden'}`}>
                    <span className="font-medium">Invalid customer ID!</span>
                </Alert>
                <div className="mb-6">
                    <label for="cusID" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Enter Customer ID</label>
                    <input
                        type="text"
                        id="cusID"
                        placeholder="c123"
                        className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${error ? 'border-red-600 border-2 focus:ring-red-600' : ''}`}
                        required
                        onChange={handleChangeCusID}
                    />
                </div>

                <form>
                    <div className="mb-6">
                        <label for="date" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Current date</label>
                        <input
                            type="text"
                            id="date"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            required
                            readOnly
                            value={salesSummary.date}
                        />
                    </div>

                    <div className="mb-6">
                        <label for="location" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Customer location</label>
                        <input
                            type="text"
                            id="location"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            required
                            readOnly
                            value={location.address}
                        />
                    </div>
                </form>
            </div>
            <div className="w-1/2 p-10">
                <div className="mt-10">
                    <h1 className='text-2xl font-bold mb-10'>Delivery Status</h1>

                    <Timeline className="w-100">
                        <Timeline.Item>
                            <Timeline.Point icon={HiCalendar} className="w-10 h-10" />
                            <Timeline.Content>
                                <Timeline.Time>February 2022</Timeline.Time>
                                <Timeline.Title>Delivered</Timeline.Title>
                            </Timeline.Content>
                        </Timeline.Item>
                        <Timeline.Item>
                            <Timeline.Point icon={HiCalendar} className="w-10 h-10" />
                            <Timeline.Content>
                                <Timeline.Time>March 2022</Timeline.Time>
                                <Timeline.Title>Out for delivery</Timeline.Title>
                            </Timeline.Content>
                        </Timeline.Item>
                    </Timeline>
                </div>
            </div>
        </div>
    );
}
