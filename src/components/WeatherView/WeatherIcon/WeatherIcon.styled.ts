import styled from "styled-components";

type ContainerProps = {
  $top: number;
  $left: number;
};

export const Container = styled.div<ContainerProps>`
  width: 50px;
  height: 50px;
  padding: 0;
  margin-top: ${(props) => props.$top}px;
  margin-left: ${(props) => props.$left}px;
  & svg {
    stroke: ${({ theme }) => theme.text.color.xsubtle};
  }
  & g > path {
    stroke: ${({ theme }) => theme.text.color.xsubtle};
    fill: ${({ theme }) => theme.text.color.xsubtle};
  }
  & path {
    stroke: ${({ theme }) => theme.text.color.xsubtle};
    fill: ${({ theme }) => theme.text.color.xsubtle};
  }
`;
