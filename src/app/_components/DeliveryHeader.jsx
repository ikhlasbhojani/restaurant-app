"use client";
import Link from "next/link";
import { useState } from "react";
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

const DeliveryHeader = () => {
  const [isToggleOpen, setIsToggleOpen] = useState(false);

  const userStorage = JSON.parse(localStorage.getItem("delivery")&&localStorage.getItem("delivery"));



  const logout = () => {
    localStorage.removeItem("delivery");
    window.location.reload();
  };

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
          {
            userStorage && (
              <li><Link className="nav-menu-list" href="/user-auth"><button onClick={logout}>Logout</button> </Link></li>
            )
          }
        </NavManu>
        <FaBars className="menuToggleBtn" onClick={handleToggleOpen} />
      </StyledHeader>
    </>
  );
};

export default DeliveryHeader;
