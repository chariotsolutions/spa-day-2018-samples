import React from 'react';
import { shallow } from 'enzyme';
import { ChatInput } from './ChatInput';

describe('ChatInput', () => {
    it('snapshot regression', () => {
        const handleSubmit = jest.fn();
        const submitText = 'foo'

        expect(shallow(<ChatInput {...{ handleSubmit, submitText }}/>)).toMatchSnapshot()
    })

    fit('should update state on input change', () => {
        const handleSubmit = jest.fn();
        const submitText = 'foo'

        const component = shallow(<ChatInput {...{ handleSubmit, submitText }}/>)
        component.find('[type="text"]')
            .simulate('change',
                      { currentTarget: { value: 'hello' } })
        expect(component.state()).toEqual({ message: 'hello' })
    })

})
