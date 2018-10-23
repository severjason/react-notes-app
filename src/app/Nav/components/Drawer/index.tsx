import * as React from 'react';
import { Divider, Drawer, IconButton, List } from '@material-ui/core';
import { ChevronLeft } from '@material-ui/icons';
import Categories from '../Categories';
import { AppCategories, AppCategoriesActions } from '../../interfaces';
import DrawerStyles from './styles';

interface CategoriesDrawerProps {
  opened: boolean;
  actions: AppCategoriesActions;
  categories: AppCategories;
  toggleDrawer: () => void;
}

const AppDrawer: React.StatelessComponent<CategoriesDrawerProps> = (props) => {
  const {opened, categories, actions, toggleDrawer} = props;
  return (
    <DrawerStyles>
    <Drawer
      variant="persistent"
      open={opened}
      className="app-drawer"
    >
      <div className="button-container">
        <IconButton onClick={toggleDrawer}>
          <ChevronLeft/>
        </IconButton>
      </div>
      <Divider/>
      <List>
        <Categories {...categories} actions={actions}/>
      </List>
      <Divider/>
    </Drawer>
    </DrawerStyles>
  );
};

export default AppDrawer;
