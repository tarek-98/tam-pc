import React, { Fragment, useEffect, useRef, useState } from "react";
import "./fav.css";
import "swiper/css";
import { useDispatch, useSelector } from "react-redux";
import vid2 from "../../videos/Download.mp4";
import {
  fetchAsyncNewestProducts,
  getAllNewestProducts,
} from "../../store/productSlice";
import { delFavorite, fetchFavoriteProduct } from "../../store/favorite-slice";
import { Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { CircularProgress } from "@mui/material";

function Favorite() {
  const dispatch = useDispatch();
  const { newestProductsStatus } = useSelector((state) => state.product);
  const products = useSelector(getAllNewestProducts);
  const viewedProducts = useSelector(
    (state) => state.sortedProducts.viewedProducts
  );

  const [currentVideo, setCurrentVideo] = useState(null);
  const videoRef = useRef(null);
  const UserId = 5; //test

  useEffect(() => {
    dispatch(fetchFavoriteProduct());
  }, []);

  useEffect(() => {
    dispatch(fetchAsyncNewestProducts());
  }, []);

  function handleDelFav({ productId, UserId }) {
    dispatch(delFavorite({ productId, UserId }));
  }

  return (
    <div className="main-fav">
      <div className="container">
        <Col lg="12" className="mb-3">
          <Row className="">
            {newestProductsStatus === "loading" ? (
              <Fragment>
                <div className="d-flex align-items-center justify-content-center">
                  <CircularProgress />
                </div>
              </Fragment>
            ) : (
              <Fragment>
                {newestProductsStatus === "failed" ? (
                  <h1>Failed to load Products</h1>
                ) : (
                  <Fragment>
                    {products.map((product, index) => {
                      return (
                        <Fragment>
                          <Col lg="4" sm="12" xs="12" className="p-0 p-1 mb-3">
                            <div className="vendor-products-item">
                              <Link
                                to={`/product/${product.id}`}
                                className="text-decoration-none"
                              >
                                <div className="image">
                                  <video
                                    id={index}
                                    // poster={`${img_url}/${product.images[0]}`}
                                    onMouseEnter={() => setCurrentVideo(index)}
                                    onMouseLeave={() => setCurrentVideo(null)}
                                    className="react-player"
                                    src={vid2}
                                    muted={true}
                                    loop
                                    playsInline={true}
                                    autoPlay={
                                      currentVideo === index ? true : false
                                    }
                                  ></video>
                                </div>
                              </Link>
                              <div
                                className="del-fav"
                                onClick={() =>
                                  handleDelFav({
                                    productId: product.id,
                                    UserId,
                                  })
                                }
                              >
                                <span>ازالة من المفضلة</span>
                              </div>
                            </div>
                          </Col>
                        </Fragment>
                      );
                    })}
                  </Fragment>
                )}
              </Fragment>
            )}
          </Row>
        </Col>
      </div>
    </div>
  );
}

export default Favorite;
