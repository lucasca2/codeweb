import styled from "styled-components";

export const Wrapper = styled.div`
  width: 100%;
  background-color: ${(p) => p.theme.colors.tertiaryDark};
  border-bottom: 1px solid #242e394a;
  position: sticky;
  top: 0;
  left: 0;
  right: 0;
  padding: ${(p) => p.theme.spacing.small} 0;
`;

export const Action = styled.div`
  cursor: pointer;
  padding: ${(p) => p.theme.spacing.small} ${(p) => p.theme.spacing.medium};
  font-size: ${(p) => p.theme.fontSizes.regular};
  font-weight: 600;

  display: flex;
  align-items: center;
  gap: ${(p) => p.theme.spacing.small};

  transition: background-color 0.3s;

  &:hover {
    background-color: ${(p) => p.theme.colors.secondary};
  }

  &:not(:last-child) {
    border-bottom: 1px solid #242e394a;
  }
`;

export const WrapperIcon = styled.div`
  width: 26px;
  height: 26px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${(p) => p.theme.colors.background};
  padding: 4px;
  border-radius: 100%;
`;
