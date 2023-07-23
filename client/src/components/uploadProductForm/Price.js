import React, { useState } from "react";
import styled from "styled-components";
import FormInputs from "./../formInput/FormInput";
import Button from "./../button/Button";

const Container = styled.div``;

const InputsGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: center;
  justify-content: space-around;
`;

const CheckboxContainer = styled.div``;

const Checkbox = styled.input`
  border: 10;
  margin-right: 30px;
  margin-top: 30px;
`;
const Btn = styled.div`
  display: flex;
  padding: 15px 0;
  padding-left: 20px;
`;
const Small = styled.small`
  color: red;
  margin-right: 10px;
`;

const Price = (props) => {
  const [price, setPrice] = useState();
  const [isChecked, setIsChecked] = useState();
  const [error, setError] = useState(false);

  const onChangeHandler = (e) => {
    setPrice({ ...price, [e.target.name]: e.target.value });
    if (!price) {
      setError(false);
    }
  };

  const onCheckHandler = (e) => {
    setIsChecked(e.target.checked);
    if (isChecked === true) {
      setPrice({ hourPrice: 0, dailyPrice: 0, payment: price?.payment });
    }
  };

  const handleClick = () => {
    if (!price) {
      setError(true);
      setPrice({ hourPrice: 0, dailyPrice: 0, payment: price?.payment });
      return;
    }
    props.pasValue(price);
  };

  return (
    <Container>
      <InputsGroup>
        <FormInputs
          label="מחיר לשעה"
          type="number"
          placeholder="₪"
          name="hourPrice"
          onChange={onChangeHandler}
          disabled={isChecked}
        />
        <FormInputs
          label="מחיר ליום"
          type="number"
          placeholder="₪"
          name="dailyPrice"
          onChange={onChangeHandler}
          disabled={isChecked}
        />
      </InputsGroup>
      <CheckboxContainer>
        <label> ללא מחיר </label>
        <Checkbox type="checkbox" onChange={onCheckHandler} />
      </CheckboxContainer>
      {error && <Small>יש לבחור אופציה אחת</Small>}
      <FormInputs
          label="צורת התשלום"
          type="text"
          placeholder="ביט/מזומן/העברה בנקאית"
          name="payment"
          onChange={onChangeHandler}
        />
      <Btn>
        <Button
          theme="uploadForm"
          type="button"
          onClick={handleClick}
          text="המשך"
        />
      </Btn>
    </Container>
  );
};

export default Price;
