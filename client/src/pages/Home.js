import React from "react";
import styled from "styled-components";
import TopSection from './../components/Home/TopSection';
import RentSteps from './../components/Home/RentSteps';
import About from './../components/Home/About';
import CategoryPreview from './../components/Home/CategoryPreview';
import Newsletter from './../components/Home/Newsletter';

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-x: hidden;
`;

export const Seperator = styled.div`
  margin: 14px 0;
  min-width: 90%;
  min-height: 1px;
  display: flex;
  background-color: #d1d5db;
`;

const NewsletterContainer = styled.div`
  width: 100%;
`;

const Home = () => {
  return (
    <PageContainer>
      <TopSection />
      <Seperator />
      <RentSteps />
      <Seperator />
      <CategoryPreview />
      <Seperator />
      <About />
      <Seperator />
      <NewsletterContainer>
        <Newsletter />
      </NewsletterContainer>
    </PageContainer>
  );
};

export default Home;
