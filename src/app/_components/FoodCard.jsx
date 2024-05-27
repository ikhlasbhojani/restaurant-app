import React from "react";
import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Avatar, Card } from "antd";
const { Meta } = Card;
const FoodCard = ({ item, addToCart, removeFromCart, cartIds }) => {
  return (
    <Card
    className="food-list-item"
      style={{
        width: 300,
      }}
      cover={<img alt="example" src={item.path} style={{ border: "1px solid #f2f5f3", height: 200, width: "100%"}} />}
      hoverable
    >
      <Meta title={item.name} />
      <p>Price: {item.price} Rupees</p>
      <p>{item.description}</p>
      {cartIds.includes(item._id) ? (
        <button className="cart-button" onClick={() => removeFromCart(item._id)}>
          Remove From Cart
        </button>
      ) : (
        <button className="cart-button" onClick={() => addToCart(item)}>Add to Cart</button>
      )}
    </Card>
  );
};
export default FoodCard;
