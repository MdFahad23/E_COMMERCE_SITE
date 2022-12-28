import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { initPayment } from "../../api/apiOrder";
import { userInfo } from "../../util/auth";

const Payment = () => {
  const [sessionSuccess, setSessionSuccess] = useState(false);
  const [failed, setFailed] = useState(false);
  const [redirectUrl, setRedirectUrl] = useState("");

  useEffect(() => {
    initPayment(userInfo().jwt)
      .then((res) => {
        if (res.data.status === "SUCCESS") {
          setSessionSuccess(true);
          setRedirectUrl(res.data.GatewayPageURL);
          setFailed(false);
        }
      })
      .catch((err) => {
        setFailed(true);
        sessionSuccess(false);
      });
  }, []);

  return (
    <div>
      {sessionSuccess
        ? (window.location = redirectUrl)
        : "Payment is Processing..."}
      {failed ? (
        <>
          <p>Failed to start Payment Session...</p>{" "}
          <Link to="/cart">Go to Cart</Link>{" "}
        </>
      ) : (
        ""
      )}
    </div>
  );
};

export default Payment;
