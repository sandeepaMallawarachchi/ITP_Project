import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios';
import { Chart } from "react-google-charts";
import { Link } from 'react-router-dom';
import Navigation from './Navigation';
import AdminNavigation from './AdminNavigation';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import html2pdf from 'html2pdf.js';
import logo from '../../images/logo.png'


function PaymentAdminHome() {



  const [allpaymentdetails, setAllPaymentDetails] = useState([]);
  const [sumofpayamount, setTotalPayAmount] = useState(0);
  const [sumofcreditamount, setTotalCreditAmount] = useState(0);
  const [paymentsForDay, setPaymentsForDay] = useState([]);
  const chartRef = useRef(null);


  useEffect(() => {
    getallpaymentdetails();

  }, []);


  const getallpaymentdetails = () => {
    axios.get(`http://localhost:8070/paymentdetails/`).then(response => {
      setAllPaymentDetails(response.data);
      calculateSumOfPayAmount(response.data);
      calculateSumofCreditAmount(response.data);
      filterPaymentsForToday(response.data);
    }).catch((err) => {
      console.log(err);
    })
  }

  const calculateSumOfPayAmount = (paymentDetails) => {
    const sum = paymentDetails.reduce((acc, payment) => acc + payment.payamount, 0);
    setTotalPayAmount(sum);
  };

  const calculateSumofCreditAmount = (paymentDetails) => {
    const sum = paymentDetails.reduce((acc, payment) => acc + payment.creditamount, 0);
    setTotalCreditAmount(sum);
  };

  const filterPaymentsForToday = (paymentDetails) => {
    const today = new Date().toISOString().split('T')[0]; // Get today's date in 'YYYY-MM-DD' format
    const todayPayments = paymentDetails.filter(payment => payment.date === today);
    setPaymentsForDay(todayPayments);
  };



  const data = [
    ["Task", "Amount"],
    ["Total Income", sumofpayamount],
    ["Total credit amount of all customers", sumofcreditamount],
  ];

  const options = {
    title: "",
    colors: ["#7CFC00", "#FF1111"]
  };

  const downloadPageAsPDF = () => {
    const element = document.body; // Get the body element
    const opt = {
      margin: 1,
      filename: 'report.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    };
    const contentWithLogo = `
    <div style="padding: 20px;">
      <img src="${logo}" style="width: 200px; height: auto; margin-bottom: 20px;" />
      ${element.innerHTML}
    </div>
  `;
    html2pdf().from(element).set(opt).save();
  };


  return (
    <div>

      <AdminNavigation />

      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>

      <Chart
        chartType="PieChart"
        data={data}
        options={options}
        width={"100%"}
        height={"400px"}
      />

      <br></br>


      <div style={{ marginLeft: 500 }}>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2" onClick={downloadPageAsPDF}>Download Report</button>
      </div>
    </div>
  )
}

export default PaymentAdminHome
