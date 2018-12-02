import styled from 'styled-components';

const TagsWrapperStyles = styled.div`
  .title {
    text-transform: uppercase;
    font-weight: 700;
    padding: 0 16px;
    color: ${props => props.theme.colors.mainColor};
    height: ${props => props.theme.categories.menuHeightPx}px;
    line-height: ${props => props.theme.categories.menuHeightPx}px;
  }
  .label {
    display: none;
  }
  .tags-container {
    padding: 16px;
  }
`;

export default TagsWrapperStyles;
