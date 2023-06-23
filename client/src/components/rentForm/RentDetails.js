import React from "react";
import Modal from "./../modal/Modal";
import styled from "styled-components";
import { useSelector } from "react-redux";

const Container = styled.div`
  /* background-color: #f4f4f4; */
  padding: 70px;
  border-radius: 8px;
  position: fixed;
  top: 0px;
  left: 0;
  right: 0;
  margin: 5px;
  bottom: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  @media (max-width: 800px) {
    padding: 1px;
    margin: 0;
    bottom: 0;
    margin-left: 20px;
  }
    @media (max-width: 800px) {
      margin-left: 20px;
    }
    @media (max-width: 300px) {
      margin-left: 80px;
    }
    @media (max-width: 240px) {
      margin-left: 100px;
    }
  
`;

const Line = styled.div`
  display: flex;
  flex-direction: row-reverse;
  justify-content: space-between;
  width: 40%;
  margin-bottom: 20px;
`;

const Text = styled.h2`
  @media (max-width: 800px) {
    font-size: 16px;
  }
  @media (max-width: 300px) {
    font-size: 14px;
  }
  @media (max-width: 240px) {
    font-size: 11px;
  }
`;

const RentFrom = (props) => {
  const { product } = useSelector((state) => state.product);

  return (
    <Modal onClose={props.onClose}>
      <Container>
        <Line>
          <Text>:שם</Text>
          <Text>{product.user.name}</Text>
        </Line>
        <Line>
          <Text>:פלאפון</Text>
          <Text>{product.user.phone}</Text>
        </Line>
      </Container>
    </Modal>
  );
};

export default RentFrom;
