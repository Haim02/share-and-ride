import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt } from "@fortawesome/free-regular-svg-icons";
import { faCarSide, faMapMarkedAlt } from "@fortawesome/free-solid-svg-icons";

const Container = styled.div`
  display: flex;
  padding-top: 0.75rem;
  padding-bottom: 0.75rem;
  flex-direction: column;
  align-items: center;
  width: 100%;
  @media (min-width: 1024px) {
    padding-top: 1.5rem;
    padding-bottom: 1.5rem;
  }
`;
const Title = styled.h2`
  color: #000000;
  font-size: 1.575rem;
  line-height: 2.25rem;
  font-weight: 600;
  @media (min-width: 1024px) {
    font-size: 3rem;
    line-height: 1;
  }
`;

const StepsContainer = styled.div`
  display: flex;
  margin-top: 1.75rem;
  flex-wrap: wrap;
  justify-content: space-evenly;
  @media (max-width: 750px) {
    flex-direction: column-reverse;
  }
`;

const StepContainer = styled.div`
  display: flex;
  margin: 0.75rem;
  transition-property: background-color, border-color, color, fill, stroke;
  flex-direction: column;
  align-items: center;
  @media (min-width: 768px) {
    width: 24rem;
  }
  :hover {
    color: #ef4444;
  }
`;

const Step = styled.div`
  box-shadow: 0 1.3px 12px -3px rgba(0, 0, 0, 0.4);
  display: flex;
  padding: 1.5rem;
  justify-content: center;
  align-items: center;
  border-radius: 0.5rem;
  margin: 15px 0;
`;

const StepTitle = styled.h4`
  margin-top: 1rem;
  color: #000000;
  font-size: 2.105rem;
  line-height: 1.75rem;
  font-weight: 600;
  margin-bottom: 10px;
`;

const StepDescription = styled.p`
  color: #4b5563;
  font-size: 1.55rem;
  text-align: center;
  width: 70%;

  @media (min-width: 768px) {
    font-size: 1.55rem;
  }
`;

const StepIcon = styled.span`
  color: rgb(52, 138, 244);
  font-size: 1.875rem;
  line-height: 2.25rem;
`;

const RentSteps = () => {
  return (
    <Container>
      <Title>התחל לשכור בכמה צעדים פשוטים</Title>
      <StepsContainer>
        <StepContainer>
          <Step>
            <StepIcon>
              <FontAwesomeIcon icon={faCarSide} />
            </StepIcon>
          </Step>
          <StepDescription>
            בסיום התהליך הודעה נשלחת לבעל הכלי 
          </StepDescription>
        </StepContainer>
        <StepContainer>
          <Step>
            <StepIcon>
              <FontAwesomeIcon icon={faMapMarkedAlt} />
            </StepIcon>
          </Step>
          <StepDescription>
            בחר אזור שבו תרצה לשכור 
          </StepDescription>
        </StepContainer>
        <StepContainer>
          <Step>
            <StepIcon>
              <FontAwesomeIcon icon={faCalendarAlt} />
            </StepIcon>
          </Step>
          <StepDescription>
            בחר תאריך וזמן בו תרצה לשכור
          </StepDescription>
        </StepContainer>
      </StepsContainer>
    </Container>
  );
};

export default RentSteps;
