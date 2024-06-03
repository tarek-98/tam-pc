import React, { useEffect, useRef, useState } from "react";
import "../components/singleProduct/singleProduct.css";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAsyncProductSingle,
  getProductSingle,
  getSingleProductStatus,
} from "../store/productSlice";
import vid from "../videos/video1.mp4";

function ProductSingle() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const product = useSelector(getProductSingle);

  const videoRef = useRef(null);
  const togglePlay = () => {
    const video = videoRef.current;
    if (video.paused) {
      video.play();
    } else {
      video.pause();
    }
  };

  useEffect(() => {
    dispatch(fetchAsyncProductSingle(id));
  }, []);

  useEffect(() => {
    document.title = `${product.name}`;
  }, []);

  return (
    <div className="single-product">
      <div className="video-slide-container">
        <div className="plyer-container">
          <div>
            <video
              id={product.id}
              src={vid}
              className="react-player"
              autoPlay
              muted={true}
              loop
              playsInline={true}
              ref={videoRef}
              onClick={togglePlay}
            ></video>
          </div>
        </div>
        {/*<SlideOverlay product={product} />
  <BottomOption product={product} />*/}
      </div>
    </div>
  );
}

export default ProductSingle;
