import React, { useEffect, Fragment } from "react";
import styled from "styled-components";
import { getMyRequests } from "../../../redux/apiCalls/request";
import { useSelector, useDispatch } from "react-redux";
import SideNavProfile from "../SideNavProfile";
import { Container, SideBar, Content } from "../../../pages/ProfilePage";
import Request from "./Request";
import LoadingSpinner from './../../LoadingSpinner';

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
`;

const MyRequests = () => {
  const dispatch = useDispatch();
  const { requests, loading } = useSelector((state) => state.request);

  useEffect(() => {
    getMyRequests(dispatch);
  }, [dispatch]);

  return (
    <Fragment>
        {loading ?<LoadingSpinner /> : 
    <Container>
      <SideBar>
        <SideNavProfile />
      </SideBar>
      <Content>
        <Wraper>
          <Title>הבקשות שלי</Title>
          {requests.length === 0 || null ? (
            <h1>אין בקשות</h1>
          ) : (
            requests.map((request, id) => {
              return <Request request={request} key={id} />;
            })
          )}
        </Wraper>
      </Content>
    </Container>
    }
    </Fragment>
  );
};

export default MyRequests;
