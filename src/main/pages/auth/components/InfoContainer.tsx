import React from "react";
import styled from "styled-components";

interface InfoContainerProps {
  isLoginFormOpen: boolean;
  onButtonClick: () => void;
}

const Container = styled.div`
  background-color: #393e46;
  position: absolute;
  top: 0;
  right: 0;
  width: 50%;
  height: 100%;
  align-items: center;
`;

const Heading = styled.h2`
  margin-left: 10%;
  color: white;
`;

const Paragraph = styled.p`
  color: white;
  margin-left: 10%;
  margin-bottom: 24px;
`;

const Button = styled.button`
  position: absolute;
  display: flex;
  padding: 12px 24px;
  background-color: #ffffff;
  color: #000000;
  border: 1px solid #ffffff;
  border-radius: 30px;
  font-size: 18px;
  width: 150px;
  margin-left: 30%;
  margin-top: 250px;
  justify-content: center;
  cursor: pointer;
`;

const InfoContainer: React.FC<InfoContainerProps> = ({
  isLoginFormOpen,
  onButtonClick,
}) => {
  return (
    <Container>
      <Heading>
        {isLoginFormOpen ? "Добро пожаловать!" : "Создать аккаунт"}
      </Heading>
      <Paragraph>
        {isLoginFormOpen
          ? "Вход только для взрослых! Авторизуйтесь, чтобы продолжить."
          : "Присоединяйтесь к нам и наслаждайтесь покупками табачных изделий!"}
      </Paragraph>
      <Button onClick={onButtonClick}>
        {isLoginFormOpen ? "Создать аккаунт" : "Войти"}
      </Button>
    </Container>
  );
};

export default InfoContainer;
