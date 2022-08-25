import styled, { css } from "styled-components";

export const Wrapper = styled.div`
  flex: 1;
  flex-shrink: 0;
  background-color: #3d4b56;

  display: flex;
  align-items: flex-start;
  justify-content: flex-start;

  & > div {
    margin-left: -12px;
  }
`;

type TContextMenuWrapper = {
  isVisible?: boolean;
  x?: string;
  y?: string;
  revert?: boolean;
};

export const ContextMenuWrapper = styled.div<TContextMenuWrapper>`
  z-index: 1;
  position: absolute;
  top: ${(p) => p.y};
  left: ${(p) => p.x};
  background-color: #24303c;
  opacity: ${(p) => (p.isVisible ? 1 : 0)};
  padding: ${(p) => p.theme.spacing.xSmall};

  ${(p) =>
    !p.isVisible &&
    css`
      pointer-events: none;
    `}
  ${(p) =>
    p.revert &&
    css`
      transform: translateY(-100%);
    `}
`;

export const ContextMenuOption = styled.div`
  white-space: nowrap;
  padding: ${(p) => p.theme.spacing.small} ${(p) => p.theme.spacing.large};
  font-size: ${(p) => p.theme.fontSizes.regular};

  &:hover {
    background-color: #537cd6;
    color: #fff;
  }
`;

export const FolderWrapper = styled.div`
  padding-left: 24px;
  position: relative;
  flex: 1;

  &::after {
    content: "";
    background-color: #727e8a;
    width: 1px;
    position: absolute;
    top: 32px;
    bottom: 6px;
    left: 23px;
  }
`;

type TFolderLabel = {
  isSelected?: boolean;
};

export const FolderLabel = styled.div<TFolderLabel>`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-wrap: nowrap;

  cursor: pointer;
  user-select: none;

  transition: color 0.3s, background-color 0.3s;
  margin-left: -12px;
  padding-right: 24px;

  &:hover {
    color: #fff;
  }

  ${(p) =>
    p.isSelected &&
    css`
      background-color: #537cd6;
      color: #fff;
    `}
`;

export const WrapperIcon = styled.div`
  width: 24px;
  height: 24px;
  flex-shrink: 0;

  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Label = styled.div`
  padding: ${(p) => p.theme.spacing.xSmall};
  white-space: nowrap;
`;
