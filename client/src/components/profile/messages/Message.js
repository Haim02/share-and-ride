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
import { useUpdateMessageMutation } from "../../../redux/apiCalls/messages";
import { messagesAction } from "../../../redux/slices/messages";
import Button from "../../button/Button";
import { useDispatch } from "react-redux";
import ReactTimeAgo from "react-time-ago";

const Container = styled.div`
  box-shadow: 0 0 5px rgba(225, 225, 225, 0.5);
  margin-right: 40px;
  background-color: bisque;
  margin: 20px 0;
  border: 3px solid ${(props) => props.theme.main};
  @media (max-width: 390px) {
    width: 350px;
    margin-right: 0px;
    margin-left: 20px;
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
  margin-left: 40px;
  @media (max-width: 460px) {
    /* font-size: 12px; */
    /* margin-left: 0; */
  }
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

  @media (min-width: 768px) {
    font-size: 1rem;
    line-height: 1.5rem;
  }
`;

const Span = styled.span`

`;

const SpanItem = styled.div`
  display: flex;
  flex-direction: row-reverse;
  justify-content: space-between;
  width: 60%;
  @media (min-width: 390px) {
    width: 90%;
  }
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

const ButtonsContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Message = ({ message }, props) => {
  const [updateMessage] = useUpdateMessageMutation();
  const dispatch = useDispatch();
  const [isStartCalendarOpen, setIsStartCalendarOpen] = useState(false);
  const isPending = message.status === "pending";

  const theme = {
    main:
      message.status === "approve"
        ? "green"
        : message.status === "reject"
        ? "red"
        : "lightgray",
  };

  const getStatus =
    message.status === "approve"
      ? "אושר"
      : message.status === "reject"
      ? "נדחה"
      : "ממתין";

  const toggleStartCalendarOpen = () => {
    setIsStartCalendarOpen(!isStartCalendarOpen);
  };

  const handleApproveClick = async (e) => {
    e.preventDefault();
    const sentData = {
      id: message._id,
      updateStatus: {
        status: "approve",
      },
    };
    try {
      const res = await updateMessage(sentData).unwrap();
      dispatch(
        messagesAction.updateMessagesSuccess({
          id: message._id,
          message: res.message,
        })
      );
    } catch (error) {
    }
  };

  const handleRejectClick = async (e) => {
    e.preventDefault();
    const sentData = {
      id: message._id,
      updateStatus: {
        status: "reject",
      },
    };
    try {
      const res = await updateMessage(sentData).unwrap();
      dispatch(
        messagesAction.updateMessagesSuccess({
          id: message._id,
          message: res.message,
        })
      );
    } catch (error) {
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container>
        <form>
          <Header>
            <Title>בקשת השכרה</Title>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                textAlign: "right",
                marginLeft: '25px'
              }}
            >
              <Span> סטטוס : {getStatus}</Span>
              <h6> {message.fromUser.name} : שולח</h6>
            </div>
            <ReactTimeAgo date={new Date(message.createdAt)} locale="he" />
            <SmallIcon onClick={toggleStartCalendarOpen}>
              <FontAwesomeIcon
                icon={isStartCalendarOpen ? faCaretUp : faCaretDown}
              />
            </SmallIcon>
          </Header>
          <Body active={!isStartCalendarOpen}>
            <ImgContainer>
              <ProductImg src={message?.productId?.images[0]} />
            </ImgContainer>
            <Detailes>
              <SpanItem>
                <Span>
                  {" "}
                  :בתאריך <FontAwesomeIcon icon={faCalendarDays} />
                </Span>
                <Span> {message.date} </Span>
              </SpanItem>
              <SpanItem>
                <Span>
                  {" "}
                  :בין השעות <FontAwesomeIcon icon={faClockFour} />
                </Span>
                <Span>
                  {message.start} -- {message.end}
                </Span>
              </SpanItem>
              <SpanItem>
                <Span>
                  {" "}
                  :הערות <FontAwesomeIcon icon={faNoteSticky} />
                </Span>
                <Span>{message.notice}</Span>
              </SpanItem>
            </Detailes>
            {isPending && (
              <ButtonsContainer>
                <Button
                  theme="updateMsg"
                  text="אשר"
                  type="submit"
                  onClick={handleApproveClick}
                />
                <Button
                  theme="updateMsg"
                  text="דחה"
                  type="submit"
                  onClick={handleRejectClick}
                />
              </ButtonsContainer>
            )}
          </Body>
        </form>
      </Container>
    </ThemeProvider>
  );
};

export default Message;
