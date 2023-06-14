import React, { useState } from "react";
import Modal from "./../modal/Modal";
import styled from "styled-components";
import Button from "../button/Button";
import DatePicker, { registerLocale } from "react-datepicker";
import TimeRange from "react-time-range";
import { useDispatch, useSelector } from "react-redux";
import { useCreateMessageMutation } from "../../redux/apiCalls/messages";
import { messagesAction } from "../../redux/slice/messages";
import "react-datepicker/dist/react-datepicker.css";
import { he } from "date-fns/locale";
import { useLocation } from "react-router-dom";
import LoadingSpinner from "../LoadingSpinner";
import { toast } from "react-toastify";
registerLocale("he", he);

const InputContainer = styled.div`
  justify-content: flex-end;
  text-align: right;
  @media (max-height: 1068px) {
    margin-bottom: 10px;
  }
`;

const StyledForm = styled.form`
  background-color: #f4f4f4;
  padding: 20px;
  border-radius: 8px;
  height: 270px;
  position: fixed;
  top: 0px;
  left: 0;
  right: 0;
  margin: 5px;
  bottom: 8px;
  @media (max-height: 1068px) {
    height: 90%;
  }
`;

const StyledLabel = styled.label`
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
  text-align: right;
  color: ${(props) => (props.invalid ? "red" : "black")};
`;

const Time = styled.div``;

const RentFrom = (props) => {
  const [createMessage, { isLoading }] = useCreateMessageMutation();
  const location = useLocation();
  const productId = location.pathname.split("/")[2];
  const [startDate, setStartDate] = useState(new Date());
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());
  const [notice, setNotice] = useState("");
  const dispatch = useDispatch();
  const { product } = useSelector((state) => state.auth);
  const returnFunction = (e) => {
    setStartTime(new Date(e?.startTime));
    setEndTime(new Date(e?.endTime));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let date = `${startDate.getDate()}/${
      startDate.getMonth() + 1
    }/${startDate.getFullYear()}`.toString();
    let start = `${startTime.getHours()}:${startTime.getMinutes()}`.toString();
    let end = `${endTime.getHours()}:${endTime.getMinutes()}`.toString();

    const message = {
      date,
      start,
      end,
      notice,
      toUser: props.toUser,
      productId,
    };

    if (product) {
      if (productId === product._id) {
        return toast.error("לא ניתן לשלוח הודעות למוצר ששייך למשתמש רשום");
      }
    }

    try {
      const res = await createMessage(message).unwrap();
      dispatch(messagesAction.createMessagesSuccess(res.message));
      toast.success("הודעה נשלחה בהצלחה");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Modal onClose={props.onClose}>
      <StyledForm onSubmit={handleSubmit}>
        <InputContainer>
          <StyledLabel>בחר\י תאריך בו תרצה להשכיר</StyledLabel>
          <DatePicker
            setStartDate
            dateFormat="dd/MM//yyyy"
            locale="he"
            selected={startDate}
            onChange={(date) => setStartDate(date)}
          />
        </InputContainer>
        <InputContainer></InputContainer>
        <InputContainer>
          <StyledLabel>
            בחר\י את שעת ההתחלה ואת השעת הסיום בו תרצה להשכיר
          </StyledLabel>
          <Time>
            <TimeRange
              className="timePiker"
              use24Hours={true}
              startLabel="Start:"
              endLabel="-  End:"
              startMoment={startTime}
              minuteIncrement={1}
              endMoment={endTime}
              sameIsValid={true}
              equalTimeError="זמן לא תקין"
              endTimeError="זמן לא תקין"
              onChange={returnFunction}
            />
          </Time>
        </InputContainer>
        <InputContainer>
          <StyledLabel>:הערות מיוחדות</StyledLabel>
          <textarea
            onChange={(e) => setNotice(e.target.value)}
            style={{ width: "50%", height: "65px" }}
          ></textarea>
        </InputContainer>
        {isLoading && <LoadingSpinner />}
        <Button
          theme="uploadForm"
          type="submit"
          text="שלח"
          disabled={!startDate || !startTime}
        />
      </StyledForm>
    </Modal>
  );
};

export default RentFrom;
