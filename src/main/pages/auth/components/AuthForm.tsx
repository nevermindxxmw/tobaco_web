import styled, { css } from "styled-components";
import React, { useState } from "react";
import AuthFormData from '../types';

const Form = styled.form<FormProps>`
  margin-left: 20px;
  margin: 30px;
  padding: 30px;
  width: 70%;
  background-color: #ffffff;
  border-radius: 10px;

  ${({ formPosition }) =>
    formPosition === "right" &&
    css`
      transform: scaleX(-1);
    `}
`;

const Input = styled.input`
  display: block;
  width: 70%;
  padding: 10px;
  margin-bottom: 20px;
  border: 1px solid #333333;
  border-radius: 5px;
  color: #ffffff;
`;

const Title = styled.h2`
  margin-bottom: 20px;
  color: #333333;
`;

type AuthFormProps = {
  type: "login" | "register";
  onSubmit: (formData: AuthFormData) => void;
  formPosition?: "left" | "right";
  isLoginFormOpen: boolean;
};

type FormProps = {
  formPosition: "left" | "right";
};

const AuthForm: React.FC<AuthFormProps> = ({ type, onSubmit }) => {
  const [formData, setFormData] = useState<AuthFormData>({
    phone: "",
    password: "",
    firstName: "",
    surName: "",
    lastName: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [e.target.name]: e.target.value.trim(),
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      type === "login" ||
      formData.firstName ||
      formData.surName ||
      formData.lastName
    ) {
      onSubmit({
        phone: formData.phone,
        password: formData.password,
        firstName: formData.firstName,
        surName: formData.surName,
        lastName: formData.lastName
      });
    }
  };

  return (
    <Form
      formPosition={type === "login" ? "left" : "right"}
      onSubmit={handleSubmit}
    >
      <Title>{type === "login" ? "Войти" : "Создать акканут"}</Title>
      <div>
        <Input
          type="phone"
          name="phone"
          value={formData.phone}
          onChange={handleInputChange}
          placeholder="Номер телефона"
          required
        />
      </div>
      <div>
        <Input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleInputChange}
          placeholder="Пароль"
          minLength={6}
          required
        />
      </div>
      {type === "register" && (
        <>
          <div>
            <Input
              type="text"
              name="firstName"
              value={formData.firstName || ""}
              onChange={handleInputChange}
              placeholder="Имя"
            />
          </div>
          <div>
            <Input
              type="text"
              name="surName"
              value={formData.surName || ""}
              onChange={handleInputChange}
              placeholder="Фамилия"
            />
          </div>
          <div>
            <Input
              type="text"
              name="lastName"
              value={formData.lastName || ""}
              onChange={handleInputChange}
              placeholder="Отчество"
            />
          </div>
        </>
      )}
      <button type="submit">{type === "login" ? "Войти" : "Создать"}</button>
    </Form>
  );
};

export default AuthForm;
