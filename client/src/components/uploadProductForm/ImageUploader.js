import React, { useState, Fragment, useRef } from "react";
import styled from "styled-components";
import { MdCloudUpload } from "react-icons/md";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { uploadImage, deletImage } from "../../imagesApi";
import Button from "../button/Button";
import uuid from "react-uuid";

const ImagesContainer = styled.div`
  display: flex;
  justify-content: center;
  align-content: center;
  border: 2px dashed #1475cf;
  margin: 0 80px;
  padding: 20px 0;
  cursor: pointer;
  border-radius: 5px;
`;

const ImagesList = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  justify-content: space-between;
`;
const ImageItem = styled.div`
  display: flex;
  flex-direction: row-reverse;
`;

const PreImgContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 200px;
  padding: 20px;
  margin: 40px 0;
`;
const PreImg = styled.img`
  height: 180px;
  width: 160px;
  margin: 10px 0;
`;

const UploadBtn = styled.button`
  border: solid 1px black;
  border-radius: 5px;
  padding: 5px;
  width: 90px;
  background-color: lightskyblue;
  font-size: 17px;
  margin: 10px 0;
`;

const Btn = styled.div`
  display: flex;
  padding: 15px 0;
  padding-left: 20px;
`;

const ImageUploader = (props) => {
  const [percent, setPercent] = useState(0);
  const [fileName, setFileName] = useState(null);
  const [imagesNames, setImagesNames] = useState([]);
  const inputRef = useRef();

  const handleUpload = () => {
    if (imagesNames.length === 3) {
      alert("ניתן לעלות עד 3 תמונות");
      setFileName(null);
      return;
    }

    uploadImage(fileName, setPercent, setImagesNames);
    setFileName(null);
  };

  const handleDelete = (imgName) => {
    if (imagesNames.length > 0) {
      deletImage(imgName, setImagesNames);
    }
  };

  const continued = () => {
    props.getImages(imagesNames);
  };

  return (
    <Fragment>
      <ImagesContainer type="button" onClick={() => inputRef.current.click()}>
        <input
          type="file"
          ref={inputRef}
          onChange={(e) => setFileName(e.currentTarget.files[0])}
          hidden
        />
        <MdCloudUpload color="#147cf" size={60} />
      </ImagesContainer>
      {fileName && (
        <PreImgContainer>
          <PreImg
            src={
              typeof value === "string"
                ? fileName
                : URL.createObjectURL(fileName)
            }
            alt="file"
          />
          <p>{percent} "%"</p>
          {fileName && <UploadBtn onClick={handleUpload}>העלה</UploadBtn>}
        </PreImgContainer>
      )}

      <ImagesList>
        {imagesNames.length > 0 &&
          imagesNames.map((img) => {
            return (
              <ImageItem key={uuid()}>
                <img
                  src={img}
                  style={{ width: "100px", height: "100px" }}
                  alt="file"
                />
                <FontAwesomeIcon
                  icon={faTrashCan}
                  style={{ cursor: "pointer" }}
                  onClick={() => handleDelete(img)}
                />
              </ImageItem>
            );
          })}
      </ImagesList>
      <Btn>
        <Button
          type="button"
          theme="uploadForm"
          text="המשך"
          onClick={continued}
        />
      </Btn>
    </Fragment>
  );
};

export default ImageUploader;
