import React, { useState, useEffect } from "react";
import Success from "./Success.js";
import Failed from "./Failed.js";
import axios from "axios";

const Thankyou = (props) => {
  const [thankyou, setThankyou] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  const backendURL =
    (props && props.data && props.data.backendServiceURL) || "";

  // const urlParams = new URLSearchParams(window.location.search);
  const myParam = localStorage.getItem("cartId");

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (myParam && myParam !== "") {
          const url = backendURL + `/laundrino/thankyou?cartid=${myParam}`;
          const response = await axios.get(url);
          if (response.data.success) {
            const thank_details = response.data.billingDetails || "";
            thank_details.order_id = thank_details.orderId.split('_')[1];
            switch (thank_details.transactionStatus) {
              case "SUCCESS":
                setThankyou(thank_details);
                setError(false);
                break;
              case "FAILED":
                setError(true);
                break;
              case "START":
                setError(true);
                break;
              default:
                setError(true);
                break;
            }
          } else {
            setError(true);
          }
        } else {
          setError(true);
        }
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    if (retryCount < 3) {
      fetchData();
      setRetryCount(retryCount + 1);
    } else {
      setLoading(false);
      setError(true);
    }
  }, [myParam, retryCount]);

  const handleRetry = () => {
    setLoading(true);
    setRetryCount(0); // Reset retry count for new attempts
    // No need to call fetchData directly here, it will be triggered by useEffect
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {error ? (
        <div>
          <Failed />
          <button onClick={handleRetry}>Retry</button>
        </div>
      ) : (
        <Success data={thankyou} />
      )}
    </div>
  );
};

export default Thankyou;
