import React, { useState , useEffect ,useRef} from 'react'
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

    

    const [allpaymentdetails,setAllPaymentDetails] = useState([]);
    const [sumofpayamount,setTotalPayAmount] = useState(0);
    const [sumofcreditamount,setTotalCreditAmount] = useState(0);
    const [paymentsForDay, setPaymentsForDay] = useState([]);
    const chartRef = useRef(null);

    //for month 
    const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
    const [totalAmountForMonth , settotalAmount] = useState(0);
    const [totalCreditAmountForMonth , settotalCreditAmount] = useState(0);
    const [PaymentCountForMonth , setCountOfPayments] = useState(0);
    const [PaymentObjectForTHisMonth , setPaymentObject] = useState([]);

    
    useEffect(() => {
      getallpaymentdetails();
  }, [selectedMonth]);


    const getallpaymentdetails = () => {
        axios.get(`https://hendriks-tea-management-system-backend.vercel.app/paymentdetails`).then(response => {
            setAllPaymentDetails(response.data);
            calculateSumOfPayAmount(response.data);
            calculateSumofCreditAmount(response.data);
            getTotalAmountForThisMonth(response.data);
        }).catch((err) => {
          console.log(err);
        })
      }

      const calculateSumOfPayAmount = (paymentDetails) => { 
        const sum = paymentDetails.reduce((acc, payment) => acc + payment.payamount, 0);
        setTotalPayAmount(sum);
      };

      const calculateSumofCreditAmount = (paymentDetails) => {
        const sum = paymentDetails.reduce((acc,payment) => acc + payment.creditamount, 0);
        setTotalCreditAmount(sum);
      };

      //count today payments
      const countPaymentsForToday = (allpaymentdetails) => {
        const today = new Date().toISOString().split('T')[0]; 
        const todayPayments = allpaymentdetails.filter(payment => {
            const paymentDate = new Date(payment.dateandtime).toISOString().split('T')[0];
            return paymentDate === today;
        });
        return todayPayments.length;
    };

      //calculate today total income
      const sumOfTotalAmountForToday = (allpaymentdetails) => {
        const todaydate = new Date().toISOString().split('T')[0];
        const { paytotalAmountForToday } = allpaymentdetails.reduce((result, payment) => {
        const paymentDate = new Date(payment.dateandtime).toISOString().split('T')[0];
        if (paymentDate === todaydate) {
          result.paytotalAmountForToday += payment.payamount;
        }
        return result;
      }, { paytotalAmountForToday: 0 });

    return paytotalAmountForToday;
}


    //calculate monthly total income
    const getTotalAmountForThisMonth = (allpaymentdetails) => {
      const currentDate = new Date();
      const currentMonth = currentDate.getMonth();
      const currentYear = currentDate.getFullYear();

      // Filter payments for the current month
      const paymentsThisMonth = allpaymentdetails.filter(payment => {
        const paymentDate = new Date(payment.dateandtime); // Assuming date is a property in each payment object
        return paymentDate.getMonth() === selectedMonth && paymentDate.getFullYear() === currentYear;
      });

      //store payment object
      setPaymentObject(paymentsThisMonth)

      // Calculate the total amount for this month
      const totalAmount = paymentsThisMonth.reduce((total, payment) => total + payment.payamount, 0);
      settotalAmount(totalAmount)
      
      // Calculate the credit amount for this month
      const creditAmount = paymentsThisMonth.reduce((total, payment) => total + payment.creditamount, 0);
      settotalCreditAmount(creditAmount)

      // Calculate the credit amount for this month
      const countOfPayments = paymentsThisMonth.length
      setCountOfPayments(countOfPayments)

    return countOfPayments;
    }

    const getMonthName = (selectedMonth) => {
      const monthIndex = parseInt(selectedMonth);
      const monthName = new Date(new Date().getFullYear(), monthIndex, 1).toLocaleString('default', { month: 'long' });
      return monthName;
  };

      const downloadPageAsPDF = () => {
        const opt = {
            margin: 1,
            filename: 'report.pdf',
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2 },
            jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
        };
        const content = `
            <div class="p-1">
              <img src="${logo}" alt="Logo" class="w-48 mx-auto mb-8" />
              <h1 class="text-3xl font-bold text-center mb-4">Payment Report <span class="text-sm">(for May)</span></h1>
              <p class="mb-4">Total Income: ${totalAmountForMonth} LKR</p>
              <p class="mb-4">Pending Amount: ${Math.abs(totalCreditAmountForMonth)} LKR</p>
              <p class="mb-4">Number of Payments: ${PaymentCountForMonth}</p>
              <h2 class="text-xl font-semibold mb-2">Payments Details</h2>
              <div class="overflow-x-auto">
                <table class="w-full border-collapse border border-gray-400">
                  <thead>
                    <tr class="bg-gray-200">
                        <th class="border border-gray-400 px-2 py-2">Customer ID</th>
                        <th class="border border-gray-400 px-2 py-2">Customer Name</th>
                        <th class="border border-gray-400 px-2 py-2">Total Amount <span class="text-xs">(LKR)</span></th>
                        <th class="border border-gray-400 px-2 py-2">Pay Amount <span class="text-xs">(LKR)</span></th>
                        <th class="border border-gray-400 px-2 py-2">Credit Amount <span class="text-xs">(LKR)</span></th>
                        <th class="border border-gray-400 px-2 py-2">Date</th>
                        <th class="border border-gray-400 px-2 py-2">Time</th>
                    </tr>
                 </thead>
                <tbody>
                    ${PaymentObjectForTHisMonth.map(payment => `
                        <tr class="text-center">
                            <td class="border border-gray-400 px-2 py-2">${payment.customerID}</td>
                            <td class="border border-gray-400 px-2 py-2">${payment.customerName}</td>
                            <td class="border border-gray-400 px-2 py-2">${payment.totalamount}</td>
                            <td class="border border-gray-400 px-2 py-2">${payment.payamount}</td>
                            <td class="border border-gray-400 px-2 py-2">${payment.creditamount}</td>
                            <td class="border border-gray-400 px-2 py-2">${new Date(payment.dateandtime).toLocaleDateString()}</td>
                            <td class="border border-gray-400 px-2 py-2">${new Date(payment.dateandtime).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit', hour12: true})}</td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        </div>
    </div>

    
    
        `;
        html2pdf().from(content).set(opt).save();
    };

    //pie chart
    const data = [
      ["Task", "Amount"],
      ["Total Income", sumofpayamount ],
      ["Total credit amount of all customers", sumofcreditamount],
    ];
  
    const options = {
      title: "",
      colors: ["#7CFC00", "#FF1111"]
    }; 
    


  return (
    <div>
      
     <AdminNavigation/>
      
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>

      
      <div style={{ display: 'flex', alignItems: 'center' }}>
      <div style={{ marginRight: '20px' }}>
        <h2>Total Income</h2>
        <p>Total credit amount of all customers</p>
      </div>
      <Chart
        chartType="PieChart"
        data={data}
        options={options}
        width={"100%"}
        height={"400px"}
      />
    </div>

    <br></br>

    
    <div style={{marginLeft:500}}>
    <div style={{marginLeft:-200, width:1100, height:180}} className="flex flex-col items-start bg-gray-100 p-8 rounded-lg border  border-gray-300">
      <h1 style={{marginLeft:40}} className="text-2xl font-bold mb-8 ">Today payments: {countPaymentsForToday(allpaymentdetails)}</h1>
      <h1 style={{marginLeft:40, marginTop:10}} className="text-2xl font-bold mb-8 ">Today total Income: {sumOfTotalAmountForToday(allpaymentdetails)}LKR</h1>

      <select style={{marginLeft:700, marginTop:-140}} value={selectedMonth} onChange={(e) => setSelectedMonth(parseInt(e.target.value))}>
        {[...Array(12)].map((_, index) => {
            const month = new Date().getMonth();
            const disabled = index > month; // Disable months after the current month
            return (
                <option key={index} value={index} disabled={disabled}>
                    {new Date(new Date().getFullYear(), index, 1).toLocaleString('default', { month: 'long' })}
                </option>
            );
        })}
    </select>

      <button style={{marginLeft:650, marginTop:20}} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-4 px-4 rounded mr-2" onClick={downloadPageAsPDF}>Download Monthly Report</button>
  
    </div>

    </div>
    
    </div>
  )
}

export default PaymentAdminHome
