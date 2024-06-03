import React, { useState } from "react";
import { useSelector } from "react-redux";
import Send from "../components/Send";
import Verify from "../components/Verify";
import "../components/login.css";
import UserProfile from "../components/user/UserProfile";

function Profile() {
  const { showComp, success } = useSelector((state) => state.otp);
  const [isVerified, setIsVerified] = useState(false);

  return (
    <div className="log-home">
      {/*  <div className="otp-container">
        {showComp && !isVerified ? (
          <Send />
        ) : !showComp && !success ? (
          <Verify onClick={() => setIsVerified(true)} />
        ) : (
          <UserProfile />
        )}
      </div>*/}
      <UserProfile />
    </div>
  );
}

export default Profile;
