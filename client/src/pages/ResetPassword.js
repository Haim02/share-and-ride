import React, { useState, Fragment } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Container, Wrapper, Title, Form } from "./Register";
import { useResetPasswordMutation } from "../redux/apiCalls/auth";
import FormInputs from "../components/formInput/FormInput";
import Button from "../components/button/Button";
import { toast } from "react-toastify";
import LoadingSpinner from "./../components/UI/LoadingSpinner";
import { authAction } from "./../redux/slices/auth";

const ResetPasswordPage = () => {
  const [resetPassword, { isLoading, isError }] = useResetPasswordMutation();
  const [disabledBtn, setDisabledBtn] = useState(true);
  const [newPassword, setNewPassword] = useState({
    password: "",
    passwordConfirm: "",
  });
  
  const location = useLocation();
  let token = location.pathname.split("/");
  token = token[token.length - 1];
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onChangeHandler = (e) => {
    setNewPassword({ ...newPassword, [e.target.name]: e.target.value });
    if(newPassword.password.length < 7) {
      setDisabledBtn(true);
    } else setDisabledBtn(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newPassword.passwordConfirm !== newPassword.password) {
      toast.error("סיסמאות לא תואמות");
      return;
    }

    const reset = {
      token: token,
      password: newPassword,
    };

    try {
      const res = await resetPassword(reset).unwrap();
      dispatch(authAction.loginSuccess(res.user));
      toast.success("איפוס סיסמה בוצעה בהצלחה");
    } catch (error) {
      toast.error("סיסמה לא תקינה");
    }

    if (!isError) {
      return navigate("/login");
    }
  };
 
  return (
    <Fragment>
      {isLoading && <LoadingSpinner />}
      <Container>
        <Wrapper>
          <Title>איפוס סיסמה</Title>
          <Form onSubmit={handleSubmit}>
            <FormInputs
              value={newPassword.password}
              label="סיסמה"
              type="password"
              placeholder="הכנס סיסמה"
              name="password"
              onChange={onChangeHandler}
            />

            <FormInputs
              value={newPassword.passwordConfirm}
              label="אימות סיסמה"
              type="password"
              placeholder="הכנס סיסמה פעם נוספת"
              name="passwordConfirm"
              onChange={onChangeHandler}
            />
            <Button
              theme="auth"
              text="אפס סיסמה"
              type="submit"
              disabled={disabledBtn}
            />
          </Form>
        </Wrapper>
      </Container>
    </Fragment>
  );
};

export default ResetPasswordPage;
