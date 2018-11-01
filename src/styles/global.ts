import styled from 'styled-components';

const GlobalStyles = styled.div`

img {
  max-width: 100%;
}

a {
  color: ${props => props.theme.colors.blackColor};
}
`;

export default GlobalStyles;
