import * as React from 'react';

interface AppEmptyPage {
    category?: string;
}

const EmptyPage: React.StatelessComponent<AppEmptyPage> = (props: AppEmptyPage) => {
    return (
        <div>
            {(props.category === 'all') ? `No notes...` : `No notes in ${props.category} category...`}
        </div>
    );
};

export default EmptyPage;