import {
  Box,
  Typography,
} from "@mui/material";
import React from "react";
import Review from "./Review";

const UserReview = ({ reviews, pid }) => {
  return (
    <>
      {reviews.length > 0 ? (
        reviews.map((review) => (
          <React.Fragment key={review.userId}>
            <Review review={review} pid={pid} />
          </React.Fragment>
        ))
      ) : (
        <Box sx={{ ml: 2, mt: 1 }}>
          <Typography variant="h6">No review</Typography>
        </Box>
      )}
    </>
  );
};

export default UserReview;
