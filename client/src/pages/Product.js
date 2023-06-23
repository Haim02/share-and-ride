import React, { Fragment, useState, useEffect } from "react";
import styled from "styled-components";
import RentFrom from "./../components/rentForm/RentFrom";
import RentDetails from "./../components/rentForm/RentDetails";
import { useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faUser, faXmark } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import Geocode from "react-geocode";
import Map from "../components/UI/Map";
import { faLocationPin } from "@fortawesome/free-solid-svg-icons";
import { useGetOneProductMutation } from "../redux/apiCalls/products";
import uuid from "react-uuid";
import Button from './../components/button/Button';
import { productAction } from './../redux/slices/products';
import LoadingSpinner from './../components/UI/LoadingSpinner';

const Container = styled.div`
  padding: 40px 30px;
  padding-right: 60px;
  display: flex;
  gap: 20px;
  text-align: right;
  @media (max-width: 800px) {
    display: flex;
    flex-direction: column;
    text-align: center;
    align-items: center;
    justify-content: center;
    padding-right: 30px;
  }
  @media (max-width: 640px) {
    margin-top: 50px;
    text-align: center;
  }
`;
const Left = styled.div`
  flex: 1;
  display: flex;
  flex-direction: row;
  gap: 15px;
  margin-top: 40px;
  @media (max-width: 800px) {
    display: flex;
    flex-direction: column-reverse;
  }
`;

const Images = styled.div`
  img {
    width: 100%;
    height: 180px;
    object-fit: cover;
    cursor: pointer;
    margin-bottom: 10px;
  }
  @media (max-width: 800px) {
    img {
      width: 30%;
      height: 130px;
    }
  }
`;
const MainImg = styled.div`
  img {
    width: 120%;
    max-height: 520px;
    object-fit: cover;
  }
  @media (max-width: 800px) {
    img {
      width: 90%;
      max-height: 420px;
    }
  }
`;

