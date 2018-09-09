import styled from 'styled-components';

const CategoriesStyles = styled.div`

  .menu-list {
    padding: 0;
  }
  
  .categories-menu {
    display: none;
    &.expanded {
      display: flex;
    }
  }
  
  @media all and (max-width: ${props => props.theme.media.mobileMaxWidthPx}px) {
    .categories-menu {
      ul {
        width: 100%;
      }
    }
  }
`;

export default CategoriesStyles;
