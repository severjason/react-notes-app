import * as React from 'react';
import { Accordion, Icon } from 'semantic-ui-react';

const CategoriesList: React.StatelessComponent = () => {
    return (
        <Accordion fluid={true} styled={true}>
            <Accordion.Title >
                <Icon name="dropdown" />
                What is a dog?
            </Accordion.Title>
            <Accordion.Content >
                <p>
                    A dog is a type of domesticated animal. Known for its loyalty and faithfulness, it can be found
                    as a
                    {' '}welcome guest in many households across the world.
                </p>
            </Accordion.Content>
        </Accordion>
    );
};

export default CategoriesList;