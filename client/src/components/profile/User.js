import React, { useState } from "react";
import {
  CalendarToday,
  MailOutline,
  PermIdentity,
  PhoneAndroid,
} from "@mui/icons-material";
import profilePicture from "../../assets/images/blank-profile-picture.webp";
import LoadingSpinner from "../UI/LoadingSpinner";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { useUpdateUserMutation } from "../../redux/apiCalls/auth";
import { authAction } from "../../redux/slices/auth";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import Button from "../button/Button";
import ReactTimeAgo from "react-time-ago";
import { toast } from "react-toastify";

const Container = styled.div`
  flex: 4;
  padding: 20px;
`;

const UserContainer = styled.div`
  display: flex;
  margin-top: 20px;
  @media (max-width: 900px) {
    flex-direction: column;
    justify-content: space-between;
  }
`;

const UserShow = styled.div`
  flex: 1;
  padding: 20px;
  -webkit-box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
  box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
  @media (max-width: 900px) {
    flex: 0;
    width: 95%;
    min-width: 20%;
  }
`;

const UserUpdate = styled.div`
  justify-content: center;
  padding: 20px;
  text-align: center;
  -webkit-box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
  box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
  @media (max-width: 900px) {
    display: flex;
    flex-direction: column;
    width: 95%;
  }
`;

const UserShowTop = styled.div`
  display: flex;
  align-items: center;
`;

const UserShowImg = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
`;

const UserShowTopTitle = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 20px;
`;

const UserShowUsername = styled.span`
  font-weight: 600;
`;

const UserShowBottom = styled.div`
  margin-top: 20px;
`;

const UserShowTitle = styled.span`
  font-size: 14px;
  font-weight: 600;
  color: rgb(175, 170, 170);
`;

const UserShowInfo = styled.div`
  display: flex;
  align-items: center;
  margin: 20px 0px;
  color: #444;
`;

const UserShowInfoTitle = styled.span`
  margin-left: 10px;
`;

const UserUpdateTitle = styled.span`
  font-size: 24px;
  font-weight: 600;
  text-align: center;
`;

const UserUpdateForm = styled.form`
  display: flex;
  justify-content: space-between;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  width: 100%;
`;

const UserUpdateItem = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 10px;
  text-align: right;
  margin-bottom: 30px;
  > label {
    margin-bottom: 5px;
    font-size: 14px;
  }
  @media (max-width: 900px) {
    width: 100%;
  }
`;

const UserUpdateInput = styled.input`
  border: none;
  width: 290px;
  height: 30px;
  text-align: right;
  border-bottom: 1px solid gray;
`;

const UserUpdateLeft = styled.div``;

const User = () => {
  const [updateUser, { isLoading }] = useUpdateUserMutation();
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.auth);
  const [updateUserFilds, setUpdateUserFilds] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdateUserFilds((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const body = {
      id: currentUser._id,
      data: updateUserFilds,
    };
    try {
      const res = await updateUser(body).unwrap();
      dispatch(authAction.updateUserSucess(res.user));
      toast.success("המשתמש עודכן בהצלחה");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <Container>
      {isLoading && <LoadingSpinner />}
      <UserContainer>
        <UserShow>
          <UserShowTop>
            <UserShowImg src={profilePicture} alt={currentUser.name} />
            <UserShowTopTitle>
              <UserShowUsername>{currentUser.name}</UserShowUsername>
            </UserShowTopTitle>
          </UserShowTop>
          <UserShowBottom>
            <UserShowTitle>פרטי חשבון</UserShowTitle>
            <UserShowInfo>
              <PermIdentity className="userShowIcon" />
              <UserShowInfoTitle>{currentUser.name}</UserShowInfoTitle>
            </UserShowInfo>
            <UserShowInfo>
              <CalendarToday className="userShowIcon" />
              <UserShowInfoTitle>
                <ReactTimeAgo
                  date={new Date(currentUser.createdAt)}
                  locale="he"
                />
              </UserShowInfoTitle>
            </UserShowInfo>
            <UserShowTitle>פרטי יצירת קשר</UserShowTitle>
            <UserShowInfo>
              <PhoneAndroid className="userShowIcon" />
              <UserShowInfoTitle>
                {currentUser.phone ? (
                  currentUser.phone
                ) : (
                  <FontAwesomeIcon icon={faXmark} />
                )}
              </UserShowInfoTitle>
            </UserShowInfo>
            <UserShowInfo>
              <MailOutline className="userShowIcon" />
              <UserShowInfoTitle>{currentUser.email}</UserShowInfoTitle>
            </UserShowInfo>
          </UserShowBottom>
        </UserShow>
        <UserUpdate>
          <UserUpdateTitle>ערוך</UserUpdateTitle>
          <UserUpdateForm onSubmit={handleSubmit}>
            <UserUpdateLeft>
              <UserUpdateItem>
                <label>שם</label>
                <UserUpdateInput
                  type="text"
                  placeholder={currentUser.name}
                  onChange={handleChange}
                  name="name"
                />
              </UserUpdateItem>
              <UserUpdateItem>
                <label>אימייל</label>
                <UserUpdateInput
                  type="text"
                  placeholder={currentUser.email}
                  className="userUpdateInput"
                  onChange={handleChange}
                  name="email"
                />
              </UserUpdateItem>
              <UserUpdateItem>
                <label>פלאפון</label>
                <UserUpdateInput
                  type="text"
                  placeholder={currentUser.phone}
                  className="userUpdateInput"
                  onChange={handleChange}
                  name="phone"
                />
              </UserUpdateItem>
              <Button theme="auth" type="submit" text="עדכן" />
            </UserUpdateLeft>
          </UserUpdateForm>
        </UserUpdate>
      </UserContainer>
    </Container>
  );
};

export default User;
