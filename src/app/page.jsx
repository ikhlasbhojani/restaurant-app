"use client";
import { useEffect, useState } from "react";
import CustomerHeader from "./_components/CustomerHeader";
import RestaurantFooter from "./_components/RestaurantFooter";
import { useRouter } from "next/navigation";
import RestaurantCard from "./_components/RestaurantCard";

export default function Home() {
  const [locations, setLocations] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState("");
  const [showList, setShowList] = useState(false);
  const [restaurants, setRestaurants] = useState([]);
  const router = useRouter();

  useEffect(() => {
    loadLocations();
    loadRestaurants();
  }, []);

  const handleListItem = (item) => {
    setSelectedLocation(item);
    setShowList(false);
    loadRestaurants({ location: item });
  };

  const loadLocations = async () => {
    let response = await fetch("http://localhost:3000/api/customer/locations");
    response = await response.json();
    if (response.success) {
      setLocations(response.result);
    } else {
      console.log("something went wrong");
    }
  };

  const loadRestaurants = async (params) => {
    let url = "http://localhost:3000/api/customer";
    if (params?.location) {
      url = url + "?location=" + params.location;
    } else if (params?.restaurant) {
      url = url + "?restaurant=" + params.restaurant;
    }
    let response = await fetch(url);
    response = await response.json();
    if (response.success) {
      setRestaurants(response.result);
    } else {
      console.log("something went wrong");
    }
  };
  return (
    <main >
      <CustomerHeader />

    <div className="page-content">
    <div className="main-page-banner">
        <h1>Welcome to Food App</h1>
        <div className="input-wrapper">
          <input
            type="text"
            onClick={() => {
              setShowList(true);
            }}
            value={selectedLocation}
            onChange={(event) => {
              setSelectedLocation(event.target.value);
            }}
            className="select-input"
            placeholder="Select Place"
          />
          <ul className="location-list">
            {showList &&
              locations.map((item, index) => (
                <li
                  key={index}
                  onClick={() => {
                    handleListItem(item);
                  }}
                >
                  {item}
                </li>
              ))}
          </ul>
          <input
            type="text"
            className="search-input"
            onChange={(event) =>
              loadRestaurants({ restaurant: event.target.value })
            }
            placeholder="Enter Food or Restaurant"
          />
        </div>
      </div>
      <div className="restaurant-list-container">
        {restaurants.map((item, index) => (

          <RestaurantCard item={item} key={index} />
        ))}
      </div>
    </div>
      <RestaurantFooter />
    </main>
  );
}
