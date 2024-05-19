import React, { useState , useEffect} from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios';
import Navigation from './Navigation';

function UpdatePaymentDetails2() {

    const {id} = useParams();
    const sumofprevoiuscreditamounts = sessionStorage.getItem('sumofprevoiuscreditamounts');
    const [paymentDetails, setPaymentDetails] = useState([]);
    const [updatepayamount ,setUpdatePayment] = useState("");
    const [creditamount , setCreditAmount] = useState("");
    const [totalamount, setTotalAmount] = useState(0);

    useEffect(() => {
        const fetchPaymentDetails = async () => {
            try {
                const response = await axios.get(`https://hendriks-tea-management-system-backend.vercel.app/paymentdetails/get/${id}`);
                setPaymentDetails(response.data);

                if (response.data.length > 0) {
                    const total = response.data[0].totalamount;
                    setTotalAmount(total);
                }
            } catch (error) {
                console.error('Error fetching payment details:', error);
            }
        };

        fetchPaymentDetails();
    }, [id]);

   

    const handleupdate = async () => {
        const response = await axios.put(`https://hendriks-tea-management-system-backend.vercel.app/paymentdetails/update/${id}`,{
            payamount : updatepayamount,
            creditamount : totalamount - updatepayamount,

        })
        

    }

    function calculateCreditAmount  (paymentDetails)  {
        const totalamount = paymentDetails.totalamount;
        const remainingAmount = totalamount - updatepayamount;
        return remainingAmount;
    }


  return (

    <div style={{ marginLeft : 100, marginTop:350}}>
        
        <Navigation/>
        <ul>
                {paymentDetails.map((payment, index) => (
                    <li key={index}>
                        
                        <div  className="border border-gray-300 p-4 rounded-lg max-w-md mx-auto mt-8" style={{marginTop:"-70px", marginLeft:"450px"}}>
                            <div className="flex justify-between mb-2">
                                <span className="font-semibold">Amount: </span>
                                 <span className="text-right">{payment.totalamount} LKR</span>
                            </div>
                            <div className="flex justify-between mb-2">
                                <span className="font-semibold">Your Previous credit amount :</span>
                                 <span className="text-right">{(sumofprevoiuscreditamounts)-(payment.creditamount)} LKR</span>
                            </div>
                            <div className="flex justify-between mb-2">
                                <span className="font-semibold">Total amount You have to pay :</span>
                                 <span className="text-right">{parseInt(payment.totalamount)+parseInt(sumofprevoiuscreditamounts)-(payment.creditamount)} LKR</span>
                            </div>
                    
                        
                        <br></br>
                        <label style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} className="font-semibold">Pay amount</label>
                        <input className="form-control h-12 w-full px-4 mb-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 transition-colors duration-300" placeholder={payment.payamount} id="form2Example1" style={{height : 50 , width : 400}} onChange={(e) => {
                            setUpdatePayment(e.target.value);
                        }}/>

                        <br></br>
                        <label style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} className="font-semibold">Credit Amount</label>
                        <input className="form-control h-12 w-full px-4 mb-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 transition-colors duration-300" id="form2Example1" value={calculateCreditAmount(payment)} style={{height : 50 , width : 400}} readOnly />


                        <br></br>
                        <div className="flex justify-center mt-2">
                        <button onClick={handleupdate} class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" >Update</button>
                        </div>

                        </div>
                        
                    </li>
                ))}
            </ul>
    </div>
  )
}

export default UpdatePaymentDetails2