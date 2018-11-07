import * as React from 'react';
import { AppCategories, AppCategoriesActions } from '../../interfaces';
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

interface CategoriesListState {
  inputShowed: boolean;
  inputValue: string;
}

class Categories extends React.Component<AppCategories & AppCategoriesDispatch & AppWithFirebaseAuthProps,
  CategoriesListState> {

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
    const {actions, firebaseUser: {auth}} = this.props;
    actions.addCategory(category, auth.uid);
    this.setState({inputShowed: false, inputValue: ''});
  }

  private inputIsDisabled = (): boolean => {
    const {inputValue} = this.state;
    const {categoriesList} = this.props;
    return !inputValue || categoriesList.includes(inputValue.toLowerCase());
  }

  private getCategories(): ReactNode {
    const {actions, categoriesList, activated} = this.props;
    return categoriesList.map((category: string, index: number) => (
      <CategoryItem
        key={index}
        category={category}
        isActivated={activated === category}
        activateCategory={actions.activateCategory}
        deleteCategory={actions.deleteCategory}
      />)
    );
  }

  private handleKeyPress = (e: any) => {
    const {inputValue} = this.state;
    if (e.key === 'Enter') {
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
              // @ts-ignore
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
