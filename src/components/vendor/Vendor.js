import React, { useEffect, useState } from "react";
import "./vendor.css";
import { useParams } from "react-router";
import { fetchSingleVendor, getSingleVendor } from "../../store/vendorsSlice";
import { useDispatch, useSelector } from "react-redux";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Link } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import { FaRocketchat } from "react-icons/fa6";
import { SlUserFollow } from "react-icons/sl";
import { SlUserUnfollow } from "react-icons/sl";
import logo1 from "../../assets/images/logo1.png";
import { toast, ToastContainer } from "react-toastify";
import Marquee from "react-fast-marquee";
import applePay from "../../assets/images/vat/Apple.png";
import visa from "../../assets/images/vat/visa.png";
import logo from "../../assets/images/logo.jpeg";
import { fetchPaymentsMethods } from "../../store/tabbySlice";

function Vendor() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const vendor = useSelector(getSingleVendor);
  const [vendorFollow, setVendorFollow] = useState(false);
  const [toggleNav, setToggleNav] = useState(0);

  useEffect(() => {
    dispatch(fetchSingleVendor(id));
    console.log(vendor);
  }, []);

  /*payments */
  const payments = useSelector((state) => state.payments.methods);
  useEffect(() => {
    dispatch(fetchPaymentsMethods());
  }, [dispatch]);
  const enabledPayment = payments.filter((method) => method.enabled);
  /* */

  function handleFollowVendor() {
    setVendorFollow(!vendorFollow);
    if (vendorFollow === false) {
      toast.success("تم متابعة التاجر بنجاح", {
        position: "top-left",
      });
    } else {
      toast.success("تم الغاء المتابعة  بنجاح", {
        position: "top-left",
      });
    }
  }

  return (
    <div className="vendor-main pt-4">
      <div className="container">
        <Row>
          <Col lg={12} className="mb-3 back-home-main">
            <div className="back-home">
              <Link rel="stylesheet" to="/">
                <IoIosArrowBack />
                <span>العودة</span>
              </Link>
            </div>
          </Col>
          <Col lg={12} className="mb-3">
            <div className="d-flex justify-content-center align-items-center">
              <div className="vendor-image">
                <img src={logo1} alt="vendorImage" />
              </div>
            </div>
          </Col>
          <Col lg={12}>
            <div className="marquee-img">
              <Marquee speed={60}>
                <div>
                  <img src={logo} alt="" srcset="" />
                </div>
                <div>
                  {enabledPayment.map((pay) => {
                    return <img src={pay.image} alt="" />;
                  })}
                </div>
                <div>
                  <img src={applePay} alt="" />
                </div>
                <div>
                  <img src={visa} alt="" />
                </div>
              </Marquee>
            </div>
          </Col>
          <Col lg={12} className="">
            <div className="vendor-details d-flex justify-content-around align-items-center">
              <div
                className="follow-vendor"
                onClick={() => handleFollowVendor()}
              >
                <Link>
                  {vendorFollow ? <SlUserUnfollow /> : <SlUserFollow />}
                  {vendorFollow ? (
                    <span>الغاء المتابعة</span>
                  ) : (
                    <span>متابعة التاجر</span>
                  )}
                </Link>
              </div>
              <div className="vendor-name">
                <span>{vendor.name}</span>
              </div>
              <div className="vendor-chat">
                <Link>
                  <FaRocketchat />
                  <span>مراسلة التاجر</span>
                </Link>
              </div>
            </div>
          </Col>
          <Col lg={12} className="mb-3">
            <div className="vendor-option">
              <Row>
                <Col lg={6} xs={6}>
                  <div
                    className={
                      toggleNav === 0
                        ? "vendor-option-item active"
                        : "vendor-option-item"
                    }
                    onClick={() => setToggleNav(0)}
                  >
                    <span>منتجات التاجر</span>
                  </div>
                </Col>
                <Col lg={6} xs={6}>
                  <div
                    className={
                      toggleNav === 1
                        ? "vendor-option-item active"
                        : "vendor-option-item"
                    }
                    onClick={() => setToggleNav(1)}
                  >
                    <span>تقيمات التاجر</span>
                  </div>
                </Col>
              </Row>
            </div>
          </Col>
          <Col lg={12} className="mb-3">
            <div
              className={
                toggleNav === 0
                  ? "vendor-product-item active"
                  : "vendor-product-item"
              }
            >
              <h1>منتجات التاجر</h1>
            </div>
            <div
              className={
                toggleNav === 1
                  ? "vendor-review-item active"
                  : "vendor-review-item"
              }
            >
              <h1>تقيمات التاجر</h1>
            </div>
          </Col>
        </Row>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Vendor;
