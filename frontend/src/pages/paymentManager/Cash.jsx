import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaRegFaceGrinStars, FaRegFaceSadCry, FaRegFaceGrin } from 'react-icons/fa6';
import Navigation from './Navigation';

function Cash() {
  const { cusID, cusName, totalamount, id } = useParams();
  const [payamount, setPayamount] = useState('');
  const [customerID, setCustomerID] = useState('');
  const [paymentDetails, setPaymentDetails] = useState([]);
  const [customerName, setCustomerName] = useState('');
  const [showRedAlert, setShowRedAlert] = useState(false);
  const [bannedStatus, setBannedStatus] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (cusID) {
      const id = parseInt(cusID.replace('c', ''));
      setCustomerID(id);
      setCustomerName(cusName);
    }
  }, [cusID, cusName]);

  useEffect(() => {
    if (customerID) {
      previouscreditamount();
      checkBannedStatus();
    }
  }, [customerID]);

  function getdate() {
    return new Date();
  }

  const setUnBanned = async (customerID) => {
    await axios.put(`https://hendriks-tea-management-system-backend.vercel.app/paymentdetails/ban/${customerID}`, {
      bannedstatus: false,
    });
  };

  const sendData = (e) => {
    e.preventDefault();
    const payTimeDateFormate = getdate();
    setUnBanned(customerID);

    const newPaymentDetails = {
      customerID,
      customerName,
      totalamount,
      payamount,
      creditamount: calculate_credit_amount(),
      dateandtime: payTimeDateFormate,
    };

    axios
      .post('https://hendriks-tea-management-system-backend.vercel.app/paymentdetails/add', newPaymentDetails)
      .then(() => {
        navigate(`/payment/transactionReport/${id}`, {
          state: { customerID, payamount, totalcreditamount, payTimeDateFormate },
        });
      })
      .catch((err) => {
        alert(err);
      });
  };

  const previouscreditamount = () => {
    axios
      .get(`https://hendriks-tea-management-system-backend.vercel.app/paymentdetails/${customerID}`)
      .then((response) => {
        setPaymentDetails(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const checkBannedStatus = () => {
    if (customerID !== '') {
      axios
        .get(`https://hendriks-tea-management-system-backend.vercel.app/paymentdetails/${customerID}`)
        .then((response) => {
          const paymentdetails = response.data;

          const groupcustomers = paymentdetails.reduce((acc, payment) => {
            const { customerID, bannedstatus } = payment;
            acc[customerID] = acc[customerID] || [];

            if (!acc[customerID].includes(bannedstatus)) {
              acc[customerID].push(bannedstatus);
            }

            return acc;
          }, {});

          for (const [customerID, bannedStatuses] of Object.entries(groupcustomers)) {
            console.log(`Customer ID: ${customerID}`);
            console.log(`Banned Statuses: ${bannedStatuses.join(', ')}`);

            if (bannedStatuses.includes(true)) {
              setShowRedAlert(true);
              setBannedStatus(true);
            }
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  function calculate_credit_amount() {
    return totalamount - payamount;
  }

  const sumofprevoiuscreditamounts = paymentDetails.reduce(
    (total, payment) => total + payment.creditamount,
    0
  );
  const totalcreditamount = sumofprevoiuscreditamounts + calculate_credit_amount();
  const fulltotalamount = parseInt(totalamount) + sumofprevoiuscreditamounts;

  function check_pay_type() {
    if (payamount !== '') {
      if (!bannedStatus) {
        if (payamount == fulltotalamount) {
          return (
            <h2 className="text-blue-500">
              <span className="flex items-center">
                You Pay Fully <FaRegFaceGrinStars className="ml-2 size-7" />
              </span>{' '}
            </h2>
          );
        } else if (payamount == 0) {
          return (
            <h2 className="text-blue-500">
              <span className="flex items-center">
                You pay Full Creditly
                <FaRegFaceSadCry className="ml-2 size-7" />
              </span>
            </h2>
          );
        } else if (payamount < fulltotalamount) {
          return (
            <h2 className="text-blue-500">
              <span className="flex items-center">
                You Pay Partially <FaRegFaceGrin className="ml-2 size-7" />
              </span>
            </h2>
          );
        } else if (payamount > fulltotalamount) {
          return <h2 className="text-red-600">You can't Pay over limit !</h2>;
        } else {
          return null;
        }
      } else if (bannedStatus) {
        if (payamount > fulltotalamount) {
          return <h2 className="text-red-600">You can't Pay over limit!</h2>;
        } else {
          return <h2 className="text-red-600">You can Pay Full Payment only!</h2>;
        }
      }
    } else {
      return null;
    }
  }

  // const handlPayNavigations=()=>{
  //   navigate(`/payment/transactionReport/${id}`)
  // }

  return (
    <div>
      <br />

      <Navigation />

      <div style={{ marginLeft: '1100px', marginTop: '200px' }} hidden>
        <input type="text" placeholder="Customer ID" value={cusID} readOnly />
        <br />

        <input type="number" placeholder="Total amount you have to pay" value={totalamount} readOnly />
        <br />

        <input type="text" placeholder="Enter Customer Name" value={cusName} readOnly />
      </div>

      <div
        className="border border-gray-300 p-4 rounded-lg max-w-md mx-auto mt-8"
        style={{ marginTop: '250px', marginLeft: '600px' }}
      >
        <div className="flex justify-between mb-2">
          <span className="font-semibold">Amount: </span>
          <span className="text-right">{totalamount} LKR</span>
        </div>

        <div className="flex justify-between mb-2">
          <span className="font-semibold">Your Previous Credit Amount:</span>
          <span className="text-right">{sumofprevoiuscreditamounts} LKR</span>
        </div>

        <div className="flex justify-between mb-2">
          <span className="font-semibold">Full amount you have to pay:</span>
          <span className="text-right">{fulltotalamount} LKR</span>
        </div>

        <br />

        <input
          type="number"
          placeholder="Pay amount"
          id="form2Example1"
          className="form-control h-12 w-full px-4 mb-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 transition-colors duration-300"
          onChange={(e) => {
            setPayamount(e.target.value);
          }}
        />
        <br />

        <div className="flex justify-between mb-2">
          <span className="font-semibold">Your Total Credit Amount :</span>
          <span className="text-right">{totalcreditamount} LKR</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          {check_pay_type()}
        </div>
        <br />

        <div style={{ display: 'flex', justifyContent: 'center' }}>
          {/* <Link to={`/payment/transactionReport/${id}`}> */}
            <button

              disabled={(bannedStatus && payamount < fulltotalamount) || payamount > fulltotalamount}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={sendData}
            >
              Pay
            </button>
          {/* </Link> */}
          <br />
        </div>

        {showRedAlert && (
          <div className="fixed top-0 left-0 z-50 w-screen h-screen flex justify-center items-center backdrop-blur-lg">
            <div className="bg-red-500 text-white p-8 rounded-lg shadow-lg">
              <div className="text-2xl font-bold mb-4">Alert</div>
              <div className="text-lg mb-4">
                You are banned from making payments. Please contact the Payment Administrator or make Full Payment.
              </div>
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
                onClick={() => setShowRedAlert(false)}
              >
                Continue
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Cash;