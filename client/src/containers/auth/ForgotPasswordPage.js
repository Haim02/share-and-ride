import React, { useState, Fragment } from "react";
import { Container, Wrapper, Title, Form } from "./Register";
import FormInputs from "../../components/formInput/FormInput";
import { useForgotPasswordMutation } from "../../redux/apiCalls/auth";
import Button from "./../../components/button/Button";
import { toast } from "react-toastify";

const ForgotPasswordPage = () => {
  const [forgotPassword] = useForgotPasswordMutation();
  const [email, setEmail] = useState("");

  const onChangeHandler = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
   
    try {
      await forgotPassword(email);
      toast.success("נשלח קישור לאיפוס הסיסמה לכתובת מייל שהוזנה");
    } catch (error) {
      toast.error("אימיל לא תקין");
    }
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
