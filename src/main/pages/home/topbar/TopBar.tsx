import styled from "styled-components";
import React, { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import useProductCategories from "../../../../api/product/useProductCategories";

const TopBarContainer = styled.div`
  background-color: #393e46;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  width: 100%;
  height: 60px;
  display: flex;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10;
`;
const ProfileImage = styled.img`
  padding-top: 10px;
  width: 40px;
  height: 40px;
  color: white;
  margin-left: 30px;
`;

const CategoryButton = styled.button`
  margin-left: 30px;
  background-color: transparent;
  color: white;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  margin-top: 10px;
  cursor: pointer;
  font-size: 16px;
  :hover {
    text-decoration: underline;
  }
`;

const LogoutButton = styled.button`
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  width: 90px;
  height: 40px;
  text-align: center;
  right: 20px;
  position:fixed ;
  margin-top: 10px;
  background-color: #393e46;
`;

const TopBar = () => {
  const { data } = useProductCategories();
  console.log(data);

  const navigation = useNavigate();

  if (!data) {
    return null;
  }

  const handleOnClick = () => {
    console.log("log out");
    navigation("/login");
    window.localStorage.setItem("userData", " ");
  };

  return (
    <TopBarContainer>
      <Link to="/account">
        <ProfileImage src="profile.svg " alt="profile" />
      </Link>
      {data.map((category) => (
        <Link
          key={category.id}
          to={`/${category.name}`}
          state={{ some: "value" }}
        >
          <CategoryButton>{category.title}</CategoryButton>
        </Link>
      ))}
      <Link to="/basket">
        <ProfileImage src="shopping-cart.svg " alt="profile" />
      </Link>
      <LogoutButton onClick={handleOnClick}>Выйти</LogoutButton>
    </TopBarContainer>
  );
};

export default TopBar;
