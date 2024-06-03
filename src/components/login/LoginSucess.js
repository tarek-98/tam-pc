import React from "react";
import { FaCheckCircle } from "react-icons/fa";
import { FaWhatsapp } from "react-icons/fa";
import "./ckeck.css";

function LoginSucess() {
  return (
    <div className="check-main">
      <div className="text mb-3">
        <div className="icon mb-3">
          <FaCheckCircle />
        </div>
        <span>تم التسجيل بنجاح سيقوم فريق تمقل بمراجعة طلبك و اعتمادة</span>
      </div>
      <div className="phone">
        <span className="ms-2 text-black-50">
          لرغبتك في تسريع التعميد تواصل معنا
        </span>
        <FaWhatsapp />
      </div>
    </div>
  );
}

export default LoginSucess;
