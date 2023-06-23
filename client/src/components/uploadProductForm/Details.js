import React from "react";
import styled from "styled-components";
import FormInputs from "./../formInput/FormInput";
import { useFormik } from "formik";
import * as yup from "yup";
import Button from "./../button/Button";

const Container = styled.div``;

const InputsGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  justify-content: center;
  align-items: center;
  justify-content: space-between;
  justify-content: space-evenly;
  justify-content: space-around;
  padding: 0 47px;
`;

const OptionGroup = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  margin-bottom: 20px;
  ${({ active }) =>
    active &&
    `
    flex-direction: column;
  `}
  @media (min-width: 568px) {
    flex-direction: row;
    justify-content: space-between;
  }
`;
const Select = styled.select`
  font-size: 0.9rem;
  padding: 9px 8px;
  margin-bottom: 15px;
  text-align: right;
  margin-left: 53px;
  border: 1px solid black;
  @media (min-width: 568px) {
    width: 64%;
    margin-top: 20px;
    margin-left: 0;
  }
`;
const Option = styled.option`
  border-radius: 0;
`;

const Description = styled.textarea`
  border: 1px solid black;
  text-align: right;
`;

const Btn = styled.div`
  display: flex;
  padding: 15px 0;
  padding-left: 20px;
`;
const validationSchema = yup.object({
  title: yup.string().required("נדרש למלא שם"),
  model: yup.string().required("נדרש למלא שם היצרן"),
  speed: yup.number().required("נדרש למלא מהירות"),
  battery: yup.number().required("נדרש למלא וואט"),
  helmet: yup.boolean().default(false),
  electric: yup.boolean().default(false),
  description: yup.string(),
});

const Details = (props) => {
  const onSubmit = (values) => {
    if (formik.values.title === "") {
      return;
    }
    props.detailsValues(values);
  };

  const formik = useFormik({
    initialValues: {
      title: "",
      model: "",
      speed: "",
      battery: "",
      helmet: false,
      electric: false,
      description: "",
    },
    validateOnBlur: true,
    onSubmit,
    validationSchema: validationSchema,
  });

  const errors = formik.errors;

  return (
    <Container>
      <InputsGroup>
        <FormInputs
          value={formik.values.title}
          label="כותרת *"
          type="text"
          placeholder="הכנס שם"
          name="title"
          onChange={formik.handleChange}
          small={formik.touched.title && errors.title ? errors.title : null}
        />
        <FormInputs
          value={formik.values.model}
          label="יצרן"
          type="text"
          placeholder="הכנס את שם היצרן"
          name="model"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          small={formik.touched.model && errors.model ? errors.model : null}
        />
        <FormInputs
          value={formik.values.speed}
          label="מהירות"
          type="number"
          placeholder='ק"מ'
          name="speed"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          small={formik.touched.speed && errors.speed ? errors.speed : null}
        />
        <FormInputs
          value={formik.values.battery}
          label="סוללה"
          type="number"
          placeholder="וואט"
          name="battery"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          small={
            formik.touched.battery && errors.battery ? errors.battery : null
          }
        />
        <OptionGroup>
          <Select
            name="helmet"
            value={formik.values.helmet}
            onChange={formik.handleChange}
          >
            <Option defaultValue={false} value={false}>
              אין
            </Option>
            <Option value={true}>יש</Option>
          </Select>
          <h5>:קסדה</h5>
          <Select
            name="electric"
            value={formik.values.electric}
            onChange={formik.handleChange}
          >
            <Option defaultValue={false} value={false}>
              לא
            </Option>
            <Option value={true}>כן</Option>
          </Select>
          <h5>:חשמלי</h5>
        </OptionGroup>
        <Description
          rows="5"
          cols="30"
          name="description"
          onChange={formik.handleChange}
          value={formik.values.description}
          placeholder="תיאור של המוצר..."
        ></Description>
      </InputsGroup>
      <h6>שדות שמסומנים בכוכבית הם חובה*</h6>
      <Btn>
        <Button
          theme="uploadForm"
          type="button"
          onClick={formik.handleSubmit}
          text="המשך"
        />
      </Btn>
    </Container>
  );
};

export default Details;
