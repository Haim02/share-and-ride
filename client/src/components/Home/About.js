import React from "react";
import styled from "styled-components";
import aboutScooter from "../../assets/images/aboutScooter.jpg";

const AboutUsContainer = styled.div`
  display: flex;
  padding-top: 1rem;
  padding-bottom: 1rem;
  padding-right: 1.75rem;
  padding-left: 1.75rem;
  background-color: whitesmoke;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  width: 100%;
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
  font-size: 1.7rem;
  /* line-height: 1rem; */
  /* font-weight: 800; */
  text-align: right;
  color: #1f2937;
  font-size: 2.125rem;
  line-height: 1.75rem;
  @media (max-width: 750px) {
    font-size: 1.5rem;
  }

  /* @media (min-width: 768px) {
    font-weight: 900;
    line-height: 1.5;
  }
  @media (min-width: 368px) {
    font-weight: 900;
    line-height: 1.5;
  } */
`;

const InfoText = styled.p`
  margin-top: 1rem;
  text-align: right;
  color: #4b5563;
  font-size: 1.55rem;
  /* font-size: 0.887rem; */
  line-height: 1.5rem;
  font-weight: 400;
  @media (max-width: 640px) {
    /* font-size: 1.5rem; */
    /* line-height: 1.5rem; */
  }
`;

const About = () => {
  return (
    <AboutUsContainer>
      <ProductContainer>
        <img src={aboutScooter} alt="aboutScooter" />
      </ProductContainer>
      <InfoContainer>
        <Title>הרגש את החוויה הטובה ביותר עם עסקאות ההשכרה שלנו</Title>
        <InfoText>
        ברוכים הבאים לאתר שלנו, היעד האולטימטיבי לשכור ולהשכיר אופניים וקורקינט חשמליים! הפלטפורמה שלנו מציעה פתרון נוח וידידותי לסביבה לצרכי התחבורה שלך. בין אם אתם מחפשים לחקור את העיר, לנסוע לעבודה, או ליהנות מרכיבה נינוחה, אנחנו מבטיחים לכם, עם מבחר האופניים והקורקינטים החשמליים הנרחבים שלנו, תוכלו לבחור את הכלי המושלם המתאים להעדפות ולסגנון שלכם. האתר ידידותי למשתמש ומאפשר לדפדף במבחר הרחב שלנו, להשוות דגמים ולבצע הזמנות מקוונות בקלות, חווה את הריגוש של נסיעה חלקה ומודעת לסביבה על ידי השכרה של אופניים או קורקינט חשמליים מהאתר שלנו עוד היום
        </InfoText>
      </InfoContainer>
    </AboutUsContainer>
  );
};

export default About;
