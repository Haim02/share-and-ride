import React, { Fragment, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
  useGetUsertProductMutation,
  useUploadProductMutation,
} from "../redux/apiCalls/auth";
import TypeChice from "./../components/uploadProductForm/TypeChice";
import Details from "./../components/uploadProductForm/Details";
import ImageUploader from "./../components/uploadProductForm/ImageUploader";
import Price from "./../components/uploadProductForm/Price";
import Button from "./../components/button/Button";
import { authAction } from "../redux/slices/auth";
import { toast } from "react-toastify";
import CitiesAndStreets from "./../components/uploadProductForm/CitiesAndStreets";
import LoadingSpinner from "./../components/UI/LoadingSpinner";

const Container = styled.div``;
const Section = styled.div`
  width: 60%;
  display: flex;
  flex-direction: column;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.5);
  margin-bottom: 50px;
  ${({ active }) =>
    active &&
    `
    display: none;
  `}
  @media (max-width: 540px) {
    width: 80%;
  }
`;

const CountContainer = styled.div`
  display: flex;
  margin-left: auto;
  align-items: center;
  justify-content: center;
  padding: 5px;
  margin-top: 20px;
  margin-bottom: 10px;
`;
const Count = styled.h3`
  font-size: 20px;
  margin-right: 10px;
`;

const Form = styled.form`
  margin: 30px 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: right;
  align-items: center;
`;

const Block = styled.div`
  ${({ active }) =>
    active &&
    `
    display: none;
  `}
`;

const Btn = styled.div`
  display: flex;
  justify-content: center;
  width: 80%;
`;

const NotAUserContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 40vw;
  @media (max-width: 540px) {
    margin: 50px 15px;
    margin-top: 50px;
  }
`;

const H1 = styled.h1`
  margin-bottom: 20px;
`;

const UploadProductPage = () => {
  const [getUsertProduct] = useGetUsertProductMutation();
  const [uploadProduct, { isLoading }] = useUploadProductMutation();
  const { currentUser, product } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [type, setType] = useState("");
  const [details, setDetails] = useState();
  const [price, setPrice] = useState();
  const [imgs, setImgs] = useState();
  const [address, setAddress] = useState();
  const [newProduct, setnewProduct] = useState({
    type: "",
    location: {},
    details: {},
    images: [],
    price: {},
  });

  useEffect(() => {
    const userProduct = async () => {
      try {
        const res = await getUsertProduct(currentUser._id).unwrap();
        dispatch(authAction.getUsertProductSeccess(res.product[0]));
      } catch (error) {}
    };

    if (currentUser) {
      userProduct();
    }
  }, [currentUser, dispatch, getUsertProduct]);

  const getTypeChice = (value) => {
    setType(value);
    setnewProduct((pre) => {
      return {
        ...pre,
        type: value,
      };
    });
  };

  const getDetails = (values) => {
    setDetails(values);
    setnewProduct((pre) => {
      return {
        ...pre,
        details: { ...values },
      };
    });
  };

  const getPrice = (values) => {
    setPrice(values);
    setnewProduct((pre) => {
      return {
        ...pre,
        price: { ...values },
      };
    });
  };

  const getAddress = (values) => {
    setAddress(values);
    setnewProduct((pre) => {
      return {
        ...pre,
        location: { ...values },
      };
    });
  };

  const getImages = (values) => {
    setImgs(values);
    setnewProduct((pre) => {
      return {
        ...pre,
        images: [...values],
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await uploadProduct(newProduct).unwrap();
      dispatch(authAction.uploadProductSucess(res.product));
      toast.success("המוצר עלה בהצלחה");
      navigate("/");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <Fragment>
      <Container>
        {!currentUser ? (
          <NotAUserContainer>
            <H1>!רק משתמשים רשומים יכולים לפרסם מוצר</H1>
            <Link to="/login">
              <Button theme="uploadFormSubmit" text="לחץ כאן להתחברות" />
            </Link>
          </NotAUserContainer>
        ) : product ? (
          <NotAUserContainer>
            <H1>נראה שכבר העלתה מוצר! ניתן לפרסם עד מוצר אחד</H1>
          </NotAUserContainer>
        ) : (
          <Form onSubmit={handleSubmit}>
            {isLoading && <LoadingSpinner />}
            <Section>
              <CountContainer>
                <Count>סוג המוצר</Count>
              </CountContainer>
              <Block active={false}>
                <TypeChice pasValue={getTypeChice} />
              </Block>
            </Section>

            <Section>
              <CountContainer>
                <Count>פרטי המוצר</Count>
              </CountContainer>
              <Block active={!type}>
                <Details detailsValues={getDetails} />
              </Block>
            </Section>

            <Section>
              <CountContainer>
                <Count>מחיר</Count>
              </CountContainer>
              <Block active={!details}>
                <Price pasValue={getPrice} />
              </Block>
            </Section>

            <Section>
              <CountContainer>
                <Count>הוספת תמונות</Count>
              </CountContainer>

              <Block active={!price}>
                <ImageUploader getImages={getImages} />
              </Block>
            </Section>

            <Section>
              <CountContainer>
                <Count>הוספת מיקום</Count>
              </CountContainer>

              <Block active={!imgs}>
                <CitiesAndStreets pasValue={getAddress} />
              </Block>
            </Section>
            <Btn>
              <Button
                theme="uploadFormSubmit"
                type="submit"
                disabled={!address}
                text="סיום"
              />
            </Btn>
          </Form>
        )}
      </Container>
    </Fragment>
  );
};

export default UploadProductPage;
