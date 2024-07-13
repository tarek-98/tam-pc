import React, { Fragment, useEffect, useRef, useState } from "react";
import "../product.css";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import { useDispatch, useSelector } from "react-redux";
import SlideOverlay from "../SlideOverlay";
import vid2 from "../../videos/Download.mp4";
import BottomOption from "../BottomOption";
import { Mousewheel } from "swiper/modules";
import {
  fetchAsyncNewestProducts,
  getAllNewestProducts,
} from "../../store/productSlice";
import { increaseProductViews, addViewedProduct } from "../../store/sortSlice";

function NewestProduct({
  sound,
  comment,
  setComment,
  products,
  info,
  setInfo,
  addProduct,
  setAddProduct,
}) {
  const [social, setSocial] = useState(false);
  const dispatch = useDispatch();
  const videoRef = useRef(null);

  const [currentVideo, setCurrentVideo] = useState(null);

  useEffect(() => {
    dispatch(fetchAsyncNewestProducts());
  }, []);

  const handleSlideChange = (swiper) => {
    const activeSlideIndex = swiper.activeIndex;
    const activeProduct = products[activeSlideIndex];

    //  if (activeProduct && !viewedProducts[activeProduct.id]) to once view for product
    if (activeProduct) {
      dispatch(increaseProductViews(activeProduct.id));
      dispatch(addViewedProduct(activeProduct.id));
    }
  };

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
        onSlideChange={handleSlideChange}
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

export default NewestProduct;
