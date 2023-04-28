import React from "react";
import styled from "styled-components";
import aboutScooter from "../assets/images/aboutScooter.jpg";

const AboutUsContainer = styled.div`
  display: flex;
  padding-top: 1rem;
  padding-bottom: 1rem;
  padding-right: 1.75rem;
  padding-left: 1.75rem;
  background-color: #ffffff;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  width: 95%;
  margin: 8px;
  @media (min-width: 768px) {
    padding-right: 0;
    padding-left: 0;
  }
`;

const ProductContainer = styled.div`
  flex: 1;
  width: auto;
  height: 28em;
  margin-left: -50px;
  img {
    width: auto;
    height: 90%;
    margin-left: 100px;
  }
  @media (max-width: 768px) {
    height: 23em;
    margin-left: -140px;
  }

  @media (max-width: 660px) {
    display: none;
  }
`;

const InfoContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 0 10px;
  text-align: right;
  @media (min-width: 768px) {
    margin-left: 1.5rem;
  }

  @media (min-width: 1536px) {
    margin-left: 4rem;
  }
`;

const Title = styled.h1`
  color: #000000;
  font-size: 1.5rem;
  line-height: 2rem;
  font-weight: 800;
  text-align: right;

  @media (min-width: 768px) {
    font-weight: 900;
    line-height: 1.5;
  }
`;

const InfoText = styled.p`
  margin-top: 1rem;
  text-align: right;
  color: #6b7280;
  font-size: 0.875rem;
  line-height: 1.25rem;
  font-weight: 400;
  @media (min-width: 768px) {
    font-size: 1rem;
    line-height: 1.5rem;
  }
`;

const About = () => {
  return (
    <AboutUsContainer>
      <ProductContainer>
        <img src={aboutScooter} alt="aboutScooter" />
      </ProductContainer>
      <InfoContainer>
        <Title>Feel The Best Experience With Our Rental Deals</Title>
        <InfoText>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum
          dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
          culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum
          dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.
        </InfoText>
      </InfoContainer>
    </AboutUsContainer>
  );
};

export default About;
