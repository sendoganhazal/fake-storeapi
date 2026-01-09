"use client";

import styled from "styled-components";

const Backdrop = styled.div<{ $isOpen: boolean }>`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  opacity: ${({ $isOpen }) => ($isOpen ? 1 : 0)};
  pointer-events: ${({ $isOpen }) => ($isOpen ? "auto" : "none")};
  transition: opacity 0.25s ease;
  z-index: 40;
`;

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export default function Overlay({ isOpen, onClose }: Props) {
  return <Backdrop $isOpen={isOpen} onClick={onClose} />;
}
