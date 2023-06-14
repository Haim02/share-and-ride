import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";
import { faCaretUp, faCaretDown } from "@fortawesome/free-solid-svg-icons";

const SortContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0 0 10px;
  position: relative;
  z-index: 200;
`;

const Wrap = styled.div`
  font: inherit;
  line-height: 16px;
  color: #363636;
  direction: rtl;
  -webkit-tap-highlight-color: transparent;
  text-align: right;
  font-size: 0;
  font-family: Rubik, sans-serif;
  box-sizing: inherit;
  position: relative;
`;

const Icon = styled.span`
  position: absolute;
  left: 5px;
  top: 50%;
  padding-left: 10px;
`;

const Label = styled.label`
  font-size: 0.875rem;
  line-height: 1.0625rem;
  vertical-align: middle;
  display: inline-block;
  margin-left: 5px;
`;

const OptionsBtn = styled.div`
  padding-left: 26px;
  min-width: 190px;
  text-align: right;
  border: none;
`;

const DropButton = styled.button`
  padding-left: 26px;
  min-width: 170px;
  text-align: right;
  border: 1px solid black;
  display: block;
  padding: 15px;
`;

const DropBox = styled.div`
  display: block;
  left: 40.5%;
  background-color: white;
  ${({ display }) =>
    display &&
    `
    display: none;
  `}
`;

const Line = styled.div`
  cursor: pointer;
  width: 100%;
  position: relative;
`;

const RadioLabelChecked = styled.label`
  display: inline-block;
  vertical-align: middle;
  height: auto;
  width: calc(100% - 30px);
  padding: 2px 5px;
  word-wrap: normal;
  max-width: calc(100% - 30px);
  min-height: 20px;
  line-height: 20px;
  cursor: pointer;
`;

const RadioInput = styled.input``;

const SortOption = styled.span`
  font-size: 0.875rem;
  line-height: 1.0625rem;
`;

const Sorting = (props) => {
  const [sortBy, setSortBy] = useState(null);
  const [isDisplayStateOpen, setIsDisplayStateOpen] = useState(false);

  const toggleStartDisplayOpen = () => {
    setIsDisplayStateOpen(!isDisplayStateOpen);
  };

  const handleSortBy = (e) => {
    const sort = e.target.value;
    setSortBy(sort);
    setIsDisplayStateOpen(false);
    props.getSort(sort);
  };

  let sortByValue =
    sortBy === "createdAt"
      ? "לפי תאריך"
      : sortBy === "dailyPrice"
      ? "לפי מחיר לשעה (מהנמוך לגבוה)"
      : "לפי מחיר ליום (מהנמוך לגבוה)";

  return (
    <SortContainer>
      <Wrap>
        <Label>
          מיין לפי
          <DropButton>
            <OptionsBtn type="button" onClick={toggleStartDisplayOpen}>
              {sortByValue}
              <Icon type="button" onClick={toggleStartDisplayOpen}>
                <FontAwesomeIcon
                  icon={isDisplayStateOpen ? faCaretUp : faCaretDown}
                />
              </Icon>
            </OptionsBtn>
          </DropButton>
        </Label>
        {isDisplayStateOpen && (
          <DropBox onChange={handleSortBy}>
            <Line>
              <RadioLabelChecked>
                <RadioInput
                  name="filter-list"
                  type="radio"
                  value="dailyPrice"
                />
                <SortOption>לפי מחיר לשעה (מהנמוך לגבוה)</SortOption>
              </RadioLabelChecked>
            </Line>
            <Line>
              <RadioLabelChecked>
                <RadioInput name="filter-list" type="radio" value="hourPrice" />
                <SortOption>לפי מחיר ליום (מהנמוך לגבוה)</SortOption>
              </RadioLabelChecked>
            </Line>
          </DropBox>
        )}
      </Wrap>
    </SortContainer>
  );
};

export default Sorting;
