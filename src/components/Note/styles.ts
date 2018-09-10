import styled from 'styled-components';

const NoteStyles = styled.div`
  margin: ${props => props.theme.note.marginRem}rem;
  width: ${props => props.theme.note.containerWidthRem}rem;
  
  &.full {
    width: 100%;
    max-width: 43rem;
    margin: 0 auto;
  
    .card-action {
      &:hover {
        background-color: transparent;
        cursor: unset;
      }
    }
  }
  
  .note-card {
    position: relative;
  }
  .card-action {
    width: 100%;
  }
  
  .buttons-container {
    position: absolute;
    top: 0;
    right: 0;
    margin: .7rem .5rem 0 0;
  }
  
  .note-header {
    padding-right: 8rem;
    span {
      font-size: 1.2rem;
    }
  }
  .note-content {
    display: none;
    padding-top: 1rem;
    &.expanded {
      display: block;
    }
  }
  .note-divider {
    margin: 1rem 0;
  }
  
  .note-tag {
    height: 1.5rem;
    margin: .1rem .1rem .1rem 0;
  }

@media all and (max-width: 767px) {
    max-width: ${props => props.theme.note.containerWidthRem * 1.1}rem;
    width: 100%;
}

`;

export default NoteStyles;
