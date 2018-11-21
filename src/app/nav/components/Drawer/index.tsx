import * as React from 'react';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import Categories from '../Categories';
import { AppNavActions, AppCategory } from '../../interfaces';
import DrawerStyles from './styles';

interface CategoriesDrawerProps {
  actions: AppNavActions;
  categories: AppCategory[];
  expanded: boolean;
  activated: AppCategory | null;
  toggleDrawer: () => void;
}

const AppDrawer: React.FunctionComponent<CategoriesDrawerProps> = (props) => {
  const {categories, expanded, activated, actions, toggleDrawer} = props;
  return (
    <DrawerStyles>
      <Drawer
        variant="persistent"
        open={expanded}
        className="app-drawer"
      >
        <div className="button-container">
          <IconButton onClick={toggleDrawer}>
            <ChevronLeft/>
          </IconButton>
        </div>
        <Divider/>
        <List>
          <Categories categories={categories} activated={activated}  actions={actions}/>
        </List>
        <Divider/>
      </Drawer>
    </DrawerStyles>
  );
};

export default AppDrawer;
