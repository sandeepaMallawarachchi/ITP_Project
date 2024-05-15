import React, { useState , useEffect} from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios';

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
                const response = await axios.get(`http://localhost:8070/paymentdetails/get/${id}`);
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
        const response = await axios.put(`http://localhost:8070/paymentdetails/update/${id}`,{
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
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        

        <ul>
                {paymentDetails.map((payment, index) => (
                    <li key={index}>
                        <h2 style={{display: 'flex' , justifyContent:'center' , alignItems: 'center'}}>Amount  :  {payment.totalamount}</h2>
                        <h2>Your Previous credit amount : {(sumofprevoiuscreditamounts)-(payment.creditamount)}</h2>
                        <h2>Total amount You have to pay : {parseInt(payment.totalamount)+parseInt(sumofprevoiuscreditamounts)-(payment.creditamount)}</h2>
                        <br></br>
                        <label>Pay amount : </label>
                        <input placeholder={payment.payamount} id="form2Example1" class="form-control" style={{height : 50 , width : 400}} onChange={(e) => {
                            setUpdatePayment(e.target.value);
                        }}/>

                        <br></br>
                        <label>Credit Amount : </label>
                        <input id="form2Example1" class="form-control" value={calculateCreditAmount(payment)} style={{height : 50 , width : 400}} readOnly />


                        <br></br>
                        <button onClick={handleupdate} class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" >Update</button>


                        
                        
                    </li>
                ))}
            </ul>
    </div>
  )
}

export default UpdatePaymentDetails2