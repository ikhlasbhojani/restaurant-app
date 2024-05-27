"use client";
import { useState } from "react";
import React from "react";
import RestaurantSignup from "../_components/RestaurantSignup";
import RestaurentLogin from "../_components/RestaurentLogin";
import RestaurantHeader from "../_components/RestaurantHeader";
import RestaurantFooter from "../_components/RestaurantFooter";

const Page = () => {
  const [login, setLogin] = useState(true);

  return (
    <>
      <div className="container">
        <RestaurantHeader />
        <h1>Restaurant Login/SignUp Page</h1>
        {login ? <RestaurentLogin /> : <RestaurantSignup />}

        <div>
          <button className="button-link" onClick={() => setLogin(!login)}>
            {login
              ? "do not have account? SignUp"
              : "Already have Account? Login"}
          </button>
        </div>
      </div>
      <RestaurantFooter/>
    </>
  );
};

export default Page;
