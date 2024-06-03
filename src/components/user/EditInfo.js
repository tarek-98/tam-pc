import React, { useEffect, useState } from "react";
import "./userProfile.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import axios from "axios";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "../../store/usersSlice";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import logo from "../../assets/images/logo.jpeg";
import { Link } from "react-router-dom";
import { IoIosArrowRoundForward } from "react-icons/io";

function EditInfo() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const users = useSelector((state) => state.users);

  const id = 1;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchUsers(id));
  }, []);

  const validateForm = () => {
    if (firstName === "") {
      toast.error("FirstName is required.", {
        position: "top-left",
      });
      return false;
    } else if (lastName === "") {
      toast.error("LastName is required.", {
        position: "top-left",
      });
      return false;
    } else if (phone === "") {
      toast.error("Phone is required.", {
        position: "top-left",
      });
      return false;
    } else if (email === "") {
      toast.error("Email is required.", {
        position: "top-left",
      });
      return false;
    }
    return true;
  };

  const formSubmet = (e) => {
    e.preventDefault();
    if (validateForm()) {
      axios({
        method: "PUT",
        url: "http://localhost:9000/users/1",
        data: {
          firstname: firstName,
          lastname: lastName,
          email: email,
          phone: phone,
          city: users.city,
          streetNumber: users.streetNumber,
        },
      }).then((data) => {
        toast.success("تمت تعديل البيانات", {
          position: "top-left",
        });
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      });
    }
  };

  return (
    <div className="user-profile">
      <div className="logo mb-3">
        <img src={logo} alt="" className="logo w-100" />
      </div>
      <div className="back">
        <Link
          to="/profile"
          className="d-flex flex-row-reverse align-items-center text-dark pe-3 text-black-50 fs-6"
        >
          <IoIosArrowRoundForward />
          <span>الرجوع الي الحساب</span>
        </Link>
      </div>
      <div className="form">
        <Form onSubmit={formSubmet}>
          <Form.Group className="mb-3" controlId="formBasicFirst">
            <Form.Label>الاسم الاول</Form.Label>
            <Form.Control
              type="text"
              placeholder={users.firstname}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicLast">
            <Form.Label>الاسم الاخير</Form.Label>
            <Form.Control
              type="text"
              placeholder={users.lastname}
              onChange={(e) => setLastName(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPhone">
            <Form.Label>رقم الجوال</Form.Label>
            <Form.Control
              type="text"
              placeholder={users.phone}
              onChange={(e) => setPhone(e.target.value)}
              maxLength="10"
              minLength="10"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>الايميل</Form.Label>
            <Form.Control
              type="email"
              placeholder={users.email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicCity">
            <Form.Control type="hidden" value={users.city} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicAddress">
            <Form.Control type="hidden" placeholder={users.address} />
          </Form.Group>
          <Button variant="primary" type="submit">
            تعديل
          </Button>
        </Form>
        <ToastContainer />
      </div>
    </div>
  );
}

export default EditInfo;
