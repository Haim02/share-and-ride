import React from "react";
import "./new.scss";
import { useDispatch } from "react-redux";
import { addUser } from "../../redux/apiCalls/user";
import { useState } from "react";

const New = ({ inputs, title }) => {
  const dispatch = useDispatch();
  const [formInputs, setFormInputs] = useState({});

  const handleInputs = (e) => {
    const { name, value } = e.target;
    setFormInputs((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const submitUser = (e) => {
    e.preventDefault();
    addUser(formInputs, dispatch);
  };

  return (
    <div className="new">
      <div className="newContainer">
        <div className="top">
          <h1>{title}</h1>
        </div>
        <div className="bottom">
          <div className="right">
            <form onSubmit={submitUser}>
              <div className="formInput">
                <label>שם משתמש</label>
                <input
                  type="text"
                  name="name"
                  placeholder="הכנס שם"
                  onChange={handleInputs}
                />
                <label>מייל</label>
                <input
                  type="email"
                  name="email"
                  placeholder="israel@gmail.com"
                  onChange={handleInputs}
                />
                <label>פלאפון</label>
                <input
                  type="text"
                  name="phone"
                  placeholder="012 3456789"
                  onChange={handleInputs}
                />
                <label>סיסמה</label>
                <input
                  type="password"
                  name="password"
                  onChange={handleInputs}
                />
                <label>אימות סיסמה</label>
                <input
                  type="password"
                  name="passwordConfirm"
                  onChange={handleInputs}
                />
              </div>
              <button>צור</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default New;
