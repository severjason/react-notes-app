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

.ui.app-border-red {
  border: 1px solid ${props => props.theme.colors.redColor};
}


.ui.app-border-black {
  border: 1px solid ${props => props.theme.colors.blackColor};
}

.ui.app-border-green {
  border: 1px solid ${props => props.theme.colors.greenColor};
}

.ui.app-border-blue {
  border: 1px solid ${props => props.theme.colors.blueColor};
}

.ui.app-border-violet {
  border: 1px solid ${props => props.theme.colors.violetColor};
}

.ui.app-border-teal {
  border: 1px solid ${props => props.theme.colors.tealColor};
}

.ui.app-border-purple {
  border: 1px solid ${props => props.theme.colors.purpleColor};
}

.ui.app-border-brown {
  border: 1px solid ${props => props.theme.colors.brownColor};
}

.ui.app-border-orange {
  border: 1px solid ${props => props.theme.colors.orangeColor};
}

.ui.app-border-pink {
  border: 1px solid ${props => props.theme.colors.pinkColor};
}


`;

export default GlobalStyles;
