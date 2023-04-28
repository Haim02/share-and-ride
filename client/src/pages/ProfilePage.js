import React from "react";
import { Routes, Route, Navigate, useLocation, useParams } from "react-router-dom";
import styled from "styled-components";
import SideNavProfile from "../components/profile/SideNavProfile";
import User from "../components/profile/User";
import { useSelector } from "react-redux";
import Message from "../components/profile/messages/Message";
import MessagesList from "./../components/profile/messages/MessagesList";
import MyRequests from "./../components/profile/request/MyRequests";

export const Container = styled.div`
  display: flex;
  margin: 20px 0;
  /* justify-content: space-between; */
`;

export const SideBar = styled.div`
  flex: 1;
  /* width: 40%; */
  /* background-color: black; */
  /* position: fixed;
   left: 0;
   top: 70px;
   bottom: 70px; */

  /* margin-right: 3px; */
`;

export const Content = styled.div`
  flex: 3;
  margin: 10px 0;
  margin-right: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  /* margin-left: 150px; */
  /* width: 50%; */
`;

const ProfilePage = () => {
  const { currentUser } = useSelector((state) => state.auth);
  const location = useLocation();
  const p = location.pathname.split("/")[2];
  // let p2 = `/${p[1]}/messasges/${p[p.length-1]}`
  let p2 = `${p}/messages`;
  // console.log("p1", p2);
  // console.log("p11", location.pathname);
  const param = useParams()
  console.log(param.id)

  return (
    <Container>
      <SideBar>
        <SideNavProfile />
      </SideBar>
      <Content>
        <User />
      </Content>
      {/* <User /> */}
      {/* <Routes>
      <Route path={`/user${currentUser._id}`} element={<User />} />
    </Routes> */}
    </Container>
    // <Container>
    //   <SideBar>
    //     <SideNavProfile />
    //   </SideBar>
    //   {/* <Content /> */}
    //   {/* <Product /> */}
    // </Container>
  );
};

export default ProfilePage;
