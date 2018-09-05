import styled from 'styled-components';

const GlobalStyles = styled.div`
  
.app-loader {
  padding-top: 4 * ${props => props.theme.base.paddingRem}rem;
}

img {
  max-width: 100%;
}

a {
  color: ${props => props.theme.colors.blackColor};
}

`;

export default GlobalStyles;
