import React from "react";
import { useState } from "react";
import styled from "styled-components";

const ModalContainer = styled.div`
  background-color: rgba(0, 0, 0, 0.6);
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
`;

const ModalContent = styled.div`
  background-color: #fff;
  border-radius: 5px;
  padding: 20px;
  color: #000;
  position: relative;

`;

const ModalCloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  width: 20px;
  height: 20px;
  background-color: #fff;
  border: none;
  cursor: pointer;
  &:before {
    content: "X";
    font-size: 16px;
    font-weight: bold;
    color: black;
  }
`;

const ModalMessage = styled.h2`
  text-align: center;
  margin-top: 20px;
  font-size:20px ;
`;


type ModalProps = {
    isOpen: boolean;
    onClose: () => void;
  };
  
  const Modal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
    const handleCloseModal = () => {
      onClose();
    };
  
    return (
      <>
        {isOpen && (
          <ModalContainer>
            <ModalContent>
              <ModalCloseButton onClick={handleCloseModal}>X</ModalCloseButton>
              <ModalMessage>Заказ оформлен</ModalMessage>
            </ModalContent>
          </ModalContainer>
        )}
      </>
    );
  };
export default Modal;