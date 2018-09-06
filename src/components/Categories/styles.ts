import styled from 'styled-components';

const CategoriesStyles = styled.div`
  .ui.page.modals.dimmer.transition.visible.active {
    padding: 1rem 0;
  }

  .app-activated-category {
    color: ${props => props.theme.colors.blackColor};
  }

  .ui.stackable.menu.app-categories-menu {
    border: 0;
    box-shadow: none;
    flex-wrap: wrap;
    margin: 1rem .5rem;
    padding: 0;

  .app-categories-menu-item {
    height: ${props => props.theme.categories.menuHeightRem}rem;
    border: ${props => props.theme.categories.menuBorder()};
    box-shadow: ${props => props.theme.categories.menuBoxShadow()};
    display: none;
    padding: 0;

    &.expanded {
      display: flex;
    }

    &:hover {
      background: ${props => props.theme.menuHoverColor};
    }
  }

  .app-categories-menu-link {
    color: ${props => props.theme.colors.blackColor};
    height: ${props => props.theme.categories.menuHeightRem}rem;
    line-height: ${props => props.theme.categories.menuHeightRem}rem;
    padding: 0 2rem;

    &::first-letter {
      text-transform: capitalize;
    }

    &:hover {
      color: ${props => props.theme.colors.blackColor};
    }
  }

  .app-categories-menu {
    // color: $app-black-color;
    font-size: 1.5rem;
    height: ${props => props.theme.categories.menuHeightRem}rem;
    padding: 0;
    width: ${props => props.theme.categories.menuHeightRem}rem;

    .icon {
      margin: 0 auto;
    }

    &.hidden {
      display: none;
    }

    &:hover {
      cursor: pointer;
    }
  }

  .app-categories-menu-logo {
    border: ${props => props.theme.categories.menuBorder()};
    border-radius: ${props => props.theme.base.borderRadiusPx}px;
    box-shadow: none;
    color: ${props => props.theme.colors.mainColor};

    &.expanded {
      border-bottom-right-radius: 0;
      border-top-right-radius: 0;
    }

    &::before {
      width: 0;
    }
  }

  .app-add-category-menu {
    border: ${props => props.theme.categories.menuBorder()};
    border-bottom-right-radius: ${props => props.theme.base.borderRadiusPx}px;
    border-top-right-radius: ${props => props.theme.base.borderRadiusPx}px;
    box-shadow: ${props => props.theme.categories.menuBoxShadow()};
    display: none;
    font-size: 1rem;
    padding: 0 2rem;
    width: auto;

    &.expanded {
      display: flex;

      &.hidden {
        display: none;
      }
    }
  }

  .app-category-input-container {
    border: 0;
    border-bottom-right-radius: ${props => props.theme.base.borderRadiusPx}px;
    border-top-right-radius: ${props => props.theme.base.borderRadiusPx}px;

    &.hidden {
      display: none;
    }

    input,
    button {
      border: ${props => props.theme.categories.menuBorder()};
      border-radius: 0;
    }
  }

  .app-delete-icon {
    height: ${props => props.theme.categories.menuHeightRem}rem;
    line-height: ${props => props.theme.categories.menuHeightRem}rem;
    margin: 0;
    opacity: .2;
    position: absolute;
    right: 0;
    width: ${props => props.theme.categories.menuDeleteIconWidthRem}rem;
    z-index: 1001;

    &.hidden {
      display: none;
    }

    &:hover {
      cursor: pointer;
      opacity: .8;
    }
  }

  .icon.app-category-delete-icon {
    top: 0;
  }

  .icon.app-hide-input-icon {
    padding: 0;
  }

  .ui.button.app-add-category-button {
    border: ${props => props.theme.categories.menuBorder()};
    border-bottom-right-radius: ${props => props.theme.base.borderRadiusPx}px;
    border-top-right-radius: ${props => props.theme.base.borderRadiusPx}px;
    padding-right: 2.5rem;
  }
}

@media all and (max-width: 767px) {

  .wide.column {
    padding: 0;
  }

  .ui.app-categories-container {
    margin: 0 auto;
    max-width: ${props => props.theme.note.containerWidthRem * 1.2}rem;
    padding: 0;
    width: 100%;

  }

  .ui.stackable.menu.app-categories-menu {
    margin: 0 auto;
    max-width: 400px;

    .app-categories-menu-item {
      &:nth-child(2) {
        border-top-right-radius: ${props => props.theme.base.borderRadiusPx}px;
      }
    }

    .ui.app-category-input-container {
      border-bottom-left-radius: ${props => props.theme.base.borderRadiusPx}px;
      border-top-right-radius: 0;
      width: 100%;

      .ui.button.app-add-category-button {
        border-top-right-radius: 0;
      }

      .input {
        width: 100%;
      }

      input {
        border-bottom-left-radius: ${props => props.theme.base.borderRadiusPx}px;
      }
    }

    .app-add-category-menu {
      border-bottom-left-radius: ${props => props.theme.base.borderRadiusPx}px;
      border-top-right-radius: 0;
    }

    .item.app-categories-menu-logo {

      width: ${props => props.theme.categories.menuHeightRem}rem !important;

      &.expanded {
        border-bottom-left-radius: 0;
        border-top-right-radius: ${props => props.theme.base.borderRadiusPx}px;
      }
    }

    .app-categories-menu-link {
      width: 100%;
    }

  }
}

`;

export default CategoriesStyles;
