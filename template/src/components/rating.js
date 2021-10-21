import React from 'react';
import StarIcon from '@mui/icons-material/Star';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import StarHalfIcon from '@mui/icons-material/StarHalf';


function Star(props) {
    const {rating} = props;
    if (rating >= 1) {
        return <StarIcon className="star" />
    } else {
        return <StarOutlineIcon className="star" />
    }
}
function StarTwo(props) {
    const {rating} = props;
    if (rating >= 2) {
        return <StarIcon className="star" />
    } else if (rating >= 1.5) {
        return <StarHalfIcon className="star" />
    } else {
        return <StarOutlineIcon className="star" />
    }
}
function StarThree(props) {
    const {rating} = props;
    if (rating >= 3) {
        return <StarIcon className="star" />
    } else if (rating >= 2.5) {
        return <StarHalfIcon className="star" />
    } else {
        return <StarOutlineIcon className="star" />
    }
}
function StarFour(props) {
    const {rating} = props;
    if (rating >= 4) {
        return <StarIcon className="star" />
    } else if (rating >= 3.5) {
        return <StarHalfIcon className="star" />
    } else {
        return <StarOutlineIcon className="star" />
    }
}
function Starfive(props) {
    const {rating} = props;
    if (rating === 5) {
        return <StarIcon className="star" />
    } else if (rating >= 4.5) {
        return <StarHalfIcon className="star" />
    } else {
        return <StarOutlineIcon className="star" />
    }
}

export default function Rating(props) {
    const {rating, reviesNum} = props;
    return (
        <div className="rating">
            <span>
                <Star rating={rating} />
            </span>
            <span>
                <StarTwo rating={rating} />
            </span>
            <span>
                <StarThree rating={rating} />
            </span>
            <span>
                <StarFour rating={rating} />
            </span>
            <span>
                <Starfive rating={rating} />
            </span> {rating} <small>{'(' + reviesNum + 'reviews)'}</small>
        </div>
    )
}