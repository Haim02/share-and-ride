import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled, { ThemeProvider } from "styled-components";
import { useDispatch } from "react-redux";
import {
  faCaretUp,
  faCaretDown,
  faCalendarDays,
  faClockFour,
  faNoteSticky,
} from "@fortawesome/free-solid-svg-icons";
import Button from "../../button/Button";
import { updateMessage } from "../../../redux/apiCalls/messages";
import { format } from "date-fns";
import ReactTimeAgo from 'react-time-ago'


const Container = styled.div`
  box-shadow: 0 0 5px rgba(225, 225, 225, 0.5);
  margin: 20px 0;
  border: 3px solid ${(props) => props.theme.main};
`;

Container.defaultProps = {
  theme: {
    main: "lightgray",
  },
};
const Header = styled.div`
  display: flex;
  flex-direction: row-reverse;
  justify-content: center;
  justify-content: space-between;
  width: 500px;
  background: #fff;
  padding: 20px;
  color: #2e3038;
  font-size: 18px;
  font-weight: 600;
  cursor: pointer;
  position: relative;
  transition: all 0.3s ease;
  color: #fff;
  background: #5393dc;
`;
const Title = styled.h1`
  font-weight: 20px;
  text-align: right;
  margin-left: 5px;
`;

const Detailes = styled.div`
  display: flex;
  flex-direction: column;
  height: 160px;
  background-color: lightgrey;
  margin-bottom: 20px;
  transition: all 0.3s ease;
  justify-content: center;
  align-items: center;
  justify-content: space-between;
  justify-content: space-around;
`;

const SmallIcon = styled.span`
  margin-left: 0.25rem;
  color: white;
  font-size: 0.75rem;
  line-height: 1rem;
  fill: currentColor;
  transition: all 0.3s ease;
  position: absolute;
  top: 70%;
  left: 50%;
  width: 13px;
  height: 13px;
  margin: 0 10px;

  @media (min-width: 768px) {
    font-size: 1rem;
    line-height: 1.5rem;
  }
`;

const Span = styled.span``;

const SpanItem = styled.div`
  display: flex;
  flex-direction: row-reverse;
  justify-content: space-between;
  width: 60%;
`;

const Body = styled.div`
  display: flex;
  flex-direction: column;
  background: #fff;
  transition: all 0.3s ease;
  ${({ active }) =>
    active &&
    `
    display: none;
  `}
`;

const Request = ({ request }) => {
  const [isStartCalendarOpen, setIsStartCalendarOpen] = useState(false);
  const dispatch = useDispatch();

  const theme = {
    main:
      request.status === "approve"
        ? "green"
        : request.status === "reject"
        ? "red"
        : "lightgray",
  };

  const getStatus =
    request.status === "approve"
      ? "אושר"
      : request.status === "reject"
      ? "נדחה"
      : "ממתין";

  const toggleStartCalendarOpen = () => {
    setIsStartCalendarOpen(!isStartCalendarOpen);

    if(request.isCalled !== false){
      updateMessage(dispatch, request._id, { isCalled: true });
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container>
        <Header>
          <Title>בקשת השכרה</Title>
          <Span> סטטוס : {getStatus}</Span>
          <ReactTimeAgo date={request.createdAt} locale="he"/>
          <SmallIcon onClick={toggleStartCalendarOpen}>
            <FontAwesomeIcon
              icon={isStartCalendarOpen ? faCaretUp : faCaretDown}
            />
          </SmallIcon>
        </Header>
        <Body active={!isStartCalendarOpen}>
          <Detailes>
            <SpanItem>
              <Span>
                {" "}
                :בתאריך <FontAwesomeIcon icon={faCalendarDays} />
              </Span>
              <Span> {request.date} </Span>
            </SpanItem>
            <SpanItem>
              <Span>
                {" "}
                :בין השעות <FontAwesomeIcon icon={faClockFour} />
              </Span>
              <Span>
                {request.start} -- {request.end}
              </Span>
            </SpanItem>
            <SpanItem>
              <Span>
                {" "}
                :הערות <FontAwesomeIcon icon={faNoteSticky} />
              </Span>
              <Span>{request.notice}</Span>
            </SpanItem>
          </Detailes>
        </Body>
      </Container>
    </ThemeProvider>
  );
};

export default Request;
