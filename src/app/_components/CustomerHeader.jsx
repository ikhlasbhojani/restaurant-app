import Link from "next/link"
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { FaBars } from "react-icons/fa";

const StyledHeader = styled.header`
  background-color: orange;

  width: 100%;
  display: flex;
  padding: 6px 0px;
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
    transition: color 0.3s ease;
    &:hover {
      cursor: pointer;
      color: black;
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




const CustomerHeader = (props) => {
    const router = useRouter();
    const [user, setUser] = useState();
    const [cartNumber, setCartNumber] = useState(0);
    const [cartItem, setCartItem] = useState([]);
    const [isToggleOpen, setIsToggleOpen] = useState(false);
    
    useEffect(() => {
        const userStorage = localStorage.getItem('user');
        const cartStorage = localStorage.getItem('cart');
        setUser(userStorage ? JSON.parse(userStorage) : undefined);
        setCartItem(cartStorage ? JSON.parse(cartStorage) : []);
        setCartNumber(cartStorage ? JSON.parse(cartStorage).length : 0);
    }, []);

    useEffect(() => {
        if (props.cartData) {
            if (cartNumber) {
                if (cartItem[0]?.resto_id !== props.cartData.resto_id) {
                    localStorage.removeItem('cart');
                    setCartNumber(1);
                    setCartItem([props.cartData]);
                    localStorage.setItem('cart', JSON.stringify([props.cartData]));
                } else {
                    let localCartItem = cartItem;
                    localCartItem.push(JSON.parse(JSON.stringify(props.cartData)));
                    setCartItem(localCartItem);
                    setCartNumber(cartNumber + 1);
                    localStorage.setItem('cart', JSON.stringify(localCartItem));
                }
            } else {
                setCartNumber(1);
                setCartItem([props.cartData]);
                localStorage.setItem('cart', JSON.stringify([props.cartData]));
            }
        }
    }, [props.cartData]);

    useEffect(() => {
        if (props.removeCartData) {
            let localCartItem = cartItem.filter((item) => {
                return item._id !== props.removeCartData;
            });
            setCartItem(localCartItem);
            setCartNumber(cartNumber - 1);
            localStorage.setItem('cart', JSON.stringify(localCartItem));
            if (localCartItem.length === 0) {
                localStorage.removeItem('cart');
            }
        }
    }, [props.removeCartData]);

    const logout = () => {
        localStorage.removeItem('user');
        router.push('/user-auth');
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
          {user ?
                    <>
                        <li>
                            <Link className="nav-menu-list" href="/myprofile" >{user?.name}</Link>
                        </li>
                        <li><Link className="nav-menu-list" href="/user-auth"><button onClick={logout}>Logout</button> </Link></li>
                    </> :
                    <>
                        <li>
                            <Link className="nav-menu-list" href="/user-auth" >Login</Link>
                        </li>
                    </>
                }
                 <li>
                     <Link className="nav-menu-list" href={cartNumber ? "/cart" : "#"} >Cart({cartNumber})</Link>
                 </li>
                 <li>
                     <Link className="nav-menu-list" href="/restaurant" >Add Restaurant</Link>
                </li>
                <li>
                    <Link className="nav-menu-list" href="/deliverypartner" >Delivery Partner</Link>
                </li>
        </NavManu>
        <FaBars className="menuToggleBtn" onClick={handleToggleOpen} />
      </StyledHeader>
    </>
    );
};

export default CustomerHeader;
