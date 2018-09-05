import styled from 'styled-components';

const HomeStyles = styled.div`
.icon.app-note-add-icon {
  border: ${props => props.theme.note.addIconBorder()};
  border-radius: ${props => props.theme.note.addIconWidthRem / 2}rem;
  box-shadow: ${props => props.theme.note.addIconBoxShadow()};
  color: ${props => props.theme.colors.mainColor};
  display: block;
  font-size: ${props => props.theme.note.addIconFontSizeRem}rem;
  height: ${props => props.theme.note.addIconWidthRem}rem;
  margin: .2rem auto;
  width: ${props => props.theme.note.addIconWidthRem}rem;

  &:hover {
    cursor: pointer;
    transform: scale(1.1);
  }

  &:active {
    transform: scale(1);
  }

  &::before {
    position: relative;
    top: 1rem;
  }
}

.ui.grid {
  .column.app-categories-container {
    padding-top: 0;
  }
}
`;

export default HomeStyles;
