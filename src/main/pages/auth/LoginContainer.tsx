import React, { useEffect, useState } from "react";
import AuthForm from "../auth/components/AuthForm";
import AuthFormContainer from "../auth/components/AuthFormContainer";
import InfoContainer from "../auth/components/InfoContainer";
import styled, { createGlobalStyle, css } from "styled-components";
import useUserAuth from "../../../api/user/useUserAuth";
import useUserRegistration from "../../../api/user/useUserRegistration";
import { useLocation, useNavigate } from "react-router-dom";
import AuthFormData from "./types";

interface LoginContainerProps {}

const Container = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: #f1f1f1;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  overflow: hidden;
  width: 768px;
  max-width: 100%;
  min-height: 520px;
  margin: 0 auto;
`;

const LoginContainer: React.FC<LoginContainerProps> = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoginFormOpen, setIsLoginFormOpen] = useState(true);

  const userRegistrationMutation = useUserRegistration();
  const userAuthMutation = useUserAuth();

  const handleFormToggle = () => {
    setIsLoginFormOpen((prevIsLoginFormOpen) => !prevIsLoginFormOpen);
  };

  const handleAuthSubmit = (formData: AuthFormData) => {
    userRegistrationMutation.mutateAsync(formData).then((data) => {
      window.localStorage.setItem("userData", JSON.stringify(data));
      window.location.href = "/";
      console.log("navigated");
    });
  };

  const handleLoginSubmit = (formData: AuthFormData) => {
    userAuthMutation.mutateAsync(formData).then((data) => {
      window.localStorage.setItem("userData", JSON.stringify(data));
      window.location.href = "/";
      console.log("navigated");
    });
  };

  useEffect(() => {
    console.log("isLoginFormOpen:", isLoginFormOpen);
    console.log("location:", location);
  }, [isLoginFormOpen, location]);

  return (
    <Container>
      {isLoginFormOpen ? (
        <AuthFormContainer isLoginFormOpen={isLoginFormOpen}>
          <AuthForm
            type="login"
            onSubmit={handleLoginSubmit}
            isLoginFormOpen={isLoginFormOpen}
            // hint: add 'formPosition' prop here if you'd like
          />
        </AuthFormContainer>
      ) : (
        <AuthFormContainer isLoginFormOpen={isLoginFormOpen}>
          <AuthForm
            type="register"
            onSubmit={handleAuthSubmit}
            formPosition="left"
            isLoginFormOpen={isLoginFormOpen}
          />
        </AuthFormContainer>
      )}
      <InfoContainer
        isLoginFormOpen={isLoginFormOpen}
        onButtonClick={handleFormToggle}
      />
    </Container>
    // </>
  );
};

export default LoginContainer;
