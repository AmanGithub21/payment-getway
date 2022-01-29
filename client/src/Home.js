import axios from "axios";
import { useState } from "react";

import "./css/Home.css";

function Home() {
  const [amount, setAmount] = useState("");
  const handleChange = (e) => setAmount(e.target.value);
  const handlePay = async (e) => {
    e.preventDefault();
    var options = {
      key: process.env.REACT_APP_RAZORPAY_KEY_ID, // Enter the Key ID generated from the Dashboard
      amount: amount * 100, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      currency: "INR",
      name: "Test Payment",
      order_id: await axios.get("https://payment-getway.herokuapp.com/orderId"), //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
      handler: function (response) {
        alert("Payment Successsfull");
      },
    };
    var rzp1 = new window.Razorpay(options);
    rzp1.open();
  };
  return (
    <div className="Home">
      <div className="pay-form">
        <h2 className="title">Make a test payment</h2>
        <input
          className="form-control pay-input"
          type="text"
          value={amount}
          onChange={handleChange}
          placeholder="Amount..."
          autoFocus
        />
        <button
          className="btn btn-outline-dark pay-button mt-3"
          onClick={handlePay}
        >
          <i className="fas fa-lock"></i> Pay
        </button>
      </div>
    </div>
  );
}
export default Home;
