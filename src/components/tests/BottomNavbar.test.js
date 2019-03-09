import React from 'react';
import { shallow } from 'enzyme';
import { BottomNavbar } from '../BottomNavbar';
import { Button, Icon } from 'semantic-ui-react';

describe('< BottomNavbar /> Component', () => {
    const renderedComponent = shallow(<BottomNavbar />);

    it('should render 3 < Button />', () => {
        expect(renderedComponent.find(Button).length).toBe(3);
    });

    it('should render < Button /> with right props', () => {
        const buttons = renderedComponent.find(Button);
        buttons.map(button => {
            expect(button.props().size).toBe('massive');
        });
        expect(buttons.at(0).props().icon).toEqual(<Icon name='home' size='large' />);
        expect(buttons.at(1).props().icon).toEqual(<Icon name='heart' size='large' />);
        expect(buttons.at(2).props().icon).toEqual(<Icon name='th large' size='large' />);
    });
});
