import styled from 'styled-components';

const NavBarStyles = styled.div`
.app-bar {

  & > div {
    padding: 0 .5rem;
  }
  .header-title {
    padding: .5rem;
  }
    &.opened {
      margin-left: ${props => props.theme.drawer.widthRem}rem;
      width: calc(100% - ${props => props.theme.drawer.widthRem}rem);
    }
    transition: margin-left ease-out 220ms;
  }
 
  .hidden {
    display: none;
  }
  
  @media all and (max-width: ${props => props.theme.media.mobileMaxWidthPx}px) {
  .app-bar {
    &.opened {
      margin-left: 0;
      width: 100%;
    }
  }
  }
`;

export default NavBarStyles;
