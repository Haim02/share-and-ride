import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled, { ThemeProvider } from "styled-components";
import {
  faCaretUp,
  faCaretDown,
  faCalendarDays,
  faClockFour,
  faNoteSticky,
} from "@fortawesome/free-solid-svg-icons";
import bikeCover from '../../../assets/images/bikeCover.jpg'
import ReactTimeAgo from "react-time-ago";

const Container = styled.div`
  box-shadow: 0 0 5px rgba(225, 225, 225, 0.5);
  margin: 20px 0;
  border: 3px solid ${(props) => props.theme.main};
  @media (max-width: 390px) {
    /* width: 350px; */
    /* margin-left: 20px; */
  }
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
  background: #fff;
  padding: 20px;
  width: 500px;
  color: #2e3038;
  font-size: 18px;
  font-weight: 600;
  cursor: pointer;
  position: relative;
  transition: all 0.3s ease;
  color: #fff;
  background: #5393dc;
  @media (max-width: 750px) {
    width: 100%;
    font-size: 16px;
  }
  @media (max-width: 620px) {
    font-size: 14px;
  }
  @media (max-width: 390px) {
    font-size: 12px;
    padding: 6px;
  }
`;
const Title = styled.h3`
  font-weight: 20px;
  text-align: right;
  margin-left: 20px;
`;

const ImgContainer = styled.div`
  background-color: black;
  width: 100%;
  height: 200px;
`;

const ProductImg = styled.img`
  width: 100%;
  height: 100%;
`;

const Detailes = styled.div`
  display: flex;
  flex-direction: column;
  height: 160px;
  background-color: lightgrey;
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

  @media (min-width: 542px) {
    font-size: 1rem;
    line-height: 1.5rem;
  }
`;

const Span = styled.span`
  margin-left: 15px;
  @media (min-width: 390px) {
  }
`;

const Notice = styled.small`
 text-align: right;
 font-size: 14px;
 width: 100px;
`;

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
  };

  return (
    <ThemeProvider theme={theme}>
      <Container>
        <Header>
          <Title>בקשת השכרה</Title>
          <Span> סטטוס: {getStatus}</Span>
          <ReactTimeAgo date={new Date(request.createdAt)} locale="he" />
          <SmallIcon onClick={toggleStartCalendarOpen}>
            <FontAwesomeIcon
              icon={isStartCalendarOpen ? faCaretUp : faCaretDown}
            />
          </SmallIcon>
        </Header>
        <Body active={!isStartCalendarOpen}>
          <ImgContainer>
            <ProductImg src={request?.productId?.images[0] || bikeCover} />
          </ImgContainer>
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
              <Notice>{request.notice}</Notice>
            </SpanItem>
          </Detailes>
        </Body>
      </Container>
    </ThemeProvider>
  );
};

export default Request;
