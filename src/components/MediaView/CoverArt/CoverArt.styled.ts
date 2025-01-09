import styled from 'styled-components';

type ContainerProps = {
  $large: boolean;
};

export const Container = styled.div<ContainerProps>`
  display: flex;
  aspect-ratio: 1;
  ${({ $large }) => {
    if ($large) {
      return 'max-height: 60vh; max-width: 60vh;';
    }
    return 'max-height: 250px;';
  }}
  cursor: pointer;
`;
