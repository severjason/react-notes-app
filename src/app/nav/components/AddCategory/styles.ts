import styled from 'styled-components';

const AddCategoryStyles = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    // padding: 8px 8px 0 8px; 
    
    .category-add-button {
      &.hidden {
        display: none;
      }
    }
    
    .add-category-toggle-icon {
      color: ${props => props.theme.colors.mainColor};
    }
    
    .add-category-button {
      &:disabled {
        .add-category-icon {
          color: ${props => props.theme.colors.greyColor};
        }
      }
    }
    
    .add-category-icon {
      color: ${props => props.theme.colors.greenColor};
    }
    
    .close-add-category-icon {
      color: ${props => props.theme.colors.redColor};
    }
    
    .add-category-input-container {
      &.hidden {
        display: none;
      }
    }
  
`;

export default AddCategoryStyles;
