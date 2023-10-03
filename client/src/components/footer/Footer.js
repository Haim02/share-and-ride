import React, { Fragment } from "react";
import { Link, Outlet } from "react-router-dom";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhoneAlt } from "@fortawesome/free-solid-svg-icons";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";

const FooterContainer = styled.footer`
  background-color: #1d2124;
  display: flex;
  margin-top: auto;
  padding-top: 1rem;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-width: 100%;
  text-align: right;
  @media (min-width: 768px) {
    padding-top: 2rem;
  }
`;

const InnerContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  max-width: 1436px;
  height: 100%;
`;

const BottomContainer = styled.div`
  display: flex;
  margin-top: 1.75rem;
  justify-content: center;
  width: 100%;
  max-width: 1236px;

  @media (min-width: 768px) {
    margin-top: 0.1rem;
    justify-content: flex-start;
  }
`;

const CopyrightText = styled.small`
  font-size: 15px;
  color: #d1d5db;
`;

const AboutContainer = styled.div`
  display: flex;
  padding-right: 1.5rem;
  padding-left: 1.5rem;
  margin-right: 0.2rem;
  flex-direction: column;

  @media (min-width: 768px) {
    padding-right: 0.35rem;
    padding-left: 0.55rem;
    margin-right: 4rem;
  }
`;

const AboutText = styled.p`
  margin-top: 0.5rem;
  color: #ffffff;
  font-size: 0.875rem;
  line-height: 1.25rem;
  font-weight: 400;
  line-height: 1.25rem;
  max-width: 20rem;
`;

const SectionContainer = styled.div`
  display: flex;
  padding-right: 2.5rem;
  padding-left: 2.5rem;
  margin-right: 0.5rem;
  margin-top: 1.35rem;
  flex-direction: column;
  width: 100%;

  @media (min-width: 768px) {
    padding-right: 0.75rem;
    padding-left: 0.75rem;
    margin-top: 0;
    margin-right: 2rem;
    width: auto;
  }
`;

const LinksList = styled.ul`
  display: flex;
  list-style-type: none;
  flex-direction: column;
  outline: 0;
  text-align: right;
`;

const ListItem = styled.li`
  margin-bottom: 0.75rem;
  & > a {
    transition-property: all;
    color: #ffffff;
    font-size: 0.875rem;
    line-height: 1rem;
    :hover {
      color: #e5e7eb;
    }
  }
`;

const HeaderTitle = styled.h3`
  margin-bottom: 0.35rem;
  color: #ffffff;
  font-size: 1.2rem;
  line-height: 1rem;
  font-weight: 700;
  text-align: right;
`;

const HorizontalContainer = styled.div`
  display: flex;
  align-items: center;
`;

const RedIcon = styled.span`
  display: flex;
  margin-right: 0.5rem;
  background-color: #ef4444;
  color: #ffffff;
  font-size: 1rem;
  line-height: 1.5rem;
  justify-content: center;
  align-items: center;
  border-radius: 9999px;
`;

const SmallText = styled.h6`
  color: #ffffff;
  font-size: 0.875rem;
  line-height: 1.25rem;
`;

const Footer = () => {
  return (
    <Fragment>
      <Outlet />
      <FooterContainer>
        <InnerContainer>
          <AboutContainer>
            <AboutText>
              כל הזכויות שמורות לחברת שיר אנד רייד מפעילות את האתר IL, אופניים
              להשכרה, קורקינט למכירה, אופניים חשמליים להשכרה, אין לעשות שימוש
              בכל התכנים המופיעים באתר .
            </AboutText>
          </AboutContainer>
          <SectionContainer>
            <HeaderTitle>קישורים</HeaderTitle>
            <LinksList>
              <ListItem>
                <Link to="/">בית</Link>
              </ListItem>
              <ListItem>
                <Link to="/">מי אנחנו</Link>
              </ListItem>
              <ListItem>
                <Link to="#">איך זה עובד</Link>
              </ListItem>
            </LinksList>
          </SectionContainer>
          <SectionContainer>
            <HeaderTitle>קישורים</HeaderTitle>
            <LinksList>
              <ListItem>
                <Link to="#">תקנון האתר</Link>
              </ListItem>
              <ListItem>
                <Link to="/PrivacyPolicy">מדיניות פרטיות</Link>
              </ListItem>
              <ListItem>
                <Link to="#">תמיכה</Link>
              </ListItem>
            </LinksList>
          </SectionContainer>
          <SectionContainer>
            <HeaderTitle>התקשרו אלינו</HeaderTitle>
            <HorizontalContainer>
              <RedIcon>
                <FontAwesomeIcon
                  icon={faPhoneAlt}
                  style={{ backgroundColor: "rgb(52, 138, 244)" }}
                />
              </RedIcon>
              <SmallText>03-5552349</SmallText>
            </HorizontalContainer>
          </SectionContainer>
          <SectionContainer>
            <HeaderTitle>מייל</HeaderTitle>
            <HorizontalContainer>
              <RedIcon>
                <FontAwesomeIcon
                  icon={faEnvelope}
                  style={{ backgroundColor: "rgb(52, 138, 244)" }}
                />
              </RedIcon>
              <SmallText>info@Share&Ride.com</SmallText>
            </HorizontalContainer>
          </SectionContainer>
        </InnerContainer>
        <BottomContainer>
          <CopyrightText>
            Copyright &copy; {new Date().getFullYear()} Share&Ride. All rights
            reserved.
          </CopyrightText>
        </BottomContainer>
      </FooterContainer>
    </Fragment>
  );
};

export default Footer;
