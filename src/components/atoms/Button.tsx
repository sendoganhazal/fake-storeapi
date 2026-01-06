"use client";
import styled from "styled-components";

const Button = styled.button`
  padding: 0.9375rem;
  border: none;
  background: #14b8a6;
  color: #fff;
  cursor: pointer;
  font-size:0.875rem;
  font-weight:500;
  border-radius: 10px;
  display:block;

  &:disabled {
    opacity: 0.5;
  }
  &:hover {
  background: #0d9488;
  }
  &:focus {

  background: #0c5d56;
  }
`;

export default Button;
