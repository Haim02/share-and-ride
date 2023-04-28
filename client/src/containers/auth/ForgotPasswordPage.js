import React, { useState, Fragment } from "react";
import { forgotPassword } from "../../redux/apiCalls/auth";
import { Container, Wrapper, Title, Form } from "./Register";
import FormInputs from "../../components/formInput/FormInput";
import Button from "./../../components/button/Button";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");

  const onChangeHandler = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const sentEmail = {
      email: email,
    };
    forgotPassword(sentEmail);
  };

  return (
    <Fragment>
      <Container>
        <Wrapper>
          <Title>אפס סיסמה</Title>
          <Form onSubmit={handleSubmit}>
            <FormInputs
              label="אמייל"
              value={email}
              type="text"
              placeholder="הכנס אמייל"
              name="email"
              onChange={onChangeHandler}
            />
            <Button />
            <Button
              theme="auth"
              type="submit"
              text="שלח אימיל"
              disabled={email === ""}
            />
          </Form>
        </Wrapper>
      </Container>
    </Fragment>
  );
};

export default ForgotPasswordPage;
