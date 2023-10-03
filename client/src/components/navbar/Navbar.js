import React, { Fragment } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import LogoImg from "../../assets/images/logo.png";
import { useMediaQuery } from "react-responsive";
import { slide as Menu } from "react-burger-menu";
import { mobile } from "../UI/responsive";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import Button from "../button/Button";
import { useLogoutMutation } from "../../redux/apiCalls/auth";
import { authAction } from "../../redux/slices/auth";
import { messagesAction } from "../../redux/slices/messages";
import { productAction } from "../../redux/slices/products";
import LoadingSpinner from "./../UI/LoadingSpinner";
import menuStyle from "./../UI/menuStyle";

const NavbarContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 1536px;
  background-color: #fff;
  border-bottom: 1px solid #eee;
  box-shadow: 0px 10px 10px rgba(167, 165, 165, 0.959);
  height: 60px;
  @media (min-width: 324px) {
    padding-right: 3rem;
    padding-left: 3rem;
  }
`;

const MenuContainer = styled(Menu)`
  margin-bottom: 0.75rem;
  margin-bottom: 20px;
  color: white;
  font-size: 1.25rem;
  line-height: 1.75rem;
  text-align: right;
  a {
    text-align: right;
    margin-top: 20px;
    margin-bottom: 50px;
    color: white;
    font-size: 1.15rem;
    line-height: 2.35rem;
  }
`;

const LogoContainer = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  padding-top: 15px;
  margin-left: 20px;
  ${mobile({ minWidth: "368px" })}
`;

const Image = styled.div`
  width: 110px;
  height: 4rem;
  margin-bottom: 9px;
  img {
    width: 100%;
    height: 90%;
  }
  ${mobile({ minWidth: "168px" })}
`;

const ListContainer = styled.ul`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  justify-content: space-around;
  list-style-type: none;
  padding: 0 10px;
  ${mobile({ flex: 2, justifyContent: "center" })}
`;

const NavItem = styled.li`
  margin-right: 0.2rem;
  transition-property: background-color, border-color, color, fill, stroke,
    opacity, box-shadow, transform;
  transition-duration: 300ms;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  color: #000000;
  font-size: 0.875rem;
  line-height: 1.25rem;
  font-family: Arial, Helvetica, sans-serif;
  font-weight: 5300;
  cursor: pointer;
  :hover {
    color: #374151;
  }
  @media (min-width: 768px) {
    margin-right: 1.25rem;
    font-size: 1rem;
    line-height: 1.5rem;
  }
`;

const MobileNav = styled.div`
  height: 60px;
  background-color: rgb(52, 138, 244);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const MobileNavText = styled.h3`
  font-family: sans-serif;
  font-weight: 15px;
  font-size: 22px;
  text-decoration: none;
`;

const Navbar = () => {
  const [logout, { isLoading }] = useLogoutMutation();
  const isMobile = useMediaQuery({ maxWidth: "630px" });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.auth);

  const onLogoutHandle = async () => {
    try {
      await logout().unwrap();
      dispatch(authAction.logoutSuccess());
      dispatch(messagesAction.clearState());
      dispatch(productAction.clearState());
      navigate("/");
      if (!currentUser) {
        navigate("/");
      } 
    } catch (error) {}
  };

  if (isMobile) {
    return (
      <Fragment>
        <MobileNav>
          <MobileNavText>
            <Link to="/" style={{ textDecoration: "none", color: "black" }}>
              Share&Ride
            </Link>
          </MobileNavText>
        </MobileNav>
        <MenuContainer right styles={menuStyle}>
          <ListContainer>
            <NavItem menu>
              <Link to="/" style={{ textDecoration: "none" }}>
                בית
              </Link>
            </NavItem>
            <NavItem>
              <Link to="/products" style={{ textDecoration: "none" }}>
                לעמוד ההשכרות
              </Link>
            </NavItem>
            <NavItem>
              <Link to="/uploadProduct" style={{ textDecoration: "none" }}>
                פרסם מוצר
              </Link>
            </NavItem>
            {!currentUser && (
              <NavItem menu>
                <Link to="/login" style={{ textDecoration: "none" }}>
                  התחבר
                </Link>
              </NavItem>
            )}
            {currentUser && (
              <NavItem menu>
                <Link
                  to={`/profile/${currentUser._id}`}
                  style={{ textDecoration: "none" }}
                >
                  חשבון
                </Link>
              </NavItem>
            )}
            {currentUser && (
              <NavItem menu>
                <button type="button" onClick={onLogoutHandle}>
                  התנתק
                </button>
              </NavItem>
            )}
          </ListContainer>
        </MenuContainer>
      </Fragment>
    );
  }

  return (
    <Fragment>
      <NavbarContainer>
        <LogoContainer>
          <Link to="/">
            <Image>
              <img src={LogoImg} alt="logo" />
            </Image>
          </Link>
        </LogoContainer>

        <ListContainer>
          <NavItem>
            <Link
              to="/"
              style={{
                textDecoration: "none",
                color: "#000000",
                fontSize: "15px",
              }}
            >
              בית
            </Link>
          </NavItem>
          <NavItem>
            <Link
              to="/products"
              style={{
                textDecoration: "none",
                color: "#000000",
                fontSize: "15px",
              }}
            >
              לעמוד ההשכרות
            </Link>
          </NavItem>
          <NavItem>
            <Link to="/uploadProduct">
              <Button theme="navUploadProduct" text="פרסם מוצר" />
            </Link>
          </NavItem>
          {!currentUser && (
            <NavItem>
              <Link
                to="/login"
                style={{
                  textDecoration: "none",
                  color: "#000000",
                  fontSize: "15px",
                }}
              >
                התחבר
              </Link>
            </NavItem>
          )}
          {currentUser && (
            <NavItem>
              <Link
                to={`/profile/${currentUser._id}`}
                style={{ textDecoration: "none" }}
              >
                <FontAwesomeIcon icon={faUser} style={{ color: "black" }} />
                <small style={{ color: "#000000", fontSize: "13px" }}>
                  {currentUser && currentUser.name.slice(0, 5)}
                </small>
              </Link>
            </NavItem>
          )}
          {currentUser && (
            <NavItem>
              <Button theme="logout" text="התנתק" onClick={onLogoutHandle} />
            </NavItem>
          )}
        </ListContainer>
      </NavbarContainer>
      <Outlet />
      {isLoading && <LoadingSpinner />}
    </Fragment>
  );
};

export default Navbar;
