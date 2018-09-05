import * as React      from 'react';
import EmptyPageStyles from './styles';

interface AppEmptyPage {
    category?: string;
}

const EmptyPage: React.StatelessComponent<AppEmptyPage> = (props: AppEmptyPage) => {
    return (
        <EmptyPageStyles className="ui compact message app-empty-page-message-container">
            {(props.category === 'all') ? `No notes...` : `No notes in this category...`}
        </EmptyPageStyles>
    );
};

export default EmptyPage;
