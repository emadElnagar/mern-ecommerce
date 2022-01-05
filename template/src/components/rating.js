import React from 'react';
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';


export default function ProductRating(props) {
  const {rating, reviesNum} = props;
  return (
    <div className="rating">
      <Stack spacing={1}>
        <Rating name="half-rating-read" defaultValue={rating} precision={0.5} readOnly />
      </Stack>
      {rating} <small>{'(' + reviesNum + 'reviews)'}</small>
    </div>
  )
}