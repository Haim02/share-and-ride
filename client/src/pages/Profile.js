import React from "react";
import styled from "styled-components";
import SideNavProfile from "../components/profile/SideNavProfile";
import User from "../components/profile/User";

export const Container = styled.div`
  display: flex;
  margin: 20px 0;
`;

export const SideBar = styled.div`
  flex: 1;
`;

export const Content = styled.div`
  flex: 3;
  margin-bottom: auto;
  margin-top: 40px;
  margin-right: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ProfilePage = () => {
  return (
    <Container>
      <SideBar>
        <SideNavProfile />
      </SideBar>
      <Content>
        <User />
      </Content>
    </Container>
  );
};

export default ProfilePage;
