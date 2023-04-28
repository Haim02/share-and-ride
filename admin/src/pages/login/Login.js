import React, { useState } from 'react';
import { login } from '../../redux/apiCalls/auth'
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Spinner from '../../components/spinner/Spinner';
import './login.scss'

const Login = () => {
  const [loginValues, setLoginValues] = useState({
    email: '',
    password: ''
  });
  
  const [disabledBtn, setDisabledBtn] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isFetching, error, currentUser } = useSelector(
    (state) => state.auth
  );


  const onChangeHandler = (e) => {
    setLoginValues({ ...loginValues, [e.target.name]: e.target.value });
    if(loginValues.email !== '' && loginValues.password !== '') {
      setDisabledBtn(false)
    } else if(loginValues.email === '' || loginValues.password === '') {
      setDisabledBtn(true)
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    login(dispatch,loginValues)
    if(currentUser){
      navigate('/') 
    }
  };

  return (
    <div className='container'>
      <div className='wrapper'>
        <Spinner loading={isFetching}/>
        <h2>כניסה למנהלים</h2>
        <form onSubmit={handleSubmit}>
          <div className='inputGroub'>
        <input
            label="אמייל"
            value={loginValues.email}
            type="email"
            placeholder="הכנס אמייל"
            name="email"
            onChange={onChangeHandler}
          />
          <input
            label="סיסמה"
            type="password"
            value={loginValues.password}
            placeholder="הכנס סיסמה"
            name="password"
            onChange={onChangeHandler}
          />
          </div>
          {error && <small>סיסמה או אימיל לא נכונים</small>}
          <button disabled={disabledBtn}>התחבר</button>
        </form>

      </div>
      
    </div>
  )
}

export default Login
