import React, { useEffect, useState } from "react";
import "./slideOverlay.css";
import { GoPlus } from "react-icons/go";
import { useDispatch, useSelector } from "react-redux";
import { FaCommentDots, FaHeart, FaShare } from "react-icons/fa";
import { FaWhatsapp } from "react-icons/fa";
import { RiChatForwardLine } from "react-icons/ri";
import { HiMiniBars3 } from "react-icons/hi2";
import { Link, useNavigate } from "react-router-dom";
import { CiLink } from "react-icons/ci";
import { fetchComments } from "../store/commentSlice";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { addToFavorite, delFavorite } from "../store/favorite-slice";
import { followVendor } from "../store/vendorsSlice";
import {
  fetchAsyncProductSingle,
  getAllNewestProducts,
  getSharedProduct,
  shareProduct,
} from "../store/productSlice";

function SlideOverlay({
  product,
  comment,
  setComment,
  social,
  setSocial,
  info,
  setInfo,
}) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const sharedProduct = useSelector(getSharedProduct);

  // Function to convert likes count to a number
  const parseLikesCount = (count) => {
    if (typeof count === "string") {
      if (count.endsWith("K")) {
        return parseFloat(count) * 1000;
      }
      return parseInt(count);
    }
    return count;
  };

  // Function to format likes count
  const formatLikesCount = (count) => {
    if (count >= 10000) {
      return (count / 1000).toFixed(1) + "K";
    }
    return count;
  };

  const productId = product.id;
  const UserId = product.seller.id;
  const VendorId = product.seller.id;

  // const isFavorite = favorites.some((fav) => fav.videoId === videoId); for favorite
  const products = useSelector(getAllNewestProducts); // will be favorites products
  const isFavorite = products.some((fav) => fav.id === product.id); //test fav
  const isFollower = products.some((follow) => follow.id === product.seller.id); //test follower

  const handIconClick = () => {
    dispatch(followVendor({ VendorId, UserId }));
  };

  function handleAddFavorite() {
    if (isFavorite) {
      dispatch(delFavorite({ productId, UserId }));
    } else {
      dispatch(addToFavorite({ productId, UserId }));
    }
    console.log({ productId, UserId });
  }

  const handleShare = () => {
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(
      sharedProduct.link
    )}`;
    window.open(whatsappUrl, "_blank");
  };

  const handleCopyLink = () => {
    navigator.clipboard
      .writeText(sharedProduct.link)
      .then(() => {
        alert("Product link copied to clipboard!");
      })
      .catch((err) => {
        console.error("Failed to copy: ", err);
      });
  };

  return (
    <div className="slide-overlay">
      <div className="container-wrapper">
        <div className="left-side">
          <div className="left-side-content">
            <div className="vendor-logo">
              <Link className="vend-in" to={`/vendorpage/${product.id}`}></Link>
              <div className="wrapper">
                <div className="follow-plus">
                  <GoPlus
                    className={isFollower ? "icon-plus" : "icon-plus-hide"}
                    onClick={handIconClick}
                  />
                </div>
              </div>
            </div>
            <div className="smart-wrapper">
              <div className="item">
                <FaHeart
                  style={{
                    color: isFavorite ? "#FF0000" : "white",
                  }}
                  onClick={() => handleAddFavorite()}
                />
                <span>
                  {formatLikesCount(
                    parseLikesCount(product.unit_price) + (isFavorite ? 1 : 0)
                  )}
                </span>
              </div>
            </div>
            <div className="smart-wrapper">
              <div
                className="item"
                id={product.id}
                onClick={() => {
                  setComment((comment) => !comment);
                  setSocial(false);
                  dispatch(fetchAsyncProductSingle(product.id));
                }}
              >
                <FaCommentDots />
                <span>80</span>
              </div>
            </div>
            <div className="smart-wrapper">
              <div className="item">
                <RiChatForwardLine />
                <span>Chat</span>
              </div>
            </div>
            <div className="smart-wrapper">
              <div
                className="item"
                onClick={() => {
                  setSocial(false);
                  setInfo(true);
                  dispatch(fetchAsyncProductSingle(product.id));
                }}
              >
                <HiMiniBars3 />
                <span>Info</span>
              </div>
            </div>
            <div className="smart-wrapper">
              <div
                className="item"
                onClick={() => {
                  setSocial((social) => !social);
                  dispatch(shareProduct(product.id));
                }}
              >
                <FaShare />
                <span>share</span>
              </div>
              <div className={social ? "social-home" : "social-home-hide"}>
                <div className="social-conatact-call" onClick={handleShare}>
                  <FaWhatsapp />
                </div>
                <div className="social-conatact-link" onClick={handleCopyLink}>
                  <CiLink />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SlideOverlay;
