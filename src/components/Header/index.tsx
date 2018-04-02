import * as React from 'react';
import './index.css';

const Header: React.StatelessComponent<{}> = () => {
    return (
        <header className="ui container app-header">
            <h3 className="ui center aligned icon header">
                <i className="sticky note outline icon"/>
                Notes app
            </h3>
        </header>
    );
};

export default Header;
