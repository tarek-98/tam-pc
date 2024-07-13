import React, { useEffect, useRef, useState } from "react";
import "../components/singleProduct/singleProduct.css";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAsyncProductSingle,
  getProductSingle,
  getSingleProductStatus,
} from "../store/productSlice";
import vid from "../videos/Download.mp4";
import SlideOverlay from "../components/SlideOverlay";
import BottomOption from "../components/BottomOption";
import { FaVolumeXmark } from "react-icons/fa6";

function ProductSingle() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const product = useSelector(getProductSingle);
  const [volume, setVolume] = useState(false);
  const [sound, setSound] = useState(true);

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
    document.title = `${product.title}`;
  }, []);

  return (
    <div className="single-product video-card">
      <div className="video-slide-container">
        <div className="plyer-container">
          <div>
            <video
              id={product.id}
              src={vid}
              className="react-player"
              autoPlay
              muted={sound}
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
      <div
        className={volume ? "volume-hide" : "volume-single"}
        onClick={() => {
          setSound(!sound);
          setVolume(!volume);
        }}
      >
        <FaVolumeXmark />
        <span className="">Unmute</span>
      </div>
    </div>
  );
}

export default ProductSingle;
