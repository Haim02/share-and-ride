import React from "react";
import styled from "styled-components";

const Container = styled.div`
  text-align: right;
`;
const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 10px 20px 15px 15px;
  margin-bottom: 10px;
  padding: 10px;
  text-align: right;
  border: 1px solid grey;
  display: block;
  width: 90%;
  z-index: 1;
  :focus {
    outline: none;
  }
  ${({ active }) =>
    active &&
    `
    border: 1px solid red;
  `}
`;
const Label = styled.label`
  color: grey;
  font-size: 15px;
  text-align: right;
  color: black;
  margin-right: 10px;
`;
const Small = styled.small`
  color: red;
  margin-right: 10px;
`;

const FormInputs = ({ label, small, ...otherProps }) => {
  return (
    <Container>
      <Label>{label}</Label>
      <Input {...otherProps} active={small} />
      {small && <Small>{small}</Small>}
    </Container>
  );
};

export default FormInputs;
