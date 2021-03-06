import { Link } from 'react-router-dom';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { orderHistory } from '../actions/OrderActions';
import LoadingBox from '../components/loadingbox';
import MessageBox from '../components/messagebox';
import { Typography } from '@mui/material';

export default function OrderHistory(props) {
  const orderList = useSelector(state => state.orderList);
  const { loading, error, orders } = orderList;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(orderHistory());
  }, [dispatch])
  return (
    <div>
      {
        loading
        ? <LoadingBox></LoadingBox>
        : error
        ? <MessageBox>{error}</MessageBox>
        : (
          orders &&
          <div className="table-container">
            <Typography variant="h3" className="text-center">order history</Typography>
            <div className="table">
              <table>
                <thead>
                  <tr>
                    <th>created at</th>
                    <th>total price</th>
                    <th>paid</th>
                    <th>delivered</th>
                    <th>action</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    orders.map((order) => (
                      <tr key={order._id}>
                        <td>{order.createdAt.substring(0, 10)}</td>
                        <td>{order.totalPrice}</td>
                        <td>{order.isPaid? order.paidAt.substring(0, 10): 'Not Paid'}</td>
                        <td>{order.isDelivered? order.deliveredAt.substring(0, 10): 'Not delivered'}</td>
                        <td>
                          <button
                            className="dt-btn"
                            onClick={() => {props.history.push(`/order/${order._id}`)}}
                          >details</button>
                        </td>
                      </tr>
                    ))
                  }
                </tbody>
                <tfoot>
                  <td colSpan="5">
                    <Link to={`/`}>continue shopping</Link>
                  </td>
                </tfoot>
              </table>
            </div>
          </div>
        )
      }
    </div>
  )
}