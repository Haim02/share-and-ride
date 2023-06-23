import React from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import {
  MailOutline,
  PasswordOutlined,
  PedalBike,
  RequestQuote,
} from "@mui/icons-material";
import styled from "styled-components";
import { mobile } from "../UI/responsive";
import menuStyle from "../UI/menuStyle";
import { useMediaQuery } from "react-responsive";
import { slide as Menu } from "react-burger-menu";
import { MdPermIdentity } from "react-icons/md";

const Container = styled.div`
  height: 100vh;
  background-color: rgb(251, 251, 255);
  position: sticky;
`;

const SidebarWrapper = styled.div`
  padding: 20px;
  color: #555;
`;

const MenuContainer = styled(Menu)`
  margin-bottom: 0.75rem;
  color: white;
  font-size: 1.25rem;
  line-height: 1.75rem;
  text-align: right;
  a {
    margin-bottom: 0.75rem;
    color: white;
    font-size: 1.25rem;
    line-height: 1.75rem;
    text-align: right;
  }
`;

const SidebarMenu = styled.div`
  margin-bottom: 10px;
`;

const SidebarTitle = styled.h3`
  font-size: 13px;
  color: rgb(187, 186, 186);
  text-align: right;
`;

const SidebarList = styled.ul`
  list-style: none;
  padding: 8px;
`;
const SidebarListItem = styled.li`
  padding: 15px;
  cursor: pointer;
  display: flex;
  align-items: center;
  border-radius: 10px;
  :active,
  :hover {
    background-color: rgb(240, 240, 255);
  }
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
  margin-right: 0.25rem;
  transition-property: background-color, border-color, color, fill, stroke,
    opacity, box-shadow, transform;
  transition-duration: 300ms;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  color: #000000;
  font-size: 0.875rem;
  line-height: 1.25rem;
  font-weight: 500;
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

const SideNavProfile = () => {
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const ismobile = useMediaQuery({ maxWidth: "540px" });
  const params = useParams();

  if (ismobile) {
    return (
      <MenuContainer right styles={menuStyle}>
        <ListContainer>
          <NavItem menu>
            <Link to={`/profile/${id}`} style={{textDecoration: 'none'}}>חשבון</Link>
          </NavItem>
          <NavItem menu>
            <Link to={`/profile/${id}/userPassword`} style={{textDecoration: 'none'}}>סיסמה</Link>
          </NavItem>
          <NavItem>
            <Link to={`/profile/${params.id}/userProduct`} style={{textDecoration: 'none'}}>המוצר שלי</Link>
          </NavItem>
          <NavItem>
            <Link to={`/profile/${params.id}/myRequests`} style={{textDecoration: 'none'}}>הבקשות שלי</Link>
          </NavItem>
          <NavItem menu>
            <Link to={`/profile/${params.id}/messages`} style={{textDecoration: 'none'}}>תיבת בקשות</Link>
          </NavItem>
          <NavItem menu>
            <Link to={`/`} style={{textDecoration: 'none'}}>בית</Link>
          </NavItem>
        </ListContainer>
      </MenuContainer>
    );
  }

  return (
    <Container>
      <SidebarWrapper>
        <SidebarMenu>
          <SidebarTitle>תפריט</SidebarTitle>
          <SidebarList>
            <Link to={`/profile/${id}`} style={{textDecoration: 'none'}}>
              <SidebarListItem>
                <MdPermIdentity className="sidebarIcon" />
                חשבון
              </SidebarListItem>
            </Link>
            <Link to={`/profile/${params.id}/userProduct`} style={{textDecoration: 'none'}}>
              <SidebarListItem className="sidebarListItem">
                <PedalBike className="sidebarIcon" />
                המוצר שלי
              </SidebarListItem>
            </Link>
            <Link to={`/profile/${params.id}/userPassword`} style={{textDecoration: 'none'}}>
            <SidebarListItem className="sidebarListItem">
              <PasswordOutlined className="sidebarIcon" />
              סיסמה
            </SidebarListItem>
            </Link>
          </SidebarList>
        </SidebarMenu>

        <SidebarMenu>
          <SidebarTitle>התראות</SidebarTitle>
          <SidebarList>
            <Link to={`/profile/${params.id}/myRequests`} style={{textDecoration: 'none'}}>
              <SidebarListItem>
                <MailOutline className="sidebarIcon" />
                 הבקשות שלי
              </SidebarListItem>
            </Link>
            <Link to={`/profile/${params.id}/messages`} style={{textDecoration: 'none'}}>
              <SidebarListItem>
                <RequestQuote className="sidebarIcon" />
               תיבת בקשות
              </SidebarListItem>
            </Link>
          </SidebarList>
        </SidebarMenu>
      </SidebarWrapper>
    </Container>
  );
};

export default SideNavProfile;
