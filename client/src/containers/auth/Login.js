import React, { useState, Fragment } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userLogin, googleSignin } from "../../redux/apiCalls/auth";
import { Container, Wrapper, Title, Form, Links, Small, GoogleSign } from './Register';
import FormInputs from "./../../components/formInput/FormInput";
import LoadingSpinner from "../../components/LoadingSpinner";
import GoogleButton from './../../components/UI/GoogleButton';
import Button from "../../components/button/Button";

const Login = () => {
  const [disabledBtn, setDisabledBtn] = useState(true)
  const [loginValues, setLoginValues] = useState({
    email: '',
    password: ''
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, currentUser } = useSelector(
    (state) => state.auth
  );

  const onChangeHandler = (e) => {
    setLoginValues({ ...loginValues, [e.target.name]: e.target.value });
    if(loginValues.email !== '' && loginValues.password !== '') {
      setDisabledBtn(false)
    } 
    if(loginValues.email === '' || loginValues.password === '') {
         setDisabledBtn(true)
    }
    //  if(loginValues.email === '' && loginValues.password === '') {
    //   setDisabledBtn(true)
    // } else setDisabledBtn(false)
  };

  const handleGoogleChecked = () => {
    googleSignin(dispatch);
    // navigate('http://localhost:3001/auth/google')
  };

  const handleSubmit = (e) => {
    e.preventDefault();
     userLogin(dispatch,loginValues)
     if(!error && currentUser) {
       return navigate('/') 
      }
    };
  return (
    <Fragment>
    {loading && <LoadingSpinner/>}
    <Container>
      <Wrapper>
        <Title>התחבר</Title>
          <GoogleSign>
          <Link to="http://localhost:3001/auth/google">
            <GoogleButton text="התחבר עם גוגל" onClick={handleGoogleChecked} />
          </Link>
          </GoogleSign>
        <Title>או</Title>
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
          <Button theme='auth' type="submit" disabled={disabledBtn} text='התחבר'/>
        </Form>
          {error && <div style={{display: 'flex', justifyContent: 'center'}}><Small>סיסמה או אימיל לא נכונים</Small> </div>}
        <Links>
          ? אין לך חשבון
          <Link to="/Register" style={{ color: "blue" }}>
            להרשמה
          </Link>
          ? שכחת סיסמה
          <Link to="/forgotPassword" style={{ color: "blue" }}>
            לחץ כאן
          </Link>
          {/* <Link to="/Register" style={{color: 'blue'}}>כניסה למנהלים</Link> */}
        </Links>
      </Wrapper>
    </Container>
    </Fragment>
  );
};

export default Login;
