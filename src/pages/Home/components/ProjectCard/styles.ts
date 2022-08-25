import styled from "styled-components";

export const Wrapper = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: nowrap;
  padding: ${(p) => p.theme.spacing.large};
  border: 1px solid ${(p) => p.theme.colors.tertiary};
  border-radius: ${(p) => p.theme.spacing.xSmall};

  width: 600px;

  transition: background-color 0.3s;

  &:hover {
    background-color: ${(p) => p.theme.colors.tertiary};
  }
`;

export const WrapperLabel = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: nowrap;
  font-size: ${(p) => p.theme.fontSizes.large};
  gap: ${(p) => p.theme.spacing.small};
`;

export const RemoveButton = styled.button`
  cursor: pointer;
  border: none;
  outline: none;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${(p) => p.theme.spacing.small};
  padding: ${(p) => p.theme.spacing.xSmall} ${(p) => p.theme.spacing.small};
  font-size: ${(p) => p.theme.fontSizes.small};

  color: ${(p) => p.theme.colors.error};
  background-color: ${(p) => p.theme.colors.errorLight};

  transition: opacity 0.3s;

  &:hover {
    opacity: 0.75;
  }
`;
