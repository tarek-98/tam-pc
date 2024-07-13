import React, { Fragment, useEffect, useState } from "react";
import "./vendor.css";
import { useParams } from "react-router";
import {
  fetchSingleVendor,
  followVendor,
  getSingleVendor,
  unFollowVendor,
} from "../../store/vendorsSlice";
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
import logo3 from "../../assets/images/vat/Mada.png";
import logo4 from "../../assets/images/vat/MasterCard.png";
import { fetchPaymentsMethods } from "../../store/tabbySlice";
import {
  fetchAsyncProducts,
  fetchProductByVendor,
  getAllProducts,
  getProductsByVendor,
} from "../../store/productSlice";
import vid2 from "../../videos/Download.mp4";
import { CircularProgress } from "@mui/material";
import { Container, CssBaseline } from "@mui/material";
import ReviewForm from "./ReviewForm";
import ReviewList from "./ReviewList";

function Vendor() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const vendor = useSelector(getSingleVendor);
  const { productsStatus } = useSelector((state) => state.product);
  const products = useSelector(getProductsByVendor); //for test
  const [vendorFollow, setVendorFollow] = useState(false);
  const [toggleNav, setToggleNav] = useState(0);

  useEffect(() => {
    dispatch(fetchSingleVendor(id));
    dispatch(fetchAsyncProducts());
    dispatch(fetchProductByVendor(id));
    console.log(id);
  }, []);

  /*payments */
  const payments = useSelector((state) => state.payments.methods);
  useEffect(() => {
    dispatch(fetchPaymentsMethods());
    console.log(productsStatus);
  }, [dispatch]);
  const enabledPayment = payments.filter((method) => method.enabled);
  /* */

  const isFollower = products.some((follow) => follow.id === id); //test fav
  const UserId = 1;
  function handleFollowVendor() {
    setVendorFollow(!vendorFollow);
    if (!isFollower) {
      dispatch(followVendor({ VendorId: id, UserId }));
    } else {
      dispatch(unFollowVendor({ VendorId: id, UserId }));
    }
  }

  const img_url =
    "https://gomla-wbs.el-programmer.com/storage/app/public/product";

  return (
    <div className="vendor-main pt-4">
      <div className="container">
        <Row>
          <Col lg="12" className="mb-3 back-home-main">
            <div className="back-home">
              <Link rel="stylesheet" to="/">
                <IoIosArrowBack />
                <span>العودة</span>
              </Link>
            </div>
          </Col>
          <Col lg="12" className="mb-3">
            <div className="d-flex justify-content-center align-items-center">
              <div className="vendor-image">
                <img src={logo1} alt="vendorImage" />
              </div>
            </div>
          </Col>
          <Col lg="12">
            <div className="marquee-img">
              <Marquee speed={60} direction="right">
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
                <div>
                  <img src={logo4} alt="" srcset="" />
                </div>
                <div>
                  <img src={logo3} alt="" srcset="" />
                </div>
              </Marquee>
            </div>
          </Col>
          <Col lg="12" className="">
            <div className="vendor-details d-flex justify-content-around align-items-center">
              <div
                className="follow-vendor"
                onClick={() => handleFollowVendor()}
              >
                <Link>
                  {isFollower ? <SlUserUnfollow /> : <SlUserFollow />}
                  {isFollower ? (
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
          <Col lg="12" className="mb-3">
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
          <Col lg="12" className="mb-3">
            <div
              className={
                toggleNav === 0
                  ? "vendor-product-item active"
                  : "vendor-product-item"
              }
            >
              <Row className="w-100">
                {productsStatus === "loading" ? (
                  <Fragment>
                    <div className="d-flex align-items-center justify-content-center">
                      <CircularProgress />
                    </div>
                  </Fragment>
                ) : (
                  <Fragment>
                    {productsStatus === "failed" ? (
                      <h1>Failed to load Products</h1>
                    ) : (
                      <Fragment>
                        {products.map((product) => {
                          return (
                            <Fragment>
                              <Col lg="4" sm="6" xs="6" className="p-0 p-1">
                                <div className="vendor-products-item">
                                  <Link
                                    to={`/product/${product.id}`}
                                    className="text-decoration-none"
                                  >
                                    <div className="image">
                                      <video
                                        // poster={`${img_url}/${product.images[0]}`}
                                        className="react-player"
                                        src={vid2}
                                        muted={true}
                                        loop
                                        playsInline={true}
                                      ></video>
                                    </div>
                                  </Link>
                                </div>
                              </Col>
                            </Fragment>
                          );
                        })}
                      </Fragment>
                    )}
                  </Fragment>
                )}
              </Row>
            </div>
            <div
              className={
                toggleNav === 1
                  ? "vendor-review-item active"
                  : "vendor-review-item"
              }
            >
              <CssBaseline />
              <Container>
                <ReviewForm vendorId={id} />
                <br />
                <ReviewList vendorId={id} />
              </Container>
            </div>
          </Col>
          <ToastContainer />
        </Row>
      </div>
    </div>
  );
}

export default Vendor;
