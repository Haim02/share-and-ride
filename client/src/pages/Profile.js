import React from "react";
import styled from "styled-components";
import SideNavProfile from "../components/profile/SideNavProfile";
import User from "../components/profile/User";

export const Container = styled.div`
  display: flex;
  margin: 20px 0;
  /* align-items: center; */
  justify-content: center;
  @media (max-width: 850px) {
    padding: 10px;
  }
`;

export const SideBar = styled.div`
  flex: 1;
  @media (max-width: 900px) {
    flex: 0;
  }
`;

export const Content = styled.div`
  flex: 3;
  margin-bottom: auto;
  display: flex;
  /* align-items: center; */
  justify-content: center;
  @media (max-width: 900px) {
    flex: 0;
  }
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
