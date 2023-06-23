import React from "react";
import styled from "styled-components";
import { MdDelete } from "react-icons/md";
import { AiFillFileImage } from "react-icons/ai";

const UploadRow = styled.section`
  margin: 10px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 20px;
  background-color: #e9f0ff;
`;

const UploadContent = styled.span`
  display: flex;
  align-items: center;
`;

const ImagesList = (props) => {
  return (
    <UploadRow>
      <AiFillFileImage color="147cf" />
      <UploadContent>
        {props.name}
        <MdDelete onClick={props.onClick} />
      </UploadContent>
    </UploadRow>
  );
};

export default ImagesList;
