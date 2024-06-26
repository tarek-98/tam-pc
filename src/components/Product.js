import React, { Fragment, useEffect, useRef, useState } from "react";
import "./product.css";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAsyncProducts, getAllProducts } from "../store/productSlice";
import SlideOverlay from "./SlideOverlay";
import vid2 from "../videos/Download.mp4";
import BottomOption from "./BottomOption";
import { Mousewheel } from "swiper/modules";

function Product({ sound, comment, setComment }) {
  const [addProduct, setAddProduct] = useState(false);
  const products = useSelector(getAllProducts);
  const [social, setSocial] = useState(false);
  const [info, setInfo] = useState(false);
  const dispatch = useDispatch();
  const videoRef = useRef(null);

  const [currentVideo, setCurrentVideo] = useState(null);

  useEffect(() => {
    dispatch(fetchAsyncProducts());
  }, []);

  /*timeLine*/
  /*end */

  const togglePlay = (index) => {
    if (currentVideo === index) {
      const video = document.getElementById(index);
      if (video.paused) {
        video.play();
      } else {
        video.pause();
      }
    } else {
      if (currentVideo) {
        const previousVideo = document.getElementById(currentVideo);
        previousVideo.pause();
      }
      setCurrentVideo(index);
      const video = document.getElementById(index);
      video.play();
    }
  };

  return (
    <div className="video-card">
      <Swiper
        direction={"vertical"}
        modules={[Mousewheel]}
        mousewheel={{ forceToAxis: true }}
        className="mySwiper"
        allowSlideNext={addProduct || comment || info ? false : true}
        allowSlidePrev={addProduct || comment || info ? false : true}
        onSlideChangeTransitionStart={function () {
          var videos = document.querySelectorAll("video");
          Array.prototype.forEach.call(videos, function (video) {
            video.pause();
          });
          setAddProduct(false);
          setComment(false);
          setSocial(false);
          setInfo(false);
        }}
        onSlideChangeTransitionEnd={function () {
          var activeIndex = this.activeIndex;
          var activeSlide =
            document.getElementsByClassName("swiper-slide")[activeIndex];
          var activeSlideVideo = activeSlide.getElementsByTagName("video")[0];
          activeSlideVideo.play();
          activeSlideVideo.load();
          setAddProduct(false);
          setComment(false);
          setInfo(false);
        }}
      >
        {products.status === "loading" ? (
          <div className="bg-white text-white w-100 h-100">
            Loading products...
          </div>
        ) : products.status === "failed" ? (
          <div className="bg-white text-white w-100 h-100">
            Error: {products.error}
          </div>
        ) : (
          <Fragment>
            {products.map((product, index) => {
              return (
                <Fragment>
                  <SwiperSlide key={product.id}>
                    <div className="video-slide-container">
                      <div className="plyer-container">
                        <div>
                          <video
                            id={index}
                            src={vid2}
                            className="react-player"
                            autoPlay={true}
                            muted={sound}
                            loop
                            playsInline={true}
                            ref={videoRef}
                            onPlay={() => setCurrentVideo(index)}
                            onClick={() => togglePlay(index)}
                          ></video>
                        </div>
                      </div>
                    </div>
                    <SlideOverlay
                      product={product}
                      comment={comment}
                      setComment={setComment}
                      social={social}
                      setSocial={setSocial}
                      info={info}
                      setInfo={setInfo}
                    />
                    <BottomOption
                      product={product}
                      addProduct={addProduct}
                      setAddProduct={setAddProduct}
                      setSocial={setSocial}
                    />
                  </SwiperSlide>
                </Fragment>
              );
            })}
          </Fragment>
        )}
      </Swiper>
    </div>
  );
}

export default Product;
