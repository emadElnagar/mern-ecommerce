import React from "react";
import './checkoutSteps.css';

export default function CheckoutSteps(porps) {
  return (
    <div className="row shipping-steps">
      <div className={porps.step1 ? 'active' : '' }>signin</div>
      <div className={porps.step2 ? 'active' : '' }>shipping</div>
      <div className={porps.step3 ? 'active' : '' }>place order</div>
    </div>
  )
}