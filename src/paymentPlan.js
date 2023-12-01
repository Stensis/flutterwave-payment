import React, { useState } from "react";
import { FlutterWaveButton, closePaymentModal } from "flutterwave-react-v3";

const CreatePaymentPlan = () => {
  const [paymentPlan, setPaymentPlan] = useState(null);

  const generateDummyPaymentPlan = () => {
    const dummyPlan = {
      id: 20,
      name: "Testing plan",
      amount: 5000,
      interval: "monthly",
      duration: 12,
      status: "active",
      currency: "KES",
    };

    return dummyPlan;
  };

  const handleCreatePaymentPlan = async () => {
    try {
      // Simulate creating a payment plan
      const createdPlan = generateDummyPaymentPlan();
      setPaymentPlan(createdPlan);
    } catch (error) {
      console.error("Error creating payment plan", error);
    }
  };

  const handlePaymentButtonClick = () => {
    if (paymentPlan) {
      const confirmed = window.confirm(
        `Do you want to pay ${paymentPlan.amount} ${paymentPlan.currency} to Flutterwave?`
      );

      if (confirmed) {
        // For recurring payments, set up the subscription on the server
        // and handle it securely using server-side logic.
        // You can create an endpoint on your server to initiate the subscription.

        // Example: initiateSubscription(paymentPlan.id);

        // For simplicity, let's assume initiateSubscription is a function that initiates the subscription.

        // Now, return the FlutterwaveButton component directly with a bigger button style
        return (
          <FlutterWaveButton
            public_key="FLWPUBK_TEST-d6c75c7c10b49db084e51fc3c0eb6f0e-X"
            tx_ref={Date.now()}
            amount={paymentPlan.amount}
            currency={paymentPlan.currency}
            payment_options="card,mobilemoney"
            customer={{
              email: "irenenjuguna98@gmail.com",
              phone_number: "+254791798403",
              name: "Irene",
            }}
            customizations={{
              title: "My learning experience",
              description: "Payment for testing purposes",
              logo: "https://st2.depositphotos.com/4403291/7418/v/450/depositphotos_74189661-stock-illustration-online-shop-log.jpg",
            }}
            payment_plan={paymentPlan.id}
            callback={(response) => {
              console.log(response);
              closePaymentModal();
            }}
            onClose={() => {}}            
          />
        );
      }
    }
  };

  return (
    <div>
      <button onClick={handleCreatePaymentPlan}>Create Payment Plan</button>
      {paymentPlan && (
        <div>
          <p>Payment Plan ID: {paymentPlan.id}</p>
          <p>
            Amount to be paid: {paymentPlan.amount} {paymentPlan.currency}
          </p>
          <p>Click the button to confirm payment</p>
         
          {handlePaymentButtonClick()}
         
        </div>
      )}
    </div>
  );
};

export default CreatePaymentPlan;
