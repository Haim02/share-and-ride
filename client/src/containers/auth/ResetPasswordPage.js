import React, { useState, Fragment } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Container, Wrapper, Title, Form } from "./Register";
import { resetPassword } from "../../redux/apiCalls/auth";
import FormInputs from "../../components/formInput/FormInput";
import LoadingSpinner from "./../../components/LoadingSpinner";
import Button from "./../../components/button/Button";

const ResetPasswordPage = () => {
  const [disabledBtn, setDisabledBtn] = useState(true);
  const [newPassword, setNewPassword] = useState({
    password: "",
    passwordConfirm: "",
  });
  const location = useLocation();
  let token = location.pathname.split("/");
  token = token[token - 1];
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, success } = useSelector((state) => state.auth);

  const onChangeHandler = (e) => {
    setNewPassword({ ...newPassword, [e.target.name]: e.target.value });
    if (newPassword.password === "" || newPassword.passwordConfirm === "") {
      setDisabledBtn(true);
    } else if (
      newPassword.password.length < 8 ||
      newPassword.passwordConfirm.length < 8
    ) {
      setDisabledBtn(true);
    } else if (newPassword.password !== newPassword.passwordConfirm) {
      setDisabledBtn(true);
    } else setDisabledBtn(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    resetPassword(dispatch, token, newPassword);

    if (!success) {
      return navigate("/login");
    }
  };

  return (
    <Fragment>
      {loading && <LoadingSpinner />}
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
