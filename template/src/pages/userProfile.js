import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { detailsUser } from '../actions/UserActions';


export default function ProfileScreen() {
  const userSignIn = useSelector((state) => state.userSignIn);
  const { userInfo } = userSignIn;
  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(detailsUser(userInfo._id));
  }, [dispatch, userInfo._id]);


  return (
    <div>
      {userInfo.firstName}
    </div>
  )
}