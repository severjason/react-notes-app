import styled from 'styled-components';

const NoteStyles = styled.div`
  margin: ${props => props.theme.note.marginRem}rem;
  width: ${props => props.theme.note.containerWidthRem}rem;
  
  &.full {
    width: 100%;
    max-width: 43rem;
    margin: 0 auto;
    padding: .5rem;
  
    .card-action {
      &:hover {
        background-color: transparent;
        cursor: unset;
      }
    }
  }
  
  .note-category {
    height: 1.7rem;
    margin: .2rem;
    border-radius: .2rem;
    font-size: inherit;
    line-height: 1;
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
  div.note-content {
    display: none;
    padding-top: 1rem;
    padding-bottom: 1rem;
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
  
  .hidden {
    display: none;
  }

@media all and (max-width: 767px) {
    max-width: ${props => props.theme.note.containerWidthRem * 1.1}rem;
    width: 100%;
}
`;

export default NoteStyles;
