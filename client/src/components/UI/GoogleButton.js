import React from 'react';
import googleLogo  from '../../assets/google__G__Logo.svg.png';
import styled from 'styled-components';

const GoogleBtn = styled.div`
  width: 184px;
  height: 42px;
  background-color: #4285f4;
  border-radius: 2px;
  box-shadow: 0 3px 4px 0 rgba(0, 0, 0, 0, const G5);
  cursor: pointer;
  :hover {
    box-shadow: 0 0 6px #4285f4;
  }
  :active {
    background: #1669f2;
  }
`;

const GoogleIconWrapper = styled.div`
    position: absolute;
    margin-top: 1px;
    margin-left: 1px;
    width: 40px;
    height: 40px;
    border-radius: 2px;
    background-color: #fff;
`; 

const GoogleIcon = styled.img`
    position: absolute;
    margin-top: 11px;
    margin-left: 11px;
    width: 18px;
    height: 18px;
`; 

const BtnText = styled.button`
    float: right;
    margin: 11px 11px 0 0;
    color: #fff;
    font-size: 14px;
    letter-spacing: 0.2px;
    font-family: "Roboto";
    background-color: #4285f4;
    border: none;
`; 

const GoogleButton = (props) => {
  return (
      <GoogleBtn className="google-btn">
  <GoogleIconWrapper className="google-icon-wrapper">
    <GoogleIcon className="google-icon" src={googleLogo}/>
  </GoogleIconWrapper>
  <BtnText className="btn-text"><b>{props.text}</b></BtnText>
</GoogleBtn>
  )
}

export default GoogleButton
