import React, { useState, useEffect } from 'react';
import axios from 'axios';

function SearchByName() {
    const [searchValue, setSearchValue] = useState("");
    const [stockDetails, setStockDetails] = useState([]);
    const [filteredStockDetails, setFilteredStockDetails] = useState([]);

    useEffect(() => {
        fetchStockDetails();
    }, []);

    useEffect(() => {
        filterStockDetails();
    }, [searchValue, stockDetails]);

    const fetchStockDetails = () => {
        axios.get(`http://localhost:8070/sales/stock`)
            .then(response => {
                setStockDetails(response.data);
                setFilteredStockDetails(response.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    const filterStockDetails = () => {
        if (searchValue.trim() === "") {
            setFilteredStockDetails(stockDetails);
        } else {
            const filteredData = stockDetails.filter(stock =>
                stock.teaType && stock.teaType.toLowerCase().includes(searchValue.toLowerCase())
            );
            setFilteredStockDetails(filteredData);
        }
    }

    return (
        <div>
            <div className="ml-8 mt-4 relative">
                <input
                    style={{ paddingLeft: '30px' }}
                    placeholder="Search"
                    onChange={(e) => setSearchValue(e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400"
                >
                    <path
                        d="M21.707 20.293l-5.285-5.285a7.48 7.48 0 10-.708.708l5.285 5.285a.5.5 0 00.707 0 .5.5 0 000-.707zM3 10.5a7.5 7.5 0 1114.998-.002A7.5 7.5 0 013 10.5z"
                    />
                </svg>
            </div>

            {filteredStockDetails.length > 0 ? (
                <div>
                    {filteredStockDetails.map((stock, index) => (
                        <h2 key={index}>Stock Details: {stock.teaType}</h2>
                    ))}
                </div>
            ) : (
                <div>No results found</div>
            )}
        </div>
    );
}

export default SearchByName;
