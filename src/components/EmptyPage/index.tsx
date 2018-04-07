import * as React from 'react';
import './index.css';

interface AppEmptyPage {
    category?: string;
}

const EmptyPage: React.StatelessComponent<AppEmptyPage> = (props: AppEmptyPage) => {
    return (
        <div className="ui compact message app-empty-page-message-container">
            {(props.category === 'all') ? `No notes...` : `No notes in this category...`}
        </div>
    );
};

export default EmptyPage;