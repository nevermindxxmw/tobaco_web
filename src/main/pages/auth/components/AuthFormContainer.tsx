import styled, { css } from "styled-components";

interface AuthFormContainerProps {
  isLoginFormOpen: boolean;
}

const AuthFormContainer = styled.div<AuthFormContainerProps>`
  position: absolute;
  top: 0;
  left: 0;
  width: 50%;
  height: 100%;
  align-items: center;
  transition: transform 0.5s;

  ${({ isLoginFormOpen }) =>
    isLoginFormOpen
      ? css`
          transform: scaleX(1);
        `
      : css`
          transform: scaleX(-1);
        `}
`;

export default AuthFormContainer;