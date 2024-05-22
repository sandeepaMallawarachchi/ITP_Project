import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useParams } from "react-router-dom";

export default function SearchResult() {
  const { id } = useParams();

  //initialize state to store search results
  const [result, setResult] = useState([]);

  //returns an object that represents current URL location in the app
  const location = useLocation();

  //contains the query string part of the URL
  const queryParams = new URLSearchParams(location.search);

  //get the value in the query parameter q
  const value = queryParams.get("q");

  //console.log(value)

  useEffect(() => {
    const fetchData = async () => {
      try {
        //get the searched data from db
        const res = await axios.get(
          `https://hendriks-tea-management-system-backend.vercel.app/inventory/product/searchTeapack?q=${value}`
        );
        //console.log(res.data);
        setResult(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [value]);

  return (
    <div style={{ marginTop: "10rem", marginLeft: "23rem" }}>
      {result.length === 0 ? (
        <span style={{ marginLeft: "15rem", fontSize: "1.5rem" }}>
            There is no such product in inventory...
        </span>
      ) : (
        <table style={{ width: "90%" }}>
          <thead className="bg-blue-50 border-b-2 border-gray-200 ">
            <tr>
              <th className="p-3 text-sm font-semibold tracking-wide text-left w-52">
                Product name
              </th>
              <th className="p-3 text-sm font-semibold tracking-wide text-left">
                Tea type
              </th>
              <th className="p-3 text-sm font-semibold tracking-wide text-left">
                Stock Level
              </th>
              <th className="p-3 text-sm font-semibold tracking-wide text-left">
                Unit Price
              </th>
              <th className="p-3 text-sm font-semibold tracking-wide text-left">
                Weight
              </th>
              <th className="p-3 text-sm font-semibold tracking-wide text-left">
                manDate
              </th>
              <th className="p-3 text-sm font-semibold tracking-wide text-left">
                expDate
              </th>
              <th className="p-3 text-sm font-semibold tracking-wide text-left">
                Reorder Level
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {result.map((item, index) => {
              var toColor = false;
              if (item.stockLevel <= item.reorderLevel) {
                toColor = true;
              }
              return (
                <tr key={index} className="hover:bg-blue-50">
                  <td className="p-3 text-sm text-gray-500 w-52">
                    {item.productName.toUpperCase()}
                  </td>
                  <td className="p-3 text-sm text-gray-500">
                    {item.teaType.toUpperCase()}
                  </td>
                  <td
                    className="p-3 text-sm text-gray-500"
                    style={{ color: toColor ? "red" : "green" }}
                  >
                    {item.stockLevel}
                  </td>
                  <td className="p-3 text-sm text-gray-500">
                    {item.unitPrice}
                  </td>
                  <td className="p-3 text-sm text-gray-500">{item.weight}</td>
                  <td className="p-3 text-sm text-gray-500">
                    {new Date(item.manDate).toLocaleDateString()}
                  </td>
                  <td className="p-3 text-sm text-gray-500">
                    {new Date(item.expDate).toLocaleDateString()}
                  </td>
                  <td className="p-3 text-sm text-gray-500">
                    {item.reorderLevel}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
}
