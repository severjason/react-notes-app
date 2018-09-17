import styled from 'styled-components';

const CategoryItemStyles = styled.div`
  position: relative;
  width: ${props => props.theme.drawer.widthRem}rem;
 
  .category-menu-item {
    padding-right: 40px;
    &.active span{
      font-weight: 700;
      color: ${props => props.theme.colors.mainColor};
    }
  }
  
  &:hover {
    .category-delete-icon {
      opacity: .2;
    }
  }
  
  .category-icon {
    color: ${props => props.theme.colors.mainColor};
  }
  
  .category-delete-icon {
    position: absolute;
    top: 50%;
    right: 0;
    margin-top: -24px;
    opacity: 0;
    
    &:hover {
      opacity: 1;
      cursor: pointer;
    }
    
    &.hidden {
      display: none;
    }
  }
  .category-title {
     text-transform: uppercase;
  }
  
  @media all and (max-width: ${props => props.theme.media.mobileMaxWidthPx}px) {
    .category-delete-icon {
      opacity: .2;
      margin-right: .25rem;
    }
  }
`;

export default CategoryItemStyles;