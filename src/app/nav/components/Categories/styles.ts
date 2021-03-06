import styled from 'styled-components';

const CategoriesStyles = styled.div`

  .menu-list {
    padding: 0;
  }
  
  .title {
    text-transform: uppercase;
    font-weight: 700;
    padding: 0 16px;
    color: ${props => props.theme.colors.mainColor};
    height: ${props => props.theme.categories.menuHeightPx}px;
    line-height: ${props => props.theme.categories.menuHeightPx}px;
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
