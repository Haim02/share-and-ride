import React, { useState, Fragment } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
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
import FormInputs from "./../../components/formInput/FormInput";
import LoadingSpinner from "../../components/LoadingSpinner";
import GoogleButton from "./../../components/UI/GoogleButton";
import Button from "../../components/button/Button";
import { useGoogleSigninMutation } from "../../redux/apiCalls/auth";
import { useLoginMutation } from "../../redux/apiCalls/auth";
import { authAction } from "../../redux/slice/auth";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";

const Login = () => {
  const [searchParams] = useSearchParams();
  const [login, { isLoading, isError }] = useLoginMutation();
  const [googleSignin] = useGoogleSigninMutation();
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

  const handleGoogleChecked = async (e) => {
    e.preventDefault();
    try {
      const res = await googleSignin().unwrap();
      dispatch(authAction.loginSuccess(res.user));
    } catch (error) {
      toast.error(error.data.message);
    }
    if (!isError && currentUser) {
      return navigate("/");
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

  return (
    <Fragment>
      {isLoading && <LoadingSpinner />}
      <Container>
        <Wrapper>
          {/* <GoogleSign>
            <Link
              to="http://localhost:3001/api/auth/google/google/callback"
              onClick={handleGoogleChecked}
            >
              <GoogleButton text="התחבר עם גוגל" />
            </Link>
          </GoogleSign>
          <Title>או</Title> */}
          <Form onSubmit={handleSubmit}>
            <FormInputs
              label="אמייל"
              value={loginValues.email}
              type="text"
              placeholder="הכנס אמייל"
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
              <Small>סיסמה או אימיל לא נכונים</Small>{" "}
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
            <Link to="http://localhost:3002" style={{ color: "blue" }}>
              לחץ כאן
            </Link>
          </Links>
        </Wrapper>
      </Container>
    </Fragment>
  );
};

export default Login;
