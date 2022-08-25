import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  height: 100vh;
`;

export const WrapperFileEditor = styled.div`
  flex: 1;

  display: flex;
  flex-direction: column;
`;

export const WrapperFileTree = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  background-color: #3d4b56;
  width: 250px;
  overflow: auto;
`;
