import * as React from 'react';
import { AppCategoriesActions, AppCategory } from '../../interfaces';
import { ChangeEvent, ReactNode } from 'react';
import { CategoryItem, AddCategory } from '../../components';
import CategoriesStyles from './styles';
import MenuList from '@material-ui/core/MenuList';
import Divider from '@material-ui/core/Divider';
import { withFirebaseAuth } from '../../../hocs';
import { AppWithFirebaseAuthProps } from '../../../interfaces';

interface AppCategoriesDispatch {
  actions: AppCategoriesActions;
}

interface CategoriesProps {
  categories: AppCategory[];
  activated: AppCategory;
}

interface CategoriesListState {
  inputShowed: boolean;
  inputValue: string;
}

class Categories extends React.Component<CategoriesProps
  & AppCategoriesDispatch & AppWithFirebaseAuthProps, CategoriesListState> {

  public state = {
    inputShowed: false,
    inputValue: '',
  };

  private handleShowInput = (): void => this.setState({inputShowed: true});

  private handleHideInput = (): void => this.setState({inputShowed: false, inputValue: ''});

  private handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    this.setState({inputValue: e.target.value.trim()});
  }

  private handleAddCategory = (category: string): void => {
    const {actions, firebaseUser: {auth}} = this.props;
    actions.addCategory(category, auth.uid);
    this.setState({inputShowed: false, inputValue: ''});
  }

  private inputIsDisabled = (): boolean => {
    const {inputValue} = this.state;
    const {categories} = this.props;
    return !inputValue.trim() ||
      !!categories.filter(category => category.name === inputValue.trim().toLowerCase()).length;
  }

  private getCategories(): ReactNode {
    const {actions, categories, activated} = this.props;
    return categories.map((category: AppCategory, index: number) => (
      <CategoryItem
        key={index}
        category={category.name}
        categoryId={category.id}
        isActivated={!!activated && activated.id === category.id}
        activateCategory={actions.activateCategory}
        deleteCategory={actions.deleteCategory}
      />)
    );
  }

  private handleKeyPress = (e: any) => {
    const {inputValue} = this.state;
    if (e.key === 'Enter' && !this.inputIsDisabled()) {
      this.handleAddCategory(inputValue);
    }
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
              onKeyPress={this.handleKeyPress}
            />
          </MenuList>
      </CategoriesStyles>
    );
  }
}

export default withFirebaseAuth(Categories);
