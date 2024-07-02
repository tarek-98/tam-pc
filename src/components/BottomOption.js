import React, { Fragment, useEffect, useState } from "react";
import "./bottomOption.css";
import "./addProduct.css";
import { addToCart } from "../store/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { MdLocalShipping } from "react-icons/md";
import { fetchShippingMethods } from "../store/shippingSlice";
import { Box, Button, Modal, Typography } from "@mui/material";

function BottomOption({ product, addProduct, setAddProduct, setSocial }) {
  const [quantity, setQuantity] = useState(1);
  const [changeBackground, setChangeBackground] = useState(product.thumbnail);
  const [discount, setdiscount] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (product.discount > 0) {
      setdiscount(true);
    }
  }, []);

  const increaseQty = () => {
    setQuantity((prevQty) => {
      let tempQty = prevQty + 1;
      if (tempQty > product.stock) tempQty = product.stock;
      return tempQty;
    });
  };

  const decreaseQty = () => {
    setQuantity((prevQty) => {
      let tempQty = prevQty - 1;
      if (tempQty < 1) tempQty = 1;
      return tempQty;
    });
  };

  //handle size
  const data = [41, 42, 43];
  const [toggleState, setToggleState] = useState(null);
  let discountedPrice = product.unit_price - product.discount;
  const addToCartHandler = (product) => {
    // - product.price * (product.discountPercentage / 100);
    let discountedPrice = product.unit_price - product.discount;
    let totalPrice = quantity * discountedPrice;
    let productColor = [changeBackground];
    let productWeight = product.unit_price; //edit
    let productLocation = product.seller.shop.address;
    let vendorName = product.seller.f_name;

    dispatch(
      addToCart({
        ...product,
        quantity: quantity,
        totalPrice,
        size: toggleState,
        discountedPrice,
        productColor,
        productWeight,
        productLocation,
        vendorName,
      })
    );
  };

  const img_url =
    "https://gomla-wbs.el-programmer.com/storage/app/public/product";

  function sweetAlertAdd() {
    Swal.fire({
      title: "تم اضافة المنتج بنجاح",
      icon: "success",
      confirmButtonText: "فهمت",
    });
  }
  function sweetAlertOption() {
    Swal.fire({
      title: "قم بتحديد خيارات المنتج أولا",
      icon: "warning",
      confirmButtonText: "فهمت",
    });
  }
  /* shipping method*/
  const methods = useSelector((state) => state.shipping.methods);
  useEffect(() => {
    dispatch(fetchShippingMethods());
  }, [dispatch]);
  const enabledMethods = methods.filter((method) => method.enabled);
  /* */

  return (
    <Fragment>
      <div className="bottomOption">
        <Button
          variant="contained"
          className="add-cart"
          onClick={() => {
            setAddProduct(true);
            setSocial(false);
          }}
        >
          اضف للسلة
        </Button>
        <div className="price">
          <div className="new-price me-4">
            <div className=" d-flex flex-column justify-content-center align-items-center">
              <MdLocalShipping className="fs-2" />
              {enabledMethods.price === 0 ? (
                <span className="free-shipping-text">شحن مجاني</span>
              ) : (
                ""
              )}
            </div>
            <div>
              <span className="ms-1">
                {discountedPrice + discountedPrice * 0.15}
              </span>
              <span>ر.س</span>
            </div>
          </div>
          <div
            className={product.discount === 0 ? "old-price-hide" : "old-price"}
          >
            <div className="dis-v">
              <span>خصم {product.discount + product.discount * 0.15}</span>
            </div>
            <div>
              <span className="ms-1">
                {product.unit_price + product.unit_price * 0.15}
              </span>
              <span>ر.س</span>
            </div>
          </div>
        </div>
      </div>
      <div className={addProduct ? "add-product" : "add-product-hide"}>
        <div className="addProduct-overlay"></div>
        <div className="addProduct-container">
          <div
            className="close"
            onClick={() => setAddProduct((addProduct) => !addProduct)}
          >
            <IoIosCloseCircleOutline />
          </div>
          <div className="product-option">
            <div>
              <div className="product-img">
                <div className="product-img-zoom w-100 mb-2">
                  <img
                    src={`${img_url}/${[changeBackground]}`}
                    alt=""
                    className="img-cover w-100 h-100"
                  />
                </div>
                <div className="product-img-thumbs d-flex align-center">
                  {product.images.map((image, index) => {
                    return (
                      <div
                        className="thumb-item"
                        onClick={() => setChangeBackground(image)}
                      >
                        <img
                          src={`${img_url}/${image}`}
                          alt=""
                          className="img-cover w-100"
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="product-single-r mt-1" dir="rtl">
                <div className="product-details font-manrope">
                  <div className="title mb-3">{product.name}</div>
                  <div className="product loc">
                    <span>يشحن من </span>
                    <span className=" text-danger">
                      {product.seller.shop.address}
                    </span>
                  </div>
                  <div className="price mb-2">
                    <div className="d-flex align-center">
                      <div className="new-price ms-3">
                        <span>السعر : </span>
                        <span>
                          {(discountedPrice + discountedPrice * 0.15) *
                            quantity}
                          ر.س
                        </span>
                      </div>
                      {discount && (
                        <div className="old-price">
                          {product.unit_price + product.unit_price * 0.15} ر.س
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="qty align-center m-1 mb-2">
                    <div className="qty-text mb-2 ms-2">الكمية :</div>
                    <div className="qty-change d-flex">
                      <button
                        type="button"
                        className="qty-decrease d-flex justify-content-center"
                        onClick={() => decreaseQty()}
                      >
                        -
                      </button>
                      <div className="qty-value d-flex justify-content-center">
                        {quantity}
                      </div>
                      <button
                        type="button"
                        className="qty-increase d-flex justify-content-center"
                        onClick={() => increaseQty()}
                      >
                        +
                      </button>
                    </div>
                    {product.current_stock === 0 ? (
                      <div className="qty-error text-uppercase bg-danger text-white">
                        out of stock
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                  <div className="size-opt d-flex">
                    <div className="size-text mb-2 ms-2">المقاس :</div>
                    {/*<div>{product.choice_options.title}</div>*/}
                    <div className="size-change d-flex">
                      <ul className="size-list">
                        {data.map((siz) => {
                          return (
                            <li
                              className="list-item"
                              onClick={() => setToggleState(siz)}
                            >
                              <span
                                className={
                                  toggleState === siz
                                    ? "list-item-opt active"
                                    : "list-item-opt"
                                }
                              >
                                {siz}
                              </span>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="send-cart text-center mt-1 text-white"
              onClick={() => {
                if (toggleState === null) {
                  sweetAlertOption();
                } else {
                  setAddProduct((addProduct) => !addProduct);
                  addToCartHandler(product);
                  sweetAlertAdd();
                }
              }}
            >
              اضف الي السلة
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default BottomOption;
