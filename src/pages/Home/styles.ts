import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  height: 100vh;
  flex-direction: column;
`;

export const WrapperSearch = styled.div`
  position: sticky;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  background-color: ${(p) => p.theme.colors.background};

  gap: ${(p) => p.theme.spacing.medium};

  padding: ${(p) => p.theme.spacing.giant};
`;

export const Input = styled.input`
  outline: none;
  width: 400px;
  border: none;
  padding: ${(p) => p.theme.spacing.medium};
  font-size: ${(p) => p.theme.fontSizes.large};

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

export const Button = styled.button`
  cursor: pointer;
  width: 400px;
  border: none;
  border-radius: ${(p) => p.theme.spacing.xxSmall};
  padding: ${(p) => p.theme.spacing.medium};
  color: ${(p) => p.theme.colors.textLight};
  background-color: ${(p) => p.theme.colors.primary};
  font-size: ${(p) => p.theme.fontSizes.large};

  transition: opacity 0.3s;

  &:hover {
    opacity: 0.75;
  }
`;

export const WrapperProjects = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;

  padding: ${(p) => p.theme.spacing.giant};
  gap: ${(p) => p.theme.spacing.large};
  background-color: ${(p) => p.theme.colors.tertiaryDark};
`;

export const WrapperNoProjectsFound = styled.span`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: ${(p) => p.theme.spacing.large};
`;
