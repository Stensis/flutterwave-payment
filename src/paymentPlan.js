import React, { useState } from "react";
import { FlutterWaveButton, closePaymentModal } from "flutterwave-react-v3";

const LoanRepayment = () => {
  const [paymentPlan, setPaymentPlan] = useState(null);
  const [paymentSuccessful, setPaymentSuccessful] = useState(false);

  // Function to create a payment plan
  const createPaymentPlan = async () => {
    try {
      const dummyResponse = {
        status: "success",
        message: "Payment plan created",
        data: {
          id: 12345,
          name: "Loan Repayment Plan",
          amount: 3300,
          interval: "monthly",
          duration: 3,
          status: "active",
          currency: "KES",
          plan_token: "dummy_plan_token",
          created_at: new Date().toISOString(),
        },
      };

      setPaymentPlan(dummyResponse.data);
    } catch (error) {
      console.error("Error creating payment plan", error);
    }
  };
  console.log("Public Key:", process.env.REACT_APP_PUBLIC_KEY);

  const handlePaymentButtonClick = () => {
    if (paymentPlan) {
      return (
        <FlutterWaveButton
          public_key={process.env.REACT_APP_PUBLIC_KEY} 
          tx_ref={Date.now()}
          amount={paymentPlan.amount}
          currency={paymentPlan.currency}
          payment_options="card,mobilemoney"
          customer={{
            email: "irenenjuguna98@gmail.com",
            phone_number: "+254791798403",
            name: "User Irene",
          }}
          customizations={{
            title: "Loan Repayment",
            description: "Monthly repayment for the loan",
            logo: "YOUR_LOGO_URL",
          }}
          payment_plan={paymentPlan.plan_token}
          callback={(response) => {
            console.log(response);
            setPaymentSuccessful(true);
            closePaymentModal();
          }}
          onClose={() => {}}
        />
      );
    }
  };

  return (
    <div>
      <button onClick={createPaymentPlan}>Payment Plan</button>
      {paymentPlan && (
        <div>
          <p>Payment Plan ID: {paymentPlan.id}</p>
          <p>
            Amount to be paid: {paymentPlan.amount} {paymentPlan.currency}
          </p>
          <p>Payment will be automatically deducted monthly</p>
          {handlePaymentButtonClick()}
          {paymentSuccessful && (
            <p style={{ color: "green" }}>
              Payment successful! Money deducted from the account.
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default LoanRepayment;
