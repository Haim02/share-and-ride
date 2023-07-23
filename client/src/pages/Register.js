import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useRegisterMutation } from "../redux/apiCalls/auth";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useFormik } from "formik";
import * as yup from "yup";
import { toast } from "react-toastify";
import GoogleButton from "../components/UI/GoogleButton";
import backGroundImage from "../assets/images/backGroundImage.png";
import "react-toastify/dist/ReactToastify.css";
import LoadingSpinner from "./../components/UI/LoadingSpinner";
import Button from "./../components/button/Button";
import { authAction } from "../redux/slices/auth";
import FormInputs from "./../components/formInput/FormInput";

export const Container = styled.div`
  padding: 20px 10px;
  background: linear-gradient(
      rgba(155, 155, 255, 0.3),
      rgba(155, 355, 355, 0.3)
    ),
    url(${backGroundImage}) center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Wrapper = styled.div`
  width: 50%;
  padding: 20px;
  margin: 40px 0;
  background-color: rgba(255, 255, 255, 0.846);
  justify-content: center;
  align-items: center;
  width: 50%;
  @media only screen and (max-width: 992px) {
    width: 90%;
    justify-content: center;
    align-items: center;
    margin-top: 100px;
    margin-bottom: 100px;
  }
`;

export const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
  text-align: center;
  margin-bottom: 15px;
`;

export const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  @media only screen and (max-width: 442px) {
  }
`;

const Agreement = styled.span`
  font-size: 12px;
  margin: 20px 0px;
  margin-left: 25px;
  text-align: right;
  display: flex;
  flex-direction: row-reverse;
`;

const Chackbox = styled.input``;

export const Links = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  height: 50px;
  margin-left: 10px;
  margin-top: 10px;
  @media only screen and (max-width: 360px) {
    flex-direction: row;
    height: 30%;
  }
`;

export const Small = styled.small`
  color: red;
`;

export const GoogleSign = styled.div`
  display: flex;
  justify-content: center;
`;

const validationSchema = yup.object({
  name: yup.string().required("נדרש למלא שם משתמש"),
  email: yup
    .string()
    .email("כתובת אימייל לא תקינה")
    .trim()
    .required("נדרשם למלא אימייל"),
  phone: yup
    .string()
    .trim()
    .min(10, "מספר פלאפון לא תקין")
    .max(10, "מספר פלאפון לא תקין"),
  password: yup
    .string()
    .trim()
    .min(8, "הסיסמה צריכה להכיל לפחות 8 תווים")
    .required("נדרש למלא סיסמה"),
  passwordConfirm: yup
    .string()
    .trim()
    .required("נדרש למלא סיסמה")
    .oneOf([yup.ref("password")], "סיסמאות לא תואמות"),
});

const Register = () => {
  const [isCheckbox, setIsCheckbox] = useState(false);
  const [isCheckboxBlur, setIsCheckboxBlur] = useState(false);
  const [register, { isLoading }] = useRegisterMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleIsCheckbox = (e) => {
    setIsCheckbox(e.target.checked);
  };

  const handleBlurChecked = (e) => {
    setIsCheckboxBlur(true);
  };

  const google = () => {
    window.open("http://localhost:3000/api/auth/google", "_self");
  };

  const onSubmit = async (values) => {
    if (!isCheckbox) {
      setIsCheckboxBlur(true);
      return;
    }
    try {
      const res = await register(values).unwrap();
      dispatch(authAction.registerSuccess({ ...res }));
      navigate("/");
    } catch (error) {
      toast.error(error.data.message);
    }
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
      passwordConfirm: "",
    },
    validateOnBlur: true,
    onSubmit,
    validationSchema: validationSchema,
  });

  const errors = formik.errors;

  return (
    <Container>
      {isLoading && <LoadingSpinner />}
      <Wrapper>
        <Title>צור חשבון</Title>
        <GoogleSign onClick={google}>
          <GoogleButton text="התחבר עם גוגל" />
        </GoogleSign>
        <Title>או</Title>
        <Form onSubmit={formik.handleSubmit}>
          <FormInputs
            value={formik.values.name}
            label="שם משתמש"
            type="text"
            placeholder="הכנס שם משתמש"
            name="name"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            small={formik.touched.name && errors.name ? errors.name : null}
          />
          <FormInputs
            value={formik.values.email}
            label="אמייל"
            type="text"
            placeholder="הכנס אמייל"
            name="email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            small={formik.touched.email && errors.email ? errors.email : null}
          />
          <FormInputs
            value={formik.values.phone}
            label="מספר פאלפון"
            type="text"
            placeholder="הכנס מספר פאלפון"
            name="phone"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            small={formik.touched.phone && errors.phone ? errors.phone : null}
          />
          <FormInputs
            value={formik.values.password}
            label="סיסמה"
            type="password"
            placeholder="הכנס סיסמה"
            name="password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            small={
              formik.touched.password && errors.password
                ? errors.password
                : null
            }
          />
          <FormInputs
            value={formik.values.passwordConfirm}
            label="אימות סיסמה"
            type="password"
            placeholder="הכנס סיסמה פעם נוספת"
            name="passwordConfirm"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            small={
              formik.touched.passwordConfirm && errors.passwordConfirm
                ? errors.passwordConfirm
                : null
            }
          />
          <Agreement>
            <Chackbox
              type="checkbox"
              checked={isCheckbox}
              onChange={handleIsCheckbox}
              onBlur={handleBlurChecked}
              style={{ color: "red" }}
            ></Chackbox>
            על ידי יצירת חשבון, אני מסכים לעיבוד הנתונים האישיים שלי בהתאם ל
            <b>מדיניות הפרטיות</b>
          </Agreement>
          {isCheckboxBlur && !isCheckbox && <Small>'יש לסמן כדי להמשיך'</Small>}
          <Button theme="auth" type="submit" text="צור חשבון" />
        </Form>
        <Links>
          ?כבר יש לך חשבון
          <Link to="/login" style={{ color: "blue" }}>
            להתחברות
          </Link>
        </Links>
      </Wrapper>
    </Container>
  );
};

export default Register;
