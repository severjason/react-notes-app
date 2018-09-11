import * as React from 'react';
import { AppCategories, AppCategoriesActions } from '../../interfaces/categories';
import { ChangeEvent, ReactNode } from 'react';
import CategoryItem from './CategoryItem';
import AddCategory from './AddCategory';
import CategoriesStyles from './styles';
import { MenuList, Divider } from '@material-ui/core';

interface AppCategoriesDispatch {
  actions: AppCategoriesActions;
}

interface CategoriesListState {
  inputShowed: boolean;
  inputValue: string;
}

class Categories extends React.Component<AppCategories & AppCategoriesDispatch, CategoriesListState> {

  public state = {
    inputShowed: false,
    inputValue: '',
  };

  private handleShowInput = (): void => this.setState({inputShowed: true});

  private handleHideInput = (): void => this.setState({inputShowed: false, inputValue: ''});

  private handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    this.setState({inputValue: e.target.value});
  }

  private handleAddCategory = (category: string): void => {
    this.props.actions.addCategory(category);
    this.setState({inputShowed: false, inputValue: ''});
  }

  private inputIsDisabled = (): boolean => {
    const {inputValue} = this.state;
    return !inputValue || this.props.categoriesList.includes(inputValue.toLowerCase());
  }

  private getCategories(): ReactNode {
    const {actions, categoriesList, expanded, activated} = this.props;
    return categoriesList.map((category: string) => (
      <CategoryItem
        key={category}
        category={category}
        activated={activated}
        actions={actions}
        expanded={expanded}
      />)
    );
  }

  render() {
    const {inputValue, inputShowed} = this.state;
    return (
      <CategoriesStyles>
          <MenuList className="menu-list">
            {this.getCategories()}
            <Divider/>
            <AddCategory
              inputValue={inputValue}
              inputShowed={inputShowed}
              showInput={this.handleShowInput}
              hideInput={this.handleHideInput}
              onInputChange={this.handleInputChange}
              inputIsDisabled={this.inputIsDisabled()}
              addCategory={this.handleAddCategory}
            />
          </MenuList>
      </CategoriesStyles>
    );
  }
}

export default Categories;
