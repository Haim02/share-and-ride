import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  FormContainer,
  Form,
  Section,
  InputsGroup,
  SubmitButton,
  Container,
  SideBar,
  Content,
} from "./UserProduct";
import SideNavProfile from "./SideNavProfile";
import { useUpdateUserPasswordMutation } from "../../redux/apiCalls/auth";
import FormInputs from "../formInput/FormInput";
import { toast } from "react-toastify";
import { authAction } from './../../redux/slices/auth';
import LoadingSpinner from './../UI/LoadingSpinner';

const UpdatePassword = () => {
  const [updateUserPassword, { isLoading }] = useUpdateUserPasswordMutation();
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.auth);
  const [newPassword, setNewPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");

  const newPasswordHandler = (e) => {
    setNewPassword(e.target.value);
  };
  const passwordConfirmdHandler = (e) => {
    setPasswordConfirm(e.target.value);
  };
  const currentPasswordHandler = (e) => {
    setCurrentPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      newPassword === "" ||
      currentPassword === "" ||
      newPassword.length < 8 ||
      passwordConfirm !== newPassword
    ) {
      return;
    }
    try {
      await updateUserPassword(
        newPassword,
        currentPassword,
        passwordConfirm,
        currentUser._id
      );
      dispatch(authAction.updateUserPasswordSuccess());
      toast.success("הסיסמה עודכנה בהצלחה");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <Container>
      {isLoading && <LoadingSpinner />}
      <SideBar>
        <SideNavProfile />
      </SideBar>
      <Content>
        <FormContainer name="submit" onSubmit={handleSubmit}>
          <Form>
            <Section>
              <InputsGroup>
                <FormInputs
                  label="סיסמה ישנה"
                  type="password"
                  name="currentPassword"
                  onChange={currentPasswordHandler}
                />
                <FormInputs
                  label="סיסמה חדשה"
                  type="password"
                  name="newPassword"
                  onChange={newPasswordHandler}
                />
                <FormInputs
                  label="אימות סיסמה"
                  type="password"
                  name="passwordConfirm"
                  onChange={passwordConfirmdHandler}
                />
              </InputsGroup>
              <SubmitButton type="submit">עדכן</SubmitButton>
            </Section>
          </Form>
        </FormContainer>
      </Content>
    </Container>
  );
};

export default UpdatePassword;
