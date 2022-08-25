import styled from "styled-components";

export const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1;
`;

export const Wrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: ${(p) => p.theme.colors.secondaryLight};
  border-radius: ${(p) => p.theme.spacing.xSmall};
  padding: ${(p) => p.theme.spacing.large};
  gap: ${(p) => p.theme.spacing.medium};
  border: 1px solid #1f2933;

  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

export const Title = styled.div`
  font-size: ${(p) => p.theme.fontSizes.titleSecondary};
`;

export const Message = styled.div`
  align-self: center;
  font-size: ${(p) => p.theme.fontSizes.regular};
  padding: 0 ${(p) => p.theme.spacing.xLarge};
  text-align: center;
`;

export const Error = styled.span`
  color: ${(p) => p.theme.colors.error};
  font-size: ${(p) => p.theme.fontSizes.small};
`;

export const Input = styled.input`
  font-size: ${(p) => p.theme.fontSizes.regular};
  outline: none;
  border: none;
  width: 100%;
  padding: ${(p) => p.theme.spacing.small};
  color: ${(p) => p.theme.colors.textLight};
  background-color: ${(p) => p.theme.colors.input};
  border-radius: ${(p) => p.theme.spacing.xxSmall};

  ::placeholder {
    color: ${(p) => p.theme.colors.placeholder};
    opacity: 1;
  }

  :-ms-input-placeholder {
    /* Internet Explorer 10-11 */
    color: ${(p) => p.theme.colors.placeholder};
  }

  ::-ms-input-placeholder {
    /* Microsoft Edge */
    color: ${(p) => p.theme.colors.placeholder};
  }
`;

export const WrapperButtons = styled.div`
  display: flex;
  width: 100%;
  gap: ${(p) => p.theme.spacing.medium};
  align-items: center;
`;

export const Button = styled.button`
  flex: 1;
  cursor: pointer;
  border: none;
  align-self: flex-end;
  font-size: ${(p) => p.theme.fontSizes.regular};
  padding: ${(p) => p.theme.spacing.small};
  color: ${(p) => p.theme.colors.textLight};
  border-radius: ${(p) => p.theme.spacing.xxSmall};

  &:first-child {
    background-color: ${(p) => p.theme.colors.errorLight};
    color: ${(p) => p.theme.colors.error};
  }

  &:last-child {
    background-color: ${(p) => p.theme.colors.primary};
    color: ${(p) => p.theme.colors.textLight};
  }

  transition: opacity 0.3s;

  &:hover {
    opacity: 0.75;
  }
`;
