import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { homePageAction } from "../redux/slice/homePageSlice";
import axios from "axios";
import styled from "styled-components";
import RidingToll from "../components/productCart/ProductCart";
// import Carousel from '@brainhubeu/react-carousel';
// import '@brainhubeu/react-carousel/lib/style.css';
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
// import MoonLoader from 'react-spinner/MoonLoader'

const TopRidingToolContainer = styled.div`
  display: flex;
  padding-right: 1rem;
  padding-left: 1rem;
  margin-bottom: 2.5rem;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: 1024px;

  @media (min-width: 768px) {
    padding-right: 0;
    padding-left: 0;
  }
`;

const Title = styled.h2`
  color: #000000;
  font-size: 1.875rem;
  line-height: 2.25rem;
  font-weight: 800;
  @media (min-width: 1024px) {
    font-size: 3rem;
    line-height: 1;
  }
`;

const RidingToolContainer = styled.div`
  display: flex;
  margin-top: 1.75rem;
  flex-wrap: wrap;
  justify-content: center;
  width: 100%;
  @media (min-width: 768px) {
    margin-top: 2.5rem;
  }
`;

const EmptyRidingTool = styled.div`
  display: flex;
  color: #6b7280;
  font-size: 0.875rem;
  line-height: 1.25rem;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const LoadingContainer = styled.div`
  display: flex;
  margin-top: 2.25rem;
  color: #000000;
  font-size: 1rem;
  line-height: 1.5rem;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const DUMMY_DATA = [
  {
    name: "HONDA cITY 5 Seater Car",
    mileage: "20k",
    thumbnailSrc:
      "https://shinewiki.com/wp-content/uploads/2019/11/honda-city.jpg",
    dailyPrice: 50,
    monthlyPrice: 1500,
    gearType: "Auto",
    gas: "Petrol",
  },
  {
    name: "HONDA cITY 5 Seater Car",
    mileage: "20k",
    thumbnailSrc:
      "https://shinewiki.com/wp-content/uploads/2019/11/honda-city.jpg",
    dailyPrice: 50,
    monthlyPrice: 1500,
    gearType: "Auto",
    gas: "Petrol",
  },
  {
    name: "HONDA cITY 5 Seater Car",
    mileage: "20k",
    thumbnailSrc:
      "https://shinewiki.com/wp-content/uploads/2019/11/honda-city.jpg",
    dailyPrice: 50,
    monthlyPrice: 1500,
    gearType: "Auto",
    gas: "Petrol",
  },
  {
    name: "HONDA cITY 5 Seater Car",
    mileage: "20k",
    thumbnailSrc:
      "https://shinewiki.com/wp-content/uploads/2019/11/honda-city.jpg",
    dailyPrice: 50,
    monthlyPrice: 1500,
    gearType: "Auto",
    gas: "Petrol",
  },
  {
    name: "HONDA cITY 5 Seater Car",
    mileage: "20k",
    thumbnailSrc:
      "https://shinewiki.com/wp-content/uploads/2019/11/honda-city.jpg",
    dailyPrice: 50,
    monthlyPrice: 1500,
    gearType: "Auto",
    gas: "Petrol",
  },
];

const items = [
  <img
    alt=""
    className="ImgHomePage"
    src="https://www.detroitlabs.com/wp-content/uploads/2018/02/alfons-morales-YLSwjSy7stw-unsplash.jpg"
  />,
  <img
    alt=""
    className="ImgHomePage"
    src="https://whataftercollege.com/wp-content/uploads/2019/03/3-2-1024x535.jpg"
  />,
  <img
    alt=""
    className="ImgHomePage"
    src="https://static.onecms.io/wp-content/uploads/sites/34/2019/12/bookshelf-organization-dark-room-full-rick-lozier-1219.jpg"
  />,
];

const responsive = {
  0: {
    items: 1,
  },
  600: {
    items: 2,
  },
  1024: {
    items: 3,
  },
};

const TopRidingTool = () => {
  const [current, setCurrent] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const topRidingTools = useSelector((state) => state.homePage.topRidingTools);
  const dispatch = useDispatch();

  // useEffect(() => {
  //   const topRidingTools = async () => {
  //     setIsLoading(true)
  //     try {
  //       const res = await axios.get('http://localhost:5000/');
  //       console.log(res)
  //       dispatch(homePageAction.setTopRidingTool(res.data))
  //     } catch (error) {
  //       console.log(error.message)
  //     }
  //   }
  //   topRidingTools();
  //   setIsLoading(false);
  // }, [dispatch])

  return (
    <TopRidingToolContainer>
      <Title>גלה את כלי הרכיבה הכי מבוקשים שלנו</Title>
      {isLoading && (
        <LoadingContainer>
          {/* <MoonLoader loading size={20}/> */}
        </LoadingContainer>
      )}
      {!topRidingTools && !isLoading && (
        <EmptyRidingTool>לא נמצע כלי</EmptyRidingTool>
      )}
      {topRidingTools && !isLoading && (
        <RidingToolContainer>
          <AliceCarousel
            duration={400}
            autoPlay={true}
            startIndex={1}
            fadeOutAnimation={true}
            mouseDragEnabled={true}
            playButtonEnabled={true}
            responsive={responsive}
            autoPlayInterval={2000}
            autoPlayDirection="rtl"
            autoPlayActionDisabled={true}
          >
            {DUMMY_DATA.map((tool, id) => {
              return <RidingToll {...tool} key={id} />;
            })}
          </AliceCarousel>
        </RidingToolContainer>
      )}
    </TopRidingToolContainer>
  );
};

export default TopRidingTool;
