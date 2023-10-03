import React, { useEffect } from "react";
import styled from "styled-components";
import Message from "./Message";
import { messagesAction } from "../../../redux/slices/messages";
import { useGetUserMessagesMutation } from "../../../redux/apiCalls/messages";
import SideNavProfile from "../SideNavProfile";
import { Container, SideBar, Content } from "../../../pages/Profile";
import { useSelector, useDispatch } from "react-redux";
import LoadingSpinner from "../../UI/LoadingSpinner";
import uuid from "react-uuid";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  @media (max-width: 620px) {
    width: 380px;
  }
  @media (max-width: 850px) {
    padding: 12px;
  }
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
  /* @media (max-width: 390px) {
    margin-left: 20px;
  } */
`;

const H1 = styled.h1`
 text-align: center;
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
       {messages && <Wrapper>
          <Title>רשימת בקשות</Title>
          {messages.length === 0 || null ? (
            <H1>אין הודעות</H1>
          ) : (
            messages.map((message) => {
              return <Message message={message} key={uuid()} />;
            })
          )}
        </Wrapper>}
      </Content>
    </Container>
  );
};

export default MessagesList;
