import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
   display: flex;
   align-items: center;
   justify-content: center;
   padding: 20px;
   margin: 150px 0;
`;
const PageNotFound = () => {
  return (
    <Container>
      <h1>דף לא נמצא</h1>
    </Container>
  )
}

export default PageNotFound
