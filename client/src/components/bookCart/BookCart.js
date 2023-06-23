import React, { useState } from "react";
import { faCalendarAlt } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";
import Button from "../button/Button";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { faCaretDown, faCaretUp } from "@fortawesome/free-solid-svg-icons";

const CardContainer = styled.div`
  width: 300px;
  min-height: 4.3em;
  box-shadow: 0 1.3px 12px -3px rgba(0, 0, 0, 0.4);
  display: flex;
  padding: 0.25rem 0.5rem;
  background-color: #ffffff;
  justify-content: center;
  align-items: center;
  border-radius: 0.375rem;

  @media (min-width: 768px) {
    padding: 2px 6px;
    padding-top: 2px;
  }
`;
const ItemContainer = styled.div`
  display: flex;
  position: relative;
`;

const Icon = styled.span`
  margin-right: 0.25rem;
  color: #ef4444;
  font-size: 0.75rem;
  line-height: 1rem;
  fill: currentColor;

  @media (min-width: 768px) {
    margin-right: 0.75rem;
  }
`;

const SmallIcon = styled.span`
  margin-left: 0.25rem;
  color: #6b7280;
  font-size: 0.75rem;
  line-height: 1rem;
  fill: currentColor;

  @media (min-width: 768px) {
    font-size: 1rem;
    line-height: 1.5rem;
  }
`;

const Name = styled.span`
  color: #4b5563;
  font-size: 0.75rem;
  line-height: 1rem;
  cursor: pointer;
  user-select: none;

  @media (min-width: 768px) {
  }
`;

const LineSeperator = styled.span`
  width: 2px;
  height: 45%;
  margin-right: 0.5rem;
  margin-left: 0.5rem;
  background-color: #d1d5db;

  @media (min-width: 768px) {
    margin-right: 1.5rem;
    margin-left: 1.5rem;
  }
`;
const HorizontalMargin = styled.span`
  display: flex;
  min-width: 2em;
`;

const DateCalendar = styled(Calendar)`
  position: absolute;
  max-width: none;
  /* user-select: none; */
  top: 2.9em;
  left: -70px;
  @media (min-width: 768px) {
    top: 3.5em;
    left: -16em;
  }
`;

const BookCart = () => {
  const [startData, setStartData] = useState(new Date());
  const [isStartCalendarOpen, setIsStartCalendarOpen] = useState(false);
  const [returnData, setReturnData] = useState(new Date());
  const [isReturnCalendarOpen, setIsReturnCalendarOpen] = useState(false);

  const toggleStartCalendarOpen = () => {
    setIsStartCalendarOpen(!isStartCalendarOpen);
    if (isReturnCalendarOpen) {
      setIsReturnCalendarOpen(false);
    }
  };

  const toggleReturnCalendarOpen = () => {
    setIsReturnCalendarOpen(!isReturnCalendarOpen);
    if (isStartCalendarOpen) {
      setIsStartCalendarOpen(false);
    }
  };

  return (
    <CardContainer>
      <ItemContainer>
        <Icon>
          <FontAwesomeIcon icon={faCalendarAlt} />
        </Icon>
        <Name onClick={toggleStartCalendarOpen}>בחר תאריך</Name>
        <SmallIcon>
          <FontAwesomeIcon
            icon={isStartCalendarOpen ? faCaretUp : faCaretDown}
          />
        </SmallIcon>
        {isStartCalendarOpen && (
          <DateCalendar value={startData} onChange={setStartData} />
        )}
      </ItemContainer>
      <LineSeperator />
      <ItemContainer>
        <Icon>
          <FontAwesomeIcon icon={faCalendarAlt} />
        </Icon>
        <Name onClick={toggleReturnCalendarOpen}>תוצאות</Name>
        <SmallIcon>
          <FontAwesomeIcon
            icon={isReturnCalendarOpen ? faCaretUp : faCaretDown}
          />
        </SmallIcon>
        {isReturnCalendarOpen && (
          <DateCalendar value={returnData} onChange={setReturnData} />
        )}
      </ItemContainer>
      <HorizontalMargin />
      <Button text="חפש" />
    </CardContainer>
  );
};

export default BookCart;
