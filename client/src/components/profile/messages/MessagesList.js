import React, { useEffect } from "react";
import styled from "styled-components";
import Message from "./Message";
import { getUserMessages } from "../../../redux/apiCalls/messages";
import SideNavProfile from "../SideNavProfile";
import { Container, SideBar, Content } from "../../../pages/ProfilePage";
import { useSelector, useDispatch } from "react-redux";
import LoadingSpinner from "./../../LoadingSpinner";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const Title = styled.div`
  margin-bottom: 25px;
  background: #5393dc;
  padding: 20px;
  font-size: 20px;
  text-align: center;
  color: #fff;
  text-transform: uppercase;
  border-radius: 2px;
  font-weight: 700;
`;

const MessagesList = () => {
  const dispatch = useDispatch();
  const { messages, loading } = useSelector((state) => state.message);

  useEffect(() => {
    getUserMessages(dispatch);
  }, [dispatch]);

  return (
    <Container>
      {loading && <LoadingSpinner />}
      <SideBar>
        <SideNavProfile />
      </SideBar>
      <Content>
        <Wrapper>
          <Title>רשימת בקשות</Title>
          {messages.length === 0 || null ? (
            <h1>אין הודעות</h1>
          ) : (
            messages.map((message, id) => {
              return <Message message={message} key={id} />;
            })
          )}
        </Wrapper>
      </Content>
    </Container>
  );
};

export default MessagesList;
