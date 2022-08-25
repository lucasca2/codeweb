import styled from "styled-components";

export const Wrapper = styled.div`
  gap: ${(p) => p.theme.spacing.small};
  padding: ${(p) => p.theme.spacing.small};
  display: flex;
`;

type TWrapperTab = {
  isSelected: boolean;
};

export const WrapperTab = styled.div<TWrapperTab>`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;

  font-size: ${(p) => p.theme.fontSizes.regular};
  padding: ${(p) => p.theme.spacing.small} ${(p) => p.theme.spacing.medium};
  gap: ${(p) => p.theme.spacing.medium};
  border-radius: ${(p) => p.theme.spacing.xSmall};
  background-color: ${(p) => p.theme.colors.tertiary};

  opacity: ${(p) => (p.isSelected ? 1 : 0.5)};

  transition: opacity 0.3s;

  &:hover {
    opacity: ${(p) => (p.isSelected ? 1 : 0.45)};
  }

  & > svg {
    cursor: pointer;
    color: ${(p) => p.theme.colors.error};
    transition: opacity 0.3s;

    &:hover {
      opacity: 0.5;
    }
  }
`;
