import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import axios from "axios"
import Navigation from './Navigation';
import cardimg from '../../images/card.png'


function Cardpayment() {

  const { id } = useParams();
  const [cardnumber, setCardNumber] = useState("");
  const [cardholdername, setCardHolderName] = useState("");
  const [CVV, setCVV] = useState("");
  const [CardDetails, setCardDetails] = useState("");
  const [errCardHolderName, setErrCardHolderName] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    getCardDetails();

  }, []);

  function sendData(e) {
    e.preventDefault();

    const newPayment = {
      cardnumber,
      cardholdername,
      CVV
    }

    axios.post("https://hendriks-tea-management-system-backend.vercel.app/payment/add", newPayment).then(() => {
      alert("Card details added ! ");
    }).catch((err) => {
      alert(err);
    })

  }

  const getCardDetails = () => {
    axios.get(`https://hendriks-tea-management-system-backend.vercel.app/payment/`).then(response => {
      setCardDetails(response.data);
    }).catch((err) => {
      console.log(err);
    })
  }

  function AdminValidation() {
    for (const card of CardDetails) {

      const CardNumber = parseInt(cardnumber);
      const cvv = parseInt(CVV);

      if (CardNumber === card.cardnumber && cardholdername === card.cardholdername && cvv === card.CVV) {
        console.log("Success ! ");
        navigate(`/payment/cash/${id}`);
        return; //if found one match it exit the loop
      }
    }
    console.log("invalid");
    alert("Invalid Card Details !");
  }

  const handleCardHolderNameChange = (e) => {
    const value = e.target.value;
    // Remove any non-alphabetic characters from the input
    const sanitizedValue = value.replace(/[^A-Za-z\s]/g, '');
    setCardHolderName(sanitizedValue);
    // If the original value and the sanitized value are different, it means non-allowed characters were removed
    if (value !== sanitizedValue) {
      setErrCardHolderName(true);
    } else {
      setErrCardHolderName(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center mt-20" style={{ marginTop: 350, marginLeft: -50 }}>
      <Navigation />

      <img src={cardimg} alt="Card image" style={{ marginLeft: 700, marginTop: -200, width: 600 }} />


      <div className="border border-gray-300 p-8 rounded-lg max-w-md mx-auto mt-8" style={{ marginTop: "-440px", marginLeft: "430px" }}>
        <form>
          <h1 className="text-3xl mb-8">Enter card details</h1>
          <input placeholder='Card Number' type='number' className="w-72 h-10 px-4 mb-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 transition-colors duration-300" onChange={(e) => {
            setCardNumber(e.target.value);
          }} required />
          <br></br>

          <input placeholder='Card Holder Name' type='text' value={cardholdername} className={`w-72 h-10 px-4 mb-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 transition-colors duration-300 ${errCardHolderName ? 'border-red-600 border-2 focus:ring-red-600' : ''}`}
            onChange={handleCardHolderNameChange}
            required />
          <br></br>

          <input placeholder='CVV' type="number" inputMode="numeric" className="w-72 h-10 px-4 mb-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 transition-colors duration-300" onChange={(e) => {
            setCVV(e.target.value);
          }} required />
          <br></br><br></br>

          <div className="flex justify-center">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2" onClick={AdminValidation}>Submit</button>
          </div>
        </form>
      </div>

    </div>
  )
}

export default Cardpayment