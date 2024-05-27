"use client";
import { useEffect, useState } from "react";
import CustomerHeader from "../_components/CustomerHeader";
import RestaurantFooter from "../_components/RestaurantFooter";
import { useRouter } from "next/navigation";
import { DELIVERY_CHARGES, TAX } from "../lib/constant";
import OrderCard from "../_components/OrderCard";

const Page = (props) => {
  const [cartNumber, setCartNumber] = useState(0);
  const [cartItem, setCartItem] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const cartStorage = localStorage.getItem("cart"); // Get cart storage without parsing
    setCartItem(cartStorage ? JSON.parse(cartStorage) : []); // Parse cart storage only if not null
    setCartNumber(cartStorage ? JSON.parse(cartStorage).length : 0);
  }, []);

  useEffect(() => {
    if (props.cartData) {
      if (cartNumber) {
        if (cartItem[0]?.resto_id !== props.cartData.resto_id) {
          localStorage.removeItem("cart");
          setCartNumber(1);
          setCartItem([props.cartData]);
          localStorage.setItem("cart", JSON.stringify([props.cartData]));
        } else {
          let localCartItem = cartItem;
          localCartItem.push(JSON.parse(JSON.stringify(props.cartData)));
          setCartItem(localCartItem);
          setCartNumber(cartNumber + 1);
          localStorage.setItem("cart", JSON.stringify(localCartItem));
        }
      } else {
        setCartNumber(1);
        setCartItem([props.cartData]);
        localStorage.setItem("cart", JSON.stringify([props.cartData]));
      }
    }
  }, [props.cartData]);

  // Define totalPrice
  const totalPrice = cartItem.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const confirmPrice = totalPrice + DELIVERY_CHARGES + totalPrice * (TAX / 100);

  const removeFromCart = (itemId) => {
    const updatedCart = cartItem.filter((item) => item._id !== itemId);
    setCartItem(updatedCart);
    setCartNumber(updatedCart.length);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const orderCount = (operation, itemId) => {
    let updatedItemCount;
    if (operation === "+") {
      updatedItemCount = cartItem.map((item) => {
        if (item._id === itemId) {
          return { ...item, quantity: item.quantity + 1 };
        }
        return item;
      });
    } else if (operation === "-") {
      updatedItemCount = cartItem.map((item) => {
        if (item._id === itemId && item.quantity > 1) {
          return { ...item, quantity: item.quantity - 1 };
        }
        return item;
      });
    }
    setCartItem(updatedItemCount);
    localStorage.setItem("cart", JSON.stringify(updatedItemCount));
  };

  const placeOrder =async () => {
    if (JSON.parse(localStorage.getItem("user"))) {
      router.push("/order");
    } else {
      router.push("/user-auth?order=true");
    }

  
  };

  return (
    <div>
      <CustomerHeader />
      <div className="order-wrapper">
        {cartItem.length > 0 ? (
          cartItem.map((item) => (
            <OrderCard
              key={item._id}
              item={item}
              removeFromCart={removeFromCart}
              orderCount={orderCount}
            />
          ))
        ) : (
          <h1>No Food Items for this Restaurant</h1>
        )}
      </div>
      {cartItem.length > 0 && (
        <div className="total-wrapper">
          <div className="block-1">
            <div className="row">
              <span>Food Charges : </span>
              <span>{totalPrice}</span>
            </div>
            <div className="row">
              <span>Tax : </span>
              <span>{(totalPrice * (TAX / 100)).toFixed(2)}</span>
            </div>
            <div className="row">
              <span>Delivery Charges : </span>
              <span>{DELIVERY_CHARGES}</span>
            </div>
            <div className="row">
              <span>Total Amount : </span>
              <span>{confirmPrice}</span>
            </div>
          </div>
          <div className="block-2">
            <button onClick={placeOrder}>Order Now</button>
          </div>
        </div>
      )}
      <RestaurantFooter />
    </div>
  );
};

export default Page;
