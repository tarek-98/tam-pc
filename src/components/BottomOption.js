import React, { Fragment, useEffect, useState } from "react";
import "./bottomOption.css";
import "./addProduct.css";
import { addToCart } from "../store/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { MdLocalShipping } from "react-icons/md";
import { fetchShippingMethods } from "../store/shippingSlice";
import { Button } from "@mui/material";
import { fetchAsyncProductSingle } from "../store/productSlice";

function BottomOption({ product, addProduct, setAddProduct, setSocial }) {
  const [discount, setdiscount] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchShippingMethods());
  }, [dispatch]);

  useEffect(() => {
    if (product.discount > 0) {
      setdiscount(true);
    }
  }, []);

  //handle size
  let discountedPrice = product.unit_price - product.discount;

  /* shipping method*/
  const methods = useSelector((state) => state.shipping.methods);

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
            dispatch(fetchAsyncProductSingle(product.id));
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
    </Fragment>
  );
}

export default BottomOption;
