'use client'
import CustomerHeader from "@/app/_components/CustomerHeader"
import FoodCard from "@/app/_components/FoodCard";
import { useEffect, useState } from "react"

const Page = (props) => {
    const name = props.params.name;
    const [restaurantDetails, setRestaurantDetails] = useState();
    const [foodItems, setFoodItems] = useState([])
    const [cartData, setCartData] = useState();
    const [cartStorage, setCartStorage] = useState(null); // Initialize cartStorage to null
    const [cartIds, setCartIds] = useState([]);

    useEffect(() => {
        // Load cart data from localStorage when component mounts
        const cartDataFromLocalStorage = localStorage.getItem('cart');
        if (cartDataFromLocalStorage) {
            setCartStorage(JSON.parse(cartDataFromLocalStorage));
            setCartIds(JSON.parse(cartDataFromLocalStorage).map(cartItem => cartItem._id));
        }
        loadRestaurantDetails();
    }, []);

    const loadRestaurantDetails = async () => {
        const id = props.searchParams.id;
        let response = await fetch("http://localhost:3000/api/customer/" + id)
        response = await response.json();
        if (response.success) {
            setRestaurantDetails(response.details)
            setFoodItems(response.foodItems)
        }
    }

    const addToCart = (item) => {
        const updatedItem = { ...item, quantity: 1 }; // Adding quantity field with value 1
        const updatedCartStorage = cartStorage ? [...cartStorage, updatedItem] : [updatedItem];
        const updatedCartIds = updatedCartStorage.map(cartItem => cartItem._id);
        setCartStorage(updatedCartStorage);
        setCartIds(updatedCartIds);
        setCartData(updatedItem);
        localStorage.setItem('cart', JSON.stringify(updatedCartStorage)); // Saving updated cart to localStorage
    }

    const removeFromCart = (id) => {
        const updatedCartStorage = cartStorage.filter(cartItem => cartItem._id !== id);
        const updatedCartIds = updatedCartStorage.map(cartItem => cartItem._id);
        setCartStorage(updatedCartStorage);
        setCartIds(updatedCartIds);
        setCartData();
    }

    return (
        <div>
            <CustomerHeader cartData={cartData} removeCartData={null} />
            <div className="restaurant-page-banner">
                <h1>{decodeURI(name)}</h1>
            </div>
            <div className="details-wrapper">
                <h4>Email:{restaurantDetails?.email}</h4>
                <h4>Contact : {restaurantDetails?.contact}</h4>
                <h4>City:{restaurantDetails?.city}</h4>
                <h4>Address:{restaurantDetails?.address}</h4>
            </div>
            <div className="food-list-wrapper">
                {foodItems.length > 0 ? (
                    foodItems.map((item, index) => (
                        <FoodCard key={index} item={item} addToCart={addToCart} removeFromCart={removeFromCart} cartIds={cartIds} />
                    ))
                ) : (
                    <h1>No Food Items for this Restaurant</h1>
                )}
            </div>
        </div>
    )
}

export default Page
