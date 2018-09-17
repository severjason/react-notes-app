import styled from 'styled-components';

const NoteModalStyles = styled.div`
  .ui.modal.app-note-modal-container {
  // left: 50%;
  // margin: 0 0 0 (-$app-note-modal-container-width / 2);
  // position: fixed;
  // top: 50%;
  // width: $app-note-modal-container-width;
  // z-index: 1001;

  textarea {
    margin-top: 1rem;
  }

  .ui.label.app-checkbox-label {

    border-radius: 50%;
    height: ${props => props.theme.modal.checkboxWidthRem}rem;
    margin: .2rem;
    padding: 0;
    width: ${props => props.theme.modal.checkboxWidthRem}rem;

    &:hover {
      cursor: pointer;
    }

    label {
      &::before,
      &::after {
        display: none;
      }
    }
  }

  .ui.label.app-modal-category-title {
    height: 2.5rem;
    line-height: 2.5rem;
    margin: .5rem .5rem .5rem 0;
    padding: 0 .5rem;

    &:hover {
      cursor: pointer;
    }

    &::first-letter {
      text-transform: capitalize;
    }

    .ui.checkbox {
      display: none;
    }
  }

  .app-modal-label {
    height: 2.5rem;
    line-height: 2.5rem;
    margin: .5rem .5rem .5rem 0;
    padding: 0 .5rem;

    &.app-tags-category {
      margin-right: 1rem;
    }

    &.required {
      &::after {
        color: ${props => props.theme.colors.redColor};
        content: '*';
        margin: -.2em 0 0 .2em;
      }
    }

    &.app-categories {
      margin-right: 1rem;
    }
  }

  .app-modal-input {
    height: 2.5rem;
    line-height: 2.5rem;
    margin: .5rem 0 .5rem 0;
    padding: 0 .5rem 0 0;

    &.app-tag-input {
      padding-right: 0;
    }

    &.app-tag-input > input {
      border-bottom-right-radius: 0;
      border-top-right-radius: 0;
    }
  }

  .app-modal-button {
    height: 2.5rem;
    line-height: 2.5rem;
    margin: .5rem .5rem .5rem 0;
    padding: 0 1.5rem;
  }

  .fields {
    flex-wrap: wrap;
    margin: 0;
  }

  .limited-height {
    max-height: ${props => props.theme.modal.limitedHeightRem}rem;
    overflow: auto;
  }

  .app-required-text {
    color: ${props => props.theme.colors.greyColor};
    font-size: .8rem;
    font-style: italic;
    padding-left: .5rem;

    &::before {
      color: ${props => props.theme.colors.redColor};
      content: '*';
      margin: -.2em 0 0 .2em;
    }
  }

}

@media all and (max-width: 767px) {
  .ui.modal.app-note-modal-container {
    margin: 0 0 0 -45.5%;
    width: 91%;
  }
}
`;

export default NoteModalStyles;
