import React, { useEffect } from "react";
import styled from "styled-components";
import Message from "./Message";
import { messagesAction } from "../../../redux/slice/messages";
import { useGetUserMessagesMutation } from "../../../redux/apiCalls/messages";
import SideNavProfile from "../SideNavProfile";
import { Container, SideBar, Content } from "../../../pages/ProfilePage";
import { useSelector, useDispatch } from "react-redux";
import LoadingSpinner from "./../../LoadingSpinner";
import uuid from "react-uuid";

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
  const [getUserMessages, { isLoading }] = useGetUserMessagesMutation();
  const dispatch = useDispatch();
  const { messages } = useSelector((state) => state.message);

  useEffect(() => {
    const getMessages = async () => {
      try {
        const res = await getUserMessages().unwrap();
        dispatch(messagesAction.getMessagesSuccess(res.message));
      } catch (error) {
        console.log(error);
      }
    };
    getMessages();
  }, [dispatch, getUserMessages]);

  return (
    <Container>
      {isLoading && <LoadingSpinner />}
      <SideBar>
        <SideNavProfile />
      </SideBar>
      <Content>
        <Wrapper>
          <Title>רשימת בקשות</Title>
          {messages.length === 0 || null ? (
            <h1>אין הודעות</h1>
          ) : (
            messages.map((message) => {
              return <Message message={message} key={uuid()} />;
            })
          )}
        </Wrapper>
      </Content>
    </Container>
  );
};

export default MessagesList;
