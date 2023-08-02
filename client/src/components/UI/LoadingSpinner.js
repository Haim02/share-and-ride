import React from "react";
import styled from "styled-components";
import { Oval } from "react-loader-spinner";

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f8f8f8ad;
`;

const Loader = styled.div`
  top: 20%;
  z-index: 1000;
  position: absolute;
  justify-content: center;
  align-items: center;
`;

const LoadingSpinner = () => {
  return (
    <Container>
      <Loader>
        <Oval
          height="80"
          width="80"
          radius="9"
          color="black"
          ariaLabel="loading"
        />
      </Loader>
    </Container>
  );
};

export default LoadingSpinner;
