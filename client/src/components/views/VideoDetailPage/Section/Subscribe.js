import React, { useState, useEffect } from "react";
import Axios from "axios";

function Subscribe(props) {
  const [subscribeNumber, setSubscribeNumber] = useState(0);
  const [Subscribed, setSubscribed] = useState(false);

  useEffect(() => {
    let variable = { userTo: props.userTo };
    Axios.post("/api/subscribe/subscribeNumber", variable).then((response) => {
      if (response.data.success) {
        setSubscribeNumber(response.data.subscribeNumber);
        debugger;
        alert(subscribeNumber);
      } else {
        alert("cannot read subscribers count");
      }
    });

    let subscribedVariable = {
      userTo: props.userTo,
      userFrom: localStorage.getItem("userId"),
    };

    Axios.post("/api/subscribe/subscribed", subscribedVariable).then(
      (response) => {
        if (response.data.success) {
          setSubscribed(response.data.subscribed);
        } else {
          alert("정보를 받아오지 못했습니다.");
        }
      }
    );
  }, []);

  const onSubscribe = (props) => {
    let subscribedVariable = {
      userTo: props.userTo,
      userFrom: props.userFrom,
    };

    // already subscribed
    if (Subscribed) {
      Axios.post("/api/subscribe/unSubscribe", subscribedVariable).then(
        (response) => {
          if (response.data.success) {
            setSubscribeNumber(subscribeNumber - 1);
            setSubscribed(!Subscribed);
          } else {
            alert("failed to cancel subscribing");
          }
        }
      );
    } else {
      Axios.post("/api/subscribe/subscribe", subscribedVariable).then(
        (response) => {
          if (response.data.success) {
            setSubscribeNumber(subscribeNumber + 1);
            setSubscribed(!Subscribed);
          } else {
            alert("failed to subscribe");
          }
        }
      );
    }
  };

  return (
    <div>
      <button
        onClick={onSubscribe}
        style={{
          backgroundColor: `${Subscribed ? "#AAAAAA" : "#CC0000"}`,
          borderRadius: "4px",
          color: "white",
          padding: "10px 16px",
          fontWeight: "500",
          fontSize: "1rem",
          textTransform: "uppercase",
        }}
      >
        {subscribeNumber} {Subscribed ? "Subscribed" : "Subscribe"}
      </button>
    </div>
  );
}

export default Subscribe;
