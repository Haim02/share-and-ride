import React, { useState } from "react";
import styled from "styled-components";
import aboutScooter from "../../assets/images/aboutScooter.jpg";
import bikeElectric from "../../assets/images/bikeElectric.jpg";
import Button from "./../button/Button";

const Container = styled.div``;

const ImagesContainer = styled.ul`
  display: flex;
  justify-content: center;
  align-items: center;
  justify-content: space-evenly;
  list-style: none;
  margin-top: 10px;
  @media (max-width: 640px) {
    flex-direction: column;
  }
`;

const Li = styled.li``;

const ImgContainer = styled.div`
  height: 13em;
  ${({ active }) =>
    active &&
    `
      border: 2px solid;
  `}
  img {
    width: 100%;
    height: 100%;
  }
  @media (max-width: 868px) {
    height: 11em;
    padding: 5px;
  }

  @media (max-width: 658px) {
    width: 200px;
    margin-right: 52px;
    img {
      width: 100%;
    }
  }
`;

const Btn = styled.div`
  display: flex;
  justify-self: flex-start;
  padding: 15px 0;
  padding-left: 20px;
`;

const TypeChice = (props) => {
  const [typeChoice, setTypeChoice] = useState("bicycle");
  const [isScooterIsClick, setIsScooterIsClick] = useState(false);
  const [isBikeIsClick, setIsBikeIsClick] = useState(false);

  const toggleScooterClick = () => {
    setIsScooterIsClick(!isScooterIsClick);
    if (isBikeIsClick) {
      setIsBikeIsClick(false);
    }
  };

  const toggleBikeClick = () => {
    setIsBikeIsClick(!isBikeIsClick);
    if (isScooterIsClick) {
      setIsScooterIsClick(false);
    }
  };

  const handleType = (e) => {
    setTypeChoice(e.target.name);
  };

  const handleClick = () => {
    props.pasValue(typeChoice);
  };

  return (
    <Container>
      <ImagesContainer onClick={handleType}>
        <Li name="scooter" value="scooter">
          <ImgContainer active={isScooterIsClick} onClick={toggleScooterClick}>
            <img src={aboutScooter} alt="scooter" name="scooter" />
          </ImgContainer>
        </Li>
        <Li name="bicycle" value="bicycle">
          <ImgContainer active={isBikeIsClick} onClick={toggleBikeClick}>
            <img src={bikeElectric} alt="bicycle" name="bicycle" />
          </ImgContainer>
        </Li>
      </ImagesContainer>
      <Btn>
        <Button
          theme="uploadForm"
          type="button"
          onClick={handleClick}
          text="המשך"
        />
      </Btn>
    </Container>
  );
};

export default TypeChice;
