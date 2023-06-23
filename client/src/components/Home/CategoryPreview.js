import React from "react";
import styled from "styled-components";
import bikeElectric from '../../assets/images/bikeElectric.jpg'
import scooter from "../../assets/images/scooter.webp";
import { Link } from "react-router-dom";
import uuid from 'react-uuid';

const Container = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  justify-content: space-between;
  justify-content: space-around;
  @media (max-width: 680px) {
    flex-direction: column;
  }
`;

const CategoryItem = styled.div`
  flex: 1;
  margin-top: 2px;
  margin-right: 5px;
  height: 85vh;
  width: 100%;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid black;
  overflow: hidden;
  :hover {
    cursor: pointer;
  }
`;
const Img = styled.img`
  width: 100%;
  height: 100%;
`;

const Body = styled.div`
  opacity: 0.9;
  height: 90px;
  padding: 0 25px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 1px solid black;
  background-color: white;
  opacity: 0.7;
  position: absolute;
`;

const H2 = styled.h2`
  font-weight: bold;
  margin: 0 6px 0;
  font-size: 22px;
  color: #4a4a4a;
`; 

const P = styled.p`
  font-weight: lighter;
  font-size: 16px;
`;

const categories = [
  {
    id: 1,
    title: "אופניים",
    imageUrl: bikeElectric,
    route: "/products?type=bike",
  },
  {
    id: 2,
    title: "קורקינט",
    imageUrl: scooter,
    route: "/products?type=scooter",
  },
];

const CategoryPreview = () => {
  return (
    <Container className="directory-container">
      {categories.map((category) => (
        <Link to={category.route} key={uuid()} style={{textDecoration: 'none', color: 'black'}}>
          <CategoryItem
            background={`${category.imageUrl}`}
            category={category}
          >
            <Img src={category.imageUrl} />
            <Body>
              <H2>{category.title}</H2>
              <P>השכר עכשיו</P>
            </Body>
          </CategoryItem>
        </Link>
      ))}
    </Container>
  );
};

export default CategoryPreview;
