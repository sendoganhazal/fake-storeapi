// components/atoms/StyledButton.tsx
'use client';

import styled from 'styled-components';
import { Button } from 'primereact/button';

/**
 * PrimeReact Button bileşenini stilize eden atomik bir bileşen.
 * Tailwind CSS sınıfları ve Styled Components ile responsive tasarım sağlar.
 */
const StyledButton = styled(Button)`
  border-radius: 0.5rem;
  font-weight: 600;
  transition: all 0.2s ease-in-out;
  padding: 0.75rem 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem; 

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Hafif gölge */
  }

  /* Button States */
  &.p-button-primary {
    background-color: var(--primary-color, #3064E8);
    border-color: var(--primary-color, #3064E8);
    color: var(--primary-color-text, #ffffff);
  }

  &.p-button-success {
    background-color: var(--success, #27AE60);
    border-color: var(--success, #27AE60);
    color: var(--primary-color-text, #ffffff);
  }

  &.p-button-danger {
    background-color: var(--error, #EB5757);
    border-color: var(--error, #EB5757);
    color: var(--primary-color-text, #ffffff);
  }

  @media (max-width: 768px) {
    width: 100%;
    padding: 0.6rem 1rem;
    font-size: 0.9rem;
  }
`;

export default StyledButton;
