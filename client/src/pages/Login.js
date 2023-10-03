import React, { useState, Fragment } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Container,
  Wrapper,
  Title,
  Form,
  Links,
  Small,
  GoogleSign,
} from "./Register";
import FormInputs from "./../components/formInput/FormInput";
import GoogleButton from "../components/UI/GoogleButton";
import { useLoginMutation } from "../redux/apiCalls/auth";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import LoadingSpinner from "./../components/UI/LoadingSpinner";
import Button from "./../components/button/Button";
import { authAction } from "./../redux/slices/auth";

const Login = () => {
  const [login, { isLoading, isError }] = useLoginMutation();
  const [disabledBtn, setDisabledBtn] = useState(true);
  const [loginValues, setLoginValues] = useState({
    email: "",
    password: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.auth);

  const onChangeHandler = (e) => {
    setLoginValues({ ...loginValues, [e.target.name]: e.target.value.trim() });
    if (loginValues.email !== "" && loginValues.password !== "") {
      setDisabledBtn(false);
    }
    if (loginValues.email === "" || loginValues.password === "") {
      setDisabledBtn(true);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await login(loginValues).unwrap();
      dispatch(authAction.loginSuccess(res));
    } catch (error) {
      toast.error(error.data.message);
    }

    if (!isError && currentUser) {
      return navigate("/");
    }
  };

  const google = () => {
    window.open("https://www.shareandride.site/api/auth/google", "_self");
  };

  return (
    <Fragment>
      {isLoading && <LoadingSpinner />}
      <Container>
        <Wrapper>
          <GoogleSign onClick={google}>
            <GoogleButton text="התחבר עם גוגל" />
          </GoogleSign>
          <Title>או</Title>
          <Form onSubmit={handleSubmit}>
            <FormInputs
              label="אימייל"
              value={loginValues.email}
              type="text"
              placeholder="הכנס אימייל"
              name="email"
              onChange={onChangeHandler}
            />
            <FormInputs
              label="סיסמה"
              type="password"
              value={loginValues.password}
              placeholder="הכנס סיסמה"
              name="password"
              onChange={onChangeHandler}
            />
            <Button
              theme="auth"
              type="submit"
              disabled={disabledBtn}
              text="התחבר"
            />
          </Form>
          {isError && (
            <div style={{ display: "flex", justifyContent: "center" }}>
              <Small>סיסמה או אימייל לא נכונים</Small>{" "}
            </div>
          )}
          <Links>
            ? אין לך חשבון
            <Link to="/Register" style={{ color: "blue" }}>
              להרשמה
            </Link>
            ? שכחת סיסמה
            <Link to="/forgotPassword" style={{ color: "blue" }}>
              לחץ כאן
            </Link>
            כניסת מנהל
            <Link to="https://shareandrideadmin.netlify.app/" style={{ color: "blue" }}>
              לחץ כאן
            </Link>
          </Links>
        </Wrapper>
      </Container>
    </Fragment>
  );
};

export default Login;
