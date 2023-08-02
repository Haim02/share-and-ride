import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import blogImg from "../../assets/images/blob.svg";
import bike from "../../assets/images/kisspng-ness-electric-bikes-ebike-electric-bicycle-foldin-electric-bicycle-5b1a9e3a9c7630.1098277315284710986409.png";
import Button from "../button/Button";

const TopSectionContainer = styled.div`
  min-height: 400px;
  margin-top: 6em;
  width: 100%;
  display: flex;
  margin-bottom: 60px;
  padding: 30px;
  justify-content: space-between;
  @media (max-width: 750px) {
    margin-top: 1em;
    margin-bottom: 30px;
    padding: 15px;

  }
`;
const LeftContainer = styled.div`
  flex: 1;
  width: 50%;
  display: flex;
  flex-direction: column;
  @media (max-width: 750px) {
    width: 100%;
    height: 100%;
  }
`;
const RightContainer = styled.div`
  display: flex;
  position: relative;
  margin-top: 4rem;
  flex-direction: column;
  width: 50%;
  @media (max-width: 750px) {
    display: none;
  }
`;
const Slogan = styled.h1`
  margin-bottom: 1rem;
  color: #000000;
  font-size: 2.5rem;
  line-height: 4rem;
  font-weight: 700;
  @media (max-width: 750px) {
    font-size: 2.8rem;
    line-height: 3rem;
  }
`;
const Description = styled.p`
  color: #1f2937;
  font-size: 1.125rem;
  line-height: 1.75rem;
  @media (max-width: 750px) {
    font-size: 1.5rem;
  }
`;
const BlobContainer = styled.div`
  width: 20em;
  height: 10em;
  margin-right: 140px;
  position: absolute;
  right: -6em;
  top: -2em;
  z-index: -1;
  transform: rotate(-30deg);
  img {
    width: 100%;
    height: auto;
    max-height: max-content;
  }
  @media (min-width: 640px) {
    width: 40em;
    max-height: 10em;
    right: -10em;
    top: -14em;
    transform: rotate(-25deg);
  }
  @media (min-width: 1024px) {
    width: 40em;
    max-height: 10em;
    right: -9em;
    top: -13em;
    transform: rotate(-25deg);
  }
  @media (min-width: 1280px) {
    width: 50em;
    max-height: 30em;
    right: -7em;
    top: -14em;
    transform: rotate(-30deg);
  }
`;

const StandaloneBike = styled.div`
  width: auto;
  height: 10em;
  position: absolute;
  left: 30px;
  img {
    width: 70%;
    height: 90%;
    max-width: fit-content;
  }
  @media (min-width: 640px) {
    height: 20em;
    right: -17em;
    margin-left: 0px;
    top: -6em;
  }
  @media (min-width: 1024px) {
    height: 21em;
    right: -14em;
    top: -5em;
  }
  @media (min-width: 1280px) {
    height: 30em;
    right: -13em;
    top: -9em;
  }
`;

const ButtonsContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 5rem;
  justify-content: center;
  @media (max-width: 630px) {
    margin-top: 50px;
  }
`;

const TopSection = () => {
  return (
    <TopSectionContainer>
      <LeftContainer>
        <Slogan style={{ direction: "rtl" }}>
          תפסיק לעמוד בפקקים והתחל לשכור
        </Slogan>
        <Description style={{ direction: "rtl" }}>
          פלטפורמה חברתית המאפשרת להשכיר אופניים/קורקינט לאנשים מכל הארץ, יש לך
          אופניים ואתה לא משתמש בהם? תתחיל להרוויח מהם כסף בלי לצאת מהבית
        </Description>
        <ButtonsContainer>
          <Link to="/login" style={{ width: "100%" }}>
            <Button theme="home" text="התחבר" />
          </Link>
          <Link to="/products" style={{ width: "100%" }}>
            <Button theme="home" text="לעמוד ההשכרות" />
          </Link>
        </ButtonsContainer>
      </LeftContainer>
      <RightContainer>
        <BlobContainer>
          <img src={blogImg} alt="blogImg" />
        </BlobContainer>
        <StandaloneBike>
          <img src={bike} alt="bike" />
        </StandaloneBike>
      </RightContainer>
    </TopSectionContainer>
  );
};

export default TopSection;
