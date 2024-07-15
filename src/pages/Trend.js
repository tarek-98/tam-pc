import React, { Fragment, useEffect, useRef, useState } from "react";
import Navbar from "../components/Navbar";
import { FaVolumeXmark } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { IoIosCloseCircleOutline } from "react-icons/io";
import Comments from "../components/comments/CommentList";
import { fetchAsyncTrendProducts, getAllTrendProducts, getProductSingle } from "../store/productSlice";
import Swal from "sweetalert2";
import { addToCart } from "../store/cartSlice";
import TrendProducts from "../components/products/TrendProducts";

function Trend() {
  const [volume, setVolume] = useState(false);
  const [sound, setSound] = useState(true);
  const [info, setInfo] = useState(false);
  const [addProduct, setAddProduct] = useState(false);
  const [comment, setComment] = useState(false);
  const products = useSelector(getAllTrendProducts);
  const productData = useSelector(getProductSingle);
  const product = productData.product;
  const comments = product ? product.comments : null;

  const [quantity, setQuantity] = useState(1);
  const [discount, setdiscount] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log(productData);
    console.log(product);
  }, []);
  useEffect(() => {
    dispatch(fetchAsyncTrendProducts());
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
  const addToCartHandler = (product) => {
    let productLocation = "الرياض";
    let vendorName = "احمد";

    dispatch(
      addToCart({
        ...product,
        quantity: quantity,
        size: toggleState,
        productLocation,
        vendorName,
      })
    );
  };

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

  useEffect(() => {
    console.log(comments);
    document.title = "TMGGL";
  }, []);

  return (
    <Fragment>
      <Navbar />
      <TrendProducts
        sound={sound}
        comment={comment}
        info={info}
        setInfo={setInfo}
        addProduct={addProduct}
        setAddProduct={setAddProduct}
        setComment={setComment}
        products={products}
      />
      <div
        className={volume ? "volume-hide" : "volume"}
        onClick={() => {
          setSound(!sound);
          setVolume(!volume);
        }}
      >
        <FaVolumeXmark />
        <span className="">Unmute</span>
      </div>

      {product && (
        <div className={comment ? "comment-wrapper" : "comment-wrapper-hide"}>
          <div className="comment-wrapper-overlay"></div>
          <div className="comment-wrapper-container">
            <div
              className="close"
              onClick={() => setComment((comment) => !comment)}
            >
              <IoIosCloseCircleOutline />
              <h2 className="text-comment fs-4">
                {comments.length > 0 ? "Comments" : "No Comments"}{" "}
                {comments.length > 0 && (
                  <span className="fs-5">{comments.length}</span>
                )}
              </h2>
            </div>
            <Comments product={product} />
          </div>
        </div>
      )}

      {product && (
        <div className={info ? "info-home" : "info-home-hide"}>
          <div className="info-overlay"></div>
          <div className="info-container p-3">
            <div className="close" onClick={() => setInfo((info) => !info)}>
              <IoIosCloseCircleOutline />
            </div>
            <div className="product-details">{product.description}</div>
          </div>
        </div>
      )}

      {product && (
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
                      src={product.image}
                      alt=""
                      className="img-cover w-100 h-100"
                    />
                  </div>
                  <div className="product-img-thumbs d-flex align-center">
                    <div className="thumb-item">
                      <img
                        src={product.image}
                        alt=""
                        className="img-cover w-100"
                      />
                    </div>
                    <div className="thumb-item">
                      <img
                        src={product.image}
                        alt=""
                        className="img-cover w-100"
                      />
                    </div>
                  </div>
                </div>
                <div className="product-single-r mt-1" dir="rtl">
                  <div className="product-details font-manrope">
                    <div className="title mb-3">{product.name}</div>
                    <div className="product loc">
                      <span>يشحن من </span>
                      <span className=" text-danger">الرياض</span>
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
                            {product.price + product.price * 0.15} ر.س
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
      )}
    </Fragment>
  );
}

export default Trend;