const Right = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 10px;
  text-align: right;
  align-items: flex-end;
  @media (max-width: 800px) {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  @media (max-width: 640px) {
    text-align: center;
  }
`;

const Description = styled.p`
  padding-left: 220px;
  font-size: 16px;
  font-weight: 300;
  text-align: right;
  margin-left: 30px;
  @media (max-width: 800px) {
    text-align: center;
    margin-left: 0;
    padding-left: 0;
  }
  @media (max-width: 640px) {
    text-align: center;
  }
`;

const Links = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  justify-content: right;
  margin-bottom: 50px;
  @media (max-width: 640px) {
    text-align: center;
  }
`;

const Items = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
`;

const Item = styled.div`
  display: flex;
  text-align: right;
  gap: 10px;
  color: #2879fe;
  font-size: 14px;
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  color: gray;
  font-size: 14px;
  text-align: right;
  align-items: flex-end;
`;
const Hr = styled.div`
  width: 300px;
  border: 1px solid rgb(238, 237, 237);
`;
const MapContainer = styled.div`
  margin-top: 10px;
`;

const BtnGroup = styled.div`
  display: flex;
  justify-content: space-between;
  width: 90%;
  margin-top: 15px;
  @media (max-width: 640px) {
    text-align: center;
  }
`;

const Product = () => {
  const [getOneProduct, { isLoading }] = useGetOneProductMutation();
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const [selectImg, setSelectImg] = useState(0);
  const [openCart, setOpenCart] = useState(false);
  const [openCartDetails, setOpenCartDetails] = useState(false);
  const dispatch = useDispatch();
  const { product } = useSelector((state) => state.product);
  const { currentUser } = useSelector((state) => state.auth);
  const [addressLat, setAddressLat] = useState(0);
  const [addressLng, setAddressLng] = useState(0);

  useEffect(() => {
    const getProduct = async () => {
      try {
        const res = await getOneProduct(id).unwrap();
        dispatch(productAction.getProductSuccess(res.product));
      } catch (error) {}
    };
    getProduct();
  }, [dispatch, id, getOneProduct]);

  const address =
    `${product?.location.city} ${product?.location.street} ${product?.location.houseNumber}`.toString();
  Geocode.setApiKey(process.env.REACT_APP_PUBLIC_GOOGLE_MAPS_API_KEY);
  Geocode.setLanguage("iw");

  Geocode.fromAddress(address).then(
    (response) => {
      const { lat, lng } = response.results[0].geometry.location;
      setAddressLat(lat);
      setAddressLng(lng);
    },
    (error) => {
      console.error(error.message);
    }
  );

  const heandelClick = () => {
    if (!currentUser) {
      alert("רק משתמשים רשומים יכולים לשלוח הודעות");
      return;
    }
    setOpenCart(true);
  };
  const heandelClickDetails = () => {
    setOpenCartDetails(true);
  };

  const closeCart = () => {
    setOpenCart(false);
  };

  const closeCartDetails = () => {
    setOpenCartDetails(false);
  };

  const handleOnClick = (e) => {
    const img = e.target.src;
    const i = product.images.findIndex((index) => {
      return index === img;
    });
    setSelectImg(i);
  };

  if (product) {
    return (
      <Fragment>
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <Container>
            <Left>
              <Images>
                {product.images.map((img) => {
                  return (
                    <img src={img} alt="" onClick={handleOnClick} key={uuid()} />
                  );
                })}
              </Images>
              <MainImg>
                <img src={product.images[selectImg]} alt="" />
              </MainImg>
            </Left>
            <Right>
              <h1>{product.details.title}</h1>
              <Description>{product.details.description}</Description>
              <h5>
                {address} <FontAwesomeIcon icon={faLocationPin} />
              </h5>
              <div>
                <small
                  style={{
                    color: "#000000",
                    fontSize: "13px",
                    marginRight: "5px",
                  }}
                >
                  {product.user.name}
                </small>
                <FontAwesomeIcon icon={faUser} style={{ color: "black" }} />
              </div>
              <Links>
                <Items>
                  <Item>{product.price.hourPrice}₪ : מחיר לשעה</Item>
                  <Item>{product.price.dailyPrice}₪ : מחיר ליום</Item>
                </Items>
                <MapContainer>
                  <Map addressLat={addressLat} addressLng={addressLng} />
                </MapContainer>
              </Links>
              <Info>
                <span>{product.details.model} : דגם</span>
                <Hr />
                <span>
                  {" "}
                  {product.details.electric ? (
                    <FontAwesomeIcon
                      icon={faCheck}
                      style={{ color: "green" }}
                    />
                  ) : (
                    <FontAwesomeIcon icon={faXmark} style={{ color: "red" }} />
                  )}{" "}
                  : חשמלי
                </span>
                <Hr />
                <span>
                  {" "}
                  {product.details.helmet ? (
                    <FontAwesomeIcon
                      icon={faCheck}
                      style={{ color: "green" }}
                    />
                  ) : (
                    <FontAwesomeIcon icon={faXmark} style={{ color: "red" }} />
                  )}{" "}
                  : קסדה
                </span>
                <Hr />
                <span>{product.details.speed} : מהירות</span>
                <Hr />
                <span>{product.details.battery} : סוללה</span>
              </Info>
              <Hr />
              <Info>
                <span>:היערות</span>
              </Info>
              <BtnGroup>
                <Button
                  theme="sentMessage"
                  text="שלח הודעה לשוכר"
                  onClick={heandelClick}
                />
                <Button
                  theme="sentMessage"
                  text="פרטי השוכר"
                  onClick={heandelClickDetails}
                />
              </BtnGroup>
            </Right>
          </Container>
        )}
        {openCart && (
          <RentFrom
            heandelClick={heandelClick}
            toUser={product.user}
            closeCart={closeCart}
            onClose={closeCart}
          />
        )}
        {openCartDetails && (
          <RentDetails
            heandelClick={heandelClickDetails}
            closeCart={closeCartDetails}
            onClose={closeCartDetails}
          />
        )}
      </Fragment>
    );
  }
};

export default Product;
