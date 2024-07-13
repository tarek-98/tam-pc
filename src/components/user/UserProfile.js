import React, { useEffect, useState } from "react";
import "./userProfile.css";
import { Link, useNavigate } from "react-router-dom";
import {
  FaGift,
  FaHeart,
  FaRegCreditCard,
  FaRegEdit,
  FaShoppingCart,
  FaUser,
  FaWindowRestore,
} from "react-icons/fa";
import { IoMdCloseCircle, IoMdCloseCircleOutline } from "react-icons/io";
import { FaUserEdit } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "../../store/usersSlice";
import logo1 from "../../assets/images/logo1.png";
import Orders from "../Orders/Orders";
import Bocket from "../bocket/Bocket";
import UserAddress from "../user/UserAddress";
import EditInfo from "../user/EditInfo";
import { ToastContainer } from "react-bootstrap";
import { logOut } from "../../store/authSlice";
import Favorite from "../favorite/Favorite";

function UserProfile({ socket }) {
  const users = useSelector((state) => state.users);
  const { userInfo } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const id = 1;
  const [toggleNav, setToggleNav] = useState(0);
  const [currentPage, setCurrentPage] = useState("favorite");
  const [isOpen, setIsOpen] = useState(false);
  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  const renderPage = () => {
    switch (currentPage) {
      case "favorite":
        return <Favorite />;
      case "orders":
        return <Orders />;
      case "bocket":
        return <Bocket />;
      case "address":
        return <UserAddress />;
      default:
        return null;
    }
  };

  function handleLogout() {
    dispatch(logOut());
    // navigate("/login");
  }

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchUsers(id));
    document.title = "Profile";
  }, []);

  // useEffect(() => {
  //   console.log(userInfo.ClientID);
  // }, []);

  return (
    <div className="user-profile">
      <div className="user-container">
        <div className="profile-pc">
          <div className="user-info">
            <div className="info-content">
              <div className="user-info-name">
                <div className="logo-pc">
                  <img src={logo1} alt="" />
                </div>
                <div className="user-info-details">
                  <div className="d-flex flex-row align-items-center name-details">
                    <span className="ms-1 fw-bold fs-3">{users.firstname}</span>
                    <span className="fw-bold fs-3">{users.lastname}</span>
                  </div>
                  <div className="user-ph text-center mb-2">
                    <span>{users.phone}</span>
                  </div>
                  <div className="user-edit text-center" onClick={toggleModal}>
                    <FaRegEdit className="text-dark m1-2" />
                    <span>تعديل البيانات</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="logout-bu">
              <div className="close" onClick={() => handleLogout()}>
                <IoMdCloseCircle />
              </div>
            </div>
          </div>
          <div className="user-nav">
            <div
              className={
                toggleNav === 0 ? "user-nav-item active" : "user-nav-item"
              }
              onClick={() => {
                setToggleNav(0);
                setCurrentPage("favorite");
              }}
            >
              <span>المفضلة</span>
              <FaHeart />
            </div>
            <div
              className={
                toggleNav === 1 ? "user-nav-item active" : "user-nav-item"
              }
              onClick={() => {
                setToggleNav(1);
                setCurrentPage("orders");
              }}
            >
              <span>طلباتي</span>
              <FaShoppingCart />
            </div>
            <div
              className={
                toggleNav === 2 ? "user-nav-item active" : "user-nav-item"
              }
              onClick={() => {
                setToggleNav(2);
                setCurrentPage("bocket");
              }}
            >
              <span>ارسال قسيمة هدايا</span>
              <FaGift />
            </div>
            <div
              className={
                toggleNav === 3 ? "user-nav-item active" : "user-nav-item"
              }
              onClick={() => {
                setToggleNav(3);
                setCurrentPage("address");
              }}
            >
              <span>عناوين الشحن</span>
              <FaLocationDot />
            </div>
          </div>
          <div className="user-content-page">{renderPage()}</div>
          <div className="change-adddres">
            <div className={`modal-overlay ${isOpen ? "open" : ""}`}>
              <div className={`modal-change ${isOpen ? "open" : ""}`}>
                <div className="close mb-3" onClick={toggleModal}>
                  <IoMdCloseCircleOutline className="fs-3" />
                </div>
                <div className="ps-1 pe-1">
                  <div className="d-flex justify-content-between align-items-center flex-row-reverse mb-3">
                    <span>تعديل البيانات</span>
                  </div>
                  <div className="saved-address ms-auto">
                    <EditInfo />
                  </div>
                </div>
              </div>
            </div>
            <ToastContainer />
          </div>
        </div>
        <div className="user-content">
          <div className="sign-up mb-3">
            <div className="close" onClick={() => handleLogout()}>
              <IoMdCloseCircle />
            </div>
            <div className="user-icon">
              <FaUser />
              <div className="user-name d-flex flex-row-reverse gap-1">
                <span className="me-1">{users.firstname}</span>
                <span>{users.lastname}</span>
              </div>
            </div>
          </div>
          <div className="user-options">
            <div className="user-option-item">
              <Link className="user-item d-flex w-100" to="/profile/editInfo">
                <FaUserEdit />
                <span>تحرير معلومات الحساب</span>
              </Link>
            </div>
            <div className="user-option-item">
              <Link className="user-item d-flex w-100" to="/profile/favorites">
                <FaHeart />
                <span>المفضلة</span>
              </Link>
            </div>
            <div className="user-option-item">
              <Link className="user-item d-flex w-100" to="/profile/orders">
                <FaShoppingCart />
                <span>طلباتي</span>
              </Link>
            </div>
            <div className="user-option-item">
              <Link className="user-item d-flex w-100" to="/profile/gifts">
                <FaGift />
                <span>قسيمة هدايا</span>
              </Link>
            </div>
            <div className="user-option-item">
              <Link className="user-item d-flex w-100" to="/profile/address">
                <FaLocationDot />
                <span>عناوين الشحن</span>
              </Link>
            </div>
            <div className="user-option-item">
              <Link className="user-item d-flex w-100">
                <FaWindowRestore />
                <span>سياسة الشحن و الاسترجاع</span>
              </Link>
            </div>
            <div className="user-option-item">
              <Link className="user-item d-flex w-100">
                <FaWindowRestore />
                <span>الشروط و الاحكام و سياسة الخصوصية</span>
              </Link>
            </div>
            <div className="user-option-item">
              <Link className="user-item d-flex w-100">
                <span>TMGGL</span>
                <span>عن تمقل</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
