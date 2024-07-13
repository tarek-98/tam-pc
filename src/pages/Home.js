import React, { Fragment, useEffect, useRef, useState } from "react";
import Navbar from "../components/Navbar";
import Product from "../components/Product";
import { FaVolumeXmark } from "react-icons/fa6";
import { useSelector } from "react-redux";
import { IoIosCloseCircleOutline } from "react-icons/io";
import Comments from "../components/comments/CommentList";
import { getAllNewestProducts } from "../store/productSlice";

function Home() {
  const [volume, setVolume] = useState(false);
  const [sound, setSound] = useState(true);
  const [comment, setComment] = useState(false);
  const comments = useSelector((state) => state.comments.comments);
  const products = useSelector(getAllNewestProducts);
  useEffect(() => {
    document.title = "TMGGL";
  }, []);

  return (
    <Fragment>
      <Navbar />
      <Product
        sound={sound}
        comment={comment}
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
          <Comments />
        </div>
      </div>
    </Fragment>
  );
}

export default Home;
