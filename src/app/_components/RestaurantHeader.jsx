"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { FaBars } from "react-icons/fa";

const StyledHeader = styled.header`
  background-color: orange;
  padding: 6px 0px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .nav_logo {
    padding: 0 12px;
    .nav-logo-link {
      text-decoration: none;
      font-size: 24px;
      color: white;
      font-weight: bold;
    }
  }
  .menuToggleBtn {
    display: none;
    color: white;
    font-size: 24px;
    position: absolute;
    right: 20px;
    top: 15px;
    cursor: pointer;
  }

  @media screen and (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    .menuToggleBtn {
      display: block;
      font-size: 18px;
    }
  }
`;
const NavManu = styled.ul`
  list-style: none;
  display: flex;


  .nav-menu-list {
    text-decoration: none;
    color: white;
    display: block;
    padding: 10px 10px;
    transition: color 0.3s ease;
    &:hover {
      cursor: pointer;
      color: black;
    }
  }
  .nav-menu-list button{
    border: none;
    background: none;
    color: white;
    cursor: pointer;
    font-size: 16px;
    &:hover {
      cursor: pointer;
      font-weight: bold;
    }
  }
  @media screen and (max-width: 768px) {
    display: ${(props) => (props.isToggleOpen ? "block" : "none")};
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    margin-top: 5px;
    text-align: center;
    padding: 0;
  }
`;

const RestaurantHeader = () => {
  const [details, setDetails] = useState();
  const router = useRouter();
  const pathname = usePathname();
  const [isToggleOpen, setIsToggleOpen] = useState(false);

  useEffect(() => {
    let data = localStorage.getItem("restaurantUser");
    if (!data && pathname !== "/restaurant") {
      router.push("/restaurant");
    }else if(data && pathname === "/restaurant"){
      router.push("/restaurant/dashboard")
    }else{
      setDetails(JSON.parse(data))
    }
  },[]);

  const logout = () => {
    localStorage.removeItem("restaurantUser");
    router.push("/restaurant");

  }

  const handleToggleOpen = () => {
    setIsToggleOpen(!isToggleOpen);
  };

  return (


    <>
      <StyledHeader>
        <div className="nav_logo">
          <Link href="/" className="nav-logo-link">
         LOGO
          </Link>
        </div>

        <NavManu isToggleOpen={isToggleOpen}>
          <li>
            <Link href="/" className="nav-menu-list">
              Home
            </Link>
          </li>
          {details && details.name ? (
          <>
            <li>
              <Link className="nav-menu-list" href="/restaurant"><button onClick={logout}>Logout</button></Link>
            </li>
            <li>
              <Link className="nav-menu-list" href="/">Profile</Link>
            </li>
            <li>
              <Link className="nav-menu-list" href="/restaurant/order">Orders</Link>
            </li>
          </>
        ) : (
          <li>
            <Link href="/" className="nav-menu-list">Login/SignIp</Link>
          </li>
        )}
        </NavManu>
        <FaBars className="menuToggleBtn" onClick={handleToggleOpen} />
      </StyledHeader>
    </>
  );
};

export default RestaurantHeader;