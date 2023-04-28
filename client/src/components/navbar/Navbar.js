import React, { Fragment } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userLogout } from "../../redux/apiCalls/auth";
import styled from "styled-components";
import LogoImg from "../../assets/images/logo.png";
import { useMediaQuery } from "react-responsive";
import { slide as Menu } from "react-burger-menu";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import menuStyle from "../menuStyle";
import { mobile } from "../../responsive";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import Button from './../button/Button';

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
  @media (min-width: 1024px) {
    padding-right: 3rem;
    padding-left: 3rem;
  }
`;

const MenuContainer = styled(Menu)`
  margin-bottom: 0.75rem;
  color: white;
  font-size: 1.25rem;
  line-height: 1.75rem;
  a {
    margin-bottom: 0.75rem;
    color: white;
    font-size: 1.25rem;
    line-height: 1.75rem;
  }
`;
const LogoContainer = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  padding-top: 15px;
  margin-left: 20px;
  ${mobile({ minWidth: "168px" })}
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

const Counter = styled.div`
  width: 15px;
  height: 15px;
  background-color: red;
  border-radius: 50%;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 10px;
  font-weight: bold;
  position: absolute;
  top: -5px;
  right: -5px;
`;

const NavItem = styled.li`
  margin-right: 0.25rem;
  transition-property: background-color, border-color, color, fill, stroke,
    opacity, box-shadow, transform;
  transition-duration: 300ms;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  color: #000000;
  font-size: 0.875rem;
  line-height: 1.25rem;
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

const Items = styled.div`
        display: flex;
        align-items: center;
`;
const Item = styled.div`
 display: flex;
          align-items: center;
          margin-right: 20px;
          position: relative;
  `;

const Navbar = () => {
  const ismobile = useMediaQuery({ maxWidth: "540px" });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentUser, messages } = useSelector((state) => state.auth);
  const unRedingMessages = messages.filter(mgs => mgs.isCalled === true)

  const onLogoutHandle = () => {
    userLogout(dispatch);
      return navigate("/");
  };

  if (ismobile) {
    return (
      <MenuContainer right styles={menuStyle}>
        <ListContainer>
          <NavItem menu>
            <Link to="/" style={{textDecoration: 'none'}}>בית</Link>
          </NavItem>
          <NavItem>
            <Link to="/products" style={{textDecoration: 'none'}}>לעמוד ההשכרות</Link>
          </NavItem>
          <NavItem>
            <Link to="/uploadProduct" style={{textDecoration: 'none'}}>פרסם מוצר</Link>
          </NavItem>
          <NavItem menu>
            <Link to="/contact" style={{textDecoration: 'none'}}>צור קשר</Link>
          </NavItem>
          {!currentUser && (
            <NavItem menu>
              <Link to="/login" style={{textDecoration: 'none'}}>התחבר</Link>
            </NavItem>
          )}
          {currentUser && (
            <NavItem menu>
              <Link to={`/profile/${currentUser._id}`} style={{textDecoration: 'none'}}>חשבון</Link>
            </NavItem>
          )}
          {currentUser && (
            <NavItem menu>
              <button type="button" onClick={onLogoutHandle}>
                התנתק
              </button>
              <Link to="/" style={{textDecoration: 'none'}} onClick={onLogoutHandle}>
                התנתק
              </Link>
            </NavItem>
          )}
        </ListContainer>
      </MenuContainer>
    );
  }

  return (
    <Fragment>
      <NavbarContainer>
        <LogoContainer>
          <Link to='/'>
          <Image>
            <img src={LogoImg} alt="logo" />
          </Image>
          </Link>
        </LogoContainer>

        <ListContainer>
          <NavItem>
            <Link to="/" style={{textDecoration: 'none', color: '#000000', fontSize: '15px'}}>בית</Link>
          </NavItem>
          <NavItem>
            <Link to="/products" style={{textDecoration: 'none', color: '#000000', fontSize: '15px'}}>לעמוד ההשכרות</Link>
          </NavItem>
          <NavItem>
              <Link to='/uploadProduct'> 
           <Button
             theme='navUploadProduct'
             text='פרסם מוצר'
           />
           </Link>
          </NavItem>
          {!currentUser && (
            <NavItem>
              <Link to="/login" style={{textDecoration: 'none', color: '#000000', fontSize: '15px'}}>התחבר</Link>
            </NavItem>
          )}
          {currentUser && (
            <NavItem>
              <Link to={`/profile/${currentUser._id}`} style={{textDecoration: 'none'}}>
                <FontAwesomeIcon icon={faUser} style={{color: 'black'}}/>
                <small style={{color: '#000000', fontSize: '13px'}}>{currentUser.name}</small>
              </Link>
            </NavItem>
          )}
          {currentUser && (
            <>
            <NavItem>
            <Link to={`/profile/${currentUser._id}`} style={{textDecoration: 'none'}}>
              <Item className="item">
            <NotificationsNoneOutlinedIcon style={{fontSize: '20px'}} />
            {unRedingMessages.length > 0 && <Counter className="counter">1</Counter>}
          </Item>
          </Link>
            </NavItem>
            <NavItem>
            <Link to={`/profile/${currentUser._id}`} style={{textDecoration: 'none'}}>
          <Item className="item">
            <ChatBubbleOutlineOutlinedIcon className="icon" />
            {unRedingMessages.length > 0 && <Counter className="counter">1</Counter>}
          </Item>
          </Link>
          </NavItem>
          </>
          )}
          {currentUser && (
            <NavItem>
              <Button theme='logout' text='התנתק' onClick={onLogoutHandle}/>
            </NavItem>
          )}
        </ListContainer>
      </NavbarContainer>
      <Outlet />
    </Fragment>
  );
};

export default Navbar;
