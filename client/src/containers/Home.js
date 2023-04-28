import React from 'react';
import Navbar from '../components/navbar/Navbar';

import styled from 'styled-components';
import TopSection from './TopSection';
import BookCart from './../components/bookCart/BookCart';
import RentSteps from './RentSteps';
import About from './About';
import TopRidingTool from './TopRidingTool';
import Footer from '../components/footer/Footer';
import CategoryPreview from './CategoryPreview';
import Newsletter from './Newsletter';

const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
    /* width: 100%;
    height: 100%; */
    align-items: center;
    overflow-x: hidden;
`;

export const Seperator = styled.div`
margin: 14px 0;
  min-width: 90%;
  min-height: 1px;
  display: flex; 
background-color: #D1D5DB; 
`;

const NewsletterContainer = styled.div`
  width: 100%;
`;


const Home = () => {
  return (
    <PageContainer>
      {/* <Navbar /> */}
      <TopSection />
      {/* <BookCart /> */}
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
      {/* <TopRidingTool /> */}
      {/* <Footer /> */}
    </PageContainer>
  )
}

export default Home
