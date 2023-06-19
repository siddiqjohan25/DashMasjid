import React, { useState } from "react";
import styled, { keyframes } from "styled-components";

const slideDown = keyframes`
  from {
    transform: translateY(-100%);
  }
  
  to {
    transform: translateY(0);
  }
`;

const ModalContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  opacity: ${(props) => (props.isOpen ? 1 : 0)};
  visibility: ${(props) => (props.isOpen ? "visible" : "hidden")};
  transition: opacity 0.3s ease-in-out;
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
`;

const Content = styled.div`
  background-color: #fff;
  padding: 2rem;
  max-width: 500px;
  border-radius: 10px;
  z-index: 1000;
  opacity: ${(props) => (props.isOpen ? 1 : 0)};
  animation: ${(props) => (props.isOpen ? slideDown : "")} 0.3s ease-in-out;
`;

const Title = styled.h2`
  margin-bottom: 1rem;
  color: #4c51bf;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Input = styled.input`
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
`;

const Select = styled.select`
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
`;

const Button = styled.button`
  padding: 0.5rem 1rem;
  background-color: #4c51bf;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  /* Apply the specified class name */
  &.custom-button {
    /* Add the styles from the class name */
    width: 100%;
    font-weight: 800;
    letter-spacing: 0.1em;
    color: #fff;
    background-image: linear-gradient(to bottom right, #4c51bf, #4299e1);
    &:hover {
      background-image: linear-gradient(to bottom left, #4c51bf, #4299e1);
    }
    &:focus {
      ring-width: 4px;
      outline: none;
      ring-color: #90cdf4;
    }
    box-shadow: 0 10px 25px -5px rgba(76, 81, 191, 0.5),
      0 5px 10px -5px rgba(76, 81, 191, 0.3);
    &:hover,
    &:focus {
      box-shadow: 0 15px 30px -5px rgba(76, 81, 191, 0.5),
        0 10px 20px -5px rgba(76, 81, 191, 0.3);
    }
    &:active {
      box-shadow: 0 5px 10px -5px rgba(76, 81, 191, 0.5),
        0 2px 5px -5px rgba(76, 81, 191, 0.3);
      transform: translateY(2px);
    }
    &.dark-mode {
      box-shadow: 0 10px 25px -5px rgba(76, 81, 191, 0.8),
        0 5px 10px -5px rgba(76, 81, 191, 0.6);
      &:hover,
      &:focus {
        box-shadow: 0 15px 30px -5px rgba(76, 81, 191, 0.8),
          0 10px 20px -5px rgba(76, 81, 191, 0.6);
      }
    }
    border-radius: 4px;
    font-size: 14px;
  }
`;

const StyledTitle = styled.h2`
  margin-bottom: 1rem;
  color: #4c51bf;
  font-size: 24px;
  font-weight: bold;
  text-align: center;
`;

const Modal = ({ isOpen, onClose, onSubmit, buttonName }) => {
  const [selectedWeek, setSelectedWeek] = useState("");
  const [inputValue, setInputValue] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(selectedWeek, inputValue);
  };

  return (
    <ModalContainer isOpen={isOpen}>
      <Overlay onClick={onClose} />
      <Content isOpen={isOpen}>
        <StyledTitle>{buttonName}</StyledTitle>
        <Form onSubmit={handleSubmit}>
          <Select
            value={selectedWeek}
            onChange={(event) => setSelectedWeek(event.target.value)}
          >
            <option value="">Select Week</option>
            <option value="Week 1">Week 1</option>
            <option value="Week 2">Week 2</option>
            <option value="Week 3">Week 3</option>
            <option value="Week 4">Week 4</option>
          </Select>
          <Input
            type="text"
            value={inputValue}
            onChange={(event) => setInputValue(event.target.value)}
            placeholder="Enter value"
          />
          <Button className="custom-button" type="submit">Submit</Button>
        </Form>
      </Content>
    </ModalContainer>
  );
};

export default Modal;
