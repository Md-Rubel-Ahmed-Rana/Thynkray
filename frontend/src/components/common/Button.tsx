import styled from "styled-components";

const Button = styled.button`
  padding: 10px 20px;
  background-color: ${({ theme }) => theme.colors.primary};
  border: none;
  color: white;
  border-radius: 8px;
  transition: background 0.3s ease;

  &:hover {
    background-color: #005bb5;
  }
`;

export default Button;
