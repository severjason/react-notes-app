import * as React from 'react';

const Note: React.StatelessComponent<any> = (props: any) => {
    return (
        <div className="ui compact segments">
            <div className="ui segment">
                <strong>{props.content.title}</strong>
            </div>
            <div className="ui segment">
                <p>{props.content.text}</p>
            </div>
        </div>
    );
};

export default Note;
