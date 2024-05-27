"use client";
import RestaurantHeader from "@/app/_components/RestaurantHeader";
import { DELIVERY_CHARGES, TAX } from "@/app/lib/constant";
import React, { useEffect, useState } from "react";

const OrderPage = () => {
  const [foodOrders, setFoodOrders] = useState([]);
  console.log(foodOrders)


  useEffect(() => {
    const restaurantData = JSON.parse(localStorage.getItem("restaurantUser"));
    const resto_id = restaurantData._id;

    const loadFoodOrders = async () => {
      let response = await fetch(
        "http://localhost:3000/api/order/" + resto_id,
        {
          method: "GET",
        }
      );
      response = await response.json();
      if (response.success) {
        setFoodOrders(response.result);
      }
    };
    loadFoodOrders();
  }, []);

  return (
    <>
    <RestaurantHeader />
    <div className="order-page">
    <h1>Order Page</h1>
    {foodOrders && foodOrders.map((foodOrder, index) => { // Added '=>' and changed 'foodOrders' to 'foodOrder'
  return (
    <div className="place-order-wrapper" key={index}> {/* Moved the key to the outer div */}
      <div className="place-order">
        <p>Name: {foodOrder.userObj.name}</p> {/* Changed 'foodOrders' to 'foodOrder' */}
        <p>Phone Number: {foodOrder.userObj.mobile}</p> {/* Changed 'foodOrders' to 'foodOrder' */}
        <p>Address: {foodOrder.userObj.address}</p> {/* Changed 'foodOrders' to 'foodOrder' */}
        <p>City: {foodOrder.userObj.city}</p> {/* Changed 'foodOrders' to 'foodOrder' */}
      </div>
      {foodOrder.orderObj.map((order, orderIndex) => ( // Changed 'index' to 'orderIndex' to avoid conflict with outer index
        <div key={orderIndex} className="place-order"> {/* Changed 'index' to 'orderIndex' */}
          <img src={order.path} alt={order.name} />
          <p>Name: {order.name}</p>
          <p>Price: {order.price}</p>
          <p>Description: {order.description}</p>
          <p>Quantity: {order.quantity}</p>
        </div>
      ))}
      <div className="place-order">
        <p>Delivery Charges: {DELIVERY_CHARGES}</p>
        <p>Tax: {(foodOrder.totalPrice * (TAX / 100)).toFixed(2)}</p> {/* Changed 'foodOrders' to 'foodOrder' */}
        <p>Total Price: {foodOrder.totalPrice}</p> {/* Changed 'foodOrders' to 'foodOrder' */}
        <button className="button">Delivered</button> {/* Corrected typo */}
        <button className="button">Cancel</button>
      </div>
    </div>
  );
})}
  </div>
  </>
  );
};

export default OrderPage;
