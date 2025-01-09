import styled from "styled-components";

type ContainerProps = {
  $offset: number;
};

export const Container = styled.div<ContainerProps>`
  display: flex;
  align-items: flex-start;
  color: ${(props) => props.theme.text.color.normal};
  padding-top: ${({ $offset }) => $offset}px;
  width: 100%;
  height: 100%;
`;

export const CoverArtContainer = styled.div`
  display: flex;
  width: 55%;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  width: 45%;
  height: 40%;
  padding: 6px 0 0 20px;
`;

type ContentProps = {
  $large: boolean;
};

function adjust(large: boolean, size: number): number {
  if (large) {
    return size + 8;
  }
  return size;
}

export const Title = styled.div<ContentProps>`
  font-family: ${(props) => props.theme.text.family.heading};
  font-size: ${(props) =>
    adjust(props.$large, props.theme.text.size.heading)}px;
  line-height: ${(props) =>
    adjust(props.$large, props.theme.text.height.heading)}px;
  font-weight: ${(props) => props.theme.text.weight.heading};
  margin-bottom: 20px;
  width: 100%;
`;

export const Artist = styled.div<ContentProps>`
  font-family: ${(props) => props.theme.text.family.normal};
  font-size: ${(props) => adjust(props.$large, props.theme.text.size.normal)}px;
  line-height: ${(props) =>
    adjust(props.$large, props.theme.text.height.normal)}px;
  font-weight: ${(props) => props.theme.text.weight.bold};
  margin-bottom: 3px;
`;

export const Album = styled.div<ContentProps>`
  font-family: ${(props) => props.theme.text.family.normal};
  font-size: ${(props) => adjust(props.$large, props.theme.text.size.normal)}px;
  line-height: ${(props) =>
    adjust(props.$large, props.theme.text.height.normal)}px;
  font-weight: ${(props) => props.theme.text.weight.bold};
  color: ${(props) => props.theme.text.color.subtle};
`;

export const Controls = styled.div`
  display: flex;
  flex-grow: 1;
  align-items: flex-end;
  margin-top: 20px;
`;

export const ControlSpacer = styled.div`
  width: 10px;
`;
