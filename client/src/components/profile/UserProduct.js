import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import FormInputs from "../formInput/FormInput";
import Local from "../uploadProductForm/CitiesAndStreets";
import SideNavProfile from "./SideNavProfile";
import {
  useUpdateUserProductMutation,
  useDeleteUserProductMutation,
  useGetUsertProductMutation,
} from "../../redux/apiCalls/auth";
import { ref } from "firebase/storage";
import { uploadImage, deletImage } from "../../imagesApi";
import { storage } from "../../firebase";
import Button from "../button/Button";
import { MdCloudUpload } from "react-icons/md";
import LoadingSpinner from "../UI/LoadingSpinner";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { authAction } from "../../redux/slices/auth";
import uuid from "react-uuid";
import { toast } from "react-toastify";

export const Container = styled.div`
  display: flex;
  margin: 20px 0;
`;

export const SideBar = styled.div`
  flex: 1;
`;

export const Content = styled.div`
  flex: 3;
  margin: 10px 0;
  margin-right: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ImagesContainer = styled.div`
  display: flex;
  justify-content: center;
  align-content: center;
  border: 2px dashed #1475cf;
  margin: 0 80px;
  height: 100px;
  padding: 20px;
  cursor: pointer;
  border-radius: 5px;
`;

const DetailsContainer = styled.div`
  margin-bottom: 15px;
  margin-top: 10px;
`;

export const InputsGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  justify-content: center;
  align-items: center;
  justify-content: space-between;
  justify-content: space-evenly;
  justify-content: space-around;
  padding: 0 47px;
`;

const OptionGroup = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  margin-bottom: 20px;
  @media (min-width: 568px) {
    flex-direction: row;
    justify-content: space-between;
  }
`;

const Description = styled.textarea`
  border: 1px solid black;
`;

export const Section = styled.div`
  width: 95%;
  display: flex;
  flex-direction: column;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.5);
  margin-bottom: 50px;
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

export const Form = styled.div`
  margin: 30px 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: right;
  align-items: center;
`;

export const FormContainer = styled.form``;

const Wraper = styled.div`
  flex: 4;
  padding: 20px;
`;

const ProductBottom = styled.div`
  display: flex;
  padding: 20px;
  -webkit-box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
  box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
  @media (max-width: 640px) {
    flex-direction: column;
  }
`;

const ProductForm = styled.div`
  display: flex;
  justify-content: space-between;
  @media (max-width: 640px) {
    flex-direction: column;
  }
`;

const Select = styled.select`
  font-size: 0.9rem;
  padding: 9px 8px;
  margin-bottom: 15px;
  text-align: right;
  margin-left: 53px;
  border: 1px solid black;
  @media (min-width: 568px) {
    width: 64%;
    margin-top: 20px;
    margin-left: 0;
  }
`;

const Option = styled.option`
  border-radius: 0;
`;

const ProductUploadImgContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
  justify-content: space-between;
  width: 200px;
  height: 180px;
  justify-content: center;
  padding: 15px 0;
  margin-left: 5px;
  @media (max-width: 640px) {
    width: 100%;
    height: 50%;
    margin-bottom: 10px;
  }
`;
const ProductUploadImg = styled.img`
  border-radius: 10px;
  border: 0.3px solid gray;
  margin-right: 20px;
  margin-bottom: 10px;
  width: 100%;
  height: 100%;
  img {
    object-fit: contain;
  }
  @media (max-width: 640px) {
    width: 100%;
    justify-content: center;
    align-items: center;
  }
`;

const PreImgContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 200px;
  padding: 20px;
  margin: 40px 0;
`;
const PreImg = styled.img`
  height: 180px;
  width: 160px;
  margin: 10px 0;
`;

const ProductUploadImgButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  justify-content: space-between;
  padding: 0 10px;
`;

const NoProduct = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
`;

const UploadBtn = styled.button`
  border: solid 1px black;
  border-radius: 5px;
  padding: 5px;
  width: 60px;
  height: 50px;
  background-color: lightskyblue;
  font-size: 17px;
  margin: 10px 5;
`;

const NoProductTitle = styled.h1``;

export const SubmitButton = styled.button`
  width: 100%;
  border: none;
  padding: 15px 20px;
  background-color: rgb(52, 138, 244);
  color: white;
  text-align: center;
  font-size: 18px;
  cursor: pointer;
  :focus {
    outline: none;
  }
`;

