// App.js
import React from "react";
import { FlutterWaveButton, closePaymentModal } from "flutterwave-react-v3";

const email = "rynstensis@gmail.com";
const phone_number = "+254791798403";
const name = "Irene";

const Flutter = () => {
 

  const config = {
    public_key: "FLWPUBK_TEST-d6c75c7c10b49db084e51fc3c0eb6f0e-X",
    tx_ref: Date.now(),
    amount: 100,
    currency: "KES",
    payment_options: "card,mobilemoney,ussd",
    customer: {
      email: email,
      phone_number: phone_number,
      name: name,
    },
    customizations: {
      title: "My learning experience",
      description: "Payment for testing purposes",
      logo: "https://st2.depositphotos.com/4403291/7418/v/450/depositphotos_74189661-stock-illustration-online-shop-log.jpg",
    },
  };

  const fwConfig = {
    ...config,
    text: "Pay with Flutterwave!",
    callback: (response) => {
      console.log(response);
      closePaymentModal();
    },
    onClose: () => {},
  };

  return (
    <div className="App">
      <h1>
     
        <FlutterWaveButton {...fwConfig} />
      </h1>
    </div>
  );
};

export default Flutter;
