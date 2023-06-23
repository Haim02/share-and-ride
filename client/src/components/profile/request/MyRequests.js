import React, { useEffect, Fragment } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import SideNavProfile from "../SideNavProfile";
import { useGetUserRequestsMutation } from "../../../redux/apiCalls/messages";
import Request from "./Request";
import uuid from "react-uuid";
import LoadingSpinner from './../../UI/LoadingSpinner';
import { Container, SideBar, Content } from './../../../pages/Profile';
import { messagesAction } from './../../../redux/slices/messages';

const Wraper = styled.div`
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
  @media (max-width: 390px) {
    margin-left: 20px;
  }
`;

const MyRequests = () => {
  const [getUserRequests, { isLoading }] = useGetUserRequestsMutation();
  const dispatch = useDispatch();
  const { requests } = useSelector((state) => state.message);

  useEffect(() => {
    const getReguests = async () => {
      try {
        const res = await getUserRequests().unwrap();
        dispatch(messagesAction.getRequestsSuccess(res.requests));
      } catch (error) {}
    };
    getReguests();
  }, [dispatch, getUserRequests]);

  return (
    <Fragment>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <Container>
          <SideBar>
            <SideNavProfile />
          </SideBar>
          <Content>
            {requests && <Wraper>
              <Title>הבקשות שלי</Title>
              {requests.length === 0 || null ? (
                <h1>אין בקשות</h1>
              ) : (
                requests.map((request) => {
                  return <Request request={request} key={uuid()} />;
                })
              )}
            </Wraper>}
          </Content>
        </Container>
      )}
    </Fragment>
  );
};

export default MyRequests;
