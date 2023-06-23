import { Send } from "@mui/icons-material";
import styled from "styled-components";
import { css } from "styled-components";

const mobile = (props) => {
  return css`
    @media only screen and (max-width: 380px) {
      ${props}
    }
  `;
};
const Container = styled.div`
  height: 60vh;
  background-color: whitesmoke;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  @media (min-width: 368px) {
    height: 30vh;
    justify-content: center;
    align-items: center;
  }
`;
const Title = styled.h1`
  font-size: 70px;
  margin-bottom: 20px;

  @media (min-width: 368px) {
    text-align: center;
    font-size: 60px;
  }
`;

const Desc = styled.div`
  font-size: 24px;
  font-weight: 300;
  margin-bottom: 20px;
  ${mobile({ textAlign: "center" })}
`;

const InputContainer = styled.div`
  width: 50%;
  height: 40px;
  background-color: white;
  display: flex;
  justify-content: space-between;
  border: 1px solid light;
  ${mobile({ width: "80%" })}
`;

const Input = styled.input`
  border: none;
  text-align: right;
  flex: 8;
  padding-left: 20px;
`;

const Button = styled.button`
  flex: 1;
  border: none;
  background-color: teal;
  color: white;
`;

const Newsletter = () => {
  return (
    <Container>
      <Title>הישאר מעודכן</Title>
      <Desc>קבל עדכונים בזמן על מוצרים חדשים</Desc>
      <InputContainer>
        <Input placeholder="Your email" />
        <Button>
          <Send />
        </Button>
      </InputContainer>
    </Container>
  );
};

export default Newsletter;
