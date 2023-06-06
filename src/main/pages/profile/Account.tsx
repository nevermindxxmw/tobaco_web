import React, { useEffect, useState } from "react";
import useUserEdit from "../../../api/user/useUserEdit";
import styled, { createGlobalStyle } from "styled-components";
import TopBar from "../home/topbar/TopBar";
import useUserInfo from "../../../api/user/useUserInfo";

const GlobalStyle = createGlobalStyle`
  body {
    color: black;
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
    background-color: #f0f0f0 ;
  }
`;

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  position: absolute;
  width: 25%;
  height: 60%;

  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #393e46;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
`;

const Title = styled.h1`
  font-size: 24px;
  margin-bottom: 40px;
  text-align: center;
  padding-top: 15px;
  height: 50px;
  color: white;
  width: 100%;

  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
`;
const List = styled.ul`
  width: 100%;
  height: 100%;
  list-style: none;
  text-align: center;
  padding: 0;
  margin-top: 50px;
  color: white;
`;

const ListItem = styled.li`
  margin-bottom: 20px;
  color: white;
`;

const Item = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  padding: 10px;
`;

const Label = styled.label`
  text-align: right;
  margin-right: 10px;
  padding-top: 10px;
  color: white;
`;

const Input = styled.input`
  font-size: 16px;
  flex: 1;
  padding: 8px;
  width: 100%;
  height: 100%;
`;
const Button = styled.button`
  background: #00adb5;
  border-radius: 10px;
  border: none;
  color: #fff;
  background-color: #393e46;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  cursor: pointer;
  /* margin-top: 20px; */
  font-size: 18px;
  margin-left: 30%;
  transition: all 0.3s linear;

  &:hover {
    opacity: 0.8;
  }
`;

type UserData = {
  id: number;
  firstName: string;
  surName: string;
  lastName: string;
  bonus: number;
  phone: string;
  password: string;
};

const Account = () => {
  const [user, setUser] = useState<UserData>({
    id: 0,
    firstName: "",
    surName: "",
    lastName: "",
    bonus: 0,
    phone: "",
    password: "",
  });

  const { data: userData } = useUserInfo();

  useEffect(() => {
    if (userData) {
      setUser(userData);
    }
  }, [userData]);
  const userAuthMutation = useUserEdit();

  const handleShowData = () => {
    console.log("edited");

    const token = userAuthMutation.mutateAsync({
      phone: user.phone,
      password: user.password,
      firstName: user.firstName,
      surName: user.surName,
      lastName: user.lastName,
    });
    window.localStorage.setItem("userData", JSON.stringify(user));

    console.log(`Данные пользователя: ${user}`);
  };
  return (
    <>
      <GlobalStyle />
      <TopBar />
      <Container>
        <Title>Личный кабинет</Title>
        <List>
          {user && (
            <ListItem>
              <form>
                <Item>
                  <Label>Имя:</Label>
                  <Input
                    value={user.firstName}
                    onChange={(e) =>
                      setUser({ ...user, firstName: e.target.value })
                    }
                  />
                </Item>
                <Item>
                  <Label>Фамилия:</Label>
                  <Input
                    value={user.surName}
                    onChange={(e) =>
                      setUser({ ...user, surName: e.target.value })
                    }
                  />
                </Item>
                <Item>
                  <Label>Отчество:</Label>
                  <Input
                    value={user.lastName}
                    onChange={(e) =>
                      setUser({ ...user, lastName: e.target.value })
                    }
                  />
                </Item>
                <Item>
                  <Label>Телефон:</Label>
                  <Input
                    value={user.phone}
                    onChange={(e) =>
                      setUser({ ...user, phone: e.target.value })
                    }
                  />
                </Item>
                <Item>
                  <Label>Пароль:</Label>
                  <Input
                    value={user.password}
                    onChange={(e) =>
                      setUser({ ...user, password: e.target.value })
                    }
                  />
                </Item>
                <Item>
                  <Label>Бонусы:</Label>
                  <Input
                    value={user.bonus}
                    onChange={(e) => alert("Нельзя так")}
                  />
                </Item>
              </form>
            </ListItem>
          )}
        </List>
        <Button onClick={handleShowData}>Обновить</Button>
      </Container>
    </>
  );
};
export default Account;
