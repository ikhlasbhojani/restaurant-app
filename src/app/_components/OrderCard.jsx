// OrderCard.js
import React from "react";

const OrderCard = ({ item, removeFromCart, orderCount }) => {
  return (
    <div className="order-card">
      <div>
        <img src={item.path} alt={item.name} />
      </div>
      <div className="order-card-info">
        <h3>{item.name}</h3>
        <p>Price: {item.price} Rupees</p>
      </div>
      <div>
        <button className="count-button" onClick={() => orderCount("-", item._id)}>-</button>
        <span className="order-span">{item.quantity}</span>
        <button className="count-button" onClick={() => orderCount("+", item._id)}>+</button>
      </div>
      <div>
        <button className="cart-button" onClick={() => removeFromCart(item._id)}>
          Remove
        </button>
      </div>
    </div>
  );
};

export default OrderCard;
