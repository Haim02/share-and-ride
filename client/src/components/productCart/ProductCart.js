import React from "react";
import { faLocationPin } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";
import Button from "../button/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import bikeCover from '../../assets/images/bikeCover.jpg'
import ReactTimeAgo from "react-time-ago";

const RidingTollContainer = styled.div`
  width: 16.5em;
  min-width: 12em;
  min-height: 18em;
  box-shadow: 0 1.3px 12px -3px rgba(0, 0, 0, 0.4);
  display: flex;
  padding: 0.55rem;
  padding-bottom: 1rem;
  margin: 0.25rem;
  background-color: #ffffff;
  flex-direction: column;
  align-items: center;
  border-radius: 0.375rem;

  @media (min-width: 640px) {
    margin: 0.75rem;
  }
  @media (min-width: 768px) {
  }
`;

const RidingTollThumbnail = styled.div`
  width: 100%;
  height: 60%;
  height: 130px;
  img {
    width: 100%;
    height: 100%;
  }
`;

const RidingTollName = styled.h4`
  margin-top: 1px;
  margin-bottom: 1px;
  color: #000000;
  font-size: 12px;
  line-height: 1.1rem;
  font-weight: 500;
`;

const PricesContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  width: 100%;
  height: 20px;
  justify-content: space-between;
  align-items: center;
  padding: 5px;
  margin-top: 5px;
`;

const SmallText = styled.p`
  color: inherit;
  display: inline-flex;
  font-size: 0.85rem;
  line-height: 1rem;
  font-weight: 100;
`;

const DateUpdate = styled.p`
  color: black;
  display: inline-flex;
  font-size: 0.85rem;
  line-height: 1rem;
  font-weight: 100;
`;

const DailyPrice = styled.h5`
  margin-right: 0.75rem;
  color: #6b7280;
  font-size: 0.875rem;
  line-height: 1.25rem;
  font-weight: 700;
`;

const MonthlyPrice = styled.h5`
  color: #6b7280;
  font-size: 0.875rem;
  line-height: 1.25rem;
  font-weight: 700;
`;

const Seperator = styled.div`
  min-width: 100%;
  min-height: 1px;
  display: flex;
  background-color: #d1d5db;
`;

const RentButton = styled(Button)`
  min-width: 100%;
  width: 90%;
  height: 40px;
`;

const Location = styled.div`
  margin-bottom: 20px;
`;

const City = styled.span`
  font-size: 15px;
  font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
`;

const ProductCart = (
  props,
  { details, price, location, images, createdAt, _id }
) => {
  return (
    <RidingTollContainer>
      <RidingTollThumbnail>
        <img
          src={props?.product?.images[0] || bikeCover }
          alt="product"
        />
      </RidingTollThumbnail>
      <Seperator />
      <RidingTollName>
        {props.product.details.title.slice(0, 30)}
      </RidingTollName>
      <PricesContainer>
        <DailyPrice>
          ₪{props.product.price.dailyPrice}
          <SmallText> - יום</SmallText>
        </DailyPrice>
        <MonthlyPrice>
          ₪{props.product.price.hourPrice}
          <SmallText> - שעה</SmallText>
        </MonthlyPrice>
        <DateUpdate>
          <ReactTimeAgo date={new Date(props.product.createdAt)} locale="he" />
        </DateUpdate>
      </PricesContainer>
      <Location>
        <City>{props.product.location.city}</City>
        <FontAwesomeIcon icon={faLocationPin} />
      </Location>
      <Link to={`/products/${props.product._id}`} style={{ minWidth: "100%" }}>
        <Button theme="productCart" text="פרטים נוספים" />
        <RentButton text="ראה עוד" />
      </Link>
    </RidingTollContainer>
  );
};

export default ProductCart;
