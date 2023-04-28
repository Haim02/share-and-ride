import React from "react";
import styled from "styled-components";
import bikeElectric from "../assets/images/bikeElectric.jpg";
import bikeRgular from "../assets/images/bikeRgular.jpg";
import scooter from "../assets/images/scooter.webp";
import { Link } from "react-router-dom";

const Container = styled.div`
  display: flex;
  padding: 30px;
  @media (max-width: 680px) {
    flex-direction: column;
  }
`;

const CategoryItem = styled.div`
  flex: 1;
  margin: 3px;
  height: 70vh;
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
    title: " אופניים חשמלים",
    imageUrl: bikeElectric,
    route: "/products?type=bicycle&electric=true",
  },
  {
    id: 2,
    title: "אופניים",
    imageUrl: bikeRgular,
    route: "/products?type=bicycle",
  },
  {
    id: 3,
    title: "קורקינט",
    imageUrl: scooter,
    route: "/products?type=scooter",
  },
];

const CategoryPreview = () => {
  return (
    <Container className="directory-container">
      {categories.map((category) => (
        <Link to={category.route} key={category.id}>
          <CategoryItem
            background={`${category.imageUrl}`}
            key={category.id}
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
