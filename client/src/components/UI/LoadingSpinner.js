import React from "react";
import styled from "styled-components";
import { Oval } from "react-loader-spinner";

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #f8f8f8ad;
`;

const Loader = styled.div`
  left: 50%;
  top: 30%;
  z-index: 1000;
  position: absolute;
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
