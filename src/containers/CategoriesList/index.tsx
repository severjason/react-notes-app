import * as React from 'react';
import { Accordion, Icon, Divider } from 'semantic-ui-react';
import { AppActions, AppCategories } from '../../interfaces';
import { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import './index.css';

interface AppCategoriesDispatch {
    actions: AppActions;
}

class CategoriesList extends React.Component<AppCategories & AppCategoriesDispatch, {}> {

    public state = {
    };

    render() {
        const categories: ReactNode = this.props.categoriesList.map((category: string, index: number) => {
            return (
                <Link
                    key={index}
                    to={`/notes/${category}`}
                    className={`${(this.props.activated === category) ? 'app-activated-category' : ''}`}
                    onClick={() => this.props.actions.activateCategory(category)}
                >
                    {category}<br/>
                </Link>
            );
        });

        return (
            <div>
                <Accordion fluid={true} styled={false}>
                    <Accordion.Title
                        active={this.props.expanded}
                        onClick={this.props.actions.toggleCategories}
                    >
                        <Icon name="dropdown"/>
                        Notes categories
                    </Accordion.Title>
                    <Accordion.Content active={this.props.expanded}>
                        <Divider/>
                        {categories}
                    </Accordion.Content>
                </Accordion>
                <Divider/>
            </div>
        );
    }
}

export default CategoriesList;