const UserProduct = () => {
  const dispatch = useDispatch();
  const [updateUserProduct] = useUpdateUserProductMutation();
  const [deleteUserProduct] = useDeleteUserProductMutation();
  const [getUsertProduct, { isLoading }] = useGetUsertProductMutation();
  const { product, currentUser } = useSelector((state) => state.auth);
  const [percent, setPercent] = useState(0);
  const inputRef = useRef();
  const [fileName, setFileName] = useState(null);
  const [imagesNames, setImagesNames] = useState(product?.images || []);
  const [details, setDetails] = useState(product?.details);
  const [location, setLocation] = useState(product?.location);
  const [price, setPrice] = useState(product?.price);
  const imagesLength = product?.images.length;

  useEffect(() => {
    const getProduct = async () => {
      try {
        const res = await getUsertProduct(currentUser._id).unwrap();
        dispatch(authAction.getUsertProductSeccess(res.product[0]));
      } catch (error) {
        toast.error(error.message);
      }
    };
    getProduct();
  }, [getUsertProduct, currentUser._id, dispatch, setImagesNames]);

  const handleSetDetails = (values) => {
    const { name, value } = values.target;
    setDetails((pre) => {
      return { ...pre, [name]: value };
    });
  };

  const handleSubmitDetails = async (e) => {
    e.preventDefault();

    const body = {
      id: product._id,
      data: {
        details: details,
      },
    };

    try {
      const res = await updateUserProduct(body).unwrap();
      dispatch(authAction.updateUserProductSuccess(res.product));
      toast.success("המוצר התעדכן בהצלחה");
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleSubmitPrice = async (e) => {
    e.preventDefault();

    const body = {
      id: product._id,
      data: {
        price: price,
      },
    };

    try {
      const res = await updateUserProduct(body).unwrap();
      dispatch(authAction.updateUserProductSuccess(res.product));
      toast.success("המוצר התעדכן בהצלחה");
    } catch (error) {
      toast.error(error.message);
    }
  };

  const onChangeHandler = (e) => {
    setPrice({ ...price, [e.target.name]: e.target.value });
  };

  const handleSetLocation = (values) => {
    setLocation(values);
  };

  const handleSubmitLocation = async (e) => {
    e.preventDefault();

    const body = {
      id: product._id,
      data: {
        location: location,
      },
    };

    try {
      const res = await updateUserProduct(body).unwrap();
      dispatch(authAction.updateUserProductSuccess(res.product));
      toast.success("המוצר התעדכן בהצלחה");
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    const addImages = async () => {
      const body = {
        id: product._id,
        data: {
          images: imagesNames,
        },
      };

      try {
        const res = await updateUserProduct(body).unwrap();
        dispatch(authAction.updateUserProductSuccess(res.product));
        toast.success("המוצר התעדכן בהצלחה");
      } catch (error) {
        toast.error(error.message);
      }
      setFileName(null);
    };

    if (imagesNames.length > imagesLength) {
      addImages();
    }
  }, [imagesNames]);

  const handleUpload = async () => {
    if (product?.images.length === 3) {
      toast.error("ניתן לעלות עד 3 תמונות");
      setFileName(null);
      return;
    }

    uploadImage(fileName, setPercent, setImagesNames);
  };

  const handleSubmitImg = async (e) => {
    e.preventDefault();

    const body = {
      id: product._id,
      data: {
        images: imagesNames,
      },
    };

    try {
      const res = await updateUserProduct(body).unwrap();
      dispatch(authAction.updateUserProductSuccess(res.product));
      toast.success("המוצר התעדכן בהצלחה");
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handledeleteUserProducts = async () => {
    try {
      await deleteUserProduct(product._id).unwrap();
      dispatch(authAction.deleteUserProductsSuccess());
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleDelete = async (imgName) => {
    if (product?.images.length > 0) {
      let imgRef = ref(storage, imgName);
      deletImage(imgRef, imgName, setImagesNames);

      const updateImages = product?.images.filter((img) => {
        return img !== imgName;
      });

      const body = {
        id: product._id,
        data: { images: updateImages },
      };
      try {
        const res = await updateUserProduct(body).unwrap();
        dispatch(authAction.updateUserProductSuccess(res.product));
        toast.success("המוצר התעדכן בהצלחה");
      } catch (error) {
        toast.error(error.message);
      }
    }
  };

  if (!product) {
    return (
      <Container>
        <SideBar>
          <SideNavProfile />
        </SideBar>
        <NoProduct>
          <NoProductTitle>עדיין לא העלת/ה מוצר</NoProductTitle>
          <Link
            to="/uploadProduct"
            style={{
              textDecoration: "none",
              width: "60%",
              marginLeft: "60px",
            }}
          >
            <Button theme="auth" text="העלה מוצר" />
          </Link>
        </NoProduct>
      </Container>
    );
  }

  if (product) {
    return (
      <Container>
        {isLoading && <LoadingSpinner />}
        <SideBar>
          <SideNavProfile />
        </SideBar>
        <Content>
          {product === null ? (
            <NoProduct>
              <NoProductTitle>עדיין לא העלת/ה מוצר</NoProductTitle>
              <Link
                to="/uploadProduct"
                style={{
                  textDecoration: "none",
                  width: "60%",
                  marginLeft: "60px",
                }}
              >
                <Button theme="auth" text="העלה מוצר" />
              </Link>
            </NoProduct>
          ) : (
            <Wraper>
              {isLoading ? (
                <LoadingSpinner />
              ) : (
                <>
                  <ProductBottom>
                    {product.images.map((img) => {
                      return (
                        <FormContainer onSubmit={handleSubmitImg} key={uuid()}>
                          <ProductForm>
                            <ProductUploadImgContainer>
                              <ProductUploadImg src={img} alt="" />
                              <ProductUploadImgButton>
                                <FontAwesomeIcon
                                  icon={faTrashCan}
                                  style={{ cursor: "pointer" }}
                                  onClick={() => handleDelete(img)}
                                />
                                <Button
                                  theme="UpdateImg"
                                  type="submit"
                                  text="מחק"
                                  onClick={() => handleDelete(img)}
                                />
                              </ProductUploadImgButton>
                            </ProductUploadImgContainer>
                          </ProductForm>
                        </FormContainer>
                      );
                    })}
                    {fileName && (
                      <PreImgContainer>
                        <PreImg
                          src={
                            typeof value === "string"
                              ? fileName
                              : URL.createObjectURL(fileName)
                          }
                          alt="file"
                        />
                        <p>{percent} "%"</p>
                        {fileName && (
                          <UploadBtn onClick={handleUpload}>העלה</UploadBtn>
                        )}
                      </PreImgContainer>
                    )}
                    {product?.images.length < 3 && (
                      <ImagesContainer
                        type="button"
                        onClick={() => inputRef.current.click()}
                      >
                        <input
                          type="file"
                          ref={inputRef}
                          onChange={(e) =>
                            setFileName(e.currentTarget.files[0])
                          }
                          hidden
                        />
                        <MdCloudUpload color="#147cf" size={60} />
                      </ImagesContainer>
                    )}
                  </ProductBottom>

                  <FormContainer
                    name="submit"
                    value="dd"
                    onSubmit={handleSubmitDetails}
                  >
                    <Form>
                      <Section>
                        <DetailsContainer>
                          <InputsGroup>
                            <FormInputs
                              label="כותרת"
                              type="text"
                              placeholder={product.details.title}
                              name="title"
                              onChange={handleSetDetails}
                            />
                            <FormInputs
                              label="יצרן"
                              type="text"
                              placeholder={product.details.model}
                              name="model"
                              onChange={handleSetDetails}
                            />
                            <FormInputs
                              label="מהירות"
                              type="number"
                              placeholder={product.details.speed}
                              name="speed"
                              onChange={handleSetDetails}
                            />
                            <FormInputs
                              label="סוללה"
                              type="number"
                              placeholder={product.details.battery}
                              name="battery"
                              onChange={handleSetDetails}
                            />
                            <OptionGroup>
                              <Select
                                name="helmet"
                                defaultValue={product.details.helmet}
                                onChange={handleSetDetails}
                              >
                                <Option value={false}>אין</Option>
                                <Option value={true}>יש</Option>
                              </Select>
                              <h5>:קסדה</h5>
                              <Select
                                name="electric"
                                defaultValue={product.details.electric}
                                onChange={handleSetDetails}
                              >
                                <Option value={false}>לא</Option>
                                <Option value={true}>כן</Option>
                              </Select>
                              <h5>:חשמלי</h5>
                            </OptionGroup>
                            <Description
                              rows="5"
                              cols="30"
                              name="description"
                              onChange={handleSetDetails}
                              placeholder="תיאור של המוצר..."
                            ></Description>
                          </InputsGroup>
                        </DetailsContainer>
                        <SubmitButton type="submit">עדכן</SubmitButton>
                      </Section>
                    </Form>
                  </FormContainer>
                  <FormContainer name="submit" onSubmit={handleSubmitPrice}>
                    <Form>
                      <Section>
                        <InputsGroup>
                          <FormInputs
                            label="מחיר לשעה"
                            type="number"
                            placeholder={`${product.price.hourPrice} ₪`}
                            name="hourPrice"
                            onChange={onChangeHandler}
                          />
                          <FormInputs
                            label="מחיר ליום"
                            type="number"
                            placeholder={`${product.price.dailyPrice} ₪`}
                            name="dailyPrice"
                            onChange={onChangeHandler}
                          />
                          <FormInputs
                            label="צורת התשלום"
                            type="text"
                            placeholder={product.price?.payment}
                            name="payment"
                            onChange={onChangeHandler}
                          />
                        </InputsGroup>
                        <SubmitButton type="submit">עדכן</SubmitButton>
                      </Section>
                    </Form>
                  </FormContainer>

                  <FormContainer onSubmit={handleSubmitLocation}>
                    <Section>
                      <CountContainer>
                        <Count>עדכן מיקום</Count>
                      </CountContainer>
                      <Local pasValue={handleSetLocation} show={false} />
                      <SubmitButton type="submit">עדכן</SubmitButton>
                    </Section>
                  </FormContainer>
                  <Button
                    theme="deleteProduct"
                    text="מחק מוצר"
                    type="button"
                    onClick={handledeleteUserProducts}
                  />
                </>
              )}
            </Wraper>
          )}
        </Content>
      </Container>
    );
  }
};

export default UserProduct;
