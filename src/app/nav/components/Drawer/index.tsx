import * as React from 'react';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import { Categories, TagsWrapper } from '../../components';
import { AppNavActions, AppCategory, AppTag } from '../../interfaces';
import DrawerStyles from './styles';

interface CategoriesDrawerProps {
  actions: AppNavActions;
  categories: AppCategory[];
  tags: AppTag[];
  filteredTags: AppTag[];
  userId: string;
  expanded: boolean;
  activated: AppCategory | null;
  toggleDrawer: () => void;
}

const AppDrawer: React.FunctionComponent<CategoriesDrawerProps> = (props) => {
  const {categories, userId, tags, filteredTags, expanded, activated, actions, toggleDrawer} = props;
  return (
    <DrawerStyles>
      <Drawer
        variant="persistent"
        open={expanded}
        className="app-drawer"
      >
        <List className="list-container">
          <div className="button-container">
            <IconButton onClick={toggleDrawer}>
              <ChevronLeft/>
            </IconButton>
          </div>
          <Divider/>
          <Categories categories={categories} activated={activated}  actions={actions}/>
        </List>
        <Divider/>
        <List>
          <TagsWrapper allTags={tags} userId={userId} filteredTags={filteredTags} actions={actions}/>
        </List>
      </Drawer>
    </DrawerStyles>
  );
};

export default AppDrawer;
