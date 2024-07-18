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
import {
  addToFavorite,
  delFavorite,
  fetchFavoriteProduct,
  getAllFavorites,
} from "../store/favorite-slice";
import { fetchVendors, followVendor } from "../store/vendorsSlice";
import {
  fetchAsyncProductSingle,
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
  const { isAuthenticated, userInfo } = useSelector((state) => state.auth);
  const sharedProduct = useSelector(getSharedProduct);
  const productId = product._id;
  const userData = userInfo ? userInfo[`Client data`][0] : null;
  const UserId = userData ? userData._id : null;
  const VendorId = product.idVendor;

  useEffect(() => {
    dispatch(fetchAsyncProductSingle(product._id));
    if (isAuthenticated) {
      dispatch(fetchFavoriteProduct(UserId));
    }
  }, [dispatch]);

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

  // const isFavorite = favorites.some((fav) => fav.videoId === videoId); for favorite
  const favorites = useSelector(getAllFavorites); // will be favorites products
  const isFavorite = favorites.some((fav) => fav._id === product._id); //test fav
  const isFollower = favorites.some((follow) => follow._id === product._id); //test follower

  const handIconClick = () => {
    if (isAuthenticated) {
      dispatch(followVendor({ VendorId, UserId }));
      dispatch(fetchVendors(UserId));
    }
  };

  function handleAddFavorite() {
    if (isFavorite && isAuthenticated) {
      dispatch(delFavorite({ productId, UserId }));
      dispatch(fetchFavoriteProduct(UserId));
    } else if (isAuthenticated) {
      dispatch(addToFavorite({ productId, UserId }));
      dispatch(fetchFavoriteProduct(UserId));
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
              <Link
                className="vend-in"
                to={`/vendorpage/${product.idVendor}`}
              ></Link>
              <div className="wrapper">
                <div className="follow-plus">
                  <GoPlus
                    className={
                      isFollower && isAuthenticated
                        ? "icon-plus-hide"
                        : "icon-plus"
                    }
                    onClick={handIconClick}
                  />
                </div>
              </div>
            </div>
            <div className="smart-wrapper">
              <div className="item">
                <FaHeart
                  style={{
                    color: isFavorite && isAuthenticated ? "#FF0000" : "white",
                  }}
                  onClick={() => handleAddFavorite()}
                />
                <span>
                  {formatLikesCount(parseLikesCount(0) + (isFavorite ? 1 : 0))}
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
                  dispatch(fetchAsyncProductSingle(product._id));
                }}
              >
                <FaCommentDots />
                <span>{product.comments.length}</span>
              </div>
            </div>
            <div className="smart-wrapper">
              <Link to="/inbox/chat">
                <div className="item">
                  <RiChatForwardLine />
                  <span>Chat</span>
                </div>
              </Link>
            </div>
            <div className="smart-wrapper">
              <div
                className="item"
                onClick={() => {
                  setSocial(false);
                  setInfo(true);
                  dispatch(fetchAsyncProductSingle(product._id));
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
                  dispatch(shareProduct(product._id));
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
