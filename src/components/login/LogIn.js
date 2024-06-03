import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { sendOtp } from "../../store/authSlice";
import { useNavigate } from "react-router";
import "./login.css";
import logo from "../../assets/images/logo.jpeg";

const Login = () => {
  const [phone, setPhone] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const authStatus = useSelector((state) => state.auth.status);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(sendOtp(phone));
    if (authStatus === "otpSent") {
      navigate.push("/verify-otp");
    }
  };

  return (
    <div className="logIn-main">
      <div className="conatiner">
        <div className="row">
          <div className="col-lg-12">
            <div className="logo mb-3">
              <img src={logo} alt="" className="w-100" />
            </div>
            <h2 className="mb-3">اهلا عزيزي مستخدم تمقل</h2>
            <div className="form">
              <form onSubmit={handleSubmit} className=" d-flex flex-column">
                <input
                  className="mb-2"
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="مثال 0512345678"
                  required
                  maxLength="10"
                  minLength="10"
                  name="phone"
                />
                <button type="submit" className="mb-2" value="">
                  تسجيل الدخول
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
