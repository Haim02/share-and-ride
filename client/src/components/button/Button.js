import React from "react";
import styled from "styled-components";

const BaseButton = styled.button`
  width: 40%;
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
const HomePage = styled(BaseButton)`
  margin: 0 5px;
  width: 80%;
`;

const AuthPage = styled(BaseButton)`
  width: 80%;
  ${({ disabled }) =>
    disabled &&
    `
    background-color: gray;
  `}
`;

const RentFrom = styled(BaseButton)`
  width: 40%;
  ${({ disabled }) =>
    disabled &&
    `
    background-color: gray;
  `}
`;

const Filter = styled(BaseButton)`
  width: 100%;
  ${({ disabled }) =>
    disabled &&
    `
    background-color: gray;
  `}
`;

const Sort = styled(BaseButton)`
  width: 20%;
  ${({ disabled }) =>
    disabled &&
    `
    background-color: gray;
  `}
`;

const ProductCart = styled(BaseButton)`
  width: 100%;
  ${({ disabled }) =>
    disabled &&
    `
    background-color: gray;
  `}
`;

const UploadForm = styled(BaseButton)`
  width: 40%;

  ${({ disabled }) =>
    disabled &&
    `
    background-color: gray;
  `}
  @media (max-width: 768px) {
    width: 90%;
  }
`;

const UploadFormSubmit = styled(BaseButton)`
  width: 60%;
  ${({ disabled }) =>
    disabled &&
    `
    background-color: rgb(185, 220, 232);
  `}
  @media (max-width: 768px) {
    width: 90%;
  }
`;

const Logout = styled(BaseButton)`
  width: 100%;
  padding: 12px 16px;
  font-size: 12px;
  border-radius: 15px;
`;

const NavUploadProduct = styled(BaseButton)`
  width: 100%;
  padding: 15px 18px;
  font-size: 13px;
  border-radius: 10px;
`;

const SentMessage = styled(BaseButton)`
  width: 250px;
  padding: 10px;
  background-color: #2879fe;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
  cursor: pointer;
  border: none;
  font-weight: 500;
  margin: 10px;
  @media (max-width: 800px) {
    width: 200px;
  }
`;

const UpdateImg = styled(BaseButton)`
  border-radius: 13px;
  font-size: 22px;
  padding: 0;
`;
const UpdateProduct = styled(BaseButton)`
  width: 30%;
  height: 30%;
`;

const UpdateMsg = styled(BaseButton)``;

const DeleteProduct = styled(BaseButton)`
  background-color: red;
`;

const Button = ({ theme, text, className, ...otherProps }) => {
  if (theme === "home") {
    return <HomePage className={className}>{text}</HomePage>;
  } else if (theme === "auth") {
    return (
      <AuthPage className={className} {...otherProps}>
        {text}
      </AuthPage>
    );
  } else if (theme === "rentFrom") {
    return (
      <RentFrom className={className} {...otherProps}>
        {text}
      </RentFrom>
    );
  } else if (theme === "filter") {
    return (
      <Filter className={className} {...otherProps}>
        {text}
      </Filter>
    );
  } else if (theme === "sort") {
    return (
      <Sort className={className} {...otherProps}>
        {text}
      </Sort>
    );
  } else if (theme === "productCart") {
    return (
      <ProductCart className={className} {...otherProps}>
        {text}
      </ProductCart>
    );
  } else if (theme === "uploadForm") {
    return (
      <UploadForm className={className} {...otherProps}>
        {text}
      </UploadForm>
    );
  } else if (theme === "uploadFormSubmit") {
    return (
      <UploadFormSubmit className={className} {...otherProps}>
        {text}
      </UploadFormSubmit>
    );
  } else if (theme === "logout") {
    return (
      <Logout className={className} {...otherProps}>
        {text}
      </Logout>
    );
  } else if (theme === "navUploadProduct") {
    return (
      <NavUploadProduct className={className} {...otherProps}>
        {text}
      </NavUploadProduct>
    );
  } else if (theme === "sentMessage") {
    return (
      <SentMessage className={className} {...otherProps}>
        {text}
      </SentMessage>
    );
  } else if (theme === "update") {
    return (
      <UpdateImg className={className} {...otherProps}>
        {text}
      </UpdateImg>
    );
  } else if (theme === "updateProduct") {
    return (
      <UpdateProduct className={className} {...otherProps}>
        {text}
      </UpdateProduct>
    );
  } else if (theme === "updateMsg") {
    return (
      <UpdateMsg className={className} {...otherProps}>
        {text}
      </UpdateMsg>
    );
  } else if (theme === "deleteProduct") {
    return (
      <DeleteProduct className={className} {...otherProps}>
        {text}
      </DeleteProduct>
    );
  }
};

export default Button;
