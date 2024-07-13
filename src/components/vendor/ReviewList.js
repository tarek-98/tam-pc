// src/components/ReviewList.js
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchReviews } from "../../store/reviewSlice";
import { Box, Typography } from "@mui/material";
import { Rating } from "@mui/lab";
import { Col, Row } from "react-bootstrap";

const ReviewList = ({ vendorId }) => {
  const dispatch = useDispatch();
  const { reviews, loading, error } = useSelector((state) => state.reviews);

  useEffect(() => {
    dispatch(fetchReviews(vendorId));
    console.log(vendorId);
  }, [dispatch]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <Row>
      {reviews.map((review, index) => (
        <Col lg="4">
          <Box
            key={index}
            sx={{ mb: 2, p: 2, border: "1px solid #ccc", borderRadius: 2 }}
          >
            <p>{review.name}</p>
            <Rating value={review.rating} readOnly />
            <Typography variant="body1">{review.comment}</Typography>
          </Box>
        </Col>
      ))}
    </Row>
  );
};

export default ReviewList;
